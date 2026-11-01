import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { AppState } from 'react-native';
import { useAuth } from './AuthContext';
import { readJSON, writeJSON } from '../services/storage';
import { changeEntry, fetchCloud, mergeCollections, pushCloud } from '../services/collection';
import type { Character, Collection, CollectionEntry } from '../types';
interface Value {
  entries: Collection; loading: boolean; loadError: string; warning: string; syncing: boolean;
  reload: () => void; sync: () => Promise<void>;
  update: (character: Character, changes: Partial<Pick<CollectionEntry, 'favorite' | 'consumed' | 'rating'>>) => Promise<void>;
}
const Context = createContext<Value | null>(null);
export function CollectionProvider({ children }: React.PropsWithChildren) {
  const { user } = useAuth();
  const userId = user?.id;
  const remote = user?.remote;
  const [entries, setEntries] = useState<Collection>({});
  const current = useRef<Collection>({});
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [warning, setWarning] = useState('');
  const [syncing, setSyncing] = useState(false);
  const [revision, setRevision] = useState(0);
  const queue = useRef<Promise<unknown>>(Promise.resolve());
  const key = `catalogo-z-collection-${user?.id}`;
  const active = useRef(true);
  const syncingRef = useRef(false);
  const syncRequested = useRef(false);
  useEffect(() => { active.current = true; return () => { active.current = false; }; }, []);
  const sync = useCallback(async () => {
    if (!remote || !userId) return;
    if (syncingRef.current) { syncRequested.current = true; return; }
    syncingRef.current = true; setSyncing(true);
    try {
      do {
        syncRequested.current = false;
        const cloudEntries = await fetchCloud(userId);
        // Reconcile inside the edit queue; network requests never block local saves.
        const task = queue.current.catch(() => {}).then(async () => {
          if (!active.current) return;
          const merged = mergeCollections(current.current, cloudEntries);
          await writeJSON(key, merged);
          current.current = merged; setEntries(merged);
          return merged;
        });
        queue.current = task;
        const merged = await task;
        if (!merged || !active.current) return;
        await pushCloud(userId, Object.values(merged));
        if (active.current) setWarning('');
      } while (active.current && syncRequested.current);
    } catch { if (active.current) setWarning('Coleção salva no aparelho. Não foi possível sincronizar com a nuvem. Tente novamente.'); }
    finally {
      syncingRef.current = false;
      if (active.current) setSyncing(false);
    }
  }, [userId, remote, key]);
  useEffect(() => {
    let cancelled = false;
    setLoading(true); setLoadError('');
    readJSON<Collection>(key, {}).then(data => {
      if (cancelled) return;
      current.current = data; setEntries(data); setLoading(false); void sync();
    }).catch(() => { if (!cancelled) { setLoadError('Não foi possível recuperar sua coleção. Tente novamente.'); setLoading(false); } });
    return () => { cancelled = true; };
  }, [key, revision, sync]);
  useEffect(() => {
    if (loading || loadError) return;
    const subscription = AppState.addEventListener('change', state => { if (state === 'active') void sync(); });
    return () => subscription.remove();
  }, [loading, loadError, sync]);
  const update: Value['update'] = (character, changes) => {
    const task = queue.current.catch(() => {}).then(async () => {
      if (!active.current) return;
      const next = { ...current.current, [character.id]: changeEntry(current.current[character.id], character, changes) };
      await writeJSON(key, next); // Only show success after the local write succeeds.
      current.current = next;
      if (active.current) setEntries(next);
    });
    queue.current = task;
    return task.then(() => { void sync(); });
  };
  return <Context.Provider value={{ entries, loading, loadError, warning, syncing, sync, update, reload: () => setRevision(v => v + 1) }}>{children}</Context.Provider>;
}
export function useCollection() { const context = useContext(Context); if (!context) throw new Error('CollectionProvider ausente'); return context; }
