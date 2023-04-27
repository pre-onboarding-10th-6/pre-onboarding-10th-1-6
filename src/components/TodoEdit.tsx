import React, { useState } from 'react'

import { updateTodo } from '../api/todo'
import { useTodoDispatch } from '../context/todoContext'
import { TodoActionTypes } from '../context/todoReducer'
import useInput from '../hooks/useInput'
import { Todo } from '../interface/todo'

interface TodoEditProps extends Todo {
  handleToggle: (todo: Todo) => void
  handleCancel: () => void
}

function TodoEdit({
  id,
  todo,
  isCompleted,
  handleToggle,
  handleCancel
}: TodoEditProps) {
  const dispatch = useTodoDispatch()
  const { value, handleChange } = useInput(todo)
  const [error, setError] = useState('')

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await updateTodo({ id, todo: value, isCompleted })
      dispatch({
        type: TodoActionTypes.UPDATE_TODO,
        payload: { id, todo: value, isCompleted }
      })
      handleCancel()
      setError('')
    } catch (err) {
      setError('Todo 수정 실패')
    }
  }

  return (
    <form onSubmit={handleSave}>
      <label>
        <input
          type="checkbox"
          onChange={() => handleToggle({ id, todo, isCompleted })}
          checked={isCompleted}
        />
        <input
          type="text"
          value={value}
          onChange={handleChange}
          data-testid="modify-input"
        />
      </label>
      <button type="submit" data-testid="submit-button">
        제출
      </button>
      <button type="button" onClick={handleCancel} data-testid="cancel-button">
        취소
      </button>
      {error}
    </form>
  )
}

export default TodoEdit
