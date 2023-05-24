import React from 'react'
import { TaskType } from '../../App'
import styles from './Task.module.scss'
import svgCompleted from '../../assets/img/ok.svg'
import svgPen from '../../assets/img/pen.svg'
import svgClose from '../../assets/img/close.svg'

type TaskProps = {
    id: string,
    value: string,
    todo: boolean,
    transfer: (obj: TaskType) => void,
    remove: (obj: TaskType) => void,
}

export const Task: React.FC<TaskProps> = ({ remove, transfer, id, value, todo }) => {
    const [taskName, setTaskName] = React.useState(value)
    const changeTaskName = () => {
        const newTaskName = prompt(('Введите новое название задачи'))?.trim()
        return newTaskName ? newTaskName : taskName
    }

    return (
        <div className={styles.task__wrapper}>
            <div className={styles.item}><span>{taskName}</span></div>
            {todo &&
                <>
                    <div onClick={() => transfer({ id, value, todo: false })} className={styles.button}>
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
