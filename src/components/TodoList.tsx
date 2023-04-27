import React, { useEffect, useState } from 'react'

import { getTodos, updateTodo } from '../api/todo'
import { useTodoDispatch, useTodoState } from '../context/todoContext'
import { TodoActionTypes } from '../context/todoReducer'
import { Todo } from '../interface/todo'

import TodoEdit from './TodoEdit'
import TodoItem from './TodoItem'

function TodoList() {
  const { todos } = useTodoState()
  const dispatch = useTodoDispatch()

  const [editing, setEditing] = useState<number | null>(null)
  const [error, setError] = useState('')

  const handleToggle = async ({ id, todo, isCompleted }: Todo) => {
    try {
      await updateTodo({ id, todo, isCompleted: !isCompleted })
      dispatch({
        type: TodoActionTypes.UPDATE_TODO,
        payload: { id, todo, isCompleted: !isCompleted }
      })
      setError('')
    } catch (err) {
      setError('Todo 수정 실패')
    }
  }

  const handleEdit = (id: number) => {
    setEditing(id)
  }

  const handleCancel = () => {
    setEditing(null)
  }

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const { data } = await getTodos()
        dispatch({
          type: TodoActionTypes.SET_TODOS,
          payload: { todos: data }
        })
        setError('')
      } catch (err) {
        setError('Todo 조회 실패')
      }
    }
    loadTodos()
  }, [])

  return (
    <div>
      <ul>
        {todos.map(({ id, todo, isCompleted }) => (
          <li key={id}>
            {editing === id ? (
              <TodoEdit
                id={id}
                todo={todo}
                isCompleted={isCompleted}
                handleToggle={handleToggle}
                handleCancel={handleCancel}
              />
            ) : (
              <TodoItem
                id={id}
                todo={todo}
                isCompleted={isCompleted}
                handleToggle={handleToggle}
                handleEdit={handleEdit}
              />
            )}
          </li>
        ))}
      </ul>
      {error}
    </div>
  )
}

export default TodoList
