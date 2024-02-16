import { useState, useEffect } from "react";
import Item from "./Item";

function App() {
  const [products, setProducts] = useState([]);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.escuelajs.co/api/v1/products')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setProducts(data);
        // setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        // setLoading(false);
      });
  }, []);

  // if (loading) {
  //   return <h1>Cargando...</h1>;
  // }

  return (
    <>
      <div className='bg-red-400'>
        <h1 className='text-6xl text-center'>Hello World</h1>
      </div>
      {products.map(product => (
        <Item key={product.id} titulo={product.title} precio={product.price} imagenes={product.images} />
      ))}
      
    </>
  );
}

export default App;
