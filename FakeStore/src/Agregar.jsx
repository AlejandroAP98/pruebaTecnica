import { useState, useEffect } from "react";

function Agregar() {
  const [categorias, setCategorias] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    categoryId: "",
    images: [], 
  });
  
const handleChange = (e) => {
  const { name, value } = e.target;
  if (name === "images") {
    setFormData({
      ...formData,
      [name]: [value]
    });
  } else {
    setFormData({
      ...formData,
      [name]: value
    });
  }
};

const handleSubmit = (e) => {
  e.preventDefault();
  fetch("https://api.escuelajs.co/api/v1/products/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => {
      alert("Producto creado con éxito");
      console.log(data);
      setFormData({
        title: "",
        price: "",
        description: "",
        categoryId: "",
        images: [], 
      });
    })
    .catch((error) => {
      console.error("Error al crear el producto:", error);
      alert("Error al crear el producto");
    });
};


  useEffect(() => {
    fetch('https://api.escuelajs.co/api/v1/categories')
      .then(response => response.json())
      .then(data => {
        setCategorias(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <section className="flex flex-col gap-4 w-full items-center">
      <h2 className="text-4xl font-bold">Crear un nuevo producto</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
        <label className="flex items-center md:justify-between">
          Title:
          <input
            className="bg-gray-100 text-gray-700 rounded-md text-sm p-2 mx-4"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </label>
        <label className="flex items-center md:justify-between">
          Price:
          <input
            className="bg-gray-100 text-gray-700 rounded-md text-sm p-2 mx-4"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </label>
        <label className="flex items-center md:justify-between">
          Description:
          <textarea
            className="bg-gray-100 text-gray-700 rounded-md text-sm p-2 mx-4"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </label>
        <label className="flex items-center md:justify-between">
          Category:
          <select
            className="bg-gray-100 text-gray-700 rounded-md text-sm p-2 mx-4"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.name}
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-center md:justify-between">
          Imagen (URL):
          <input
            className="bg-gray-100 text-gray-700 rounded-md text-sm p-2 mx-4"
            type="text"
            name="images"
            value={formData.images} 
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit" className="py-2 text-white bg-sky-500 rounded-md p-1 hover:bg-sky-400">Create Product</button>
      </form>
    </section>
  );
}

export default Agregar;