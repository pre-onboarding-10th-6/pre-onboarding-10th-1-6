import { authInstance } from '../utils/axios'
import { TodoInput } from '../types/types'

export const createTodoApi = async (todoContent: TodoInput) => {
  const response = await authInstance.post(`/todos`, todoContent)
  return response.data
}

export const getTodosApi = async () => {
  const response = await authInstance.get(`/todos`)
  return response.data
}

export const updateTodoApi = async (todoId: number, body: TodoInput) => {
  const response = await authInstance.put(`/todos/${todoId}`, body)
  return response.data
}

export const deleteTodoApi = async (todoId: number) => {
  const response = await authInstance.delete(`/todos/${todoId}`)
  return response.data
}
