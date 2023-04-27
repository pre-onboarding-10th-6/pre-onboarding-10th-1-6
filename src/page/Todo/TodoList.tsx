import useTodoList from '../../hooks/useTodoList'
import { Todo } from '../../utils/types'

interface Props {
  todo: Todo
  onDelete: () => void
}

const TodoList = ({ todo, onDelete }: Props) => {
  const { handleCheckChange, MutateButtons, todoStatus, inputRef } =
    useTodoList(todo, onDelete)

  return (
    <li>
      <label>
        <input
          type="checkbox"
          checked={todoStatus.isChecked}
          onChange={handleCheckChange}
        />
        {todoStatus.isEditMode ? (
          <input
            defaultValue={todoStatus.value}
            data-testid="modify-input"
            ref={inputRef}
          />
        ) : (
          <span>{todoStatus.value}</span>
        )}
      </label>
      <MutateButtons />
    </li>
  )
}

export default TodoList
