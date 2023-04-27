import React, { useState } from 'react'

import { deleteTodo } from '../api/todo'
import { useTodoDispatch } from '../context/todoContext'
import { TodoActionTypes } from '../context/todoReducer'
import { Todo } from '../interface/todo'

interface TodoItemProps extends Todo {
  handleToggle: (todo: Todo) => void
  handleEdit: (id: number) => void
}

function TodoItem({
  id,
  todo,
  isCompleted,
  handleToggle,
  handleEdit
}: TodoItemProps) {
  const dispatch = useTodoDispatch()
  const [error, setError] = useState('')

  const handleRemove = async () => {
    try {
      await deleteTodo(id)
      dispatch({ type: TodoActionTypes.REMOVE_TODO, payload: { id } })
      setError('')
    } catch (err) {
      setError('Todo 삭제 실패')
    }
  }

  return (
    <div>
      <label>
        <input
          type="checkbox"
          onChange={() => handleToggle({ id, todo, isCompleted })}
          checked={isCompleted}
        />
        <span>{todo}</span>
      </label>
      <button
        type="button"
        onClick={() => handleEdit(id)}
        data-testid="modify-button"
      >
        수정
      </button>
      <button type="button" onClick={handleRemove} data-testid="delete-button">
        삭제
      </button>
      {error}
    </div>
  )
}

export default TodoItem
