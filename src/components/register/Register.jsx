import { useState } from "react";
import { Link } from "react-router-dom"

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSignup = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMensaje(data.detail || "Error al crear la cuenta");
      } else {
        setMensaje(data.message);
      }
    } catch{
      setMensaje("Error de conexión");
    }
  };

  return (
    <section className="vh-100 mt-5">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-8 col-lg-6 col-xl-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSignup();
              }}
            >
              <div className="d-flex flex-column align-items-center mb-3">
                <h3>Crear Cuenta</h3>
              </div>

              <div className="form-outline mb-4">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-outline mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {mensaje && <p className="text-danger">{mensaje}</p>}

              <div className="text-center mt-4">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                >
                  Registrarse
                </button>
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  ¿Ya tienes cuenta?{" "}
                  <Link to={"/login"} className="link-danger">
                    Inicia sesión
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
    )
}
export default Register;



modificar los fetch 

