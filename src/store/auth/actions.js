export function login(user) {
  return {
    type: 'LOGIN',
    payload: user,
  };
}

export function logout() {
  return {
    type: 'LOGOUT',
  };
}

export function register(user) {
  return {
    type: 'REGISTER',
    payload: user,
  };
}

export function addCommentAndRating(user) {
  return {
    type: 'ADD_REVIEW',
    payload: user,
  };
}
