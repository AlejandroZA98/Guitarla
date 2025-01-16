import { useState,useEffect,useMemo } from "react"
import { db } from "../data/db"
import type { CartItem,Guitar } from "../types"

export const useCart =()=>{

console.log("desde useCart")
const initialCart= ():CartItem[]=>{
    const localStorageCart=localStorage.getItem('cart')
    return localStorageCart? JSON.parse(localStorageCart): []
  }
  // fuera del return se pueden usar expresiones y statemens
  const [data]=useState(db)
  const [cart,setCart] = useState(initialCart)
  const MAX_ITEMS =5
  const MIN_ITEMS=1
  
  //console.log(data)
 
  
  useEffect(()=>
    localStorage.setItem('cart',JSON.stringify(cart))
  ,[cart])


  function addToCart(item:Guitar){ // recibe un item tipo guitar
    const itemExist=cart.findIndex((guitar)=> guitar.id===item.id)
    console.log(itemExist)

    if (itemExist>=0){
      if (cart[itemExist].quantity>=MAX_ITEMS) return
      console.log("Ya existe en el carrito")
      const updateCart=[...cart] //copia de cart
      updateCart[itemExist].quantity++ // aumenta cantidad
      setCart(updateCart)
    }else{
      console.log("agregando",item)
      const newItem:CartItem={...item,quantity:1} // crea un objeto cartitem y le agrega la cantidad
      setCart([...cart,newItem])// le asigna la cantidad a cart
    }
  }

  function removeFromCart(id:number){
    console.log("Removiendo",id)
    setCart(cart=> cart.filter(guitar=>guitar.id!==id))
  }
    
  function increseQuantity(id:Guitar['id']){ // solo toma el tipo de id de guitarra
    console.log("incrementar",id)
    const updatedCart=cart.map(item=> {
      if(item.id===id && item.quantity<MAX_ITEMS){
       return{
        ...item,
        quantity: item.quantity+1
       }
      }
      return item
    })
    setCart(updatedCart)
  }
  function decreseQuantity(id:Guitar['id']){
    console.log("decrementar",id)
    const updatedCart=cart.map(item=> {
      if(item.id===id && item.quantity>MIN_ITEMS){
        return{
         ...item,
         quantity: item.quantity-1       }
       }
       return item
    })
    setCart(updatedCart)

  }
  function clearCart(){
    setCart([])
  }

     //state derivado
     const isEmpty=useMemo(()=>cart.length===0,[cart])
     // reduce
     const cartTotal=useMemo(()=>cart.reduce((total,item)=>total+(item.quantity*item.price),0),[cart])
  
return{
    data,
    cart,
    addToCart,
    removeFromCart,
    increseQuantity,
    decreseQuantity,
    clearCart,
    isEmpty,
    cartTotal
  

}
}
