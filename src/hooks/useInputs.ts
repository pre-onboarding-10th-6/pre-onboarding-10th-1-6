import { useState, useCallback } from 'react'

const useFormInputs = (initialValue: Record<string, string>) => {
  const [values, setValues] = useState(initialValue)

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target
      setValues({
        ...values,
        [name]: value
      })
    },
    [values]
  )

  return { values, handleChange }
}

export default useFormInputs
