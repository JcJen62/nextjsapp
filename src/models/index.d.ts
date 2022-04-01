import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type AnimeMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Anime {
  readonly id: string;
  readonly mal_id?: number | null;
  readonly image_url?: string | null;
  readonly title?: string | null;
  readonly title_english?: string | null;
  readonly episodes?: number | null;
  readonly synopsis?: string | null;
  readonly score?: number | null;
  readonly rank?: number | null;
  readonly background?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Anime, AnimeMetaData>);
  static copyOf(source: Anime, mutator: (draft: MutableModel<Anime, AnimeMetaData>) => MutableModel<Anime, AnimeMetaData> | void): Anime;
}