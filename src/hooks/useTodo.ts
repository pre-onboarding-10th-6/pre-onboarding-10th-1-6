import { useState, useEffect, useRef } from 'react'
import { getTodoAPI, createTodoAPI } from '../api/todo'
import { Todo } from '../utils/types'

function useTodo() {
  const [todos, setTodos] = useState<Todo[]>([])
  const todoRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    async function fetchTodo() {
      try {
        const res = await getTodoAPI()
        setTodos(res.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchTodo()
  }, [])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault()

      if (!todoRef.current || todoRef.current.value === '')
        throw new Error('값을 입력해주세요')

      const res = await createTodoAPI({ todo: todoRef.current.value })
      setTodos([...todos, res.data])
      todoRef.current.value = ''
    } catch (error) {
      alert(error)
    }
  }

  return { todos, setTodos, handleSubmit, todoRef }
}

export default useTodo
