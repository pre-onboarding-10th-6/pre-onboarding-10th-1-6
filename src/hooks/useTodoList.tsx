import { useState, useRef } from 'react'
import { updateTodoAPI, deleteTodoAPI } from '../api/todo'

const useTodoList = (onDelete: any, todo: any) => {
  const [todoStatus, setTodoStatus] = useState<any>({
    isEditMode: false,
    isChecked: todo.isCompleted,
    value: todo.todo
  })
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmitUpdate = async () => {
    const body = {
      todo: inputRef.current !== null && inputRef.current.value,
      isCompleted: todoStatus.isChecked
    }
    await updateTodoAPI(todo.id, body)
    setTodoStatus({
      ...todoStatus,
      isEditMode: false,
      value: inputRef.current !== null && inputRef.current.value
    })
  }

  const handleCancel = () => {
    setTodoStatus({
      ...todoStatus,
      isEditMode: false
    })
  }

  const handleModify = () => {
    setTodoStatus({
      ...todoStatus,
      isEditMode: true
    })
  }

  const handleDelete = async () => {
    await deleteTodoAPI(todo.id)
    onDelete()
  }

  const handleCheckChange = async () => {
    // isEditMode가 아닐 땐 ref가 없으므로, value 사용
    const body = {
      todo: todoStatus.value,
      isCompleted: !todoStatus.isChecked
    }
    await updateTodoAPI(todo.id, body)
    setTodoStatus({
      ...todoStatus,
      isChecked: !todoStatus.isChecked
    })
  }

  const MutateButtons = () => {
    console.log(todoStatus)
    return (
      <>
        {todoStatus.isEditMode ? (
          <>
            <button data-testid="submit-button" onClick={handleSubmitUpdate}>
              제출
            </button>
            <button data-testid="cancel-button" onClick={handleCancel}>
              취소
            </button>
          </>
        ) : (
          <>
            <button data-testid="modify-button" onClick={handleModify}>
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
