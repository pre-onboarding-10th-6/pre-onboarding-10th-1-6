// todo의 전체 list
import React from 'react'
import TodoItem from './TodoItem'
import { TodoListProps } from '../../types/types'

function TodoList({ todos, fetchTodoList }: TodoListProps) {
  return (
    <ul>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} fetchTodoList={fetchTodoList} />
      ))}
    </ul>
  )
}

export default TodoList
