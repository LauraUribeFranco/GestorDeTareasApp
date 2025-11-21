import { useState, useEffect } from "react";
import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

function App() {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [tareas, setTareas] = useState([]);

  // Cargar tareas al inicio
  useEffect(() => {
    const cargarTareas = async () => {
      const snapshot = await getDocs(collection(db, "tareas"));
      setTareas(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    cargarTareas();
  }, []);

  // Agregar tarea
  const agregarTarea = async () => {
    if (!titulo.trim() || !descripcion.trim()) return;

    await addDoc(collection(db, "tareas"), {
      titulo,
      descripcion,
    });

    setTitulo("");
    setDescripcion("");

    // Recargar tareas
    const snapshot = await getDocs(collection(db, "tareas"));
    setTareas(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  // Eliminar tarea
  const eliminarTarea = async (id) => {
    await deleteDoc(doc(db, "tareas", id));
    setTareas(tareas.filter((t) => t.id !== id));
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Gestor de Tareas</h1>

      <input
        placeholder="Título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />

      <input
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      />

      <button onClick={agregarTarea}>Agregar</button>

      <h2>Lista de tareas</h2>

      {tareas.map((tarea) => (
        <div key={tarea.id} style={{ marginBottom: "10px" }}>
          <strong>{tarea.titulo}</strong>
          <p>{tarea.descripcion}</p>
          <button onClick={() => eliminarTarea(tarea.id)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
}

export default App;
