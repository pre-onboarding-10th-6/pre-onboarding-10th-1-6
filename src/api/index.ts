import { AxiosResponse } from 'axios'
import { authInstance, instance } from '../utils/axios'
import { SignInResponse, StatusInResponse } from '../types/todo'

export const SignInTodo = async (
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

export const SignUpTodo = (email: string, password: string): Promise<any> =>
  authInstance.post(`/auth/signup`, {
    email,
    password
  })

export const getTodos = async () => {
  const res = await instance.get('/todos')

  return res.data
}

export const addTodo = async (
  text: string
): Promise<AxiosResponse<StatusInResponse>> => {
  try {
    const res = await instance.post('/todos', { todo: text })

    return res as AxiosResponse<StatusInResponse>
  } catch (error) {
    throw new Error('Failed to add todo')
  }
}

export const updateTodo = async (
  ...rest: any
): Promise<AxiosResponse<StatusInResponse>> => {
  try {
    const [{ id, todo, isCompleted }] = rest

    const res = await instance.put(`/todos/${id}`, { todo, isCompleted })

    return res as AxiosResponse<StatusInResponse>
  } catch (error) {
    throw new Error('Failed to update todo')
  }
}

export const deleteTodo = async (
  id: number
): Promise<AxiosResponse<StatusInResponse>> => {
  try {
    const res = await instance.delete(`/todos/${id}`)

    return res
  } catch (error) {
    throw new Error('Failed to delete todo')
  }
}
