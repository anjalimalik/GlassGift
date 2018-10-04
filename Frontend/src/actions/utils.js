
export function saveUserToken(token) {
  localStorage.setItem('token', token);
}

export function getUserToken() {
  return localStorage.getItem('token');
}

export function removeUserToken() {
  localStorage.removeItem('token');
}
