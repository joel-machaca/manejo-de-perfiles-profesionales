import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const PageMain = () => {
  const [busqueda, setBusqueda] = useState("");
  const [distrito, setDistrito] = useState("");
  const [ciudad, setCiudad] = useState("");
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
    console.log(p.foto_principal);
    return (
      p.nombre.toLowerCase().includes(busqueda.toLowerCase()) &&
      (ciudad ? p.ciudad === ciudad : true) &&
      (distrito ? p.distrito === distrito : true) &&
      (tarifa ? p.tarifa <= parseInt(tarifa) : true)
    );
  });

  return (
    <div className="container py-4">
      <h2 className="text-center text-primary mb-4">
        Listado de Profesionales
      </h2>

      <div className="row mb-4 d-flex justify-content-center">
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por nombre..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <select
            className="form-select mb-2"
            value={ciudad}
            onChange={(e) => setCiudad(e.target.value)}
          >
            <option value="">Todas las ciudades</option>
            {profesionales
              .map((p) => p.ciudad)
              .filter((v, i, a) => a.indexOf(v) === i)
              .map((c, i) => (
                <option key={i} value={c}>{c}</option>
              ))}
          </select>
          </div>
          <div className="col-md-3">
          <select
            className="form-select"
            value={distrito}
            onChange={(e) => setDistrito(e.target.value)}
          >
            <option value="">Todos los distritos</option>
            {profesionales
              .map((p) => p.distrito)
              .filter((v, i, a) => a.indexOf(v) === i)
              .map((d, i) => (
                <option key={i} value={d}>{d}</option>
              ))}
          </select>
        </div>
        <div className="col-md-2">
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
                src={p.foto_principal ? p.foto_principal : "/public/default.jpg"}
                alt={p.nombre}
                className="rounded-circle mx-auto mb-3"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title text-primary">{p.nombre}</h5>
                <p className="card-text mb-1 "><i class="fas fa-briefcase"></i> {p.descripcion}</p>
                <p className="card-text mb-1 fw-bold"><i class="fas fa-map-marker-alt"></i> {p.distrito} - {p.ciudad}</p>
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
