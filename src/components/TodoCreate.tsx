import React, { useState } from 'react'

import { createTodo } from '../api/todo'
import { useTodoDispatch } from '../context/todoContext'
import { TodoActionTypes } from '../context/todoReducer'
import useInput from '../hooks/useInput'

function TodoCreate() {
  const dispatch = useTodoDispatch()
  const { value, handleChange, reset } = useInput('')
  const [error, setError] = useState('')

  const handleAddTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const { data: newTodo } = await createTodo(value)
      dispatch({ type: TodoActionTypes.ADD_TODO, payload: newTodo })
      reset()
      setError('')
    } catch (err) {
      setError('Todo 생성 실패')
    }
  }

  return (
    <form onSubmit={handleAddTodo}>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        data-testid="new-todo-input"
      />
      <button type="submit" data-testid="new-todo-add-button">
        추가
      </button>
      {error}
    </form>
  )
}

export default TodoCreate
