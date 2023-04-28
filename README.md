<br />

# 1. 프로젝트

Todo List 프로젝트입니다. <br>
배포링크: https://pre-onboarding-10th-1-6.vercel.app/

## 팀원목록

- 팀장 : 이정진
- 팀원 : 곽현지, 김성주, 박재욱, 신종우, 양주영, 이원형, 정다솔, 정예지

| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;팀6&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;이정진&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;곽현지&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | 김성주 | 박재욱 |
| :---: | :---: | :---: | :---: | :---: |
| 역할 | ![Leader](https://img.shields.io/badge/-%ED%8C%80%EC%9E%A5-blue) | ![팀원](https://img.shields.io/badge/-%ED%8C%80%EC%9B%90-yellow) | ![팀원](https://img.shields.io/badge/-%ED%8C%80%EC%9B%90-yellow) | ![팀원](https://img.shields.io/badge/-%ED%8C%80%EC%9B%90-yellow) | ![팀원](https://img.shields.io/badge/-%ED%8C%80%EC%9B%90-yellow) |
| Github | [wjdrk70](https://github.com/wjdrk70) | [hjKwak](https://github.com/KwakHyeonJi) | [dev-seongjoo](https://github.com/dev-seongjoo) | [LeChuckbb](https://github.com/LeChuckbb) | [jw3215](https://github.com/jw3215) 

| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;신종우&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;양주영&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | 이원형 | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;정다솔&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;정예지&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |
| :---: | :---: | :---: | :---: | :---: |
| ![팀원](https://img.shields.io/badge/-%ED%8C%80%EC%9B%90-yellow) | ![팀원](https://img.shields.io/badge/-%ED%8C%80%EC%9B%90-yellow) | ![팀원](https://img.shields.io/badge/-%ED%8C%80%EC%9B%90-yellow) | ![팀원](https://img.shields.io/badge/-%ED%8C%80%EC%9B%90-yellow) | ![팀원](https://img.shields.io/badge/-%ED%8C%80%EC%9B%90-yellow)
 | [jw3215](https://github.com/jw3215) | [yangddu](https://github.com/yangddu) | [WonhyeongLee](https://github.com/WonhyeongLee) | [ssori0421](https://github.com/ssori0421) | [sabit1997](https://github.com/sabit1997) |

<br />

<br />

# 2. 협업 방식

- 총 인원 9명 이여서 5:4 로 조를 나누어 코드리뷰 후 코드베이스 선정
- 선정된 코드베이스에서 각 팀원분들의 좋은 코드를 취합해서 작성
  ※ 시간비용이 많이들어 다른 방법으로 우회
- 각 팀원들이 read me 를 작성 후 각 브랜치 커밋하는 방식으로 변경
- 각 팀원이 발표해서 코드베이스를 선정 후 취함
- 비즈니스로직 및 view 를 조금 더 좋은 방식으로 리팩토링 후 merge

[git commit message 규칙 설정]

- 일관된 커밋 메시지의 형태로 가독성을 높이고, 팀원들의 작업 내역 및 변경사항 쉽게 파악 가능

# 3. 디렉토리 구조

```
📦
├─ src
│  ├─ api
│  ├─ components
│  ├─ context
│  ├─ hooks
│  ├─ page
│  │  ├─ Home
│  │  ├─ SignIn
│  │  ├─ SignUp
│  │  └─ Todo
│  ├─ types
└─ └─ utils
```

# 4. 코드 구조

(Best Practice라고 생각한 부분 포함)

## 리다이렉트 문제

### Assignment 1 - access_token 유무에 따른 redirect

- token이 있는 상태로 signin/signup 페이지 접근 시 redirect

#### 문제

- react-router-dom의 `useNavigate()`, `redirect` 사용 시 로그인 및 회원가입 창으로 넘어간 다음 redirect 되는 문제 발생

#### 해결

- `<AuthRoute>`, `<ProtectedRoute>`컴포넌트를 만들어 라우터에서 token 여부에 따라 페이지와 children 으로 페이지 렌더링

#### 설명

- 메인페이지는 토큰 여부 상관없이 접근 가능

- 비정상적인 경로 접근은 메인페이지로 이동

- 인증(로그인)되지 않은 사용자가 `/todo` 에 접근하면 `/signin` 경로로 redirect 시킨다.

- 인증된 사용자가 `/signin` 또는 `/signup` 에 접근하면 `/todo` 경로로 redirect 시킨다.

- redirect 경로는 페이지 컴포넌트 상위에 정의된 `<AuthRoute>`, `<ProtectedRoute>` 컴포넌트에서 localStroage의 access_token 유무에 의해 결정된다.

위와 같은 방식을 활용하면 불필요한 페이지 렌더링 및 리다이렉션을 방지할 수 있다.

```tsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route
    path="/*"
    element={
      <AuthRoute>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthRoute>
    }
  />
  <Route
    path="/todo/*"
    element={
      <ProtectedRoute>
        <Routes>
          <Route index element={<Todo />} />
        </Routes>
      </ProtectedRoute>
    }
  />
</Routes>
```

```tsx
//AuthRoute.tsx
const AuthRoute = ({ children }: AuthRouteProps) => {
  const isAuthenticated = localStorage.getItem('token')

  if (isAuthenticated) {
    return <Navigate to="/todo" />
  }

  return <>{children}</>
}
```

```tsx
//ProtectedRoute
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuthenticated = localStorage.getItem('token')

  if (!isAuthenticated) {
    return <Navigate to="/signin" />
  }

  return <>{children}</>
}
```

## TODO LIST

### Assignment 3 - READ Todo

- `<Todo>` 컴포넌트에서 GET API를 호출하여 fetch해온 리스트 정보를 `<TodoItem>` props로 전달하여 todo 목록을 그린다.

- `<Todo>` 컴포넌트에서 사용되는 상태 및 비즈니스 로직은 `<useTodo>` 커스텀 훅에 정의하여 컴포넌트의 view와 로직을 분리한다.

### Assignment 4 - CREATE Todo

- `<Todo>` 컴포넌트의 '추가' 버튼 클릭 시 CREATE API를 호출하고, 응답받은 데이터를 Context API로 관리되는 store에 저장한다.

- todo store의 상태 변경으로 인해 리렌더링이 발생하여, 추가한 데이터가 목록에 표시된다.

### Assignment 5 - UPDATE checkbox

- `<TodoItem>` 컴포넌트의 체크박스 클릭 시 UPDATE API를 호출하여 상태를 변경한다.

- 상태 변경으로 인한 리렌더링으로 체크박스 변경 유무가 화면에 반영된다.

- `<TodoItem>` 컴포넌트에서 사용되는 상태 및 비즈니스 로직은 `<useTodoItem>` 커스텀 훅에 정의하여 컴포넌트의 view와 로직을 분리하였다.

### Assignment 6 - 수정, 삭제 버튼 구현

- `<TodoItem>` 컴포넌트에 수정, 삭제 버튼을 구현한다.

- 이 때 EditMode에 따른 버튼 내부 명칭, 기능이 상이하기 때문에 조건부 렌더링이 필수적이다.

- 조건부 렌더링의 남용은 가독성을 해칠 수 있으므로, 컴포넌트 단위로 쪼개어 한 번의 삼항연산자 사용으로 마크업한다.

```tsx
return (
  <li className={'flex m-3'}>
    <label className={'w-full align-middle'}>
      <input
        type="checkbox"
        checked={todo.isCompleted}
        className={
          'default:ring-1 w-4 h-4 rounded checked:bg-blue-500 mx-1 cursor-pointer'
        }
        onChange={handleCheckChange}
      />
      {isEditMode ? renderEditMode() : renderViewMode()}
    </label>
  </li>
)
```

2. 수정, 삭제 버튼은 EditMode인 경우 각각 제출, 취소 버튼으로 변경되기 때문에 4개 버튼의 기능 구현이 필요하다.

- 4개의 관련된 버튼 클릭 이벤트 핸들러를 하나의 `handleButtonSubmit()`로 관리하여 응집도를 높였다

```typescript
const handleButtonSubmit =
  (buttonType: SubmitButtonStatus) =>
  async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (event.target instanceof HTMLButtonElement) {
      switch (buttonType) {
        case 'SUBMIT':
          const content =
            inputRef.current !== null ? inputRef.current.value : ''
          const { data } = await updateTodoAPI(todo.id, {
            ...todo,
            todo: content
          })
          dispatch({
            type: TodoActionTypes.UPDATE_TODO,
            payload: {
              ...todo,
              todo: data.todo
            }
          })
          setIsEditMode(false)
          break
        case 'CANCEL':
          setIsEditMode(false)
          break
        case 'MODIFY':
          setIsEditMode(true)
          break
        case 'DELETE':
          await deleteTodoAPI(todo.id)
          dispatch({
            type: TodoActionTypes.REMOVE_TODO,
            payload: { id: todo.id }
          })
          break
        default:
          break
      }
    } else {
      throw new Error('data-testId 값이 변경되었는지 확인해주세요')
    }
  }
```

### Assignment 7 - DELETE Todo

- `<TodoItem>` 컴포넌트의 삭제 버튼 클릭 시 DELETE API를 호출하고 삭제된 목록을 상태에 반영한다.

### Assignment 8 - Update Todo

- `<TodoItem>` 컴포넌트의 수정 버튼 클릭시 Edit Mode로 전환한다. (viewMode 컴포넌트 unmount, editMode 컴포넌트 mount)

- EditMode에서는 버튼의 명칭 및 기능이 기존 버튼과 상이하기 때문에 EditMode를 상태로 관리하여 상태별 버튼을 보여준다.

- EditMode에서 Todo를 수정한 뒤 제출 버튼을 클릭하면 UPDATE API를 호출하고 변경된 상태를 반영하여 UI에 그린다.

# 5. 설치 & 실행 방법

```
npm install
npm start
```

# 6. 기술 스택

<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black">
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=black">
<img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=TailwindCSS&logoColor=black">
<img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=black">
<img src="https://img.shields.io/badge/vercel-000000?style=for-the-badge&logo=vercel&logoColor=white">
<img src="https://img.shields.io/badge/eslint-4B32C3?style=for-the-badge&logo=eslint&logoColor=black">
<img src="https://img.shields.io/badge/prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black">
<img src="https://img.shields.io/badge/husky-E0E0E0?style=for-the-badge&logo=husky&logoColor=black">
