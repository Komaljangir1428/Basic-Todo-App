import { useEffect, useState } from "react";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all"); // all, completed, incomplete
  const [sortBy, setSortBy] = useState("none"); // none, name, date

  useEffect(() => {
    loadTodos();
    window.addEventListener("storage", loadTodos);
    return () => window.removeEventListener("storage", loadTodos);
  }, []);

  const loadTodos = () => {
    const stored = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(stored);
  };

  const deleteTask = (index) => {
    const updated = todos.filter((_, i) => i !== index);
    localStorage.setItem("todos", JSON.stringify(updated));
    setTodos(updated);
  };

  const toggleComplete = (index) => {
    const updated = [...todos];
    updated[index].completed = !updated[index].completed;
    localStorage.setItem("todos", JSON.stringify(updated));
    setTodos(updated);
  };

  const applyFilter = (list) => {
    if (filter === "completed") return list.filter((t) => t.completed);
    if (filter === "incomplete") return list.filter((t) => !t.completed);
    return list;
  };

  const applySort = (list) => {
    const sorted = [...list];
    if (sortBy === "name") {
      sorted.sort((a, b) => a.task.localeCompare(b.task));
    } else if (sortBy === "date") {
      sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
    }
    return sorted;
  };

  const displayedTodos = applySort(applyFilter(todos));

  return (
    <div>
      <div className="row mb-3">
        <div className="col-3">
          <select className="form-select" value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All Tasks</option>
            <option value="completed">Completed</option>
            <option value="incomplete">Incomplete</option>
          </select>
        </div>
        <div className="col-3">
          <select className="form-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="none">No Sorting</option>
            <option value="name">Sort by Task Name</option>
            <option value="date">Sort by Date</option>
          </select>
        </div>
      </div>

      {displayedTodos.map((todo, index) => (
        <div className="row kg-row" key={index}>
          <div className="col-3" style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
            {todo.task}
          </div>
          <div className="col-2">{todo.date}</div>
          <div className="col-1">
            <button className="btn btn-warning kg-button" onClick={() => toggleComplete(index)}>
              {todo.completed ? "Undo" : "Done"}
            </button>
          </div>
          <div className="col-1">
            <button className="btn btn-danger kg-button" onClick={() => deleteTask(index)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TodoList;
