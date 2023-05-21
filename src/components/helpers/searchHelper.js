import * as MoviesApi from '../../utils/MoviesApi';

export function searchMovies(searchValue, filterStatus, setSearchResult) {
  if (!localStorage.getItem('moviesData')) {
    MoviesApi.getMovie()
      .then((res) => {
        const searchResults = filter(res, filterStatus, searchValue);
        setSearchResult((prev) => ({
          ...prev,
          movies: searchResults,
        }));
        localStorage.setItem('moviesData', JSON.stringify(res));
        const object = {
          movies: searchResults,
        };
        localStorage.setItem('searchResult', JSON.stringify(object));
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    const moviesData = JSON.parse(localStorage.getItem('moviesData'));
    const searchResults = filter(moviesData, filterStatus, searchValue);
    setSearchResult((prev) => ({
      ...prev,
      movies: searchResults,
    }));
    const object = {
      movies: searchResults,
    };
    localStorage.setItem('searchResult', JSON.stringify(object));
    localStorage.setItem('search', searchValue);
  }
}

// export function searchMoviesMain(mainMovies, setMainMovies, setSearchResultMain, movie){
//   const isSaved = movie.owner === currentUser.id;
//     if (isSaved === true) {
//       mainApi
//         .removeMovie(movie._id) /// нужно засунуть сохраненный фильм если он есть, если нет то не нужно засовывать
//         .then((res) => {
//           setMainMovies(mainMovies.filter((i) => i !== movie)); // удалить фильм который я отправлял из стейта
//           const newArr = localStorage.getItem("searchResultMain");
//           const saved = JSON.parse(newArr).movies;
//           const removeIndex = saved
//             .map((item) => item.nameRU)
//             .indexOf(movie.nameRU);
//           saved.splice(removeIndex, 1);

//           setSearchResultMain((prev) => ({
//             ...prev,
//             movies: saved,
//           }))
//           const object = {
//             movies: saved,
//           };
//           localStorage.setItem("searchResultMain", JSON.stringify(object));

//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     } else {
//       mainApi
//         .createMovie(movie)
//         .then((newMovie) => {
//             setMainMovies([...mainMovies, newMovie]);
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     }
// }

const filter = (movies, filterStatus, searchValue) => {
  const matched = (str, match) =>
    str.toLowerCase().includes(match.toLowerCase());
  return (filterStatus === true
    ? movies.filter((movie) => movie.duration <= 40)
    : movies
  ).filter(
    ({ nameRU, nameEN }) =>
      matched(nameRU, searchValue) || matched(nameEN, searchValue)
  );
};
