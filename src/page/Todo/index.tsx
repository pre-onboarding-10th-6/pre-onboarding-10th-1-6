import React, { useEffect, useRef } from 'react'
import { requestAddTodo, requestGetTodo } from '../../api/todo'
import TodoItem from '../../components/TodoItem'
import useTodoContext from '../../store/todo'

function Todo() {
  const { todos, addTodo, setTodos } = useTodoContext()

  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    requestGetTodo().then(todos => {
      setTodos(todos.data)
    })
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (ref.current) {
      requestAddTodo(ref.current.value).then(todo => {
        addTodo(todo.data)
      })
      ref.current.value = ""
    }
  }

  return <main>
    <h1>Todo</h1>
    <form onSubmit={handleSubmit}>
      <input ref={ref} type="text" />
      <button type="submit">추가</button>
    </form>
    <ul>
      {todos.map(todo => <TodoItem key={todo.id} todo={todo} />)}
    </ul>
  </main>
}

export default Todo
