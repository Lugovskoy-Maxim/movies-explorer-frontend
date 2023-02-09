
export const filterDuration = (m) => m.filter(({ duration }) => duration <= 40); // отфильтровать всё фильмы с длитной более 40 минут

export const filter = (movies, { search, checked }) => {
  const matched = (str, match) => str.toLowerCase().includes(match.toLowerCase());
  // const { search, checked } = parametrs;

  if (search)
    movies = movies.filter(
      ({ nameRU, nameEN }) => matched(nameRU, search) || matched(nameEN, search)
    );

  if (checked) movies = filterDuration(movies);

  return movies;
};