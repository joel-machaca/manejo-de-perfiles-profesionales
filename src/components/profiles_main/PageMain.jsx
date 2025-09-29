import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const PageMain = () => {
  const [busqueda, setBusqueda] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [tarifa, setTarifa] = useState("");
  const [profesionales, setProfesionales] = useState([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/profiles/all`);
        const data = await res.json();
        setProfesionales(data);
      } catch (err) {
        console.log("Error al obtener perfiles:", err);
      }
    };
    fetchProfiles();
  }, []);

  const filtrados = profesionales.filter((p) => {
    console.log(p.foto_principal)
    return (
      p.nombre.toLowerCase().includes(busqueda.toLowerCase()) &&
      (ubicacion ? p.ciudad === ubicacion : true) &&
      (tarifa ? p.tarifa <= parseInt(tarifa) : true)
    );
  });

  return (
    <div className="container py-4">
      <h2 className="text-center text-primary mb-4">
        Listado de Profesionales
      </h2>

      <div className="row mb-4">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por nombre..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <select
            className="form-select"
            value={ubicacion}
            onChange={(e) => setUbicacion(e.target.value)}
          >
            <option value="">Todas las ubicaciones</option>
            {profesionales
              .map((p) => p.ciudad)
              .filter((v, i, a) => a.indexOf(v) === i) // únicas
              .map((c, i) => (
                <option key={i} value={c}>{c}</option>
              ))}
          </select>
        </div>
        <div className="col-md-4">
          <input
            type="number"
            className="form-control"
            placeholder="Tarifa máxima"
            value={tarifa}
            onChange={(e) => setTarifa(e.target.value)}
          />
        </div>
      </div>

      <div className="row">
        {filtrados.map((p, index) => (
          <div key={index} className="col-md-4 mb-3">
            <div className="card  shadow-lg text-center p-3">
              <img
                src={p.foto_principal ? `${import.meta.env.VITE_API_URL}/${p.foto_principal}` : "/public/default.jpg"}
                alt={p.nombre}
                className="rounded-circle mx-auto mb-3"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title text-primary">{p.nombre}</h5>
                <p className="card-text mb-1 fw-bold">{p.distrito} - {p.ciudad}</p>
                <p className="card-text"><span className="fw-bold text-success">S/</span> {p.tarifa} / hora</p>
                <Link to={`/profilePublic/${p.id}`} className="btn btn-primary w-100">Ver perfil</Link>
              </div>
            </div>
          </div>
        ))}
        {filtrados.length === 0 && (
          <p className="text-center text-muted">No se encontraron profesionales.</p>
        )}
      </div>
    </div>
  );
};

export default PageMain;
