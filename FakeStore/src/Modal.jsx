/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

function Modal({ isOpen, onClose, producto }) {
  const [productoDetalle, setProductoDetalle] = useState(null);
  const [eliminado, setEliminado] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [nuevoTitulo, setNuevoTitulo] = useState("");
  const [nuevoPrecio, setNuevoPrecio] = useState(0);
  const [nuevaDescripcion, setNuevaDescripcion] = useState("");

  useEffect(() => {
    if (!isOpen || eliminado) return;

    fetch(`https://api.escuelajs.co/api/v1/products/${producto}`)
      .then(response => response.json())
      .then(data => {
        setProductoDetalle(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [isOpen, producto, eliminado]);

  const handleCloseModal = () => {
    setEliminado(false);
    setModoEdicion(false); 
    onClose();
  };

  const handleDelete = async () => {
    const confirmar = await Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo!'
    });
    if (!confirmar.isConfirmed) return;
    fetch(`https://api.escuelajs.co/api/v1/products/${producto}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        setEliminado(true);
        console.log('Producto eliminado:', data);
        onClose();
        window.location.reload();
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  const handleEditar = () => {
    setModoEdicion(true);
    setNuevoTitulo(productoDetalle.title);
    setNuevaDescripcion(productoDetalle.description);
    setNuevoPrecio(productoDetalle.price);
  };

  const handleGuardarEdicion = async () => {

    const confirmar = await Swal.fire({
        title: '¿Estás seguro?',
        text: "Se actualizará el producto!",
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, actualizarlo!'
        });
        if (!confirmar.isConfirmed) return;
    fetch(`https://api.escuelajs.co/api/v1/products/${producto}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: nuevoTitulo,
            price: nuevoPrecio,
            description: nuevaDescripcion
        })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Producto actualizado:', data);
            setModoEdicion(false);
            setProductoDetalle(data);
            handleCloseModal();
            window.location.reload();
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
  };

  if (!isOpen) return null;

  return (
    <section className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75 ">
      <div className="bg-gray-800 p-4 rounded-lg w-full max-w-2xl" onClick={handleModalClick}>
        <div className="flex justify-between text-orange-300 -my-2 mb-1">
            {productoDetalle && !modoEdicion && <span className="text-4xl font-bold">${productoDetalle.price}</span>}
          <button onClick={handleCloseModal}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500 hover:text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
        </div>
        {productoDetalle ? (
          <div className="flex flex-col gap-2 items-center ">
            {!modoEdicion ? (
              <>
                <h2 className="text-2xl font-bold text-sky-200">{productoDetalle.title}</h2>
                <div className="grid grid-rows-2 grid-flow-col gap-1 justify-center items-center">
                  <img className="row-span-2 object-fill h-[320px] rounded-3xl hover:brightness-[1.05]" src={productoDetalle.images[2]} alt={productoDetalle.title} />
                  <img className="object-fill h-40 rounded-3xl hover:brightness-[1.05] hover:scale-150 cursor-zoom-in" src={productoDetalle.images[0]} alt={productoDetalle.title} />
                  <img className="object-fill h-40 rounded-3xl hover:brightness-[1.05] hover:scale-150  cursor-zoom-in" src={productoDetalle.images[1]} alt={productoDetalle.title} />
                </div>
                <p className="text-[10px] font-light ">{productoDetalle.description}</p>
                <div className="flex justify-between w-full">
                  {!eliminado && (
                    <button onClick={handleDelete} className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">Eliminar</button>
                  )}
                  <button onClick={handleEditar} className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600">Editar</button>
                  <button onClick={handleCloseModal} className="text-white bg-sky-500 rounded-md p-1 hover:bg-sky-400">Comprar</button>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col items-end gap-2 ">
                    <label className="flex">
                        Título 
                        <input 
                            className=" bg-gray-100 text-gray-700 rounded-md text-sm p-2 mx-4"
                            type="text" 
                            value={nuevoTitulo} 
                            onChange={(e) => setNuevoTitulo(e.target.value)} 
                        />
                    </label>
                    <label className="flex">
                        Precio 
                        <input 
                            className=" bg-gray-100 text-gray-700 rounded-md text-sm p-2 mx-4"
                            type="number" 
                            value={nuevoPrecio} 
                            onChange={(e) => setNuevoPrecio(e.target.value)} 
                        />
                    </label>
                    <label className="flex">
                        Descripción 
                        <textarea 
                            type="text"
                            className="bg-gray-100 text-gray-700 rounded-md text-sm p-2 mx-4"
                            value={nuevaDescripcion} 
                            onChange={(e) => setNuevaDescripcion(e.target.value)} 
                        />
                    </label>
                </div>
                <div className="flex justify-between w-full">
                    <button onClick={handleCloseModal} className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">Cancelar</button>
                    <button onClick={handleGuardarEdicion} className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600">Guardar</button>
                </div>
              </>
            )}
          </div>
        ) : (
          <p>Cargando...</p>
        )}
      </div>
    </section>
  );
}

export default Modal;
