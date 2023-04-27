import React, { Dispatch, SetStateAction, useCallback } from 'react'
import useInput from '../hooks/useInput'
import { addTodo, getTodos } from '../api'
import { TodoProp } from '../types/todo'

type AddTodoProps = {
  setToDoList: Dispatch<SetStateAction<TodoProp[]>>
}

function AddTodo({ setToDoList }: AddTodoProps) {
  const [text, onChangeText, setText] = useInput<string>('')

  const onClickAdd = useCallback(
    async (text: string) => {
      try {
        const res = await addTodo(text)

        if (res.status === 201) {
          const data = await getTodos()
          setText('')
          setToDoList(data)
        }
      } catch (error) {
        alert('add to fail')
        setText('')
        console.error(error)
      }
    },
    [setToDoList]
  )

  return (
    <>
      <div className={'flex'}>
        <input
          data-testid="new-todo-input"
          value={text}
          className={
            'bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full h-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          }
          onChange={onChangeText}
        />
        <button
          className={
            'bg-primary-600 text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm w-20 text-center dark:bg-primary-500 dark:hover:bg-primary-700 dark:focus:ring-primary-800border-2 cursor-pointer  hover:bg-slate-300 active:bg-slate-500'
          }
          data-testid="new-todo-add-button"
          onClick={() => onClickAdd(text)}
        >
          추가
        </button>
      </div>
    </>
  )
}

export default AddTodo
