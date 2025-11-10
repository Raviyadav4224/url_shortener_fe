export const BASE_URL = import.meta.env.VITE_APP_BASE_URL_DEV;
export const GET = "GET";
export const POST = "POST";
export const PATCH = "PATCH";
export const PUT = "PUT";
export const DELETE = "DELETE";

// AUTH URL's
export const LOGIN = BASE_URL + "users/login";
export const REGISTER = BASE_URL + "users/register";
export const LOGOUT = BASE_URL + "users/logout";
export const REFRESH = BASE_URL + "users/refresh";

// URL MAPPING URL's
export const SHORTEN_URL = BASE_URL + "url/shorten";
export const ALL_URL_FOR_USER = BASE_URL + "url/all";
export const REDIRECT_URL = BASE_URL + "url/r/";
export const DELETE_URL = BASE_URL + "url/";

export const ALL_URL_FOR_USER_FN = (id) => `${BASE_URL}url/all/${id}`;
export const REDIRECT_URL_FN = (shortenUrlId) => `${BASE_URL}url/r/${shortenUrlId}`;
export const DELETE_URL_FN = (id) => `${BASE_URL}url/${id}`;
