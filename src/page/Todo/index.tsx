import { createTodo, getTodos, updateTodo, deleteTodo } from '../../api/todos'
import React, { useEffect, useState, useRef, useCallback } from 'react'

export interface Todos {
  id: number
  isCompleted: boolean
  todo: string
  userId: number
  isEdit?: boolean
}

export default function Todo() {
  const [todos, setTodos] = useState<Todos[]>([])
  const todoInputRef = useRef<HTMLInputElement>(null)
  const token = localStorage.getItem('token')

  const todoSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    await createTodo(formData.get('task') as string)

    if (todoInputRef.current) {
      todoInputRef.current.value = ''
    }
    await getTodoDataUpdate()
  }

  interface CompleteButtonRequest {
    id: number
    todo: string
    isCompleted: boolean
  }

  const completeButtonHandler = async (args: CompleteButtonRequest) => {
    await updateTodo({
      id: args.id,
      todo: args.todo,
      isCompleted: args.isCompleted
    })
    const updateResult = todos.map(element =>
      element.id === args.id
        ? { ...element, isCompleted: args.isCompleted }
        : element
    )
    setTodos(updateResult)
  }

  const deleteTodoButtonHandler = async (id: number) => {
    await deleteTodo(id)
    await getTodoDataUpdate()
  }

  const updateTodoButtonHandler = (specificIndex: number) => {
    const updateTodo = todos.map((item, index) =>
      index === specificIndex ? { ...item, isEdit: true } : item
    )
    setTodos(updateTodo)
  }

  const cancelUpdateButtonHandler = (specificIndex: number) => {
    const updateTodo = todos.map((item, index) =>
      index === specificIndex && item.isEdit ? { ...item, isEdit: false } : item
    )
    setTodos(updateTodo)
  }

  const updateTodoSubmitButtonHandler = async (
    e: React.FormEvent<HTMLFormElement>,
    id: number,
    isCompleted: boolean,
    index: number
  ) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    await updateTodo({
      id,
      todo: formData.get('update-todo-input') as string,
      isCompleted: isCompleted
    })
    cancelUpdateButtonHandler(index)
    await getTodoDataUpdate()
  }

  const getTodoDataUpdate = useCallback(async () => {
    const getTodosResult = await getTodos()
    setTodos(getTodosResult)
  }, [setTodos])

  // 처음에 todo data 렌더링 해오기
  useEffect(() => {
    const getTodoData = async () => {
      const getTodosResult = await getTodos()
      setTodos(getTodosResult)
    }
    if (token && todos.length === 0) {
      getTodoData()
    }
  }, [])

  return (
    <div className="page-wrapper">
      <header className="page-header">
        <h1 className="page-title">To Do</h1>
      </header>
      {token !== null ? (
        <main>
          <form className={'flex'} onSubmit={todoSubmitHandler}>
            <input
              type="text"
              className={
                'bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full h-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              }
              name="task"
              ref={todoInputRef}
              data-testid="new-todo-input"
            />
            <button
              type="submit"
              className={
                'bg-blue-800 text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm w-20 text-center dark:bg-primary-500 dark:hover:bg-primary-700 dark:focus:ring-primary-800border-2 cursor-pointer  hover:bg-slate-300 active:bg-slate-500'
              }
              data-testid="new-todo-add-button"
            >
              추가
            </button>
          </form>
          <ul>
            {todos &&
              todos.map((element, index) => {
                return (
                  <li
                    key={element.id}
                    className={
                      element.isEdit
                        ? 'flex row items-center  w-full py-1 px-4 my-1 rounded border bg-gray-100 text-gray-600'
                        : 'flex row items-center  w-full py-1 px-4 my-1 rounded border bg-gray-100 text-gray-600'
                    }
                  >
                    <label>
                      <label htmlFor="todo-check">
                        {element.isCompleted ? '💖' : '🖤'}
                      </label>
                      <input
                        type="checkbox"
                        id="todo-check"
                        className={'invisible'}
                        onClick={(e: React.MouseEvent<HTMLInputElement>) =>
                          completeButtonHandler({
                            id: element.id,
                            todo: element.todo,
                            isCompleted: e.currentTarget.checked
                          })
                        }
                      />
                      {element.isEdit ? null : <span>{element.todo}</span>}
                    </label>
                    {element.isEdit ? (
                      <form
                        onSubmit={e => {
                          updateTodoSubmitButtonHandler(
                            e,
                            element.id,
                            element.isCompleted,
                            index
                          )
                        }}
                      >
                        <input
                          type="text"
                          defaultValue={element.todo}
                          name="update-todo-input"
                          data-testid="modify-input"
                        />
                        <button type="submit" data-testid="submit-button">
                          제출
                        </button>
                        <button
                          type="button"
                          data-testid="cancel-button"
                          onClick={() => {
                            cancelUpdateButtonHandler(index)
                          }}
                        >
                          취소
                        </button>
                      </form>
                    ) : (
                      <>
                        <button
                          type="button"
                          className="todo-submit-button"
                          data-testid="modify-button"
                          onClick={() => {
                            updateTodoButtonHandler(index)
                          }}
                        >
                          수정
                        </button>
                        <button
                          type="button"
                          className="todo-submit-button"
                          data-testid="delete-button"
                          onClick={() => {
                            deleteTodoButtonHandler(element.id)
                          }}
                        >
                          삭제
                        </button>
                      </>
                    )}
                  </li>
                )
              })}
          </ul>
        </main>
      ) : (
        <p> 로그인을 해주세요.</p>
      )}
    </div>
  )
}
