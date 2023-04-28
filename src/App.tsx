import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import AuthRoute from './AuthRoute'
import ProtectedRoute from './ProtectedRoute'

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
            <Route
              path="/*"
              element={
                <AuthRoute>
                  <Routes>
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="*" element={<Navigate to="/" />} />
                  </Routes>
                </AuthRoute>
              }
            />

            <Route
              path="/todo/*"
              element={
                <ProtectedRoute>
                  <Routes>
                    <Route index element={<Todo />} />
                  </Routes>
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  )
}

export default App
