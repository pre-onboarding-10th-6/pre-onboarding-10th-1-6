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
        className={
          'm-1 text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm w-20 text-center bg-green-700 dark:bg-green-700 dark:hover:bg-green-900 dark:focus:ring-primary-800border-2 cursor-pointer  hover:bg-slate-300 active:bg-slate-500'
        }
        onClick={handleButtonSubmit('SUBMIT')}
      >
        제출
      </button>
      <button
        data-testid="cancel-button"
        className={
          'm-1 text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm w-20 text-center bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-800 dark:focus:ring-primary-800border-2 cursor-pointer  hover:bg-slate-300 active:bg-slate-500'
        }
        onClick={handleButtonSubmit('CANCEL')}
      >
        취소
      </button>
    </>
  )

  const renderViewMode = () => (
    <>
      <span className={'text-black sm:text-base w-10'}>{todo.todo}</span>
      <button
        data-testid="modify-button"
        className={
          'm-1 text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm w-20 text-center bg-green-700 dark:bg-green-700 dark:hover:bg-green-900 dark:focus:ring-primary-800border-2 cursor-pointer  hover:bg-slate-300 active:bg-slate-500'
        }
        onClick={handleButtonSubmit('MODIFY')}
      >
        수정
      </button>
      <button
        data-testid="delete-button"
        className={
          'm-1 text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm w-20 text-center bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-800 dark:focus:ring-primary-800border-2 cursor-pointer  hover:bg-slate-300 active:bg-slate-500'
        }
        onClick={handleButtonSubmit('DELETE')}
      >
        삭제
      </button>
    </>
  )

  return (
    <li className={'flex m-3'}>
      <label className={'align-middle'}>
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
}

export default TodoItem
