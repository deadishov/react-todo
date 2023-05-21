import axios from 'axios';
import React from 'react';
import { useRef } from 'react';
import { Task } from './components/Task';
import './scss/app.scss';

const App: React.FC = () => {
  const [tasksData, setTasksData] = React.useState<TaskType[]>([])
  const input = useRef<HTMLInputElement>(null)

  type TaskType = {
    id: string,
    todo: boolean,
    inputValue: string
  }

  React.useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get('https://642c275ed7081590f933a5d3.mockapi.io/tasks')
      setTasksData(data)
    }
    fetchData()
  }, [])

  const addToTasks = async () => {
    const inputValue = input.current?.value
    const obj = { inputValue, todo: true }

    if (inputValue?.length) {
      const { data } = await axios.post('https://642c275ed7081590f933a5d3.mockapi.io/tasks', obj)
      setTasksData(prev => [...prev, data])
    } else {
      return
    }
  }

  return (
    <div className="wrapper">
      <div className="container">
        <div className="main-block">
          <div className="todo-add-line">
            <input ref={input} className="todo-input" placeholder='Хотите добавить что-то в список дел?' type='text' />
            <button onClick={addToTasks} className="add-button">Добавить</button>
          </div>
          <div className="list__pair">
            <div className="list__block">
              <div className="title">
                <h3>Список дел:</h3>
              </div>
              <ul className="list">
                {
                  tasksData.length ? tasksData.map((obj: TaskType) =>
                    <li key={obj.id}><Task value={obj.inputValue} todo={obj.todo} /></li>)
                    : <li>nothing</li>
                }
              </ul>
            </div>
            <div className="list__block">
              <div className="title">
                <h3>Выполненные дела:</h3>
              </div>
              <ul className="list">
                <li>nothing</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
