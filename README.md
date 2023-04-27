<<<<<<< HEAD
배포 링크 :

# 1. 프로젝트

(폴더구조 추가)

## 팀원목록

- 팀장 : 이정진
- 팀원 : 곽현지,김성주,박재욱,신종우,양주영,이원형,정다솔,정예지
<center>

|                                팀                                |                              이정진                              |                              곽현지                              |                              김성주                              |                              박재욱                              |
| :--------------------------------------------------------------: | :--------------------------------------------------------------: | :--------------------------------------------------------------: | :--------------------------------------------------------------: | :--------------------------------------------------------------: |
|                              Team6                               |        **github**: [wjdrk70](https://github.com/wjdrk70)         |                           **github**:                            |   **github**: [dev-seongjoo](https://github.com/dev-seongjoo)    |      **github**: [LeChuckbb](https://github.com/LeChuckbb)       |
| ![Leader](https://img.shields.io/badge/-%ED%8C%80%EC%9E%A5-blue) | ![팀원](https://img.shields.io/badge/-%ED%8C%80%EC%9B%90-yellow) | ![팀원](https://img.shields.io/badge/-%ED%8C%80%EC%9B%90-yellow) | ![팀원](https://img.shields.io/badge/-%ED%8C%80%EC%9B%90-yellow) | ![팀원](https://img.shields.io/badge/-%ED%8C%80%EC%9B%90-yellow) |

|                              신종우                              |                              양주영                              |                              이원형                              |                              정다솔                              |                                 정예지                                 |
| :--------------------------------------------------------------: | :--------------------------------------------------------------: | :--------------------------------------------------------------: | :--------------------------------------------------------------: | :--------------------------------------------------------------------: |
|                                                                  |                             깃헙주소                             |                             깃헙주소                             |                             깃헙주소                             | **github**: [sabit1997](https://github.com/sabit1997?tab=repositories) |
| ![팀원](https://img.shields.io/badge/-%ED%8C%80%EC%9B%90-yellow) | ![팀원](https://img.shields.io/badge/-%ED%8C%80%EC%9B%90-yellow) | ![팀원](https://img.shields.io/badge/-%ED%8C%80%EC%9B%90-yellow) | ![팀원](https://img.shields.io/badge/-%ED%8C%80%EC%9B%90-yellow) |    ![팀원](https://img.shields.io/badge/-%ED%8C%80%EC%9B%90-yellow)    |

</center>

# 2. 코드 구조 설명

(Best Practice라고 생각한 부분 포함)

## 로그인/회원가입

### Assignment 1

### Assignment 2

### Assignment 3

### Assignment 4

## TODO LIST

### Assignment 5

`<Todo>` UI 컴포넌트. 비즈니스 로직은 `<useTodo>` 커스텀 훅으로 분리
`<useTodo>` 훅에서 useEffect로 `<Todo>` 컴포넌트 렌더링 시 GET 요청하여 목록을 가져옵니다.

### Assignment 6

### Assignment 7

### Assignment 8

### Assignment 9

'삭제' 버튼 클릭시 DELETE 요청 및 삭제

### Assignment 10

'수정' 버튼 클릭시 Edit Mode로 전환.
=======
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

>>>>>>> fd3cf3f90b29e129632fa155b24a8079e5baf8ac
