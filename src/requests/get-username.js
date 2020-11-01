export function getUsername() {
  const username = localStorage.getItem('username')
  if (username) {
    if (username.length > 0) {
      return username
    }
  }
  return undefined
}

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem('user'))
}
