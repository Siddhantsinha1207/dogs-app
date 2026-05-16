import { useState, useEffect } from "react";
import { supabase } from "./utils/supabase";
import Form from "./forms/Form";

export default function App() {
  const [dogs, setDogs] = useState([]);
  const [selectedDog, setSelectedDog] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getDogs() {
    setLoading(true);

    const { data, error } = await supabase.from("dogs").select();

    if (error) {
      console.log("Fetch error:", error);
      setLoading(false);
      return;
    }

    setDogs(data || []);
    setLoading(false);
  }
  console.log(selectedDog, "SelectedDog");

  async function handleDelete(id) {
    const { error } = await supabase.from("dogs").delete().eq("id", id);

    if (error) {
      console.log("Delete error:", error);
      return;
    }

    getDogs();
  }

  function handleEdit(dog) {
    setSelectedDog(dog);
  }

  useEffect(() => {
    getDogs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-6">
      <div className="w-full max-w-xl space-y-6">
        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-gray-800">
          🐶 Dog Manager
        </h1>

        <Form
          onAddDog={getDogs}
          selectedDog={selectedDog}
          setSelectedDog={setSelectedDog}
        />

        <ul className="space-y-3">
          {loading ? (
            <p className="text-center text-gray-500">Loading dogs... 🐶</p>
          ) : dogs.length === 0 ? (
            <p className="text-center text-gray-500">No dogs found 🐶</p>
          ) : (
            dogs.map((dog) => {
              const isSelected = selectedDog?.id === dog.id;

              return (
                <li
                  key={dog.id}
                  className={`p-4 rounded-xl shadow flex justify-between items-center transition
          ${
            isSelected
              ? "bg-blue-50 border border-blue-400"
              : "bg-white hover:shadow-md"
          }`}
                >
                  <div>
                    <p className="font-semibold text-gray-800 flex items-center gap-2">
                      {dog.breed}

                      {isSelected && (
                        <span className="text-xs text-blue-600 font-medium">
                          Editing
                        </span>
                      )}
                    </p>

                    {dog.sub_breed && (
                      <p className="text-sm text-gray-500">{dog.sub_breed}</p>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(dog)}
                      className="cursor-pointer px-3 py-1 text-sm rounded bg-blue-500 text-white hover:bg-blue-600 transition"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(dog.id)}
                      className="cursor-pointer px-3 py-1 text-sm rounded bg-red-500 text-white hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              );
            })
          )}
        </ul>
      </div>
    </div>
  );
}
