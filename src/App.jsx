import { useState, useEffect } from "react";
import { supabase } from "./utils/supabase";
import Form from "./forms/Form";

export default function App() {
  const [dogs, setDogs] = useState([]);

  async function getTodos() {
    const { data: dogs } = await supabase.from("dogs").select();

    if (dogs) {
      setDogs(dogs);
    }
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <ul>
      <Form onAddDog={getTodos} />
      {dogs.map((dog) => (
        <li key={dog.id}>
          {dog.breed} {dog.sub_breed ? `- ${dog.sub_breed}` : ""}
        </li>
      ))}
    </ul>
  );
}
