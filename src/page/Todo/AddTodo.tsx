import React, { useState, ChangeEvent, FormEvent } from 'react'
import useTodo from '../../hooks/useTodo'

interface AddTodoProps {
  fetchTodoList: () => Promise<void>
}

function AddTodo({ fetchTodoList }: AddTodoProps) {
  const { createTodo } = useTodo()
  const [todoInput, setTodoInput] = useState('')

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTodoInput(e.target.value)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // error 처리를 interceptor에서 한다면 try-catch는 필요없음
    try {
      await createTodo({ todo: todoInput })
      setTodoInput('')
      fetchTodoList()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="addTodo"></label>
      <input
        type="text"
        id="addTodo"
        name="addTodo"
        data-testid="new-todo-input"
        placeholder="추가할 할 일을 적어주세요"
        value={todoInput}
        onChange={handleInputChange}
      ></input>
      <button type="submit" data-testid="new-todo-add-button">
        추가
      </button>
    </form>
  )
}

export default AddTodo
