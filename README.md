# TODO 구현 설명

## 📁api/todos

제가 작성했던 코드는 fetch를 사용했었으나 devA에 맞게 axios로 변경하였습니다.

`authInstance` 와 `getInterCeptor` 사용하였습니다.

api들은 모두 async await 를 사용하였고 try catch 문으로 에러를 관리하였습니다.

(이유 말하기)

## 📁page/Todo

- api는 모두 api/todos에서 가져와서 사용하였습니다.
- api 통신 함수들은 모두 async await으로 작성하였습니다.

1. todo 목록

   useEffect를 사용하여 todo data를 맨 처음에 렌더링 해오도록 했습니다. token이 있고 todos (useState로 관리하는 값)의 길이가 0, 빈 배열일 때 불러오도록 했습니다.

2. todo 추가

   input을 추적하고 관리할 필요가 없다고 생각하여 formData로 값을 주고 있습니다.
   작성 한 뒤 값이 리셋되도록 하였습니다. useRef를 사용해 관리했습니다.

3. todo 완료 여부

   원래 이런 방식으로 todo 값을 업데이트 했으나 getTodoUpdate 함수를 사용하는 방식으로 바꿨습니다.

   ```
   const updateResult = todos.map(element =>
     element.id === args.id
       ? { ...element, isCompleted: args.isCompleted }
       : element
   )
   setTodos(updateResult)
   ```

4. 수정 버튼

   수정 버튼을 클릭하면 해당 todo list의 isEdit: true 값이 추가 됩니다. isEdit 값이 true 일 시 수정할 수 있게 됩니다.

5. 취소 버튼

   수정버튼과 반대로 해당 리스트의 isEdit 값을 false로 바꾸고 원래 list의 상태로 초기화 됩니다.

6. 수정 제출

   위의 submit 함수들과 같이 formData로 값을 넘겨주고 마지막에 getTodoDataUpdate를 실행합니다.

7. 삭제

   deleteTodo 함수에 id를 전달해 실행 한 뒤 위와 마찬가지로 getTodoUpdate를 실행합니다.

8. getTodoUpdate

   useCallback을 이용하여 getTodos 함수를 호출하여 받아온 결과갑승ㄹ setTodos 함수를 이용하여 상태값을 업데이트 합니다.
   (사실 useCallback 아직도 모호해서 잘 사용하였는지 모르겠습니다. 불필요한 렌더링을 피하려고 쓴다고 알고 있긴한데...)

사실 todo 값이 변하고 바로 적용되도록 하고 싶어서 여러가지 방법을 생각해보며 더 나은 코드로 바꾸려고 했지만 제가 원하는 방식으로 동작하지 않아 원래 작성한 코드 그대로 올립니다.
