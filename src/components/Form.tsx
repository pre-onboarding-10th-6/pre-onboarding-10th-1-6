import React, { ReactNode } from 'react'

type FormProp = {
  children: ReactNode
  name: string
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void
}

function Form({ children, name, onSubmit }: FormProp) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <form
        onSubmit={onSubmit}
        className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            {name}
          </h1>
          {children}
        </div>
      </form>
    </div>
  )
}

export default Form
