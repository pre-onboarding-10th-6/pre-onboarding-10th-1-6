# TODO 구현 설명

## 📁api/todos

제가 작성했던 코드는 fetch를 사용했었으나 devA에 맞게 `axios`로 변경하였습니다.

`authInstance` 와 `getInterCeptor` 사용하였습니다.

api들은 모두 `async/await` 를 사용하였고 `try/catch`문으로 에러를 관리하였습니다.

비동기 함수를 동기적으로 사용하기 위해 사용하였고 조사해보니 `try/catch`문은 예외처리가 보다 쉽다고 하기에 작성하였습니다.
그런데 잘 사용한건지 모르겠습니다... 해당 부분에 대해 피드백 주시면 감사하겠습니다!

## 📁page/Todo

- api는 모두 api/todos에서 가져와서 사용하였습니다.
- api 통신 함수들은 모두 `async/await`으로 작성하였습니다.

1. todo 목록

   `useEffect`를 사용하여 첫 렌더링 시 todo 데이터를 가져오도록 구현하였습니다. token이 있고, todos(useState로 관리하는 값)의 길이가 0, 빈 배열일 때 가져오도록 하였습니다.

   ```javascript
   useEffect(() => {
     const getTodoData = async () => {
       const getTodosResult = await getTodos()
       setTodos(getTodosResult)
     }
     if (token && todos.length === 0) {
       getTodoData()
     }
   }, [])
   ```

2. todo 추가

   input 값을 추적하고 관리할 필요가 없다고 생각하여 `formData`로 값을 전달하였습니다. 작성 후에 값이 리셋되도록 하기 위해 `useRef`를 사용하여 관리하였습니다.

   ```javascript
     const todoSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
       e.preventDefault()

       const formData = new FormData(e.currentTarget)

       await createTodo(formData.get('task') as string)

       if (todoInputRef.current) {
         todoInputRef.current.value = ''
       }
       await getTodoDataUpdate()
     }
   ```

3. todo 완료 여부

   원래는 아래와 같은 방식으로 todo 값을 업데이트 했었지만, `getTodoUpdate` 함수를 사용하여 업데이트하는 방식으로 변경하였습니다.

   ```javascript
   const updateResult = todos.map(element =>
     element.id === args.id
       ? { ...element, isCompleted: args.isCompleted }
       : element
   )
   setTodos(updateResult)
   ```

   ```javascript
   const completeButtonHandler = async (args: CompleteButtonRequest) => {
     await updateTodo({
       id: args.id,
       todo: args.todo,
       isCompleted: args.isCompleted
     })
     await getTodoDataUpdate()
   }
   ```

4. 수정 버튼

   수정 버튼을 클릭하면 해당 todo list의 `isEdit: true` 값이 추가됩니다. `isEdit` 값이 `true`일 때 수정할 수 있게 됩니다.

   ```javascript
   const updateTodoButtonHandler = (specificIndex: number) => {
     const updateTodo = todos.map((item, index) =>
       index === specificIndex ? { ...item, isEdit: true } : item
     )
     setTodos(updateTodo)
   }
   ```

5. 취소 버튼

   수정 버튼과 반대로 해당 리스트의 `isEdit` 값을 `false`로 바꾸고 원래 list의 상태로 초기화합니다.

   ```javascript
   const cancelUpdateButtonHandler = (specificIndex: number) => {
     const updateTodo = todos.map((item, index) =>
       index === specificIndex && item.isEdit
         ? { ...item, isEdit: false }
         : item
     )
     setTodos(updateTodo)
   }
   ```

6. 수정 제출

   `formData`로 값을 넘겨주고 마지막에 `getTodoDataUpdate`를 실행합니다.

   ```javascript
     const updateTodoSubmitButtonHandler = async (
       e: React.FormEvent<HTMLFormElement>,
       id: number,
       isCompleted: boolean,
       index: number
     ) => {
       e.preventDefault()
       const formData = new FormData(e.currentTarget)
       await updateTodo({
         id,
         todo: formData.get('update-todo-input') as string,
         isCompleted: isCompleted
       })
       cancelUpdateButtonHandler(index)
       await getTodoDataUpdate()
     }
   ```

7. 삭제

   `deleteTodo` 함수에 id를 전달하여 실행한 후, `getTodoUpdate`를 실행합니다.

   ```javascript
   const deleteTodoButtonHandler = async (id: number) => {
     await deleteTodo(id)
     await getTodoDataUpdate()
   }
   ```

8. getTodoUpdate

   `useCallback`을 이용하여 `getTodos` 함수를 호출하여 받아온 결과값을 `setTodos` 함수를 이용하여 상태값을 업데이트합니다. `useCallback`을 사용하면 불필요한 리렌더링을 방지하는데 좋다고하여 사용하긴 하였는데 아직 `useCallback`에 대한 이해가 부족합니다. 이 부분에 대해서도 피드백 주시면 감사하겠습니다!

   ```javascript
   const getTodoDataUpdate = useCallback(async () => {
     const getTodosResult = await getTodos()
     setTodos(getTodosResult)
   }, [setTodos])
   ```

사실 todo 값이 변하고 바로 적용되도록 하고 싶어서 여러가지 방법을 생각해보며 더 나은 코드로 바꾸려고 했지만 제가 원하는 방식으로 동작하지 않아 원래 작성한 코드 그대로 올립니다.
