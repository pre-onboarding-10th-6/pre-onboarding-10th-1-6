import useTodo from '../../hooks/useTodo'
import TodoList from './TodoList'

function Todo() {
  const { todos, setTodos, handleSubmit, todoRef } = useTodo()

  // useTodo 컴포넌트로 나눈 이유 : 복잡도를 낮추기 위한 분리
  // 재사용을 위해 분리하는 방법은??
  return (
    <main>
      <div>
        <form onSubmit={handleSubmit}>
          <input data-testid="new-todo-input" ref={todoRef} />
          <button data-testid="new-todo-add-button">추가</button>
        </form>
      </div>

      <div>
        {todos.map(todo => (
          <TodoList
            todo={todo}
            key={todo.id}
            onDelete={() => setTodos(todos.filter(list => list.id !== todo.id))}
          />
        ))}
      </div>
    </main>
  )
}

export default Todo
