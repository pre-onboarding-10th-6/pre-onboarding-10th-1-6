import Form from '../../components/Form'
import Input from '../../components/Input'
import { useTodoState } from '../../context/todoContext'
import useTodo from '../../hooks/useTodo'

import TodoItem from './TodoItem'

function Todo() {
  const { todos } = useTodoState()
  const { handleSubmit, todoRef } = useTodo()

  return (
    <Form name={'투두 리스트'}>
      <main>
        <div>
          <form onSubmit={handleSubmit} className="flex">
            {/* <Input data-testid="new-todo-input" ref={todoRef} /> */}
            <Input
              data-tesid="new-todo-input"
              className={
                'bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full h-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              }
              ref={todoRef}
            />
            <button
              data-testid="new-todo-add-button"
              className={
                'bg-primary-600 text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm w-20 text-center dark:bg-primary-500 dark:hover:bg-primary-700 dark:focus:ring-primary-800border-2 cursor-pointer  hover:bg-slate-300 active:bg-slate-500'
              }
            >
              추가
            </button>
          </form>
        </div>

        {todos.map(todo => (
          <TodoItem todo={todo} key={todo.id} />
        ))}
      </main>
    </Form>
  )
}

export default Todo
