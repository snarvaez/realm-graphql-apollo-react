import gql from "graphql-tag";

export const FIND_MOVIE = gql`
  query FindMovie($query: MovieQueryInput!) {
    movie(query: $query) {
      _id
      title
      year
      runtime
      rated
      poster
    }
  }
`;

export const SEARCH_MOVIE = gql`
  query FindMovie($query: MovieQueryInput!) {
    movie: SearchMovie(input: $query) {
      _id
      title
      year
      runtime
      rated
      poster
    }
  }
`;

export const UPDATE_MOVIE = gql`
  mutation UpdateMovie($query: MovieQueryInput!, $set: MovieUpdateInput!) {
    updateOneMovie(query: $query, set: $set) {
      _id
      title
    }
  }
`;
