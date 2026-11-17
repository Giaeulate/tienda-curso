// Registro de clientes en memoria.

let clientes = new Map();
let siguienteId = 1;

export function reiniciarClientes() {
  clientes = new Map();
  siguienteId = 1;
}

export function registrarCliente({ nombre, email } = {}) {
  if (!nombre || !nombre.trim()) throw new Error('El nombre es obligatorio');
  if (!email) throw new Error('El email es obligatorio');
  for (const cliente of clientes.values()) {
    if (cliente.email === email) throw new Error('El email ya está registrado');
  }
  const cliente = { id: `cli-${siguienteId++}`, nombre: nombre.trim(), email };
  clientes.set(cliente.id, cliente);
  return cliente;
}

export function obtenerCliente(id) {
  return clientes.get(id) ?? null;
}
