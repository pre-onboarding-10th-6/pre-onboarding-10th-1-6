/* eslint-disable react/prop-types */
import styled from 'styled-components'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import regex from '../util/regex'
import { postSignIn } from '../service/auth'
import { getAccessToken } from '../util/localStorage'

const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
`
const StTitle = styled.h2`
  margin: 16px 0px 48px;
`
const StInputForm = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 380px;
  gap: 10px;
`

const StInput = styled.input`
  padding: 8px 15px 9px;
  border-bottom: 1px solid #000;
`

const StMessage = styled.p`
  color: #35c5f0;
`

const Button = styled.button`
  height: 50px;
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  border-radius: 8px;
  background-color: ${props => (props.disabled ? 'grey' : '#35c5f0')};
`

export default function SignIn() {
  const [formState, setFormState] = useState({
    email: {
      value: '',
      isValid: false
    },
    password: {
      value: '',
      isValid: false
    }
  })
  const [isDisabled, setIsDisabled] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const isSignIn = getAccessToken()
    if (isSignIn) {
      navigate(`/todo`)
    }
  }, [navigate])

  useEffect(() => {
    if (formState.email.isValid && formState.password.isValid) {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
  }, [formState])

  const onEmailChange = (e: any) => {
    const { value } = e.target
    const isValid = regex.email.test(value)
    setFormState({ ...formState, email: { value, isValid } })
  }
  const onPasswordChange = (e: any) => {
    const { value } = e.target
    const isValid = regex.password.test(value)
    setFormState({
      ...formState,
      password: { value, isValid }
    })
  }

  const onSubmit = async (e: any) => {
    e.preventDefault()
    const body = {
      email: formState.email.value,
      password: formState.password.value
    }
    try {
      await postSignIn(body)
      navigate(`/todo`)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <SignUpContainer>
      <StTitle>로그인</StTitle>
      <StInputForm onSubmit={onSubmit}>
        <p>이메일</p>
        <StInput
          placeholder="아이디를 입력해 주세요."
          type="text"
          data-testid="email-input"
          value={formState.email.value}
          onChange={onEmailChange}
        />
        <StMessage>`@`를 포함해서 이메일을 작성해 주세요.</StMessage>
        <p>비밀번호</p>
        <StInput
          placeholder="비밀번호를 입력해 주세요."
          type="password"
          data-testid="password-input"
          value={formState.password.value}
          onChange={onPasswordChange}
        />
        <StMessage>비밀번호는 8자 이상 작성해 주세요.</StMessage>
        <Button disabled={isDisabled} data-testid="signin-button" type="submit">
          로그인
        </Button>
      </StInputForm>
    </SignUpContainer>
  )
}
