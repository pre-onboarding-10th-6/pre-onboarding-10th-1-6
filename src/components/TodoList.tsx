import React, { Dispatch, SetStateAction, useCallback, useState } from 'react'
import useInput from '../hooks/useInput'
import { getTodos, updateTodo, deleteTodo } from '../api'
import { TodoProp } from '../types/todo'

type ListTodoProp = {
  list: TodoProp
  setToDoList: Dispatch<SetStateAction<TodoProp[]>>
}

function TodoList({ list, setToDoList }: ListTodoProp) {
  const [updateId, setUpdateId] = useState<number | null>(null)
  const [updateInput, onChangeUpdateInput, setUpdateInput] =
    useInput<string>('')

  const onClickUpdateText = useCallback((id: number | null, text: string) => {
    if (id === null) {
      setUpdateId(null)
      setUpdateInput('')
    } else {
      setUpdateId(id)
      setUpdateInput(text)
    }
  }, [])

  const onClickUpdate = useCallback(async (...rest: any) => {
    try {
      const res = await updateTodo(...rest)
      if (res.status === 200) {
        const data = await getTodos()
        setToDoList(data)
        setUpdateId(null)
        setUpdateInput('')
      }
    } catch (error) {
      alert('add to fail')
      setUpdateId(null)
      setUpdateInput('')
      console.error(error)
    }
  }, [])

  const onClickDelete = useCallback(async (id: number) => {
    const res = await deleteTodo(id)
    if (res.status === 204) {
      const data = await getTodos()
      setToDoList(data)
    } else {
      alert('삭제실패')
    }
  }, [])

  return (
    <>
      <li className={'flex m-3'}>
        <>
          <label className={'w-full align-middle'}>
            <input
              type="checkbox"
              checked={list?.isCompleted}
              className={
                'default:ring-1 w-4 h-4 rounded checked:bg-blue-500 mx-1 cursor-pointer'
              }
              onChange={() =>
                onClickUpdate({
                  ...list,
                  isCompleted: !list.isCompleted
                })
              }
            />
            {updateId === list?.id ? (
              <input
                type="text"
                data-testid="modify-input"
                value={updateInput}
                className={
                  'bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-10/12 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                }
                onChange={onChangeUpdateInput}
              />
            ) : (
              <span className={'text-black sm:text-base w-10'}>
                {list?.todo}
              </span>
            )}
          </label>
          <button
            data-testid={
              updateId === list?.id ? 'submit-button' : 'modify-button'
            }
            className={
              'm-1 text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm w-20 text-center bg-green-700 dark:bg-green-700 dark:hover:bg-green-900 dark:focus:ring-primary-800border-2 cursor-pointer  hover:bg-slate-300 active:bg-slate-500'
            }
            onClick={() => {
              if (updateId === list?.id) {
                onClickUpdate({ ...list, todo: updateInput })
              } else {
                onClickUpdateText(list.id, list.todo)
              }
            }}
          >
            {updateId === list?.id ? '제출' : '수정'}
          </button>
          <button
            data-testid={
              updateId === list?.id ? 'cancle-button' : 'delete-button'
            }
            className={
              'm-1 text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm w-20 text-center bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-800 dark:focus:ring-primary-800border-2 cursor-pointer  hover:bg-slate-300 active:bg-slate-500'
            }
            onClick={() => {
              if (updateId === list.id) {
                onClickUpdateText(null, '')
              } else {
                onClickDelete(list.id)
              }
            }}
          >
            {updateId === list?.id ? '취소' : '삭제'}
          </button>
        </>
      </li>
    </>
  )
}

export default TodoList
