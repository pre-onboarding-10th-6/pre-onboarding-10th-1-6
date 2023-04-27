import React, { useEffect } from 'react'
import TodoLayout from './TodoLayout'
import TodoList from './TodoList'
import AddTodo from './AddTodo'
import useTodo from '../../hooks/useTodo'

function Todo() {
  const { todos, fetchTodoList } = useTodo()

  useEffect(() => {
    fetchTodoList()
  }, [fetchTodoList])

  return (
    <TodoLayout>
      <AddTodo fetchTodoList={fetchTodoList} />
      <TodoList todos={todos} fetchTodoList={fetchTodoList} />
    </TodoLayout>
  )
}

export default Todo
