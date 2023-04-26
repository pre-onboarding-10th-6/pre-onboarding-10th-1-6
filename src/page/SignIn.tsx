import React from 'react'

export default function SignIn() {
  return (
    <div>
      <input data-testid="email-input" />
      <input data-testid="password-input" />
      <button data-testid="signin-button" type="button">
        로그인
      </button>
    </div>
  )
}
