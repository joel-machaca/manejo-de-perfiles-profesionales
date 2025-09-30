import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const ProfilePublic = () => {
  const { id } = useParams();
  const [profesional, setProfesional] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/profiles/me/${id}`);
        const data = await res.json();
        setProfesional(data);
      } catch (err) {
        console.log("Error al obtener perfil:", err);
      }
    };
    fetchProfile();
  }, [id]);

  if (!profesional) return <p>Cargando perfil...</p>;

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
        <div className="text-center">
          <img
            src={profesional.foto_principal ? profesional.foto_principal : "/public/default.jpg"}
            alt={profesional.nombre}
            className="rounded-circle shadow"
            style={{ width: "150px", height: "150px", objectFit: "cover" }}
          />
          <h3 className="mt-3 text-primary">{profesional.nombre}</h3>
          <p className="text-muted mb-1"><i class="fas fa-map-marker-alt"></i> {profesional.distrito} - {profesional.ciudad}</p>
          <p className="fw-bold"><span className="fw-bold text-success">S/<i className="fas fa-money-bill-wave me-2"></i></span> {profesional.tarifa} / hora</p>
        </div>

        <div className="text-center d-flex justify-content-center gap-5">
          <a
            href="https://wa.me/51929173857"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-success m-1 d-inline-block"
          >
            <i className="fab fa-whatsapp me-2"></i> WhatsApp
          </a>
          <a
            href="https://www.linkedin.com/in/joel-machaca"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary m-1 d-inline-block"
          >
            <i className="fab fa-linkedin me-2"></i> LinkedIn
          </a>
        </div>

        <div className="mt-4">
          <h5 className="fw-bold">Descripción de servicios</h5>
          <p>{profesional.descripcion}</p>
        </div>

        <div className="mt-4">
          <h5 className="fw-bold">Galería</h5>
          <div className="mb-3 text-center">
          </div>
          <div className="d-flex flex-wrap gap-2 justify-content-center">
            {profesional.galeria?.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`galeria-${i}`}
                className="rounded shadow-sm"
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover"
                }}
              />
            ))}
          </div>
        </div>

        <div className="mt-4">
          <h5 className="fw-bold">Ubicación</h5>
          <iframe
            title="mapa"
            className="w-100 rounded shadow-sm"
            style={{ height: "450px", border: 0 }}
            loading="lazy"
            allowFullScreen
            src={`https://maps.google.com/maps?&q=${encodeURIComponent(
              `${profesional.distrito}, ${profesional.ciudad}`
            )}&output=embed`}

          ></iframe>
        </div>
      </div>
    </div>
  );
};


export default ProfilePublic;
