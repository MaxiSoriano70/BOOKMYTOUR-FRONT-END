import { useTours } from "../hooks/useTours";
import Styles from "../Styles/AgregarProducto.module.css";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import TextInput from "../Components/TextInput";
import Button from "../Components/Button";

const AgregarProducto = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    categoria: "",
    costo: "",
    disponibilidad: "",
    ciudad: [],
    duracion: "",
    imagen: [],
    resumen: "",
    descripcion: "",
    itinerario: "",
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [cities, setCities] = useState([]);

  const { createTour, fetchTours } = useTours();
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (!user) {
      // Si no hay un usuario en localStorage, redirige al home
      navigate("/");
    } else {
      const usuario = JSON.parse(user);
      // Verificar si el usuario es vacío o no tiene el rol correcto
      if (
        !usuario ||
        !usuario.usuario ||
        usuario.usuario.rol.rolName !== "ADMIN"
      ) {
        navigate("/");
      }
    }
  }, [navigate]);

  useEffect(() => {
    async function fetchCities() {
      const response = await fetch("https://bookmytourweb.online/api/cities");
      const data = await response.json();
      setCities(data);
    }
    fetchCities();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);

    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    formDataToSend.append("name", formData.nombre);
    formDataToSend.append("categoryName", formData.categoria);
    formDataToSend.append("costPerPerson", formData.costo);
    formDataToSend.append("datesAvailable", formData.disponibilidad);
    formDataToSend.append("cityNames", formData.ciudad);
    formDataToSend.append("duration", formData.duracion);
    formDataToSend.append("summary", formData.resumen);
    formDataToSend.append("description", formData.descripcion);
    formDataToSend.append("itinerary", formData.itinerario);

    selectedFiles.forEach((file) => {
      formDataToSend.append("imagenes", file);
    });

    try {
      const newTour = await createTour(formDataToSend);

      if (newTour) {
        toast.success("Producto creado exitosamente!", {
          position: "top-center",
        });
        previewUrls.forEach((url) => URL.revokeObjectURL(url));
        setPreviewUrls([]);
        setTimeout(() => {
          navigate("/productos");
        }, 1000);
        await fetchTours(); // Vuelve a obtener todos los tours
        setTimeout(() => navigate("/productos"), 1000);
      }
    } catch (err) {
      if (err.response && err.response.status === 409) {
        toast.error("El nombre del tour ya esta en la base de datos", {
          position: "top-center",
        });
      } else {
        console.error("Error al crear el producto:", err);
        toast.error("Hubo un error al crear el producto");
      }
    }
  };

  return (
    <div className={Styles.mainContainer}>
      <ToastContainer position="top-center" />
      <div className={Styles.container}>
        <h1>Agregar Producto</h1>
        <form className={Styles.form} onSubmit={handleSubmit}>
          <section className={Styles.formContainer}>
            <div className={Styles.formulario1}>
              <TextInput
                label="Nombre"
                placeholder="Ingresa el nombre del tour"
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                customClass={Styles.formInput}
              />
              <div>
                <label htmlFor="select">Categoría:</label>
                <select id="select" name="categoria" onChange={handleChange}>
                  <option value="" disabled selected>
                    Selecciona una categoría
                  </option>
                  <option value="Aventura">Aventura</option>
                  <option value="Naturaleza Viva">Naturaleza viva</option>
                  <option value="Aromas y Sabores">Aromas y sabores</option>
                  <option value="Vibra Urbana">Vibra urbana</option>
                  <option value="Paraísos del Caribe">
                    Paraisos del caribe
                  </option>
                </select>
              </div>

              <TextInput
                label="Costo"
                placeholder="Ingresa el costo del tour"
                type="number"
                name="costo"
                value={formData.costo}
                onChange={handleChange}
                customClass={Styles.formInput}
              />

              <div>
                <label htmlFor="select">Ciudades:</label>
                <select
                  id="selectCities"
                  name="ciudad"
                  multiple
                  onChange={(e) => {
                    const options = Array.from(e.target.selectedOptions);
                    const selectedValues = options.map(
                      (option) => option.value
                    );
                    setFormData((prevState) => ({
                      ...prevState,
                      ciudad: selectedValues,
                    }));
                  }}
                  value={formData.ciudad}
                >
                  <option value="" disabled selected>
                    Selecciona las ciudades
                  </option>
                  {cities.map((city) => (
                    <option key={city.cityId} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>

              <TextInput
                label="Duración"
                placeholder="Ingresa la duración del tour, por ejemplo: 3 dias 4 noches"
                type="text"
                name="duracion"
                value={formData.duracion}
                onChange={handleChange}
                customClass={Styles.formInput}
              />
              <div>
                <label>Descripción General:</label>
                <textarea
                  rows={5}
                  name="descripcion"
                  placeholder="Ingresa una descripción general del tour"
                  value={formData.descripcion}
                  onChange={handleChange}
                />
              </div>
            </div>
            <section className={Styles.formulario2}>
              <div>
                <label>
                  Sube imágenes:
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ marginBottom: "10px" }}
                  />
                </label>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "10px",
                  }}
                >
                  {previewUrls.map((url, index) => (
                    <img
                      key={index}
                      src={url}
                      alt={`Preview ${index + 1}`}
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        border: "1px solid #ddd",
                        borderRadius: "5px",
                      }}
                    />
                  ))}
                </div>
                <div>
                  <label>Resumen:</label>
                  <textarea
                    rows={5}
                    name="resumen"
                    placeholder="Ingresa un resumen breve del tour"
                    value={formData.resumen}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label>Itinerario:</label>
                  <textarea
                    rows={5}
                    name="itinerario"
                    placeholder="Ingresa un itinerario detallado del tour"
                    value={formData.itinerario}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className={Styles.botones}>
                <Button
                  label="Cancelar"
                  variant="secondary"
                  type="button"
                  onClick={() => navigate("/productos")}
                />
                <Button label="Guardar" variant="primary" type="submit" />
              </div>
            </section>
          </section>
        </form>
      </div>
    </div>
  );
};

export default AgregarProducto;
