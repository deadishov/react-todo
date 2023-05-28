import React from 'react'
import { TaskType } from '../../App'
import styles from './Task.module.scss'
import svgCompleted from '../../assets/img/ok.svg'
import svgPen from '../../assets/img/pen.svg'
import svgClose from '../../assets/img/close.svg'
import axios from 'axios'

type TaskProps = {
    id: string,
    value: string,
    todo: boolean,
    toCompleted: (obj: TaskType) => void,
    remove: (obj: TaskType) => void
}

export const Task: React.FC<TaskProps> = ({ toCompleted, remove, id, value, todo }) => {
    const [taskName, setTaskName] = React.useState(value)

    const changeTaskName = () => {
        const newTaskName = prompt('Введите новое название задачи', taskName)?.trim()
        if (newTaskName !== taskName || newTaskName !== null) {
            axios.put(`https://646d077b7b42c06c3b2c71f8.mockapi.io/tasks/${id}`, { value: newTaskName })
        }
        return newTaskName ? newTaskName : taskName
    }

    const transfer = async () => {
        try {
            const { data } = await axios.put(`https://646d077b7b42c06c3b2c71f8.mockapi.io/tasks/${id}`, { todo: false })
            toCompleted(data)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={styles.task__wrapper}>
            <div className={styles.item}><span>{taskName}</span></div>
            {todo &&
                <>
                    <div onClick={transfer} className={styles.button}>
                        <img src={svgCompleted} alt="" />
                    </div>
                    <div onClick={() => setTaskName(changeTaskName)} className={styles.button}>
                        <img src={svgPen} alt="" />
                    </div>
                </>
            }
            <div onClick={() => remove({ id, value, todo })} className={styles.button}>
                <img src={svgClose} alt="" />
            </div>
        </div>
    )
}
