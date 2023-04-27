import React, { useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Form from '../../components/Form'

function Home() {
  const token = localStorage.getItem('token')
  const style =
    'w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
  const navigate = useNavigate()

  const onClickLogout = useCallback(() => {
    localStorage.removeItem('token')
    return navigate('/')
  }, [navigate])

  return token ? (
    <Form name="환영합니다!">
      <div>
        <Link to="/todo">
          <button type="button" className={style}>
            Todo 리스트
          </button>
        </Link>
      </div>
      <button type="button" onClick={() => onClickLogout()} className={style}>
        로그아웃
      </button>
    </Form>
  ) : (
    <Form name="환영합니다!">
      <div>
        <Link to="/signin">
          <button type="button" className={style}>
            로그인{' '}
          </button>
        </Link>
      </div>
      <div>
        <Link to="/signup">
          <button type="button" className={style}>
            회원가입
          </button>
        </Link>
      </div>
    </Form>
  )
}

export default Home
