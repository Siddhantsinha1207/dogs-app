import { useState, useEffect } from "react";
import { supabase } from "./utils/supabase";

export default function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function getTodos() {
      const { data: todos } = await supabase.from("dogs").select();

      if (todos) {
        setTodos(todos);
      }
    }

    getTodos();
  }, []);

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.breed}</li>
      ))}
    </ul>
  );
}
