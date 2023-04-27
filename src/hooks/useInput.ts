import { useState } from 'react'

const useInput = (initialValue: string) => {
  const [value, setValue] = useState(initialValue)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const reset = () => {
    setValue(initialValue)
  }

  return { value, handleChange, reset }
}

export default useInput
