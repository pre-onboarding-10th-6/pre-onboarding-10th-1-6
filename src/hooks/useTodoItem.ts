import { useState, useRef } from 'react'

import { updateTodoAPI, deleteTodoAPI } from '../api/todo'
import { useTodoDispatch } from '../context/todoContext'
import { TodoActionTypes } from '../context/todoReducer'
import { Todo, SubmitButtonStatus } from '../types'

const useTodoItem = (todo: Todo) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false)

  const inputRef = useRef<HTMLInputElement>(null)

  const dispatch = useTodoDispatch()

  const handleButtonSubmit =
    (buttonType: SubmitButtonStatus) =>
    async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      if (event.target instanceof HTMLButtonElement) {
        switch (buttonType) {
          case 'SUBMIT':
            const content =
              inputRef.current !== null ? inputRef.current.value : ''
            const { data } = await updateTodoAPI(todo.id, {
              ...todo,
              todo: content
            })
            dispatch({
              type: TodoActionTypes.UPDATE_TODO,
              payload: {
                ...todo,
                todo: data.todo
              }
            })
            setIsEditMode(false)
            break
          case 'CANCEL':
            setIsEditMode(false)
            break
          case 'MODIFY':
            setIsEditMode(true)
            break
          case 'DELETE':
            await deleteTodoAPI(todo.id)
            dispatch({
              type: TodoActionTypes.REMOVE_TODO,
              payload: { id: todo.id }
            })
            break
          default:
            break
        }
      } else {
        throw new Error('data-testId 값이 변경되었는지 확인해주세요')
      }
    }

  const handleCheckChange = async () => {
    const body = {
      ...todo,
      isCompleted: !todo.isCompleted
    }
    await updateTodoAPI(todo.id, body)
    dispatch({
      type: TodoActionTypes.UPDATE_TODO,
      payload: {
        ...todo,
        isCompleted: !todo.isCompleted
      }
    })
  }

  return {
    handleCheckChange,
    handleButtonSubmit,
    isEditMode,
    inputRef
  }
}

export default useTodoItem
