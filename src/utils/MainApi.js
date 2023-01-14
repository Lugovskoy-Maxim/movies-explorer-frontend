const BASE_URL = 'https://api.lugovskoy-movies.nomoredomains.club';

const handleResponse = res => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

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
    method: 'POST',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password })
  });
  return handleResponse(res);
}

export const authorize = async (email, password) => {
  const res = await fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password })
  });
  return handleResponse(res);
}

export const getUserData = async () => {
  const res = await fetch(`${BASE_URL} + "/movies"`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
  });
  return handleResponse(res);
}


export const createMovies = async ( owner, movie ) => {
  const res = await fetch(`${BASE_URL} + "/movies"`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ owner, movie })
  });
  return handleResponse(res);
}

export async function checkToken() {
  return await fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      "Content-TYPE": "application/json",
    }
  })
  .then(handleResponse);
}