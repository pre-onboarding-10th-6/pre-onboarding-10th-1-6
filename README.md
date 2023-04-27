# 6-A devA 브랜치

## 로그인 부분 api 수정

- 로그인 부분 async await 으로 변경
- `Promise<any>` 반환 부분은 `<AxiosResponse<SignInResponse>>` 으로
  `acsses_token` 의 타입 지정 `string` 으로 들어오기에 `string` 으로 지정
- 로그인 부분의 `error` 부분의 타입에러를 `unknown` 으로 타입을 받고
  `instanceof AxiosError` 로 받은 객체가 `AxiosError` 인 체크

  ```typescript
  export const SignInTodo = async (
    email: string,
    password: string
  ): Promise<AxiosResponse<SignInResponse>> => {
    try {
      const res = await authInstance.post<SignInResponse>('/auth/signin', {
        email,
        password
      })
      return res
    } catch (error) {
      throw error
    }
  }
  const onClickLogin = useCallback(
    async (email: string, password: string) => {
      try {
        const res = await SignInTodo(email, password)
        const token = res.data.access_token
        localStorage.setItem('token', token)
        return navigate('/todo')
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          alert(`[${error.response?.status}] ${error.message || '로그인 실패'}`)
        } else {
          throw new Error(error as string)
        }
      }
    },
    [navigate]
  )
  ```

  ## todo list 기능

  ```typescript
  export const getTodos = async () => {
    const res = await instance.get('/todos')

    return res.data
  }
  ```

  ## todo 추가 기능

- `Promise<AxiosResponse<StatusInResponse>>` 로 반환값 지정
- `StatusInResponse type alias` 를 `[status:number]:number` 로
  `status` 객체 프로퍼티의 `number` 를 지정

```typescript
export const addTodo = async (
  text: string
): Promise<AxiosResponse<StatusInResponse>> => {
  type StatusInResponse = {
    [status: number]: number
  }

  try {
    const res = await instance.post('/todos', { todo: text })

    return res as AxiosResponse<StatusInResponse>
  } catch (error) {
    throw new Error('Failed to add todo')
  }
}
```

## todo 수정 기능

- 위와 동일하게 반환값 지정
- rest 로 인자 전달

```typescript
export const updateTodo = async (
  ...rest: any
): Promise<AxiosResponse<StatusInResponse>> => {
  try {
    const [{ id, todo, isCompleted }] = rest

    const res = await instance.put(`/todos/${id}`, { todo, isCompleted })

    return res as AxiosResponse<StatusInResponse>
  } catch (error) {
    throw new Error('Failed to update todo')
  }
}
```

## todo 삭제 기능

- 위와 동일

```typescript
export const deleteTodo = async (
  id: number
): Promise<AxiosResponse<StatusInResponse>> => {
  try {
    const res = await instance.delete(`/todos/${id}`)

    return res
  } catch (error) {
    throw new Error('Failed to delete todo')
  }
}
```
