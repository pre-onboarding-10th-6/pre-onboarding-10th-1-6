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

  const handleButtonSubmit = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
    try {
      if (event.target instanceof HTMLButtonElement) {
        const testId = event.target.dataset.testid
        switch (testId) {
          case 'submit-button':
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
            break
          case 'cancel-button':
            setTodoStatus({ ...todoStatus, isEditMode: false })
            break
          case 'modify-button':
            setTodoStatus({ ...todoStatus, isEditMode: true })
            break
          case 'delete-button':
            await deleteTodoAPI(todo.id)
            onDelete()
            break
          default:
            break
        }
      } else {
        throw new Error('data-testId 값이 변경되었는지 확인해주세요')
      }
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

  return {
    handleCheckChange,
    handleButtonSubmit,
    todoStatus,
    inputRef
  }
}

export default useTodoList
