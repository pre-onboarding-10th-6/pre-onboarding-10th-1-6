import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { TodoContextProvider } from './store/todo'

const Home = lazy(() => import('./page/Home'))
const SignIn = lazy(() => import('./page/SignIn'))
const SignUp = lazy(() => import('./page/SignUp'))
const Todo = lazy(() => import('./page/Todo'))

function App() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/todo" element={
              <TodoContextProvider>
                <Todo />
              </TodoContextProvider>
            } />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  )
}

export default App
