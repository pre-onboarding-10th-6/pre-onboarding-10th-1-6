import { authInstance, getInterCeptor } from '../utils/axios'

type TodoRequest = string

getInterCeptor()

export const createTodo = async (todosValue: TodoRequest) => {
  try {
    await authInstance.post(`/todos`, { todo: todosValue })
  } catch (e) {
    console.log(e)
  }
}

export const getTodos = async () => {
  try {
    const getTodosRes = await authInstance.get(`/todos`)
    return getTodosRes.data
  } catch (e) {
    console.log(e)
  }
}

interface UpdateRequest {
  id: number
  todo: string
  isCompleted: boolean
}

export const updateTodo = async (args: UpdateRequest) => {
  try {
    await authInstance.put(`todos/${args.id}`, args)
  } catch (e) {
    console.log(e)
  }
}

export const deleteTodo = async (id: number) => {
  try {
    await authInstance.delete(`/todos/${id}`)
  } catch (e) {
    console.log(e)
  }
}
