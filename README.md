# 이원형 - Assignment5 ~ 10

**Assignment 5**

- [x] /todo경로에 접속하면 투두 리스트의 목록을 볼 수 있도록 해주세요

```
<li>
  <label>
    <input type="checkbox" />
    <span>TODO 1</span>
  </label>
</li>
```

## 페이지 처리

```
  return (
    <TodoLayout>
      <AddTodo fetchTodoList={fetchTodoList} />
      <TodoList todos={todos} fetchTodoList={fetchTodoList} />
    </TodoLayout>
  )
```

전체 레이아웃을 맞추기 위해서 TodoLayout 컴포넌트 안에 AddTodo와 `TodoList`를 `children`으로 받도록 구현했습니다.

`TodoLayout`의 구성은 아래와 같습니다.

```
function TodoLayout({ children }: TodoLayoutProps) {
  return (
    <main>
      <header>
        <h1>TodoList</h1>
      </header>
      <section>{children}</section>
    </main>
  )
}
```

## Todo 데이터들을 받아오는 방식

먼저 Todo리스트의 기능을 따로 분리해 커스텀 훅을 생성해서 사용했습니다.

`todos` : todos 데이터

`fetchTodoList` : 현재 Todo 리스트를 getTodos를 호출해 서버에서 가져와 todos 사태를 업데이트 합니다.

`createTodo` : 입력된 todo내용을 받아서 새로은 todo를 생성하고 현재 todo에 추가합니다.
`updateTodo` : 선택한 todo의 id와 새로운 내용을 받아서 수정하고 수정된 todo로 현재 리스트에서 해당id와 같은 항목을 교체합니다.
`deleteTodo` : 기존의 todo를 삭제하는 기능을 합니다. 삭제요청을 보내고 삭제요청한 ID와 일치하는 todo를 리스트에서 삭제합니다.

위 훅을 사용해서 /todo 페이지가 렌더링 되었을 때 useEffect에서 fetchTodoList() 함수를 실행하도록 구현해서 데이터가 변경 되었을 때 todos가 최신상태로 유지되도록 했습니다.
이런 방법으로 5 ~ 10 요구사항에 있는 수정, 삭제, 완료여부체크 요청을 했을 때 바로바로 todos가 최신상태로 되도록 하는 요구사항을 해결했습니다.

다만 아쉬운 점은 최신화를 위해 TodoItem컴포넌트에서 요청마다 fetchTodoList 함수를 실행하는데 useTodo내부에선 수정, 삭제, 추가 할 때마다 todos가 업데이트 되지만 TodoItem에서 todos가 업데이트 되지않는 문제를 해결하기 위해 적용한 방식이라 애초에 contextAPI로 전역관리 했으면 되지않나 하는 생각이 들었습니다.

- [x] 목록에서는 TODO의 내용과 완료 여부가 표시되어야 합니다.
- [x] TODO의 완료 여부는 `<input type="checkbox" />`를 통해 표현해주세요
- [x] TODO는 `<li>` tag를 이용해 감싸주세요

```
  const [isModify, setIsModify] = useState(false)
  const [modifiedTodo, setModifiedTodo] = useState(todo.todo)
  const [isTodoCompleted, setIsTodoCompleted] = useState(todo.isCompleted)
  ...
   const clickTodoCompleted = async () => {
    setIsTodoCompleted(!isTodoCompleted)
    await handleUpdateTodo(modifiedTodo, !isTodoCompleted)
  }
  ...
       <li key={todo.id}>
        <label>
          <input
            type="checkbox"
            id={todo.id.toString()}
            value={'isCompleted'}
            checked={isTodoCompleted}
            onChange={() => {
              clickTodoCompleted()
            }}
          />
          {isModify || <span>{todo.todo}</span>}
        </label>
      </li>
```

isTodoCompleted에 todo.isCompleted를 초기값으로 처음 목록에 나올 때 완료여부가 표시되도록 했습니다. 나머지 요구사항은 맞춰서 작성했습니다.

**Assignment 6**

- [x] 리스트 페이지에 새로운 TODO를 입력할 수 있는 input과 추가 button을 만들어주세요
  - TODO 입력 input에 `data-testid="new-todo-input"` 속성을 부여해주세요
  - TODO 추가 button에는 `data-testid="new-todo-add-button"` 속성을 부여해주세요
- [x] 추가 button을 클릭하면 입력 input의 내용이 새로운 TODO로 추가되도록 해주세요

AddTodo 컴포넌트를 작성해서 6번과제를 진행했습니다

- `todoInput` : AddTodo의 input 값 관리
- `handleInputChange` : input 내용이 바뀔 때마다 input에 업데이트
- `handleSubmit` : input에 내용 작성하고 제출 후 내용초기화, todo 생성 및 todo상태 최신화

**Assignment 7**

- [x] TODO의 체크박스를 통해 완료 여부를 수정할 수 있도록 해주세요

Assignment 5 에서 같이 처리했습니다.

**Assignment 8**

- [x] TODO 우측에 수정버튼과 삭제 버튼을 만들어 주세요
  - 수정 버튼에는 `data-testid="modify-button"` 속성을 부여해주세요
  - 삭제 버튼에는 `data-testid="delete-button"` 속성을 부여해주세요

**Assignment 9**

- [x] 투두 리스트의 삭제 기능을 구현해주세요
  - 투두 리스트의 TODO 우측의 삭제버튼을 누르면 해당 아이템이 삭제되도록 해주세요

**Assignment 10**

- [x] 투두 리스트의 수정 기능을 구현해주세요

8,9,10 요구사항은 TodoItem 컴포넌트에서 구현했습니다.

isModify를 사용해 조건부 렌더링으로 수정모드일 땐 [제출, 취소] 버튼을 수정모드가 아닐땐(초기값) [수정, 삭제] 버튼이 되도록 구현했습니다.

```
      {isModify ? (
        <>
          <input
            id={todo.id.toString()}
            data-testid="modify-input"
            value={modifiedTodo}
            onChange={e => setModifiedTodo(e.target.value)}
          />
          <div>
            <button data-testid="submit-button" onClick={submitModifiedTodo}>
              제출
            </button>
            <button data-testid="cancel-button" onClick={cancelModifyTodo}>
              취소
            </button>
          </div>
        </>
      ) : (
        <>
          <div>
            <button data-testid="modify-button" onClick={clickModifyButton}>
              수정
            </button>
            <button data-testid="delete-button" onClick={clickDeleteButton}>
              삭제
            </button>
          </div>
        </>
      )}
    </>
```
