import Header from "./components/Header" // importar archivo header
import Guitar from "./components/guitar"
import { useCart } from "./hooks/useCart"
function App() {
  const {
    data,
    cart,
    addToCart,
    removeFromCart,
    increseQuantity,
    decreseQuantity,
    clearCart,
    isEmpty,
    cartTotal
  }= useCart() // Hook personalizado
  
  return (//dentro del return solo se admiten expresiones (producen un valor, ternarios, .map, .filter)
    <>
    {/* importando  archivo header */}
    <Header 
    cart={cart}
    removeFromCart={removeFromCart} 
    increseQuantity={increseQuantity}  
    decreseQuantity={decreseQuantity}
    clearCart={clearCart}
    isEmpty={isEmpty}
    cartTotal={cartTotal}
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
