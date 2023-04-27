import { AxiosResponse } from 'axios'

import { Todo, UpdateTodo } from '../types'

import { todoInstance } from '.'

export const createTodoAPI = (body: {
  todo: string
}): Promise<AxiosResponse<Todo>> => todoInstance.post('/todos', body)

export const getTodoAPI = (): Promise<AxiosResponse<Todo[]>> =>
  todoInstance.get('/todos')

export const updateTodoAPI = (
  id: number,
  body: UpdateTodo
): Promise<AxiosResponse<Todo>> => todoInstance.put(`/todos/${id}`, body)

export const deleteTodoAPI = (id: number) => todoInstance.delete(`/todos/${id}`)
