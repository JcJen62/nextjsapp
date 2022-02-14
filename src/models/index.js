// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Anime } = initSchema(schema);

export {
  Anime
};