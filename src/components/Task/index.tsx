import React from 'react'
import { TaskType } from '../../App'
import styles from './Task.module.scss'

type TaskProps = {
    id: string,
    value: string,
    todo: boolean,
    transfer: (obj: TaskType) => void,
    remove: (obj: TaskType) => void,
}

export const Task: React.FC<TaskProps> = ({ remove, transfer, id, value, todo }) => {

    return (
        <div className={styles.task__wrapper}>
            <div className={styles.item}><span>{value}</span></div>
            {todo &&
                <>
                    <div onClick={() => transfer({ id, value, todo: false })} className={styles.button}>
                        <svg width="25" height="25" viewBox="0 0 30 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g filter="url(#filter0_i_2_91)">
                                <path d="M3 18.3409L9.52023 28L27 3" stroke="#5BA95E" strokeWidth="7" />
                            </g>
                            <defs>
                                <filter id="filter0_i_2_91" x="0.0990906" y="0.994446" width="29.7693" height="37.1861" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                    <feOffset dy="4" />
                                    <feGaussianBlur stdDeviation="2" />
                                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                    <feBlend mode="normal" in2="shape" result="effect1_innerShadow_2_91" />
                                </filter>
                            </defs>
                        </svg>
                    </div>
                    <div className={styles.button}>
                        <svg width="25" height="25" viewBox="0 0 32 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M0 29.1889V37H6.75556L26.3111 14.1833L19.5556 6.37222L0 29.1889ZM31.4667 8.22222C32.1778 7.4 32.1778 6.16667 31.4667 5.34444L27.3778 0.616667C26.6667 -0.205556 25.6 -0.205556 24.8889 0.616667L21.6889 4.31667L28.4444 12.1278L31.4667 8.22222Z" fill="black" />
                        </svg>
                    </div>
                </>
            }
            <div onClick={() => remove({ id, value, todo })} className={styles.button}>
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 20 20">
                    <g fill="#d33">
                        <path d="M4.34 2.93l12.73 12.73-1.41 1.41L2.93 4.35z" />
                        <path d="M17.07 4.34L4.34 17.07l-1.41-1.41L15.66 2.93z" />
                    </g></svg>
            </div>
        </div>
    )
}
