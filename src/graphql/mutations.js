/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createAnime = /* GraphQL */ `
  mutation CreateAnime(
    $input: CreateAnimeInput!
    $condition: ModelAnimeConditionInput
  ) {
    createAnime(input: $input, condition: $condition) {
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
export const updateAnime = /* GraphQL */ `
  mutation UpdateAnime(
    $input: UpdateAnimeInput!
    $condition: ModelAnimeConditionInput
  ) {
    updateAnime(input: $input, condition: $condition) {
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
export const deleteAnime = /* GraphQL */ `
  mutation DeleteAnime(
    $input: DeleteAnimeInput!
    $condition: ModelAnimeConditionInput
  ) {
    deleteAnime(input: $input, condition: $condition) {
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
