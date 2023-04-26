const setAccessToken = (token: string) => {
  localStorage.setItem('access_token', JSON.stringify(token))
}

const getAccessToken = () => {
  const token = localStorage.getItem('access_token')
  if (token) {
    return true
  }
  return false
}

export { setAccessToken, getAccessToken }
