import React, { ChangeEvent } from 'react'

type InputProp = {
  id?: string
  testid: string
  type: string
  name: string
  value?: string
  placeholder?: string
  defaultValue?: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

function Input({
  id,
  type,
  testid,
  name,
  value,
  placeholder = '',
  onChange,
  defaultValue
}: InputProp) {
  const style =
    'bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
  return (
    <input
      id={id}
      data-testid={testid}
      className={style}
      type={type}
      name={name}
      value={value}
      defaultValue={defaultValue}
      placeholder={placeholder}
      onChange={onChange}
    />
  )
}

export default Input
