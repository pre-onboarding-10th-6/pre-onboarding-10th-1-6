import React, { forwardRef, ChangeEvent } from 'react'

type InputProp = {
  id?: string
  testid?: string
  type?: string
  name?: string
  value?: string
  labelText?: string
  placeholder?: string
  defaultValue?: string
  className?: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

const Input = forwardRef(
  (props: InputProp, ref: React.ForwardedRef<HTMLInputElement>) => {
    const {
      id,
      testid,
      type,
      name,
      value,
      defaultValue,
      labelText,
      placeholder,
      onChange,
      className
    } = props
    const inputStyle =
      'bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
    const labelStyle =
      'block mb-2 text-sm font-medium text-gray-900 dark:text-white'

    return (
      <>
        <label htmlFor={id} className={labelStyle}>
          {labelText ? labelText : ''}
        </label>
        <input
          id={id}
          data-testid={testid}
          className={className || inputStyle}
          type={type}
          name={name}
          value={value}
          ref={ref}
          placeholder={placeholder}
          onChange={onChange}
          defaultValue={defaultValue}
        />
      </>
    )
  }
)

export default Input
