# TODO 구현 설명

## 📁api/todos

제가 작성했던 코드는 fetch를 사용했었으나 devA에 맞게 axios로 변경하였습니다.

`authInstance` 와 `getInterCeptor` 사용하였습니다.

api들은 모두 async await 를 사용하였고 try catch 문으로 에러를 관리하였습니다.

(이유 말하기)

## 📁page/Todo

\*api는 모두 api/todos에서 가져와서 사용하였습니다.

1. todo 목록

useEffect를 사용하여 todo data를 맨 처음에 렌더링 해오도록 했습니다. token이 있고 todos (useState로 관리하는 값)의 길이가 0, 빈 배열일 때 불러오도록 했습니다.

2. todo 추가

input을 추적하고 관리할 필요가 없다고 생각하여 formData로 값을 주고 있습니다.
작성 한 뒤 값이 리셋되도록 하였습니다. useRef를 사용해 관리했습니다.

3. todo 완료 여부
