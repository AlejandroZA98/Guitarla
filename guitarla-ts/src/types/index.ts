export type Guitar={
    id: number,
    name: string,
    image: string,
    description: string,
    price: number,
} 
// Herencia de tipos
//utility types:
// export type CartItem=Pick<Guitar,'id'|'name'|'price'>&{// Herencia de datos guitar
//     quantity: number,
// }
export type CartItem=Guitar&{
    quantity: number  // Agregando nueva propiedad quantity
}
export type GuitarID=Guitar['id']// toma solo el id de Guitar