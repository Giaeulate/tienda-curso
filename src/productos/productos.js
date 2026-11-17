// Catálogo de productos en memoria.
// Los precios se guardan como number con dos decimales (por ejemplo 19.99).

export const PRODUCTOS_INICIALES = [
  { id: 'p1', nombre: 'Taza de cerámica', categoria: 'hogar', precio: 19.99, stock: 50 },
  { id: 'p2', nombre: 'Cuaderno A5', categoria: 'papeleria', precio: 4.1, stock: 200 },
  { id: 'p3', nombre: 'Auriculares', categoria: 'electronica', precio: 59.9, stock: 15 },
  { id: 'p4', nombre: 'Lámpara de escritorio', categoria: 'hogar', precio: 34.5, stock: 20 },
  { id: 'p5', nombre: 'Bolígrafo azul', categoria: 'papeleria', precio: 0.7, stock: 500 },
];

let catalogo = new Map();

export function reiniciarCatalogo(items = PRODUCTOS_INICIALES) {
  catalogo = new Map(items.map((p) => [p.id, { ...p }]));
}

export function listarProductos({ categoria } = {}) {
  const todos = [...catalogo.values()];
  return categoria ? todos.filter((p) => p.categoria === categoria) : todos;
}

export function obtenerProducto(id) {
  return catalogo.get(id) ?? null;
}

export function actualizarPrecio(id, nuevoPrecio) {
  const producto = catalogo.get(id);
  if (!producto) throw new Error(`El producto ${id} no existe`);
  if (typeof nuevoPrecio !== 'number' || Number.isNaN(nuevoPrecio) || nuevoPrecio < 0) {
    throw new Error('Precio inválido');
  }
  producto.precio = nuevoPrecio;
  return { ...producto };
}

reiniciarCatalogo();
