import React, { useState } from "react";
import axios from 'axios';

function AnularHora() {
  const [idHora, setIdHora] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleAnularHora = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/record/cancel/${idHora}`);
      setMensaje(response.data.message);
    } catch (error) {
      console.error("Error al anular la hora:", error);
      setMensaje("Error al anular la hora");
    }
  };

  return (
    <div>
      <h2>Anular Hora</h2>
      <input
        type="text"
        placeholder="ID de la hora"
        value={idHora}
        onChange={(e) => setIdHora(e.target.value)}
      />
      <button onClick={handleAnularHora}>Anular Hora</button>
      <p>{mensaje}</p>
    </div>
  );
}

export default AnularHora;
