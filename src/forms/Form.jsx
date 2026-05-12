import React, { useState } from "react";

import { supabase } from "../utils/supabase";

const INIT_DATA = {
  breed: "",
  subBreed: "",
};

const Form = ({ onAddDog }) => {
  const [dogData, setDogData] = useState(INIT_DATA);

  function handleChange(e) {
    const { name, value } = e.target;
    setDogData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      breed: dogData.breed,
      sub_breed: dogData.subBreed || null,
    };

    await supabase.from("dogs").insert([payload]);

    onAddDog();

    setDogData(INIT_DATA);
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="breed">Dog Breed: </label>
      <input
        type="text"
        name="breed"
        value={dogData.breed}
        onChange={handleChange}
      />
      <label htmlFor="subBreed">Sub Breed: </label>
      <input
        type="text"
        name="subBreed"
        value={dogData.subBreed}
        onChange={handleChange}
      />

      <button type="submit">Add Dog</button>
    </form>
  );
};

export default Form;
