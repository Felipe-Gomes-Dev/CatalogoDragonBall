export interface Character {
  id: number;
  name: string;
  image: string;
  race: string;
  gender?: string;
  affiliation?: string;
  ki?: string;
  maxKi?: string;
  description?: string;
  originPlanet?: { name: string; image: string; description: string; isDestroyed: boolean };
  transformations?: { id: number; name: string; image: string; ki: string }[];
}
export interface CollectionEntry {
  character: Character;
  favorite: boolean;
  consumed: boolean;
  rating: number;
  updatedAt: string;
}
export type Collection = Record<string, CollectionEntry>;
export interface AppUser {
  id: string;
  email: string;
  remote: boolean;
}
export type RootStackParams = {
  Login: undefined;
  Catalog: undefined;
  Search: undefined;
  Details: { id: number };
  Favorites: undefined;
  Consumed: undefined;
};
