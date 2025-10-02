import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const CreateProfile = () => {
  const [foto, setFoto] = useState(null);
  const [galeria, setGaleria] = useState([]);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [distrito, setDistrito] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [tarifa, setTarifa] = useState("");
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const checkProfile = async () => {
      if (!user) return;
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/profiles/me?user_id=${user.id}`
        );
        if (res.ok) {
          const data = await res.json();
          if (data?.id) {
            navigate("/");
          }
        }
      } catch (error) {
        toast.error(error)
      }
    };
    checkProfile();
  }, [user, navigate]);

  const handleGaleria = (e) => {
    setGaleria([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return toast.warning("debes estar logueado");

    const formData = new FormData();
    formData.append("user_id", user.id);
    formData.append("nombre", nombre);
    formData.append("descripcion", descripcion);
    formData.append("distrito", distrito);
    formData.append("ciudad", ciudad);
    formData.append("tarifa", tarifa);
    formData.append("foto_principal", foto);
    galeria.forEach((img) => formData.append("galeria", img));

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/profiles/create`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.detail || "Error al crear perfil")
      } else {
        toast.success("Perfil creado correctamente")
        navigate("/");
      }
    } catch {
      toast.error("Error de conexion")
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="text-primary mb-4">Crear Perfil</h3>
      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">

        <div className="mb-3">
          <label className="form-label fw-bold">Nombre</label>
          <input
            type="text"
            className="form-control"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ejemplo: Juan Pérez"
          />
        </div>

        <div className="mb-3 text-center">
          <label className="form-label fw-bold">Foto principal</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={(e) => setFoto(e.target.files[0])}
          />
          {foto && (
            <img
              src={URL.createObjectURL(foto)}
              alt="foto principal"
              className="rounded-circle mt-3"
              style={{ width: "120px", height: "120px", objectFit: "cover" }}
            />
          )}
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Galería de fotos</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            multiple
            onChange={handleGaleria}
          />
          <div className="d-flex flex-wrap mt-3 gap-2">
            {galeria.map((img, i) => (
              <img
                key={i}
                src={URL.createObjectURL(img)}
                alt={`galeria-${i}`}
                className="rounded shadow-sm"
                style={{ width: "80px", height: "80px", objectFit: "cover" }}
              />
            ))}
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Descripción de servicios</label>
          <textarea
            className="form-control"
            rows="3"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Ejemplo: Servicios de electricidad, plomería..."
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Distrito</label>
          <input
            type="text"
            className="form-control"
            value={distrito}
            onChange={(e) => setDistrito(e.target.value)}
            placeholder="Ejemplo: Miraflores"
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Ciudad</label>
          <input
            type="text"
            className="form-control"
            value={ciudad}
            onChange={(e) => setCiudad(e.target.value)}
            placeholder="Ejemplo: Lima"
          />
        </div>

        {(distrito || ciudad) && (
          <iframe
            title="mapa"
            className="w-100 rounded  my-2"
            style={{ height: "300px", border: 0 }}
            loading="lazy"
            allowFullScreen
            src={`https://maps.google.com/maps?&q=${encodeURIComponent(
              `${distrito}, ${ciudad}`
            )}&output=embed`}
          ></iframe>
        )}

        <div className="mb-3">
          <label className="form-label fw-bold">Tarifa aproximada (S/ por hora)</label>
          <input
            type="number"
            className="form-control"
            value={tarifa}
            onChange={(e) => setTarifa(e.target.value)}
            placeholder="Ejemplo: 50"
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Guardar perfil
        </button>
      </form>
    </div>
  );
};

export default CreateProfile;
