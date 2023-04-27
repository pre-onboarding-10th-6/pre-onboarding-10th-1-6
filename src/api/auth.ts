import { AxiosResponse } from 'axios'

import { SignInResponse } from '../types'

import { authInstance } from '.'

export const signInTodo = async (
  email: string,
  password: string
): Promise<AxiosResponse<SignInResponse>> => {
  try {
    const res = await authInstance.post<SignInResponse>('/auth/signin', {
      email,
      password
    })
    return res
  } catch (error) {
    throw error
  }
}

export const signUpTodo = (email: string, password: string) =>
  authInstance.post(`/auth/signup`, {
    email,
    password
  })
