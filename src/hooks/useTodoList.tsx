import { useState, useRef } from 'react'
import { updateTodoAPI, deleteTodoAPI } from '../api/todo'
import { Todo, TodoStatus } from '../utils/types'

const useTodoList = (todo: Todo, onDelete: () => void) => {
  const [todoStatus, setTodoStatus] = useState<TodoStatus>({
    isEditMode: false,
    isChecked: todo.isCompleted,
    value: todo.todo
  })
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmitUpdate = async () => {
    try {
      const body = {
        todo: inputRef.current !== null ? inputRef.current.value : '',
        isCompleted: todoStatus.isChecked
      }
      await updateTodoAPI(todo.id, body)
      setTodoStatus({
        ...todoStatus,
        isEditMode: false,
        value: inputRef.current !== null ? inputRef.current.value : ''
      })
    } catch (error) {
      console.error(error)
    }
  }

  const handleEditMode = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (event.target instanceof HTMLButtonElement) {
      const testId = event.target.dataset.testid
      if (!testId) throw new Error('data-testId 값이 변경되었는지 확인해주세요')
      setTodoStatus({
        ...todoStatus,
        isEditMode: testId === 'cancel-button' ? false : true
      })
    }
  }

  const handleDelete = async () => {
    try {
      await deleteTodoAPI(todo.id)
      onDelete()
    } catch (error) {
      console.error(error)
    }
  }

  const handleCheckChange = async () => {
    try {
      const body = {
        todo: todoStatus.value,
        isCompleted: !todoStatus.isChecked
      }
      await updateTodoAPI(todo.id, body)
      setTodoStatus({
        ...todoStatus,
        isChecked: !todoStatus.isChecked
      })
    } catch (error) {
      console.log(error)
    }
  }

  const MutateButtons = () => {
    return (
      <>
        {todoStatus.isEditMode ? (
          <>
            <button data-testid="submit-button" onClick={handleSubmitUpdate}>
              제출
            </button>
            <button data-testid="cancel-button" onClick={handleEditMode}>
              취소
            </button>
          </>
        ) : (
          <>
            <button data-testid="modify-button" onClick={handleEditMode}>
              수정
            </button>
            <button data-testid="delete-button" onClick={handleDelete}>
              삭제
            </button>
          </>
        )}
      </>
    )
  }

  return {
    MutateButtons,
    handleCheckChange,
    todoStatus,
    inputRef
  }
}

export default useTodoList
