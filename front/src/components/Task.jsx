import React from 'react';
import { useDispatch } from 'react-redux';
import { completeTask, deleteTask } from '../features/todoReducer';
import './Tasks.css'
const Task = ({ title, completed, id, loading }) => {
    const dispatch = useDispatch()

    const handlePriority = () => {
        dispatch(completeTask({ id, completed }))
    }
    const handleDelete = () => {
        dispatch(deleteTask({ id }))
    }
    if (loading) {
        return "↻"
    }
    return (
        <div className='main'>
            <button onClick={handlePriority}>✓</button>
            <div className={completed ? 'taskP' : 'task'}>{title}</div>
            <button onClick={handleDelete}>✗</button>
        </div>
    );
};

export default Task;
