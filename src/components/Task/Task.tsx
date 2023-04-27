import styles from './Task.module.css';
import { Check, Trash } from 'phosphor-react';

export interface TaskInterface {
    id: string,
    description: string,
    checked: boolean
}

export interface TaskProps {
    task: TaskInterface,
    onCheckTask: (id: string) => void,
    onDeleteTask: (id: string) => void
}

export function Task({task, onCheckTask, onDeleteTask}: TaskProps) {

    function handleCheckTask(){
        onCheckTask(task.id)
    }

    function handleDeleteTask(){
        onDeleteTask(task.id)
    }

    return (
        <li key={task.id} className={styles.container}>
            <div className={styles.checkAndDescriptionSection}>
                <button className={styles.check} onClick={handleCheckTask}>
                    <div className={task.checked ? styles.checked : styles.unchecked}>
                        {
                            task.checked && <Check size={12} color='#F2F2F2' />                                                              
                        }
                    </div> 
                </button>     
                <span className={task.checked ? styles.checkedDescription : styles.description}>
                    {task.description}
                </span>
            </div>
            <button onClick={handleDeleteTask} className={styles.trashSection}>
                <Trash size={18} color='#808080' />
            </button>
        </li>
    )
}