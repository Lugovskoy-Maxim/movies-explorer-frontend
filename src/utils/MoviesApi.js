const BASE_URL = "https://api.nomoreparties.co/beatfilm-movies";

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
};


export const getMovie = async () => {
  const res = await fetch(`${BASE_URL}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
    // body: JSON.stringify({ name, email, password }),
  });
  return handleResponse(res);
};

// https://api.nomoreparties.co/ - для картинок