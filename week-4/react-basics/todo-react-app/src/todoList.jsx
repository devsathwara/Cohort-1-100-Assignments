import { useState } from "react";
// import React  from "react";

const TodoList = ()=>{
 const [todo , setTodo]=useState([]);
 const [title,setTitle]=useState('');
 const [desc,setDesc]=useState('');
 const addTodo=()=>{
    const newTodo ={
        id:todo.length+1,
        title:title,
        Description : desc
    };
    setTodo((prevTodos)=>[...prevTodos,newTodo]);
    setTitle('');
    setDesc('');
    console.log(todo)
 }
 const deleteTodo=(id)=>{
    setTodo((prevTodos)=>prevTodos.filter((todo)=> todo.id!==id))
 }
 return(
    <>
    <h2>Add a todo</h2>
    <form>
        <label>Title</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/> <br/>
        <label>Description</label>
        <textarea value={desc} onChange={(e) => setDesc(e.target.value)} /><br/>
        <button type="button" onClick={addTodo}>ADD TODO</button>
    </form>
    <h2>Todo List</h2>
    <ul>
        {todo.map((item)=>(
            <li key={item.id} onClick={()=>deleteTodo(item.id)}>
                {item.title} - {item.Description}
            </li>
            ))}
    </ul>
    </>
 )
}

export default TodoList;