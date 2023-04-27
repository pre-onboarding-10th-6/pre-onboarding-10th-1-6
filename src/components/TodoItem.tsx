import React from "react";
import { requestDeleteTodo, requestUpdateTodo } from "../api/todo";
import useInput from "../hooks/useInput";
import useTodoContext from "../store/todo";

const TodoItem = ({ todo }: { todo: Todo }) => {
  const [editMode, setEditMode] = React.useState(false);
  const { toggleTodo } = useTodoContext();

  const handleToggle = () => {
    requestUpdateTodo({
      ...todo,
      isCompleted: !todo.isCompleted,
    }).then(() => {
      toggleTodo(todo.id)
    })
  }

  return <li>
    <input type="checkbox" checked={todo.isCompleted} onChange={handleToggle} />
    {
      editMode ?
        <TodoEdit todo={todo} resetEditMode={() => setEditMode(false)} />
        : <TodoInfo todo={todo} setEditMode={() => setEditMode(true)} />
    }
  </li>
}

const TodoInfo = ({ todo, setEditMode }: {
  todo: Todo,
  setEditMode: () => void
}) => {
  const { removeTodo } = useTodoContext()

  const handleRemove = () => {
    requestDeleteTodo(todo.id).then(() => {
      removeTodo(todo.id)
    })
  }

  return <>
    <span>{todo.todo}</span>
    <button onClick={setEditMode}>수정</button>
    <button onClick={handleRemove}>삭제</button>
  </>
}

const TodoEdit = ({ todo, resetEditMode }: {
  todo: Todo,
  resetEditMode: () => void
}) => {
  const { updateTodo } = useTodoContext()
  const [value, handleChange] = useInput(todo.todo)

  const handleUpdate = () => {
    requestUpdateTodo({
      ...todo,
      todo: value
    }).then(res => res.data)
      .then(todo => {
        updateTodo(todo.id, todo.todo)
        resetEditMode()
      })
  }

  return <>
    <input type="text" value={value} onChange={handleChange} />
    <button onClick={handleUpdate} >제출</button>
    <button onClick={resetEditMode}>취소</button>
  </>
}


export default TodoItem;
