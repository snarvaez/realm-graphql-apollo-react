import gql from "graphql-tag";

export const FIND_MOVIE = gql`
  query FindMovie($query: MovieQueryInput!) {
    movie: searchOneMovie(input: $query) {
      _id
      title
      year
      runtime
      rated
      poster
      plot
      fullplot
      cast
      directors
      writers
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

export const GET_TELEMETRY = gql`
  query GetTelemetry($query: Movies_telemetryQueryInput!) {
    myTelemetry: getMovieViewerTelemetry(input: $query) {
      _id
      day
      hour
      min
      month
      resumePointSecs
      userId
      year
    }
  }
`;