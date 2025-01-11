import { useState,useEffect,useMemo } from "react"
import { db } from "../data/db"

export const useCart =()=>{
console.log("desde useCart")
const initialCart= ()=>{
    const localStorageCart=localStorage.getItem('cart')
    return localStorageCart? JSON.parse(localStorageCart): []
  }
  // fuera del return se pueden usar expresiones y statemens
  const [data,setData]=useState([])
  const [cart,setCart] = useState(initialCart)
  const MAX_ITEMS =5
  const MIN_ITEMS=1
  
  //console.log(data)
  useEffect(()=>{
    setData(db)
  },[])
  useEffect(()=>
    localStorage.setItem('cart',JSON.stringify(cart))
  ,[cart])


  function addToCart(item){
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
      item.quantity=1
      setCart([...cart,item])
    }
  }

  function removeFromCart(id){
    console.log("Removiendo",id)
    setCart(cart=> cart.filter(guitar=>guitar.id!==id))
  }
    
  function increseQuantity(id){
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
  function decreseQuantity(id){
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
