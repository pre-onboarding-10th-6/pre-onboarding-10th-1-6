import React, { useEffect, useRef } from 'react'

import { getTodoAPI, createTodoAPI } from '../api/todo'
import { useTodoDispatch } from '../context/todoContext'
import { TodoActionTypes } from '../context/todoReducer'

function useTodo() {
  const dispatch = useTodoDispatch()
  const todoRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    async function fetchTodo() {
      const { data } = await getTodoAPI()
      dispatch({
        type: TodoActionTypes.SET_TODOS,
        payload: { todos: data }
      })
    }
    fetchTodo()
  }, [])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!todoRef.current || todoRef.current.value === '')
      throw new Error('값을 입력해주세요')

    const { data: newTodo } = await createTodoAPI({
      todo: todoRef.current.value
    })

    dispatch({
      type: TodoActionTypes.ADD_TODO,
      payload: newTodo
    })

    todoRef.current.value = ''
  }

  return { handleSubmit, todoRef }
}

export default useTodo
