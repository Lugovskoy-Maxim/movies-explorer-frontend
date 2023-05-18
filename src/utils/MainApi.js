const BASE_URL = "http://localhost:3000";
// const BASE_URL = "https://api.lugovskoy-movies.nomoredomains.club";

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
};

const sendRequest = async (url, method, body) => {
  const res = await fetch(url, {
    method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return handleResponse(res);
};

export const register = async (name, email, password) => {
  return sendRequest(`${BASE_URL}/signup`, "POST", { name, email, password });
};

export const signout = async () => {
  return sendRequest(`${BASE_URL}/signout`, "GET");
};

export const authorize = async (email, password) => {
  return sendRequest(`${BASE_URL}/signin`, "POST", { email, password });
};

export const updateUserInfo = async (name, email) => {
  return sendRequest(`${BASE_URL}/users/me`, "PATCH", { name, email });
};

export const getUserData = async () => {
  return sendRequest(`${BASE_URL}/movies`, "GET");
};

export const createMovie = async (movie) => {
  const formattedMovie = {
    movieId: movie.id,
    nameRU: movie.nameRU,
    nameEN: movie.nameEN,
    director: movie.director,
    country: movie.country,
    year: movie.year,
    duration: movie.duration,
    description: movie.description,
    trailerLink: movie.trailerLink,
    image: `https://api.nomoreparties.co${movie.image.url}`,
    thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
  };
  return sendRequest(`${BASE_URL}/movies`, "POST", formattedMovie);
};

export const removeMovie = async (id) => {
  return sendRequest(`${BASE_URL}/movies/${id}`, "DELETE");
};

export const getMainMovies = async () => {
  return sendRequest(`${BASE_URL}/movies`, "GET");
};

export const checkToken = async () => {
  return sendRequest(`${BASE_URL}/users/me`, "GET");
};