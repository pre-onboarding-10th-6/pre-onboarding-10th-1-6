import React, { useState } from 'react'
import useTodo from '../../hooks/useTodo'
import { TodoItemProps } from '../../types/types'

function TodoItem({ todo, fetchTodoList }: TodoItemProps) {
  const { updateTodo, deleteTodo } = useTodo()
  const [isModify, setIsModify] = useState(false)
  const [modifiedTodo, setModifiedTodo] = useState(todo.todo)
  const [isTodoCompleted, setIsTodoCompleted] = useState(todo.isCompleted)

  const clickModifyButton = () => {
    setIsModify(true)
  }

  const handleUpdateTodo = async (newTodo: string, newIsCompleted: boolean) => {
    const updateBody = {
      todo: newTodo,
      isCompleted: newIsCompleted
    }
    return await updateTodo(todo.id, updateBody)
  }
  const clickTodoCompleted = async () => {
    setIsTodoCompleted(!isTodoCompleted)
    await handleUpdateTodo(modifiedTodo, !isTodoCompleted)
  }

  const submitModifiedTodo = async () => {
    const updatedTodo = await handleUpdateTodo(modifiedTodo, isTodoCompleted)
    setIsModify(false)
    setIsTodoCompleted(updatedTodo.isCompleted)
    setModifiedTodo(updatedTodo.todo)
    fetchTodoList()
  }

  const cancelModifyTodo = () => {
    setIsModify(false)
    setModifiedTodo(todo.todo)
  }

  const clickDeleteButton = async () => {
    await deleteTodo(todo.id)
    fetchTodoList()
  }

  return (
    <>
      <li key={todo.id}>
        <label>
          <input
            type="checkbox"
            id={todo.id.toString()}
            value={'isCompleted'}
            checked={isTodoCompleted}
            onChange={() => {
              clickTodoCompleted()
            }}
          />
          {isModify || <span>{todo.todo}</span>}
        </label>
      </li>
      {isModify ? (
        <>
          <input
            id={todo.id.toString()}
            data-testid="modify-input"
            value={modifiedTodo}
            onChange={e => setModifiedTodo(e.target.value)}
          />
          <div>
            <button data-testid="submit-button" onClick={submitModifiedTodo}>
              제출
            </button>
            <button data-testid="cancel-button" onClick={cancelModifyTodo}>
              취소
            </button>
          </div>
        </>
      ) : (
        <>
          <div>
            <button data-testid="modify-button" onClick={clickModifyButton}>
              수정
            </button>
            <button data-testid="delete-button" onClick={clickDeleteButton}>
              삭제
            </button>
          </div>
        </>
      )}
    </>
  )
}

export default TodoItem
