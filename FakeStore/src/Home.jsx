import { useState, useEffect } from "react";
import Item from "./Item";
import Modal from "./Modal";


function Home() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [precioMin, setPrecioMin] = useState(null);
  const [precioMax, setPrecioMax] = useState(null);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    let apiURL = 'https://api.escuelajs.co/api/v1/products/?';
    if (categoriaSeleccionada) {
      apiURL += `categoryId=${categoriaSeleccionada}&`;
    }
    if (precioMin && precioMax) {
      apiURL += `price_min=${precioMin}&price_max=${precioMax}`;      
    }

    fetch(apiURL)
      .then(response => response.json())
      .then(data => {
        setProductos(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [categoriaSeleccionada, precioMin, precioMax]);

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

  const handlePrecioMinChange = (e) => {
    setPrecioMin(e.target.value);
  };

  const handlePrecioMaxChange = (e) => {
    setPrecioMax(e.target.value);
  };

  const handleProductoClick = (producto) => {
    setSelectedProduct(producto);
    setModalOpen(true);
  };


  return (
    <>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} producto={selectedProduct}/> 
      <div className="flex flex-cols-2 p-6 ">
        <aside className="sticky top-20 flex flex-col mr-12 gap-2 w-auto h-fit">
          <h2 className="flex justify-start items-center text-2xl font-bold text-gray-800 dark:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-list-details" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M13 5h8" /><path d="M13 9h5" /><path d="M13 15h8" /><path d="M13 19h5" /><path d="M3 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" /><path d="M3 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" /></svg>
            Categorias</h2>
          <div className="flex flex-col items-start py-2 gap-1" >
            <button
              onClick={() => setCategoriaSeleccionada(null)}
              className={`inline-flex w-full border rounded-md text-sm font-medium ${
                null === categoriaSeleccionada ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 border-hidden'
              }`}
            >
              <span className="relative px-5 py-2.5">Todos</span>
            </button>
            {categorias.map(categoria => (
              <button
                key={categoria.id}
                onClick={() => setCategoriaSeleccionada(categoria.id)}
                className={`inline-flex w-full border rounded-md text-sm font-medium ${
                  categoria.id === categoriaSeleccionada ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 border-hidden'
                }`}
              >
                <span className="relative px-5 py-2.5">{categoria.name}</span>
              </button>
            ))}
          </div>
          <h2 className="flex justify-start items-center text-2xl font-bold text-gray-800 dark:text-white w-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-zoom-money" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /><path d="M12 7h-2.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3h-2.5" /><path d="M10 13v1m0 -8v1" /></svg>
            Precio</h2>
          <label htmlFor="val_min" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Valor Mínimo</label>
          <input
            type="number"
            id="val_min"
            className="w-full bg-gray-100 text-gray-700 rounded-md text-sm p-2"
            placeholder="Mínimo"           
            onChange={handlePrecioMinChange}
          />
          <label htmlFor="val_max" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Valor Máximo</label>
          <input
            type="number"
            id="val_max"
            className="w-full bg-gray-100 text-gray-700 rounded-md text-sm p-2"
            placeholder="Máximo"
            onChange={handlePrecioMaxChange}
          />
        </aside>
        <section className="grid grid-cols-1 w-48 md:w-full gap-y-4 md:grid-cols-2 lg:grid-cols-3">
          {productos.map(producto => (
            <Item onProductoClick={handleProductoClick} key={producto.id } id={producto.id} titulo={producto.title} precio={producto.price} imagenes={producto.images} descripcion={producto.description} categoria={producto.category.name} />
          ))} 
        </section>
        
      </div>
      
    </>
  );
}

export default Home;
