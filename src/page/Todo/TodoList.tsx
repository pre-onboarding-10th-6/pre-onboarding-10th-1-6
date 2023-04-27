import useTodoList from '../../hooks/useTodoList'

const TodoList = ({ todo, onDelete }: any) => {
  const { handleCheckChange, MutateButtons, todoStatus, inputRef } =
    useTodoList(onDelete, todo)

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
