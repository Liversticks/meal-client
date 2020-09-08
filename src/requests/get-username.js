export default function getUsername() {
  const username = localStorage.getItem('username')
  if (username.length > 0) {
    return username
  } else {
    return undefined
  }
}
