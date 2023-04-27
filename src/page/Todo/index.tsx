import { useEffect, useState } from 'react'
import { Navigate, redirect } from 'react-router-dom'
import { GetTodo } from '../../api'

import { BsPlusCircleFill } from 'react-icons/bs'
import useInputs from '../../hooks/useInputs'
import Form from '../../components/Form'
import Input from '../../components/Input'

function Todo() {
  const {
    values: { todo },
    handleChange
  } = useInputs({ todo: '' })
  const [todoList, setTodoList] = useState([])
  const [todos, setTodo] = useState('')
  const [todoValid, setTodoValid] = useState(true)
  const token = localStorage.getItem('token')

  //todo 불러오기
  const getTodo = () => {
    GetTodo()
      .then(res => {
        if (res.status === 201) {
          alert('회원가입 완료')
          redirect('/signin')
        }
      })
      .catch((err: any) => console.log(err))
  }

  useEffect(() => {
    getTodo()
  }, [])

  return (
    <main>
      {!token ? (
        <Navigate to="/signin" />
      ) : (
        <div className="todo-wrapper">
          <h1 className="title">Todo List</h1>
          {/* <form>
            <div className="input-wrapper">
              <input
                data-testid="new-todo-input"
                value={todos}
                onChange={handleChange}
              />
              <button
                data-testid="new-todo-add-button"
                type="submit"
                className="plus-btn"
                disabled={todoValid}
              >
                <BsPlusCircleFill />
              </button>
            </div>
          </form> */}
          <Form name="할일">
            <Input
              id="todo"
              testid="new-todo-input"
              type="text"
              name="todo"
              placeholder="할 일을 입력해주세요"
              value={todo}
              onChange={handleChange}
            />
          </Form>
          <ul></ul>
        </div>
      )}
    </main>
  )
}

export default Todo
