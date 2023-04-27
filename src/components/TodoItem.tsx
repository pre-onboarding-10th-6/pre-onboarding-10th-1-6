import React, { useCallback, useState } from 'react'
import { GoTrashcan, GoPencil, GoX } from 'react-icons/go'
import { TODO_ITEM_PROPS } from '../constant/Todo'
import Input from './Input'

function TodoItem({ todos, editTodo, deleteTodo }: TODO_ITEM_PROPS) {
  const { id, todo, isCompleted } = todos
  const [modifyMode, setModifyMode] = useState(false)
  const [updateVal, setUpdateVal] = useState('')

  const checkToggle = () => {
    editTodo(id, todo, !isCompleted)
  }

  const inputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateVal(e.target.value)
  }, [])

  const submitButton = () => {
    updateVal === ''
      ? editTodo(id, todo, isCompleted)
      : editTodo(id, updateVal, isCompleted)
    setModifyMode(false)
  }
  return (
    <main>
      {modifyMode ? (
        <li>
          <label>
            <input
              type="checkbox"
              id="checkbox"
              onChange={checkToggle}
              checked={isCompleted}
            />
            <Input
              testid="modify-input"
              defaultValue={todo}
              type="text"
              name="todoInput"
              onChange={inputChange}
            />
          </label>
          <button
            data-testid="submit-button"
            className="submit-btn"
            onClick={submitButton}
          >
            <GoPencil />
          </button>
          <button
            data-testid="cancel-button"
            className="close-btn"
            onClick={() => setModifyMode(false)}
          >
            <GoX />
          </button>
        </li>
      ) : (
        <li>
          <label>
            <input
              type="checkbox"
              className="checkbox"
              onChange={checkToggle}
              checked={isCompleted}
            />
            <span className={isCompleted ? 'done' : ''}>{todo}</span>
          </label>
          <button
            data-testid="modify-button"
            className="modify-btn"
            onClick={() => setModifyMode(true)}
          >
            <GoPencil />
          </button>
          <button
            data-testid="delete-button"
            className="delete-btn"
            onClick={() => deleteTodo(id)}
          >
            <GoTrashcan />
          </button>
        </li>
      )}
    </main>
  )
}

export default TodoItem
