import { useState } from "react";

function AddTodo() {
  const [task, setTask] = useState("");
  const [date, setDate] = useState("");

  const handleAdd = () => {
    if (!task || !date) {
      alert("Please enter both task and date");
      return;
    }

    const existing = JSON.parse(localStorage.getItem("todos")) || [];
    const newTask = { task, date, completed: false };
    const updated = [...existing, newTask];
    localStorage.setItem("todos", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage")); // notify others
    setTask("");
    setDate("");
  };

  return (
    <div className="row kg-row">
      <div className="col-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter Todo here"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
      </div>
      <div className="col-2">
        <input
          type="date"
          className="form-control"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div className="col-1">
        <button type="button" className="btn btn-success kg-button" onClick={handleAdd}>
          Add
        </button>
      </div>
    </div>
  );
}

export default AddTodo;
