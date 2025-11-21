//se importaron las dependencias o librerias necesarias
import { useState, useEffect } from "react";
import { db } from "./firebase";
import {collection,} from "firebase/firestore";
import {addDoc,} from "firebase/firestore";
import {getDocs,} from "firebase/firestore";
import {deleteDoc,} from "firebase/firestore";
import {doc,} from "firebase/firestore";

function App() {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [tareas, setTareas] = useState([]);

  // Cargar tareas al inicio y lee la bd de "tareas"
  useEffect(() => {
    const crearTareas = async () => {
      const resultado  = await getDocs(collection(db, "tareas"));
      setTareas(resultado .docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    crearTareas();
  }, []);

  // funcion qye agega tarea
  const agregarTarea = async () => {
    if (!titulo.trim() || !descripcion.trim()) return;

    await addDoc(collection(db, "tareas"), {
      titulo,
      descripcion,
    });

    setTitulo("");
    setDescripcion("");

    // lista las tareas
    const resultado  = await getDocs(collection(db, "tareas"));
    setTareas(resultado .docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  // funcion que eliminar tarea
  const eliminarTarea = async (id) => {
    await deleteDoc(doc(db, "tareas", id));
    setTareas(tareas.filter((t) => t.id !== id));
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Gestor de Tareas</h1>

      <input
        placeholder="Ingresa la tarea"
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
        <div key={tarea.id} style={{ marginBottom: "20px" }}>
          <strong>{tarea.titulo}</strong>
          <p>{tarea.descripcion}</p>
          <button onClick={() => eliminarTarea(tarea.id)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
}

export default App;
