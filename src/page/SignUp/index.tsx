import React, { useCallback, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useInputs from '../../hooks/useInputs'
import { SignUpTodo } from '../../api/auth'
import Form from '../../components/Form'
import Input from '../../components/Input'
import validation from '../../utils/validation'

function SignUp() {
  const {
    values: { email, password },
    handleChange
  } = useInputs({ email: '', password: '' })

  const redirect = useNavigate()

  const onClickSignUp = useCallback(
    // async (_email: string, _password: string) => {
    //   const status = await SignUpTodo(_email, _password)

    //   if (status === 201) {
    //     alert('회원가입 완료')
    //     return redirect('/signin')
    //   }
    //   return alert('회원가입 실패')
    (_email: string, _password: string) => {
      SignUpTodo(_email, _password)
        .then(res => {
          if (res.status === 201) {
            alert('회원가입 완료')
            redirect('/signin')
          }
        })
        .catch(err => alert(`[${err.response.status}] 회원가입 실패`))
    },
    [redirect]
  )

  // const regEx = useCallback(() => {
  //   const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  //   const pwdRegEx = /^.{8,}$/
  //   if (emailRegEx.test(email) && pwdRegEx.test(password)) {
  //     return true
  //   }
  //   return false
  // }, [email, password])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      redirect('/todo')
    }
  }, [redirect])

  return (
    <main>
      <Form name="회원가입">
        <Input
          id="email"
          testid="email-input"
          type="email"
          name="email"
          placeholder="email 입력시 @ 포함시켜주세요"
          value={email}
          onChange={handleChange}
        />
        <Input
          id="password"
          testid="password-input"
          type="password"
          name="password"
          placeholder="비밀번호를 8자리이상 입력"
          value={password}
          onChange={handleChange}
        />

        <button
          type="button"
          disabled={!validation(email, password)}
          data-testid="signup-button"
          className={
            validation(email, password)
              ? 'w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
              : 'w-full text-white bg-gray-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
          }
          onClick={() => onClickSignUp(email, password)}
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
    </main>
  )
}

export default SignUp
