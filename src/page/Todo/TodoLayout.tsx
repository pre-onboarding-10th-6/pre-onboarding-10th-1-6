import React from 'react'
import { TodoLayoutProps } from '../../types/types'

function TodoLayout({ children }: TodoLayoutProps) {
  return (
    <main>
      <header>
        <h1>TodoList</h1>
      </header>
      <section>{children}</section>
    </main>
  )
}

export default TodoLayout
