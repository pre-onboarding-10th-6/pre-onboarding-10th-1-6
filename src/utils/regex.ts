export const regEx = (email: string, password: string) => {
  const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  const pwdRegEx = /^.{8,}$/
  if (emailRegEx.test(email) && pwdRegEx.test(password)) {
    return true
  }
  return false
}

export const todoRegEx = (todo: string) => {
  const spaceCheck = todo.replace(/^\s+|\s+$/gm, '')
  if (!!spaceCheck && (todo.length !== 0 || !!todo)) {
    return false
  } else {
    return true
  }
}
