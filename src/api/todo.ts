import { authInstance } from "../utils/axios"

export const requestAddTodo = (content: string) => authInstance.post('/todos',
  {
    todo: content
  }, {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
})

export const requestGetTodo = () => authInstance.get('/todos',
  {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })

export const requestDeleteTodo = (id: number) => authInstance.delete(`/todos/${id}`,
  {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })

export const requestUpdateTodo = (todo: Todo) => authInstance.put(`/todos/${todo.id}`,
  {
    todo: todo.todo,
    isCompleted: todo.isCompleted
  }, {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
})

export default {}
