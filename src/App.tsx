import axios from 'axios';
import React from 'react';
import { useRef } from 'react';
import { Task } from './components/Task';
import './scss/app.scss';

export type TaskType = {
  id: string,
  todo: boolean,
  value: string
}

const App: React.FC = () => {
  const [tasksData, setTasksData] = React.useState<TaskType[]>([])
  const [completedTasks, setCompletedTasks] = React.useState<TaskType[]>([])
  const [inputString, setInputString] = React.useState('')
  const input = useRef<HTMLInputElement>(null)


  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [taskResponse, completedResponse] = await Promise.all([
          axios.get('https://646d077b7b42c06c3b2c71f8.mockapi.io/tasks'),
          axios.get('https://646d077b7b42c06c3b2c71f8.mockapi.io/completed')
        ])

        setTasksData(taskResponse.data)
        setCompletedTasks(completedResponse.data)
      } catch (error) {
        alert('Не удалось получить данные о задачах!')
        console.log(error);
      }
    }
    fetchData()
  }, [])


  const addToTasks = async () => {
    const inputValue = input.current?.value

    try {
      if (inputValue?.trim()?.length) {
        const task = { value: inputValue, todo: true }
        const { data } = await axios.post('https://646d077b7b42c06c3b2c71f8.mockapi.io/tasks', task)
        setTasksData(prev => [...prev, data])
        setInputString('')
      } else {
        alert('Введите текст в поле для задач!')
      }
    } catch (error) {
      alert('Не удалось добавить задачу!')
      console.log(error);
    }
  }

  const addByEnterPress = (e: { key: string; }) => {
    if (e.key === 'Enter') {
      addToTasks()
    }
  }

  const removeFromTasks = async (obj: TaskType) => {
    try {
      setTasksData(prev => prev.filter(item => item.id !== obj.id))
      await axios.delete(`https://646d077b7b42c06c3b2c71f8.mockapi.io/tasks/${obj.id}`)
    } catch (error) {
      alert('Не удалось удалить задачу!')
      console.log(error);
    }
  }

  const removeFromCompleted = async (obj: TaskType) => {
    try {
      setCompletedTasks(prev => prev.filter(item => item.id !== obj.id))
      await axios.delete(`https://646d077b7b42c06c3b2c71f8.mockapi.io/completed/${obj.id}`)
    } catch (error) {
      alert('Не удалось удалить задачу!')
      console.log(error);
    }
  }

  const transferToCompleted = async (obj: TaskType) => {
    try {
      removeFromTasks(obj)
      setCompletedTasks(prev => [...prev, obj])
      await axios.post('https://646d077b7b42c06c3b2c71f8.mockapi.io/completed', obj)
    } catch (error) {
      alert('Не удалось перевести задачу в выполненные!')
      console.log(error);
    }
  }

  const removeTask = (obj: TaskType) => {
    if (obj.todo) {
      removeFromTasks(obj)
    } else {
      removeFromCompleted(obj)
    }
  }

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputString(e.target.value)
  }

  return (
    <div className="wrapper">
      <div className="container">
        <div className="main-block">
          <div className="todo-add-line">
            <input onChange={onChangeInput} value={inputString} onKeyDown={addByEnterPress} ref={input} className="todo-input" placeholder='Хотите добавить что-то в список дел?' type='text' />
            <button onClick={addToTasks} className="add-button">Добавить</button>
          </div>
          <div className="row">
            <div className="column">
              <div className="title">
                <h3>Список дел:</h3>
              </div>
              <ul className="list">
                {
                  tasksData.length ? tasksData.map((obj) =>
                    <li key={obj.id}><Task remove={removeTask} transfer={transferToCompleted} {...obj} /></li>)
                    : <li>Задач нет.</li>
                }
              </ul>
            </div>
            <div className="column">
              <div className="title">
                <h3>Выполненные дела:</h3>
              </div>
              <ul className="list">
                {
                  completedTasks.length ? completedTasks?.map((obj) =>
                    <li key={obj.id}><Task remove={removeTask} transfer={transferToCompleted} {...obj} /></li>)
                    : <li>На данный момент, нет выполненных дел.</li>
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;