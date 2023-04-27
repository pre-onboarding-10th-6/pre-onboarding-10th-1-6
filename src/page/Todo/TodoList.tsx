import useTodoList from '../../hooks/useTodoList'
import { Todo } from '../../utils/types'

interface Props {
  todo: Todo
  onDelete: () => void
}

const TodoList = ({ todo, onDelete }: Props) => {
  const { handleCheckChange, handleButtonSubmit, todoStatus, inputRef } =
    useTodoList(todo, onDelete)

  const renderEditMode = () => (
    <>
      <input
        defaultValue={todoStatus.value}
        data-testid="modify-input"
        ref={inputRef}
      />
      <button data-testid="submit-button" onClick={handleButtonSubmit}>
        제출
      </button>
      <button data-testid="cancel-button" onClick={handleButtonSubmit}>
        취소
      </button>
    </>
  )

  const renderViewMode = () => (
    <>
      <span>{todoStatus.value}</span>
      <button data-testid="modify-button" onClick={handleButtonSubmit}>
        수정
      </button>
      <button data-testid="delete-button" onClick={handleButtonSubmit}>
        삭제
      </button>
    </>
  )

  return (
    <li>
      <label>
        <input
          type="checkbox"
          checked={todoStatus.isChecked}
          onChange={handleCheckChange}
        />
        {todoStatus.isEditMode ? renderEditMode() : renderViewMode()}
      </label>
    </li>
  )
}

export default TodoList
