import { useState, useCallback, useEffect } from 'react'
import {
  getTodosApi,
  createTodoApi,
  updateTodoApi,
  deleteTodoApi
} from '../api/todoApi'
import {
  Todo,
  TodoInput,
  GetTodosResponse,
  CreateTodoResponse,
  UpdateTodoResponse,
  DeleteTodoResponse
} from '../types/types'

function useTodo() {
  const [todos, setTodos] = useState<Todo[]>([])

  const fetchTodoList = useCallback(async () => {
    const response = await (getTodosApi() as GetTodosResponse)
    setTodos(response)
  }, [setTodos])

  const createTodo = async (
    todoContent: TodoInput
  ): Promise<CreateTodoResponse> => {
    const response = await createTodoApi(todoContent)
    setTodos(prevTodos => [...prevTodos, response])
    return response
  }

  const updateTodo = async (
    todoId: number,
    body: TodoInput
  ): Promise<UpdateTodoResponse> => {
    const response = await updateTodoApi(todoId, body)
    // Id 일치 여부 확인 후 todo 교체
    setTodos(prevTodos =>
      prevTodos.map(todo => (todo.id === todoId ? response : todo))
    )
    return response
  }

  const deleteTodo = async (todoId: number): Promise<DeleteTodoResponse> => {
    const response = await deleteTodoApi(todoId)
    // 요청하는 ID와 일치하는 todo를 todos 에서 삭제
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== todoId))
    return response
  }

  useEffect(() => {
    fetchTodoList()
  }, [])

  return { todos, setTodos, createTodo, updateTodo, deleteTodo, fetchTodoList }
}

export default useTodo
