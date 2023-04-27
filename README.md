## 컴포넌트 구조

(src/page/Todo/index.tsx)

```html
<main>
  <h1>Todo</h1>
  <TodoProvider>
    <TodoCreate />
    <TodoList />
  </TodoProvider>
</main>
```

<br />

## Interface 공유

(src/interface/todo.ts)

```ts
export interface Todo {
  id: number
  todo: string
  isCompleted: boolean
}
```

<br />

## Todo State - ContextAPI 사용

```ts
export interface TodoState {
  todos: Todo[]
}
```

```ts
export enum TodoActionTypes {
  SET_TODOS = 'SET_TODOS',
  ADD_TODO = 'ADD_TODO',
  REMOVE_TODO = 'REMOVE_TODO',
  UPDATE_TODO = 'UPDATE_TODO'
}
```

<br />

## Todo State 사용 예시

(src/components/TodoList.tsx)

```ts
  useEffect(() => {
    const loadTodos = async () => {
      try {
        const { data } = await getTodos()
        dispatch({
          type: TodoActionTypes.SET_TODOS,
          payload: { todos: data }
        })
        ...
      } catch (err) {
        ...
      }
    }
    loadTodos()
  }, [])
```

<br />

## Todo Edit

(src/components/TodoList.tsx)

```ts
const [editing, setEditing] = useState<number | null>(null)
```

```ts
<ul>
  {todos.map(({ id, todo, isCompleted }) => (
    <li key={id}>
      {editing === id ? (
        <TodoEdit
          id={id}
          todo={todo}
          isCompleted={isCompleted}
          handleToggle={handleToggle}
          handleCancel={handleCancel}
        />
      ) : (
        <TodoItem
          id={id}
          todo={todo}
          isCompleted={isCompleted}
          handleToggle={handleToggle}
          handleEdit={handleEdit}
        />
      )}
    </li>
  ))}
</ul>
```

<br />

## API 사용

(src/api/axios.ts)

```ts
export const instance: AxiosInstance = axios.create(defaultOptions)
export const authInstance: AxiosInstance = axios.create(defaultOptions)

authInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  }
)
```

(src/api/auth.ts)

```ts
export const SignInTodo = (email: string, password: string): Promise<any> =>
  instance.post(`/auth/signin`, {
    email,
    password
  })
```

(src/api/todo.ts)

```ts
const getTodos = (): Promise<any> => authInstance.get('/todos')
```

<br />

## 문제

(src/page/Todo/index.tsx)

```ts
// 토큰 여부에 따라 Todo page에 오기 전에 바로 접근 차단할 수 있는지 확인 필요
useEffect(() => {
  const token = localStorage.getItem('token')
  if (token === null) {
    navigate('/')
  }
}, [navigate])
```
