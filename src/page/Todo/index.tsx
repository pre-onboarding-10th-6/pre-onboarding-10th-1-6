import Input from '../../components/Input'
import { useTodoState } from '../../context/todoContext'
import useTodo from '../../hooks/useTodo'

import TodoItem from './TodoItem'

function Todo() {
  const { todos } = useTodoState()
  const { handleSubmit, todoRef } = useTodo()

  return (
    <main>
      <div>
        <form onSubmit={handleSubmit}>
          <Input data-testid="new-todo-input" ref={todoRef} />
          {/* <input data-tesid="new-todo-input" ref={todoRef} /> */}
          <button data-testid="new-todo-add-button">추가</button>
        </form>
      </div>

      <div>
        {todos.map(todo => (
          <TodoItem todo={todo} key={todo.id} />
        ))}
      </div>
    </main>
  )
}

export default Todo
