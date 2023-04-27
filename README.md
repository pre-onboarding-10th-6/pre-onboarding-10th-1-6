## Assignment 5 : Read Todo

### Todo 컴포넌트

`<Todo>` UI 컴포넌트. 비즈니스 로직은 `<useTodo>` 커스텀 훅으로 분리

`<useTodo>` 훅에서 useEffect로 `<Todo>` 컴포넌트 렌더링 시 GET 요청하여 목록을 가져옵니다.

![image](https://user-images.githubusercontent.com/39594520/234809249-d86cd8d7-a1f4-4d82-9ad5-ca0a572dc873.png)


### TodoList 컴포넌트

`<TodoList>` UI 컴포넌트. 비즈니스 로직은 `<useTodoList>` 커스텀 훅으로 분리

`<Todo>`와 `<TodoList>`를 분리한 이유는 `<Todo>`에서 maps로 투두 값을 손쉽게 전달 및 사용하기 위함

![image](https://user-images.githubusercontent.com/39594520/234809452-56b5c88a-41c5-4ff6-966d-a37c722329f1.png)


## Assignment 6 : Create Todo

`<Todo>`에 정의된 '추가' 버튼 클릭시 `<useTodo>`의 `handleSubmit()` 메서드 호출하여 CREATE

![image](https://user-images.githubusercontent.com/39594520/234811352-a1195391-d7ae-43e4-aa8b-f9d7420a037f.png)


## Assignment 7 : Checkbox 클릭 -> Update Todo
`<TodoList>`에 정의된 체크박스 클릭 시 `<useTodoList>`의 `handleCheckChange()` 메서드 호출하여 UPDATE

![image](https://user-images.githubusercontent.com/39594520/234812116-f1ed13ed-4479-4b68-bbd8-f9e7c4f742cc.png)


## Assignemnt 8,9,10 : 수정, 삭제 버튼 -> Update/Delete Todo

![image](https://user-images.githubusercontent.com/39594520/234812481-a27a3144-0af4-472d-b5aa-f1020389b45b.png)

