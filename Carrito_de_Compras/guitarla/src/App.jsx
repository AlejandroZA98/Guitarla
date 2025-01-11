import Header from "./components/Header" // importar archivo header
import Guitar from "./components/guitar"
import {useState} from 'react' // importar useState
import { useEffect } from 'react'// importar useEffect
import {db} from './data/db'
function App() {
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
  


  return (//dentro del return solo se admiten expresiones (producen un valor, ternarios, .map, .filter)
    <>
    {/* importando  archivo header */}
    <Header 
    cart={cart}
    removeFromCart={removeFromCart} 
    increseQuantity={increseQuantity}  
    decreseQuantity={decreseQuantity}
    clearCart={clearCart}
    />

    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>
        <div className="row mt-5">
          {data.map((guitar)=>
          
            <Guitar
              key={guitar.id}// key unico necesario para enviar al componente guitar
              guitar={guitar}         
              addToCart={addToCart}  // enviamos addToCart al componente Guitar para que pueda modificarlo desde aca (agregar al carrito)
            />
          )}
        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>     
    </>
  )
}

export default App
