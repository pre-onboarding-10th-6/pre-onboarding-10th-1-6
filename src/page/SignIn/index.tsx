import React, { useCallback, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import useInput from '../../hooks/useInput'
import { SignInTodo } from '../../api'
import Form from '../../components/Form'
import Input from '../../components/Input'
import validation from '../../utils/validation'

function SignIn() {
  const [email, onChangeEmail] = useInput('')
  const [password, onChangePassWord] = useInput('')
  const redirect = useNavigate()

  const onClickLogin = useCallback(
    async (...args: [string, string]) => {
      try {
        const token = await SignInTodo(args[0], args[1])
        localStorage.setItem('token', token)

        redirect('/todo')
      } catch (err) {
        alert('로그인 실패')
      }
    },
    [redirect]
  )

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      redirect('/todo')
    }
  }, [redirect])

  return (
    <Form name="로그인">
      <div>
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your email
        </label>
        <Input
          id="email"
          testid="email-input"
          type="email"
          placeholder="email 입력시 @ 포함시켜주세요"
          value={email}
          onChange={onChangeEmail}
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Password
        </label>
        <Input
          id="password"
          testid="password-input"
          type="password"
          placeholder="비밀번호를 8자리이상 입력"
          value={password}
          onChange={onChangePassWord}
        />
      </div>
      <button
        type="button"
        disabled={!validation(email, password)}
        data-testid="signin-button"
        className={
          validation(email, password)
            ? 'w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
            : 'w-full text-white bg-gray-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
        }
        onClick={() => onClickLogin(email, password)}
      >
        로그인
      </button>
      <div>
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          회원가입이 필요하세요? &nbsp;
          <Link
            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
            to="/signup"
          >
            회원가입
          </Link>
        </p>
      </div>
      <div>
        <Link
          className="font-medium text-primary-600 hover:underline dark:text-primary-500"
          to="/"
        >
          홈으로
        </Link>
      </div>
    </Form>
  )
}

export default SignIn
