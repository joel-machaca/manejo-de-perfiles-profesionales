import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../Context/UserContext";
import { toast } from 'react-toastify';

const EditProfile = () => {
    const [foto, setFoto] = useState(null);
    const [galeria, setGaleria] = useState([]);
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [distrito, setDistrito] = useState("");
    const [ciudad, setCiudad] = useState("");
    const [tarifa, setTarifa] = useState("");
    const { user } = useContext(UserContext);


    useEffect(() => {
        const fetchProfile = async () => {
            if (!user) return;
            try {
                const res = await fetch(
                    `${import.meta.env.VITE_API_URL}/profiles/me?user_id=${user.id}`
                );
                if (res.ok) {
                    const data = await res.json();
                    setNombre(data.nombre || "");
                    setDescripcion(data.descripcion || "");
                    setDistrito(data.distrito || "");
                    setCiudad(data.ciudad || "");
                    setTarifa(data.tarifa || "");
                    setFoto(data.foto_principal || null);
                    setGaleria(data.galeria || []);
                }
            } catch (error) {
                console.error("Error al traer perfil:", error);
            }
        };
        fetchProfile();
    }, [user]);

    const handleGaleria = (e) => {
        setGaleria([...e.target.files]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) return toast.error("debes estar logueado")

        const formData = new FormData();
        formData.append("user_id", user.id);
        formData.append("nombre", nombre);
        formData.append("descripcion", descripcion);
        formData.append("distrito", distrito);
        formData.append("ciudad", ciudad);
        formData.append("tarifa", tarifa);
        if (foto instanceof File) {
            formData.append("foto_principal", foto);
        }
        galeria.forEach((img) => {
            if (img instanceof File) {
                formData.append("galeria", img);
            }
        });

        try {
            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/profiles/me?user_id=${user.id}`,
                { method: "PUT", body: formData }
            );
            const data = await res.json();

            if (!res.ok) {
                toast.warning(data.detail || "Error al actualizar perfil")
            } else {

                toast.success("perfil actualizado perfectamente")
            }
        } catch {
            toast.error("error de conexion")
        }
    };

    return (
        <div className="container mt-4">
            <h3 className="text-primary mb-4">Editar Perfil</h3>
            <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
                <div className="mb-3">
                    <label className="form-label fw-bold">Nombre</label>
                    <input
                        type="text"
                        className="form-control"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
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
                            src={foto instanceof File ? URL.createObjectURL(foto) : foto}
                            alt="foto principal"
                            className="rounded-circle mt-3"
                            style={{ width: "120px", height: "120px", objectFit: "cover" }}
                        />
                    )}
                </div>

                <div className="mb-3">
                    <label className="form-label fw-bold">Galería</label>
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
                                src={img instanceof File ? URL.createObjectURL(img) : img}
                                alt={`galeria-${i}`}
                                className="rounded shadow-sm"
                                style={{ width: "80px", height: "80px", objectFit: "cover" }}
                            />
                        ))}
                    </div>
                </div>

                <div className="mb-3">
                    <label className="form-label fw-bold">Descripción</label>
                    <textarea
                        className="form-control"
                        rows="3"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                    ></textarea>
                </div>

                <div className="mb-3">
                    <label className="form-label fw-bold">Distrito</label>
                    <input
                        type="text"
                        className="form-control"
                        value={distrito}
                        onChange={(e) => setDistrito(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label fw-bold">Ciudad</label>
                    <input
                        type="text"
                        className="form-control"
                        value={ciudad}
                        onChange={(e) => setCiudad(e.target.value)}
                    />
                </div>

                {(distrito || ciudad) && (
                    <iframe
                        title="mapa"
                        className="w-100 rounded my-2"
                        style={{ height: "300px", border: 0 }}
                        src={`https://maps.google.com/maps?&q=${encodeURIComponent(
                            `${distrito}, ${ciudad}`
                        )}&output=embed`}
                    ></iframe>
                )}

                <div className="mb-3">
                    <label className="form-label fw-bold">Tarifa</label>
                    <input
                        type="number"
                        className="form-control"
                        value={tarifa}
                        onChange={(e) => setTarifa(e.target.value)}
                    />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                    Actualizar perfil
                </button>
            </form>
        </div>
    );
};

export default EditProfile;