import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type AnimeMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Anime {
  readonly id: string;
  readonly mal_id?: number;
  readonly image_url?: string;
  readonly title?: string;
  readonly title_english?: string;
  readonly episodes?: number;
  readonly synopsis?: string;
  readonly score?: number;
  readonly rank?: number;
  readonly background?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Anime, AnimeMetaData>);
  static copyOf(source: Anime, mutator: (draft: MutableModel<Anime, AnimeMetaData>) => MutableModel<Anime, AnimeMetaData> | void): Anime;
}