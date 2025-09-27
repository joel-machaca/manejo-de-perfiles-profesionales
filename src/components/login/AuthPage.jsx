import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate()

  const {setUser}=useContext(UserContext)

  const handleLogin = async (e) => {
    e.preventDefault(); // evitar recargar la página
    try {
      const res = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMensaje(data.detail || "Error en login");
      } else {
        setMensaje(data.message); // "bienvenido"
        setUser(data)
        console.log(data)
        navigate('/createProfile')
      }
    } catch{
      setMensaje("Error de conexión");
    }
  };

  return (
    <section className="vh-100 mt-5">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5 d-flex justify-content-center">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid"
              alt="Sample image"
            />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4">
            <form onSubmit={handleLogin}>
              <div className="d-flex flex-column align-items-center">
                <a type="button">
                  <img
                    src="/logo.webp"
                    alt="Logo"
                    className="img-fluid mb-3"
                    style={{ width: "150px" }}
                  />
                </a>
                <p className="lead fw-normal mb-3">Iniciar Sesión</p>
              </div>

              <div className="form-outline mb-4">
                <input
                  type="email"
                  id="form3Example3"
                  className="form-control"
                  placeholder="Correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label className="form-label" htmlFor="form3Example3">
                  Correo Electrónico
                </label>
              </div>

              <div className="form-outline mb-3">
                <input
                  type="password"
                  id="form3Example4"
                  className="form-control"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label className="form-label" htmlFor="form3Example4">
                  Contraseña
                </label>
              </div>

              {mensaje && <p className="text-danger">{mensaje}</p>}

              <div className="text-center text-lg-start mt-4 pt-2">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                >
                  Login
                </button>
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  ¿No tienes una cuenta?{" "}
                  <Link to={"/register"} className="link-danger">
                    Registrate
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthPage;