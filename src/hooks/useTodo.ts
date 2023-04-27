import { useState, useEffect, useRef } from 'react'
import { getTodoAPI, createTodoAPI } from '../api/todo'

function useTodo() {
  const [todos, setTodos] = useState<any>([])
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
      if (!todoRef.current) throw new Error('인풋이 초기화되지 않았습니다')
      event.preventDefault()
      const body = {
        todo: todoRef.current.value
      }
      const res = await createTodoAPI(body)
      setTodos([...todos, res.data])
      todoRef.current.value = ''
    } catch (error) {
      console.error(error)
    }
  }

  return { todos, setTodos, handleSubmit, todoRef }
}

export default useTodo
