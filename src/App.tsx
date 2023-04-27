import './global.css';
import styles from './App.module.css';
import {FormEvent, useState, useEffect} from 'react';
import Clipboard from './assets/Clipboard.svg';

import { PlusCircle } from 'phosphor-react';
import uuid from 'react-uuid';

import { Header } from './components/Header/Header';
import { Task, TaskInterface } from './components/Task/Task';

function App() {

  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [taskList, setTaskList] = useState<TaskInterface[]>([]);
  const [totalDoneTasks, setTotalDoneTasks] = useState<number>(0);

  useEffect(() => {
    const countDoneTasks = taskList.reduce((accumulator, task) => {
      if (task.checked) {
        return accumulator + 1;
      }
      return accumulator;
    }, 0);
    setTotalDoneTasks(countDoneTasks);
  }, [taskList])

  function handleAddTask(event: FormEvent){
    event?.preventDefault();
    const newTask: TaskInterface = {
      id: uuid(),
      checked: false,
      description: newTaskDescription
    };
    setTaskList((state) => [newTask, ...state]);
    setNewTaskDescription('');
  }

  function checkTask(taskId: string){
    console.log('checkTask', taskId);
    const updatedTasks: TaskInterface[] = taskList.map(task => {
      if (task.id === taskId) {
        return {
          id: task.id,
          checked: !task.checked,
          description: task.description
        } as TaskInterface;
      } else {
        return task;
      }
    })
    setTaskList(updatedTasks);
  }

  function deleteTask(taskId: string){
    const updatedTasks = taskList.filter(task => {
      return task.id !== taskId
    });
    setTaskList(updatedTasks);
  }

  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.main}>
        <form className={styles.form}>
          <textarea 
            name='newTaskText'
            placeholder='Adicione uma nova tarefa'
            value={newTaskDescription}
            onChange={(event) => {setNewTaskDescription(event.target.value)}}
            required
          />
          <button type='submit' onClick={handleAddTask}>
            Criar
            <PlusCircle size={19} color='#F2F2F2' />
          </button>  
        </form>  
        <div className={styles.taskList}>
          <div className={styles.taskListHeader}> 
            <div className={styles.taskListHeaderLeft}>
              <span className={styles.taskListHeaderLeftText}>
                Tarefas criadas
              </span>
              <span className={styles.counter}>
                {taskList.length}
              </span>
            </div>
            <div className={styles.taskListHeaderRight}>
              <span className={styles.taskListHeaderRightText}>
                Concluídas
              </span>
              <span className={styles.counter}>
                {totalDoneTasks}
              </span>
            </div>
          </div>
          {taskList.length > 0 &&
            taskList.map(taskItem => {
              return (
                <ul>
                  <Task 
                    task={taskItem}
                    onCheckTask={checkTask} 
                    onDeleteTask={deleteTask}
                  />
                </ul>
              )
            })
          }
          {taskList.length == 0 &&
            <div className={styles.taskListEmptyContent}> 
              <img src={Clipboard} />
              <span className={styles.taskListEmptyContentTitle}>Você ainda não tem tarefas cadastradas</span>
              <span className={styles.taskListEmptyContentSubtitle}>Crie tarefas e organize seus itens a fazer</span>
            </div>
          }
        </div>
      </main>
    </div>
  )
}

export default App
