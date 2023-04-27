const validation = (email: string, password: string) => {
  const emailRegEx = /@/
  const pwdRegEx = /^.{8,}$/
  if (emailRegEx.test(email) && pwdRegEx.test(password)) {
    return true
  }
  return false
}

export default validation
