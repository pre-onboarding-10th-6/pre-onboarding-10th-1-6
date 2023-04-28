import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

const Home = lazy(() => import('./page/Home'))
const SignIn = lazy(() => import('./page/SignIn'))
const SignUp = lazy(() => import('./page/SignUp'))
const Todo = lazy(() => import('./page/Todo'))

function App() {
  const isAuthenticated = localStorage.getItem('token')
  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/signin"
              element={isAuthenticated ? <Navigate to="/todo" /> : <SignIn />}
            />
            <Route
              path="/signup"
              element={isAuthenticated ? <Navigate to="/todo" /> : <SignUp />}
            />
            <Route
              path="/todo/*"
              element={isAuthenticated ? <Todo /> : <Navigate to="/signin" />}
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  )
}

export default App
