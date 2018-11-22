
export function saveUserToken(token) {
  localStorage.setItem('token', token);
}

export function getUserToken() {
  return localStorage.getItem('token');
}

export function removeUserToken() {
  localStorage.removeItem('token');
}

export function saveUserId(id) {
  localStorage.setItem('id', id);
}

export function getUserId() {
  return localStorage.getItem('id');
}

export function removeUserId() {
  localStorage.removeItem('id');
}
