import React, { useState } from 'react';

function ToDoList(){
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [newText, setNewText] = useState("");

    function handleInput(e){
        setNewTask(e.target.value)
    }

    function addT(){
        if(newTask.trim() !== ""){
            setTasks(t => [...t, newTask]);
            setNewTask("");
        }
    }

    function deleteT(id){
        const updatedTasks = tasks.filter((_, i) => i!==id);
        setTasks(updatedTasks);
        if(editingId === id){
            setEditingId(null);
            setNewText("");
        }
    }

    function moveUp(id){
        if(id > 0){
            const updatedTasks = [...tasks];
            [updatedTasks[id], updatedTasks[id-1]] = [updatedTasks[id-1], updatedTasks[id]];
            setTasks(updatedTasks);
        }
    }

    function moveDown(id){
        if(id < tasks.length-1){
            const updatedTasks = [...tasks];
            [updatedTasks[id], updatedTasks[id+1]] = [updatedTasks[id+1], updatedTasks[id]];
            setTasks(updatedTasks);
        }
    }

    function startEdit(id){
        setEditingId(id);
        setNewText(tasks[id]);
    }

    function saveEdit(id){
        if(newText.trim() !== ""){
            const updatedTasks = [...tasks];
            updatedTasks[id] = newText;
            setTasks(updatedTasks);
            setEditingId(null);
            setNewText("");
        }
    }

    function cancelEdit(){
        setEditingId(null);
        setNewText("");
    }

    return(
        <div className="ToDoList">
            <h1>TO-DO LIST</h1>
            <div>
                <input type="text" placeholder='Enter a task' value={newTask} onChange={handleInput}/>
                <button className='add-btn' onClick={addT}>Add</button>
            </div>
            <ol>
                {tasks.map((task, id) => 
                    <li key={id}>
                        {editingId === id ? (
                            <>
                                <input type="text" value={newText} onChange={(e) => setNewText(e.target.value)}/>
                                <button className='save-btn' onClick={() => saveEdit(id)}>Save</button>
                                <button className='cancel-btn' onClick={cancelEdit}>Cancel</button>
                            </>
                        ) : (
                            <>
                                <span className='text'>{task}</span>
                                <button className='edit-btn' onClick={() => startEdit(id)}>Edit</button>
                                <button className='delete-btn' onClick={() => deleteT(id)}>Delete</button>
                                <button className='move-btn' onClick={() => moveUp(id)}>⬆</button>
                                <button className='move-btn' onClick={() => moveDown(id)}>⬇</button>
                            </>
                        )}
                    </li>
                )}
            </ol>
        </div>
    )
}

export default ToDoList