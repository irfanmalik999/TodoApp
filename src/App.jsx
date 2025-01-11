import React, { useState, useEffect } from "react"
import Navbar from "./components/Navbar"
// import { v4 as uuidv4 } from 'uuid';     // it generates every time new id
import { nanoid } from 'nanoid'
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setShowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])
  

  const saveToLocalStorage = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }  

  const toggleFineshed = (e) => {
    setShowFinished(!showFinished)
  }


  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleAdd = () => {
    setTodos([...todos, {id:nanoid(), todo, isCompleted:false}])
    setTodo("")
    saveToLocalStorage()
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    console.log(`The id is ${id}`)
    let index = todos.findIndex(item => {
      return item.id === id
    })
    console.log(index)
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLocalStorage()

  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id != id;
    });
    setTodos(newTodos)
    saveToLocalStorage()
  }

  const handleEdit = (e, id) => {
    let t = todos.filter( i =>  i.id === id  )
    setTodo(t[0].todo)
    // uske baad preEdit wali todo ko delete kar de rahe hain 🏳️
    let newTodos = todos.filter((item) => {
      return item.id != id;
    });
    setTodos(newTodos)
    saveToLocalStorage()
  }

  

  return (
    <>
      <Navbar/>
      <div className=" mx-3 md:container md:mx-auto my-5 rounded-xl p-5  bg-violet-200 min-h-[80vh] md:w-1/2 ">
        <div className="addTodo my-5 " >
          
          <h2 className="text-lg font-bold " >Add a Todo</h2>
          <input onChange={handleChange} value={todo} type="text" placeholder=" Enter your Todo here" className="
          md:w-[570px] md:h-10 rounded-md " />
          <button onClick={handleAdd} disabled={todo.length<=3} 
          className="bg-violet-800 disabled:bg-violet-700 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-6 w-20 md:h-10 " >
            { todo.length === 0 && <h1>Add</h1> || <h1>Save</h1> }
          </button>
        </div>
          <input onChange={toggleFineshed} type="checkbox" checked={showFinished} className="cursor-pointer" />  Show Finished

        {todos.length === 0 && <h1 className="text-lg font-bold" >No Todos to Display !</h1>
              ||<h2 className="text-lg font-bold">Your Todos are Below</h2>
            }
          <div className="todos">
            
            {todos.map((item) => {
            return (showFinished || !item.isCompleted) && <div key={item.id} className={"todo bg-pink-300 flex my-4 justify-between rounded-lg px-2 "}>
              <div className=" flex gap-5" >
                <input  name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" className="cursor-pointer mx-2 " />
                <div className={item.isCompleted?"line-through   columns-auto column-gap-4 lg:column-gap-8 xl:column-gap-12 md:column-count-1 sm:column-count-1 xs:column-count-1 py-4 "    :     "columns-auto column-gap-4 py-4 lg:column-gap-8 xl:column-gap-12 md:column-count-1 sm:column-count-1 xs:column-count-1"} >{item.todo}</div>
              </div>
          
              <div className="buttons   flex ">
                <button onClick={ (e) => handleEdit(e, item.id)} className="bg-violet-800 h-8 hover:bg-violet-950 p-1 py-1 text-sm font-bold text-white rounded-md mx-1 my-4"> <FaEdit className="w-8 h-4 " /> </button>
                <button onClick={ (e) => handleDelete(e,item.id)} className="bg-violet-800 h-8 hover:bg-violet-950 p-1 py-1 text-sm font-bold text-white rounded-md mx-1 my-4 "><RiDeleteBin5Fill className="w-7 h-4" /> </button>
              </div>
          </div>

           })}
        </div>
      </div>
    </>
    
  )
}

export default App
