import Input from '../../components/Input'
import useTodoItem from '../../hooks/useTodoItem'
import { Todo } from '../../types'

interface Props {
  todo: Todo
}
const TodoItem = ({ todo }: Props) => {
  const { handleCheckChange, handleButtonSubmit, isEditMode, inputRef } =
    useTodoItem(todo)

  const renderEditMode = () => (
    <>
      <Input testid="modify-input" ref={inputRef} defaultValue={todo.todo} />
      <button
        data-testid="submit-button"
        onClick={handleButtonSubmit('SUBMIT')}
      >
        제출
      </button>
      <button
        data-testid="cancel-button"
        onClick={handleButtonSubmit('CANCEL')}
      >
        취소
      </button>
    </>
  )

  const renderViewMode = () => (
    <>
      <span>{todo.todo}</span>
      <button
        data-testid="modify-button"
        onClick={handleButtonSubmit('MODIFY')}
      >
        수정
      </button>
      <button
        data-testid="delete-button"
        onClick={handleButtonSubmit('DELETE')}
      >
        삭제
      </button>
    </>
  )

  return (
    <li>
      <label>
        <input
          type="checkbox"
          checked={todo.isCompleted}
          onChange={handleCheckChange}
        />
        {isEditMode ? renderEditMode() : renderViewMode()}
      </label>
    </li>
  )
}

export default TodoItem
