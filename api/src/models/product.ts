export interface Product {
  id : number;
  title : string;
  description : string;

}

export interface ProductContextType{
  products : Product[],
  setProducts : React.Dispatch<React.SetStateAction<Product[]>>
}


export interface User {
  username : string,
  password : string
}

export interface authentificatedContextType {
  isAuthentificated : boolean,
  setIsAuthentificated : React.Dispatch<React.SetStateAction<boolean>>

}