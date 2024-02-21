import { useState, useEffect } from 'react';

export const ProductList = () => {

 const [productArray, setProductArray] = useState([]);

 useEffect(() => {

  async function getProductList() {

    const response = await fetch("https://dummyjson.com/products");
    const products = await response.json();
    setProductArray(products.products)

 }
 getProductList();
 } , [])

  return (
    <div>
        <p>{products}</p>
    </div>


  )
};

export default ProductList;