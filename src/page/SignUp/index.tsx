import React, { useCallback, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useInput from '../../hooks/useInput'
import { SignUpTodo } from '../../api'
import Form from '../../components/Form'
import Input from '../../components/Input'

function SignUp() {
  const [email, onChangeEmail] = useInput('')
  const [password, onChangePassWord] = useInput('')
  const redirect = useNavigate()

  const onClickSignUp = useCallback(async () => {
    const status = await SignUpTodo(email, password)

    if (status === 201) {
      alert('회원가입 완료')
      return redirect('/signin')
    }
    return alert('회원가입 실패')
  }, [email, password, redirect])

  const regEx = useCallback(() => {
    const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const pwdRegEx = /^.{8,}$/
    if (emailRegEx.test(email) && pwdRegEx.test(password)) {
      return true
    }
    return false
  }, [email, password])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      redirect('/todo')
    }
  }, [redirect])

  return (
    <Form name="회원가입">
      <Input
        id="email"
        testid="email-input"
        type="email"
        placeholder="email 입력시 @ 포함시켜주세요"
        value={email}
        onChange={onChangeEmail}
      />
      <Input
        id="password"
        testid="password-input"
        type="password"
        placeholder="비밀번호를 8자리이상 입력"
        value={password}
        onChange={onChangePassWord}
      />
      <button
        type="button"
        disabled={!regEx()}
        data-testid="signup-button"
        className={
          regEx()
            ? 'w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
            : 'w-full text-white bg-gray-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
        }
        onClick={onClickSignUp}
      >
        회원가입
      </button>
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

export default SignUp
