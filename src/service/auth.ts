import { setAccessToken } from '../util/localStorage'
import instance from './axios'

const postSignUp = async (body: any) => {
  await instance.post('/auth/signup', body)
}

const postSignIn = async (body: any) => {
  const { data } = await instance.post('/auth/signin', body)
  setAccessToken(data.access_token)
}

export { postSignUp, postSignIn }
