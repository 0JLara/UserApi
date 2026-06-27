import React, { useState, useEffect } from "react";
import type { ChangeEvent } from "react";
import { useDelay } from "./CustomHooks/Debounce";
//Declaramos la interfaz para que el fetch() sepa el tipo de dato que va a recibir
interface Usuario {
  id: number;
  name: string;
  username: string;
  email: string;
}

export const TablaUsuarios = () => {
  //Constante para manejar la informacion del usuario de la api
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  //Verificamos que este cargando la información **
  const [cargando, setCargando] = useState(true);
  //Declaramos el usestate para realizar el filtrado desde el textbox
  const [filtrado, setFiltrado] = useState("");

  //Funcion para manejar los cambios del textbox
  const realizarFiltrado = (e: ChangeEvent<HTMLInputElement>) => {
    setFiltrado(e.target.value);
  };

  //Manejador del Debounce
  const debounceValue = useDelay(filtrado, 500);
  // Ejecutamos la llamada a la API al cargar el componente
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        setUsuarios(data);
        setCargando(false);
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
        setCargando(false);
      });
  }, []);

  const usuariosFiltrados = usuarios.filter((usuario) =>
    usuario.name.toLowerCase().includes(debounceValue.trim().toLowerCase()),
  );

  if (cargando) {
    return <p>Cargando datos...</p>;
  }

  return (
    <div className="contenedor-tabla">
      <h2>Lista de Usuarios</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Usuario</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {/* Iteramos sobre el arreglo de usuarios */}
          {usuariosFiltrados.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.name}</td>
              <td>{usuario.username}</td>
              <td>{usuario.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <input
        type="text"
        value={filtrado}
        placeholder="Escribe algo..."
        onChange={realizarFiltrado}
      />
    </div>
  );
};
