const BASE_URL = "https://api.lugovskoy-movies.nomoredomains.club";

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
};

// export const register = (name, email, password) => {
//   return fetch(`${BASE_URL}/signup`, {
//     method: 'POST',
//     credentials: 'include',
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ name, email, password })
//   })
//   .then(handleResponse);
// }

export const register = async (name, email, password) => {
  const res = await fetch(`${BASE_URL}/signup`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });
  return handleResponse(res);
};

export const authorize = async (email, password) => {
  const res = await fetch(`${BASE_URL}/signin`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  return handleResponse(res);
};

export const updateUserUnfo = async (name, email) => {
  const res = await fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({name, email}),
  });
  return handleResponse(res);
};

export const getUserData = async () => {
  const res = await fetch(`${BASE_URL}/movies`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return handleResponse(res);
};

export const createMovies = async (movie) => {
  const res = await fetch(`${BASE_URL}/movies`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      movieId: movie.id,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
      director: movie.director,
      country: movie.country,
      year: movie.year ,
      duration: movie.duration,
      description: movie.description,
      trailerLink: movie.trailerLink,
      image: "https://api.nomoreparties.co"+movie.image.url,
      thumbnail: "https://api.nomoreparties.co"+movie.image.formats.thumbnail.url,
    }),
  });
  return handleResponse(res);
};

export const removeMovie = async (id) => {
  const res = await fetch(`${BASE_URL}/movies/${id}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return handleResponse(res);
};

export const getMainMovies = async () => {
  const res = await fetch(`${BASE_URL}/movies`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return handleResponse(res);
};

export async function checkToken() {
  return await fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-TYPE": "application/json",
    },
  }).then(handleResponse);
}
