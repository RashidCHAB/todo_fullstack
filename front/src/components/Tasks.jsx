import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector, } from "react-redux"
import { addTask, fetchtasks } from '../features/todoReducer';
import Task from './Task';
import "./Tasks.css"
const Tasks = () => {
    const tasks = useSelector((state) => state.tasks)
    const error = useSelector((state) => state.error)
    const loading = useSelector((state) => state.loading)
    const dispatch = useDispatch()

    const [text, setText] = useState("")
    const [ph, setPH] = useState('enter text')
    useEffect(() => {
        dispatch(fetchtasks())
    }, [dispatch])

    if (loading) {
        return (
            <div className="loader"></div>
        )
    }
    if (error) {
        return <h1>error: {error}</h1>
    }

    const handleText = (e) => {
        setText(e.target.value)
    }
    const handleAddTask = (e) => {
        e.preventDefault()
        if (!text) {
            setPH("ENTER TEXT!!!!!!!!!!!!!!!!!!")
            return
        }

        dispatch(addTask({title: text}))
        setText("")
        setPH('enter text')
    }
    return (
        <div className='taskList'>  
        <h2>TodoList</h2>
        <form onSubmit={handleAddTask}>
            <input type="text" placeholder={ph} value={text} onChange={handleText} />
            <button onClick={handleAddTask}>Add</button>
        </form>
            
            {tasks.map((task) => {
                return <Task key={task._id} title={task.title} completed={task.completed} id={task._id} loading={task.loading}/>
            })}
        </div>
    );
};

export default Tasks;