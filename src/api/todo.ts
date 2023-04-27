import { todoInstance } from '../utils/axios'

export const createTodoAPI = (body: any) => todoInstance.post('/todos', body)

export const getTodoAPI = () => todoInstance.get('/todos')

export const updateTodoAPI = (id: any, body: any) =>
  todoInstance.put(`/todos/${id}`, body)

export const deleteTodoAPI = (id: any) => todoInstance.delete(`/todos/${id}`)
