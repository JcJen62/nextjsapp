/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getAnime = /* GraphQL */ `
  query GetAnime($id: ID!) {
    getAnime(id: $id) {
      id
      mal_id
      image_url
      title
      title_english
      episodes
      synopsis
      score
      rank
      background
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listAnime = /* GraphQL */ `
  query ListAnime(
    $filter: ModelAnimeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAnime(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        mal_id
        image_url
        title
        title_english
        episodes
        synopsis
        score
        rank
        background
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncAnime = /* GraphQL */ `
  query SyncAnime(
    $filter: ModelAnimeFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncAnime(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        mal_id
        image_url
        title
        title_english
        episodes
        synopsis
        score
        rank
        background
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
