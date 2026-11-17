# Backlog

Funcionalidades y correcciones pendientes, de menor a mayor tamaño.

## 1. Corregir el redondeo del total del pedido (pequeña)

Un pedido con 3 cuadernos A5 (4.10 c/u, 10 % de descuento por papelería) devuelve en la API un total de `11.069999999999999` en lugar de `11.07`. La UI lo disimula porque formatea con dos decimales, pero la API y los pedidos cerrados guardan el valor con error.

Criterio de aceptación: los totales de la API y de los pedidos cerrados tienen exactamente dos decimales.

## 2. Validar el formato del email al registrar clientes (pequeña)

Hoy `registrarCliente` acepta cualquier texto como email (por ejemplo `ana@` o `ana.ejemplo.com`).

Criterio de aceptación: se rechazan emails sin formato válido, con pruebas para al menos tres casos válidos y tres inválidos.

## 3. Cupones de descuento con fecha de expiración y uso único por cliente (mediana)

Marketing quiere crear cupones (por ejemplo `BIENVENIDA10`) que:

- descuentan un porcentaje o un monto fijo,
- tienen fecha de expiración,
- se pueden usar una sola vez por cliente,
- se aplican al cerrar el pedido, después de los descuentos automáticos.

Hay preguntas abiertas: ¿un cupón se combina con los descuentos de categoría y volumen? ¿qué pasa si el descuento supera el total?

## 4. Historial de precios por producto (grande)

Cada cambio de precio debe quedar registrado con fecha, precio anterior y precio nuevo, y consultarse con `GET /productos/{id}/precios`. Los pedidos abiertos deben conservar el precio con el que se agregó cada línea.
