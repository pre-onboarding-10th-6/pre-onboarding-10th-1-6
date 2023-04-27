# 6-A devA 브랜치

## 로그인 부분 api 수정

- 로그인 부분 async await 으로 변경
- Promise<any> 반환 부분은 <AxiosResponse<SignInResponse>> 으로
  acsses_token 의 타입 지정 string 으로 들어오기에 string 으로 지정
- 로그인 부분의 error 부분의 타입에러를 unknown 으로 타입을 받고
  instanceof AxiosError 로 받은 객체가 AxiosError 인 체크

## todo 추가 기능

- Promise<AxiosResponse<StatusInResponse>> 로 반환값 지정
- StatusInResponse type alias 를 [status:number]:number 로
  status 객체 프로퍼티의 number 를 지정

## todo 수정 기능

- 위와 동일하게 반환값 지정
- rest 로 인자 전달

## todo 삭제 기능

- 위와 동일
