import { useState, useEffect } from "react"

const API = "https://task-tracker-api.onrender.com"
function App() {

  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState("")
  const [darkMode, setDarkMode] = useState(false)

  async function getTasks() {

    const response = await fetch(`${API}/tasks`)

    const data = await response.json()

    setTasks(data)
  }

  useEffect(() => {
    getTasks()
  }, [])

  async function addTask() {

    if (!title) return

    await fetch(`${API}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: title
      })
    })

    setTitle("")

    getTasks()
  }

  async function completeTask(id) {

    await fetch(`${API}/tasks/${id}`, {
      method: "PUT"
    })

    getTasks()
  }

  async function deleteTask(id) {
    await fetch(`${API}/tasks/${id}`, {
      method: "DELETE"
    })

    getTasks()
  }


  return (

    <div 
      className={`min-h-screen p-10 transition-all duration-300
        ${
          darkMode
          ? "bg-gray-900"
          : "bg-gray-100"
        }
      `}
      >

      <button
          onClick={() => setDarkMode(!darkMode)}
          className="
            mb-6
            px-4
            py-2
            rounded-lg
            bg-black
            text-white
            sticky
            top-4
            right-4
            transition
          "
        >
          Toggle Dark Mode
        </button>

      <div className="max-w-xl mx-auto">

        <h1
          className={`
            text-4xl
            font-bold
            text-center
            mb-8

            ${
              darkMode
              ? "text-white"
              : "text-black"
            }
          `}
        >
          Task Tracker
        </h1>


        
        

        <div className="flex gap-3 mb-6">

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task"
            className={`
              flex-1
              p-3
              rounded-xl
              border
              outline-none
              transition-all

              ${
                darkMode
                ? "bg-gray-700 text-white border-gray-600"
                : "bg-white text-black"
              }

              focus:ring-2
              focus:ring-blue-400
            `}
          />

          <button
            onClick={addTask}
            className="
              bg-blue-500
              hover:bg-blue-600
              text-white
              px-5
              rounded-xl
              transition
            "
          >
            Add
          </button>

        </div>

        <div className="space-y-4">

          {
            tasks.map(task => (

              <div
                key={task.id}
                className={`
                p-4
                rounded-2xl
                shadow
                flex
                justify-between
                items-center
                transition-all
                duration-300

                ${
                  task.completed
                  ? "bg-green-300"
                  : darkMode
                    ? "bg-gray-800"
                    : "bg-white"
                }
              `}
              >

                <p
                  className={`
                    text-lg

                    ${
                      darkMode
                      ? "text-white"
                      : "text-black"
                    }

                    ${
                      task.completed
                      ? "line-through"
                      : ""
                    }
                  `}
                >
                  {task.title}
                </p>

                <div className="flex gap-2">

                  {
                    !task.completed && (
                      
                      <button
                        onClick={() => completeTask(task.id)}
                        className="
                          bg-green-500
                          hover:bg-green-600
                          text-white
                          px-4
                          py-2
                          rounded-lg
                        "
                      >
                        Complete
                      </button>
                    )
                  }

                  <button
                    onClick={() => deleteTask(task.id)}
                    className="
                      bg-red-500
                      hover:bg-red-600
                      text-white
                      px-4
                      py-2
                      rounded-lg
                    "
                  >
                    Delete
                  </button>

                </div>

              </div>
            ))
          }

        </div>

      </div>

    </div>
  )
}

export default App