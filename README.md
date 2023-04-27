# Todo 구현

## 상태관리
원래 사전과제 제출시에는 `useState`훅만 사용하여 상태관리를 했지만, 이번에는 context API 와 `useReducer`훅을 활용하여 리덕스 store와 비슷하게 상태관리를 하였습니다.

```jsx
export const TodoContextProvider = ({ children }: { children: ReactNode }) => {
  const [todos, dispatch] = useReducer((state: Todo[], action: { type: string, payload: unknown }) => {
    switch (action.type) {
      case "SET_TODOS":
        .
        .
        .
    }
  }, []);

  const setTodos = (todos: Todo[]) => {
    dispatch({ type: "SET_TODOS", payload: todos });
  };
        .
        .
        .

  return <TodoContext.Provider value={{ todos, setTodos, addTodo, removeTodo, toggleTodo, updateTodo }} >
    {children}
  </TodoContext.Provider>
};

const useTodoContext = () => React.useContext(TodoContext);

```

`TodoContextProvider`로 Todo 페이지 컴포넌트를 감싸고 `useTodoContext`훅을 만들고 필요한 컴포넌트에서 import하여 사용하도록 했습니다.

```jsx
<Route path="/todo" element={
  <TodoContextProvider>
    <Todo />
  </TodoContextProvider>
} />
```

## Todo 컴포넌트
수정 버튼을 눌러 todo를 편집하는 건 별도의 컴포넌트로 분리했습니다.

```jsx
const TodoItem = ({ todo }: { todo: Todo }) => {
  const [editMode, setEditMode] = React.useState(false);

  return <li>
    <input type="checkbox" checked={todo.isCompleted} onChange={handleToggle} />
    {
      editMode ?
        <TodoEdit todo={todo} resetEditMode={() => setEditMode(false)} />
        : <TodoInfo todo={todo} setEditMode={() => setEditMode(true)} />
    }
  </li>
}
```

`editMode`라는 컴포넌트 local state가 있고, `editMode`에 따라 `TodoEdit` 또는 `TodoInfo` 컴포넌트가 마운트됩니다.
`TodoInfo`컴포넌트에 전달하는 `setEditMode` prop은 `useState`의 dispatcher와 이름이 겹칩니다. 더 나은 변수명이 있다면 피드백 바랍니다.