import { useEffect, useState } from 'react'
import { redirect } from 'react-router-dom'
import { AddTodo, GetTodo } from '../../api'

import { BsPlusCircleFill } from 'react-icons/bs'
import useInputs from '../../hooks/useInputs'
import Form from '../../components/Form'
import Input from '../../components/Input'
import { getInterCeptor } from '../../utils/axios'
import { TODO_ITEM } from '../../constant/Todo'

function Todo() {
  const {
    values: { todo },
    handleChange,
    setValues
  } = useInputs({ todo: '' })
  const [todoList, setTodoList] = useState([])
  // const [todoValid, setTodoValid] = useState(true)

  //todo 불러오기
  const getTodo = () => {
    GetTodo()
      .then(res => {
        setTodoList(res.data)
      })
      .catch((err: any) => console.log(err))
  }

  //todo 추가
  const addTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    AddTodo(todo)
      .then(res => {
        if (res.status === 201) {
          getTodo()
          setValues({ todo: '' })
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    getInterCeptor()
    getTodo()
    redirect('/signin')
  }, [redirect])

  return (
    <main>
      <div className="todo-wrapper">
        <Form name="할일" onSubmit={addTodo}>
          <Input
            id="todo"
            testid="new-todo-input"
            type="text"
            name="todo"
            placeholder="할 일을 입력해주세요"
            value={todo}
            onChange={handleChange}
          />
          <button data-testid="new-todo-add-button" type="submit">
            <BsPlusCircleFill />
          </button>
        </Form>
        <ul>
          {todoList.map((item: TODO_ITEM) => (
            <div key={item.id}>
              <div>{item.todo}</div>
            </div>
          ))}
        </ul>
      </div>
    </main>
  )
}

export default Todo
