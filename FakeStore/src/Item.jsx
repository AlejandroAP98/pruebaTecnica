

// eslint-disable-next-line react/prop-types
export default function Item({ id, titulo, precio, imagenes, descripcion, categoria, onProductoClick}) {
  // eslint-disable-next-line react/prop-types
  const descripcionPrevia = descripcion.length > 70 ? descripcion.substring(0, 70) + '...' : descripcion;

  const handleClick = (e) => {
    e.preventDefault(); 
    onProductoClick(id);
  };
  
  return (
    <section className="cursor-pointer w-60 p-1 bg-white border border-gray-100 rounded-3xl drop-shadow-lg dark:bg-gray-900 dark:border-gray-800">
      <div onClick={handleClick}> 
        <img className="object-fill rounded-3xl hover:brightness-[1.05]" src={imagenes[0]} alt={titulo} />
      </div>
      <div className="px-2 pb-2 py-1" onClick={handleClick}> 
        <h1>
          <div>
            <h2 className="md:text-xl font-bold text-gray-800 dark:text-cyan-300">{titulo}</h2>
          </div>
          <div>
            <p className="md:text-[10px] text-[8px] font-light text-gray-700 dark:text-gray-300">{descripcionPrevia}</p>
          </div>
        </h1>
        <span className="bg-purple-100 text-purple-800 text-xs  me-2 px-2.5 py-0.5 rounded-xl dark:bg-purple-900 dark:text-purple-300">{categoria}</span>
      </div>
      <div className="px-3 pb-1" onClick={handleClick}> 
        <h5 className="md:text-sm tracking-tight text-gray-900 dark:text-white">Precio</h5>
        <div className="flex items-center justify-between">
          <span className="md:text-2xl font-bold text-gray-900 dark:text-white">$ {precio}</span>
          <a href="#" className="text-white bg-sky-500 rounded-md p-1 hover:bg-sky-400">Comprar</a>
        </div>
      </div>
    </section>
  );
}
