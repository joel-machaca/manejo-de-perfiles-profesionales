import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Context/UserContext";


const Navbar = () => {

  const { user } = useContext(UserContext)
  const [foto,setFoto]=useState('')
  const [nombre,setNombre]=useState('')

  useEffect(() => {
  const fetchFotoPerfil = async () => {
    if (!user) return;
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/profiles/me?user_id=${user.id}`
      );
      if (res.ok) {
        const data = await res.json();
        setFoto(data.foto_principal || null);
        setNombre(data.nombre || null)
      }
    } catch (error) {
      console.error("Error al traer la foto de perfil:", error);
    }
  };

  fetchFotoPerfil();
}, [user]);


  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container-fluid ">
        <Link className="navbar-brand fw-bold" to="/">
          Profesionales
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto gap-4 me-5">
            <li className="nav-item ">
              <Link className="nav-link text-light" to="/">
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" to="/login">
                Iniciar Sesión
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" to="/register">
                Registrarse
              </Link>
            </li>
            <li className="nav-item">
              {user && (
                <Link to="/editProfile">
                  <img
                    src={foto || '/default.jpg'}
                    alt={"user-" + nombre}
                    className="rounded-circle"
                    style={{ width: "40px", height: "40px" }}
                  />
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;