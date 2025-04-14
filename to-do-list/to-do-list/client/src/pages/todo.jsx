import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

import AddModal from "../components/AddModal";

function Todo() {
    const [titles, setTitles] = useState([])
    const [showModal, setShowModal] = useState(false);

    //handle side effect
    useEffect(() => {
        const getTitles = async() => {
            await axios.get(`${process.env.ENDPOINT_URL}/get-titles`)
            .then(response => {
                setTitles(response.data.titles)
            })
        }
    });

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [error, setError] = useState(null);

  // Fetch tasks from API
  useEffect(() => {
    axios
      .get(`${process.env.ENDPOINT_URL}/get-titles`)
      .then((response) => setTasks(response.data))
      .catch((error) => setError("Error fetching tasks"));
  }, []);

  // Add a new task
  const addTask = async () => {
    if (newTask.trim() === "") return;

    try {
      const response = await axios.post(`${process.env.ENDPOINT_URL}/tasks`, {
        text: newTask,
        status: "ongoing",
      });

      setTasks([...tasks, response.data]); // Add the new task to the state
      setNewTask("");
    } catch (error) {
      setError("Error adding task");
    }
  };

  // Move task between Ongoing and Done
  const moveTask = async (id, currentStatus) => {
    const updatedStatus = currentStatus === "ongoing" ? "done" : "ongoing";

    try {
      await axios.put(`${process.env.ENDPOINT_URL}/tasks/${id}`, { status: updatedStatus });

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, status: updatedStatus } : task
        )
      );
    } catch (error) {
      setError("Error updating task status");
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-r from-pink-300 to-purple-400">
      <div className="w-[500px] bg-blue-700 text-white rounded-lg p-6">
        <h1 className="text-center text-xl font-bold">To-Do List</h1>

        {error && (
          <div className="bg-red-500 text-white p-2 rounded-lg text-center my-2">
            {error}
          </div>
        )}

        <div className="flex justify-between mt-4">
          {/* ONGOING TASKS */}
          <div className="w-1/2 p-3 bg-white rounded-lg text-black">
            <h2 className="text-center font-semibold mb-2">ONGOING</h2>
            <div class="task">to do 1</div>
            <div class="task">to do 1</div>
            {titles
              .filter((title) => title.status === "ongoing")
              .map((title) => (
                <div
                  key={title.id}
                  className="bg-pink-300 p-2 rounded-lg text-center mb-2 cursor-pointer"
                  onClick={() => moveTitles(title.id, title.status)}
                >
                  {title.text}
                </div>
              ))}
          </div>

          {/* DONE TASKS */}
          <div className="w-1/2 p-3 bg-white rounded-lg text-black">
            <h2 className="text-center font-semibold mb-2">DONE</h2>
            <div class="task">e</div>
            <div class="task">j</div>
            {titles
              .filter((title) => title.status === "done")
              .map((title) => (
                <div
                  key={title.id}
                  className="bg-gray-300 p-2 rounded-lg text-center mb-2 cursor-pointer"
                  onClick={() => moveTitles(title.id, title.status)}
                >
                  {title.text}
                </div>
              ))}
          </div>
        </div>

        {/* ADD TASK INPUT */}
        <div className="flex justify-center mt-4">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="p-2 border rounded-lg text-black"
            placeholder="New task..."
          />
          <button
            onClick={() => setShowModal(true)}
            className="ml-2 bg-green-500 text-white px-4 py-2 rounded-lg"
          >
            +
          </button>
        </div>
        { showModal && <AddModal hide={() => setShowModal(false)} /> }
      </div>
    </div>

  );
}
 
export default Todo; 