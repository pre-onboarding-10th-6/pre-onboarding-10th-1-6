import React from 'react'
import useTodo from '../../hooks/useTodo'
import TodoList from './TodoList'

function Todo() {
  const { todos, handleSubmit, todoRef, setTodos } = useTodo()

  return (
    <main>
      <div>
        <form onSubmit={handleSubmit}>
          <input data-testid="new-todo-input" ref={todoRef} />
          <button data-testid="new-todo-add-button">추가</button>
        </form>
      </div>

      <div>
        {todos.map((todo: any) => (
          <TodoList
            todo={todo}
            key={todo.id}
            onDelete={() => {
              setTodos(todos.filter((list: any) => list.id !== todo.id))
            }}
          />
        ))}
      </div>
    </main>
  )
}

export default Todo
