export function getUsername() {
  const username = localStorage.getItem('username')
  if (username.length > 0) {
    return username
  } else {
    return undefined
  }
}

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem('user'))
}
