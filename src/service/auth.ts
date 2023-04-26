import { instance } from './axios'

const postSignUp = async body => {
  await instance.post('/auth/signup', body)
}

const postSignIn = async body => {
  await instance.post('/auth/signin', body)
}

export { postSignUp, postSignIn }
