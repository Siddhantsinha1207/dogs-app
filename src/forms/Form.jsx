import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

const INIT_DATA = {
  breed: "",
  subBreed: "",
};

const Form = ({ onAddDog, selectedDog, setSelectedDog }) => {
  const [dogData, setDogData] = useState(INIT_DATA);

  useEffect(() => {
    if (selectedDog) {
      setDogData({
        breed: selectedDog.breed || "",
        subBreed: selectedDog.sub_breed || "",
      });
    } else {
      setDogData(INIT_DATA);
    }
  }, [selectedDog]);

  function handleChange(e) {
    const { name, value } = e.target;
    setDogData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!dogData.breed.trim()) return;

    const payload = {
      breed: dogData.breed,
      sub_breed: dogData.subBreed || null,
    };

    let error = null;

    if (selectedDog) {
      const { data, error } = await supabase
        .from("dogs")
        .update(payload)
        .eq("id", selectedDog.id)
        .select();

      console.log("update response:", { data, error });
    } else {
      const response = await supabase.from("dogs").insert([payload]);

      error = response.error;
    }

    if (error) {
      console.log(error);
      return;
    }

    await onAddDog();

    setDogData(INIT_DATA);
    setSelectedDog(null);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-5 rounded-xl shadow space-y-4"
    >
      <h2 className="text-lg font-semibold">
        {selectedDog ? "Edit Dog" : "Add Dog"}
      </h2>

      <input
        className="border rounded px-3 py-2 w-full"
        name="breed"
        placeholder="Breed"
        value={dogData.breed}
        onChange={handleChange}
      />

      <input
        className="border rounded px-3 py-2 w-full"
        name="subBreed"
        placeholder="Sub Breed"
        value={dogData.subBreed}
        onChange={handleChange}
      />

      <button
        type="submit"
        className="w-full bg-green-500 text-white py-2 rounded cursor-pointer hover:bg-green-600"
      >
        {selectedDog ? "Update Dog" : "Add Dog"}
      </button>
    </form>
  );
};

export default Form;
