import React, { useEffect, useState } from 'react'
import Form from '../../components/Form'
import AddTodo from '../../components/AddTodo'
import { TodoProp } from '../../types/todo'
import TodoList from '../../components/TodoList'
import { redirect } from 'react-router-dom'
import { getTodos } from '../../api'

function Todo() {
  const [todoList, setToDoList] = useState<TodoProp[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const token: string | null = localStorage.getItem('token')
      if (!token) {
        redirect('/signin')
      } else {
        const data = await getTodos()
        setToDoList(data)
      }
    }
    fetchData()
  }, [setToDoList])

  return (
    <>
      <Form name="Todo List">
        <AddTodo setToDoList={setToDoList} />
        <ul>
          {todoList.map((tl, idx) => (
            <TodoList key={tl.id} list={tl} setToDoList={setToDoList} />
          ))}
        </ul>
      </Form>
    </>
  )
}

export default Todo
