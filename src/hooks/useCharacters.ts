import { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { errorMessage, getCharacters } from '../services/api';
import type { Character } from '../types';
export function useCharacters(query = '', race = '', enabled = true) {
  const [items, setItems] = useState<Character[]>([]);
  const [loading, setLoading] = useState(enabled);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState('');
  const [moreError, setMoreError] = useState('');
  const page = useRef(0),
    hasMore = useRef(true),
    busy = useRef(false);
  const controller = useRef<AbortController | null>(null);
  const load = useCallback(
    async (reset = false, refresh = false) => {
      if (!enabled || (!reset && (busy.current || !hasMore.current))) return;
      if (reset) controller.current?.abort();
      const request = new AbortController();
      controller.current = request;
      busy.current = true;
      if (reset) {
        setError('');
        setMoreError('');
        setLoadingMore(false);
        setRefreshing(refresh);
        setLoading(!refresh);
        if (!refresh) setItems([]);
      } else {
        setLoadingMore(true);
        setMoreError('');
      }
      const target = reset ? 1 : page.current + 1;
      try {
        const result = await getCharacters(target, query, race, request.signal);
        if (request.signal.aborted) return;
        setItems((previous) => [
          ...new Map(
            (reset ? result.items : [...previous, ...result.items]).map((item) => [item.id, item]),
          ).values(),
        ]);
        page.current = target;
        hasMore.current = result.hasMore;
      } catch (e) {
        if (!axios.isCancel(e) && !request.signal.aborted)
          (reset ? setError : setMoreError)(errorMessage(e));
      } finally {
        if (controller.current === request) {
          busy.current = false;
          setLoading(false);
          setRefreshing(false);
          setLoadingMore(false);
        }
      }
    },
    [query, race, enabled],
  );
  useEffect(() => {
    void load(true);
    return () => controller.current?.abort();
  }, [load]);
  return {
    items,
    loading,
    refreshing,
    loadingMore,
    error,
    moreError,
    refresh: () => load(true, true),
    retry: () => load(true),
    loadMore: () => {
      if (!moreError) void load();
    },
    retryMore: () => load(),
  };
}
