export interface Todo {
  id: number
  todo: string
  isCompleted: boolean
  userid: number
}

export interface TodoInput {
  todo: string
}

export type GetTodosResponse = Promise<Todo[]>
// Todo를 배열로 받아와서 Todo[]
export type CreateTodoResponse = Promise<Todo>
export type UpdateTodoResponse = Promise<Todo>
// 성공한 Todo만 받아옴
export type DeleteTodoResponse = Promise<void>
// 응답 x, status 204에 대한 처리는 api단(interceptor 등)에서 처리

export interface TodoProps {
  fetchTodoList: () => Promise<void>
}
export interface TodoLayoutProps {
  children: React.ReactNode
}
export interface AddTodoProps {
  fetchTodoList: () => Promise<void>
}

export interface TodoListProps {
  todos: Todo[]
  fetchTodoList: () => Promise<void>
}
export interface TodoItemProps {
  todo: Todo
  fetchTodoList: () => Promise<void>
}
