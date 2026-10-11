// Lista de productos (array de objetos)
const productos = [
    { id: 1, nombre: "Croquetas para perro 10 kg", categoria: "Alimento", precio: 32.50, icono: "🐕" },
    { id: 2, nombre: "Croquetas para gato 3 kg", categoria: "Alimento", precio: 14.90, icono: "🐈" },
    { id: 3, nombre: "Snacks dentales para perro", categoria: "Alimento", precio: 6.75, icono: "🦴" },
    { id: 4, nombre: "Pelota de goma resistente", categoria: "Juguetes", precio: 3.50, icono: "🎾" },
    { id: 5, nombre: "Ratón de peluche", categoria: "Juguetes", precio: 2.80, icono: "🐭" },
    { id: 6, nombre: "Shampoo hipoalergénico", categoria: "Higiene", precio: 8.90, icono: "🧴" },
    { id: 7, nombre: "Cortaúñas para mascotas", categoria: "Higiene", precio: 4.90, icono: "✂️" },
    { id: 8, nombre: "Collar antipulgas", categoria: "Medicina", precio: 9.80, icono: "🐾" },
    { id: 9, nombre: "Desparasitante en tabletas", categoria: "Medicina", precio: 7.40, icono: "💊" },
    { id: 10, nombre: "Vitaminas para mascotas", categoria: "Medicina", precio: 11.20, icono: "🩺" },
    { id: 11, nombre: "Cama acolchada mediana", categoria: "Accesorios", precio: 24.00, icono: "🛏️" },
    { id: 12, nombre: "Correa ajustable", categoria: "Accesorios", precio: 6.30, icono: "🦮" }
];

// Carrito de compras (empieza vacío)
let carrito = [];

// Muestra las tarjetas de los productos en la página
const mostrarProductos = (lista) => {
    const contenedor = document.getElementById("lista_productos");
    let html = "";

    for (let i = 0; i < lista.length; i++) {
        html = html + '<div class="col-12 col-sm-6 col-xl-4 mb-4">';
        html = html + '<div class="card h-100 text-center">';
        html = html + '<div class="icono_producto">' + lista[i].icono + '</div>';
        html = html + '<div class="card-body">';
        html = html + '<h5 class="card-title">' + lista[i].nombre + '</h5>';
        html = html + '<span class="badge bg-secondary">' + lista[i].categoria + '</span>';
        html = html + '<p class="precio mt-2">$' + lista[i].precio.toFixed(2) + '</p>';
        html = html + '<button class="btn btn-success" onclick="agregarAlCarrito(' + lista[i].id + ')">Agregar al carrito</button>';
        html = html + '</div>';
        html = html + '</div>';
        html = html + '</div>';
    }

    if (lista.length === 0) {
        html = '<p>No se encontraron productos.</p>';
    }

    contenedor.innerHTML = html;
}

// Filtra por el texto del buscador y por la categoría elegida
const filtrarProductos = () => {
    const texto = document.getElementById("buscador").value.toLowerCase();
    const categoria = document.getElementById("categoria").value;
    const resultado = [];

    for (let i = 0; i < productos.length; i++) {
        const coincideNombre = productos[i].nombre.toLowerCase().includes(texto);
        const coincideCategoria = (categoria === "Todas") || (productos[i].categoria === categoria);

        if (coincideNombre && coincideCategoria) {
            resultado.push(productos[i]);
        }
    }

    mostrarProductos(resultado);
}

// Agrega un producto al carrito usando su id
const agregarAlCarrito = (id) => {
    for (let i = 0; i < productos.length; i++) {
        if (productos[i].id === id) {
            carrito.push(productos[i]);
        }
    }
    mostrarCarrito();
}

// Quita un producto del carrito según su posición
const quitarDelCarrito = (posicion) => {
    carrito.splice(posicion, 1);
    mostrarCarrito();
}

// Deja el carrito vacío
const vaciarCarrito = () => {
    carrito = [];
    mostrarCarrito();
}

// Dibuja el carrito, el total y el contador
const mostrarCarrito = () => {
    const lista = document.getElementById("lista_carrito");
    const total = document.getElementById("total_carrito");
    const contador = document.getElementById("contador_carrito");
    let html = "";
    let suma = 0;

    for (let i = 0; i < carrito.length; i++) {
        html = html + '<li class="list-group-item d-flex justify-content-between align-items-center">';
        html = html + carrito[i].nombre + ' - $' + carrito[i].precio.toFixed(2);
        html = html + '<button class="btn btn-sm btn-outline-danger" onclick="quitarDelCarrito(' + i + ')">Quitar</button>';
        html = html + '</li>';
        suma = suma + carrito[i].precio;
    }

    if (carrito.length === 0) {
        html = '<li class="list-group-item">El carrito está vacío.</li>';
    }

    lista.innerHTML = html;
    total.innerHTML = "$" + suma.toFixed(2);
    contador.innerHTML = carrito.length;
}

// Al abrir la página
mostrarProductos(productos);
mostrarCarrito();
