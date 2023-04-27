import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import TodoCreate from '../../components/TodoCreate'
import TodoList from '../../components/TodoList'
import { TodoProvider } from '../../context/todoContext'

function Todo() {
  const navigate = useNavigate()

  // 토큰 여부에 따라 Todo page에 오기 전에 바로 접근 차단할 수 있는지 확인 필요
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token === null) {
      navigate('/')
    }
  }, [navigate])

  return (
    <main>
      <h1>Todo</h1>
      <TodoProvider>
        <TodoCreate />
        <TodoList />
      </TodoProvider>
    </main>
  )
}

export default Todo
