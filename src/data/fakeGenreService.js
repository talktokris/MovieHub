export const genres = [
  { _id: 1, name: "Action" },
  { _id: 2, name: "Comedy" },
  { _id: 3, name: "Thriller" },
  { _id: 4, name: "Drama" },
];

export function getGenres() {
  return genres.filter((g) => g);
}
