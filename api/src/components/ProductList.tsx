import { useState, useEffect,  createContext } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddProduct from './AddProduct';
import UpdateProduct from './UpdateProduct';
import DeleteProduct from './DeleteProduct';
import {Product, ProductContextType} from "../models/product.ts";
import Authentification from './Authentification.tsx';
import { authentificatedContextType } from '../models/product.ts';
import PaginationControlled from './Pagination.tsx';
export const URL = 'https://dummyjson.com/products'
import SearchField from './Search.tsx';



export const productsContext = createContext<ProductContextType>({
  products: [],
  setProducts: () => {}
});

export const authentificatedContext = createContext<authentificatedContextType>({
  isAuthentificated : false,
  setIsAuthentificated : () => {}
});



export const ProductList = ( {} ) => {

 const [searchedItem, setSearchedItem] = useState("");

 const [currentPage, setCurrentPage] = useState(1);

 const skippedProducts = (currentPage-1)*10

 const [products, setProducts] = useState<Product[]>([]);

 const [isAuthentificated, setIsAuthentificated] = useState<boolean>(false);

 useEffect(() => {
  axios.get<{products : Product[]}>(`${URL}?skip=${skippedProducts}&limit=10`).then((res) => {setProducts(res.data.products)})
 }, [currentPage])
  

  useEffect(() => {
  if(isAuthentificated)  
  axios.get<{products : Product[]}>(`${URL}?limit=10`).then((res) => {setProducts(res.data.products);
  console.log(products)}
  )
}
, [isAuthentificated])

useEffect(() => {
  if(isAuthentificated)  
  axios.get<{products : Product[]}>(`${URL}/search?q=${searchedItem}`).then((res) => {setProducts(res.data.products);
}
  )
}
, [searchedItem])



  return (
    <productsContext.Provider value = {{products, setProducts}}>
      <authentificatedContext.Provider value = {{isAuthentificated, setIsAuthentificated}}>
          {isAuthentificated  ? (
        <div>
        <SearchField searchedItem={searchedItem} setSearchedItem={setSearchedItem}/>
       <TableContainer component={Paper}>
         <Table sx={{ minWidth: 650 }} aria-label="simple table">
           <TableHead>
             <TableRow>
               <TableCell>ID</TableCell>
               <TableCell align="right">Title</TableCell>
               <TableCell align="right">Description</TableCell>
             </TableRow>
           </TableHead>
           <TableBody>
             {products.map((product) => (
               <>
               <TableRow
                 key={product.id}
                 sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
               >
                 <TableCell component="th" scope="row">
                   {product.id}
                 </TableCell>
                 <TableCell className='bg-gray-500' align="right">{product.title}</TableCell>
                 <TableCell align="right">{product.description}</TableCell>
                 <TableCell align='right'>
                 <UpdateProduct productId = {product.id}/>
                 <DeleteProduct productId = {product.id}/>
                 </TableCell>
               </TableRow>
               </>
             ))}
           </TableBody>
         </Table>
       </TableContainer>
       <AddProduct />
       <PaginationControlled setCurrentPage={setCurrentPage} currentPage={currentPage}/>
       </div>
       ) : (
        <Authentification />
         )}
       </authentificatedContext.Provider>
       </productsContext.Provider >
 
  );
};

export default ProductList;