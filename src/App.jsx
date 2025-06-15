import AddTodo from "./components/AddTodo";
import AppName from "./components/AppName";
import TodoList from "./components/TodoList"; 
import "./App.css";

function App() {
  return (
    <center className="todo-container">
      <AppName />
      <div className="items-container">
        <AddTodo />
        <TodoList /> {/* ✅ show dynamic list here */}
      </div>
    </center>
  );
}

export default App;
