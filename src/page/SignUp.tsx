import React from 'react'

export default function SignUp() {
  return (
    <div>
      <input data-testid="email-input" />
      <input data-testid="password-input" />
      <button data-testid="signup-button" type="button">
        회원가입
      </button>
    </div>
  )
}
