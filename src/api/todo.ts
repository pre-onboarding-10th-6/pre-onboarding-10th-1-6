import { Todo } from '../interface/todo'

import { authInstance } from './axios'

const createTodo = (todo: string): Promise<any> =>
  authInstance.post('/todos', { todo })

const getTodos = (): Promise<any> => authInstance.get('/todos')

const updateTodo = ({ id, todo, isCompleted }: Todo) =>
  authInstance.put(`/todos/${id}`, { todo, isCompleted })

const deleteTodo = (id: number) => authInstance.delete(`/todos/${id}`)

export { createTodo, getTodos, updateTodo, deleteTodo }
