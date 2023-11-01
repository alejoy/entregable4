const socket = io()
const render = (data) => {
    const ul = document.getElementById('ul-websocket')
    console.log(document.getElementById('ul-websocket'));
    ul.innerHTML = ''
    //*si la lista de productos esta vacia se imprime un comentario
    if (data.length === 0) {
        ul.innerHTML = '<h2 class="h2-home">No hay productos agregados</h2>'
    } else {
        data.forEach(p => {
            const html = document.createElement('li')
            html.innerHTML =
            `<p>Title: ${p.title}</p>
            <p>Description: ${p.description}</p>
            <p>Price: $${p.price}</p>
            <p>Status: ${p.status}</p>
            <p>Code: ${p.code}</p>
            <p>Id: ${p.id}</p>`

            ul.append(html)
        });
    }
}

function submitProduct() {
    const productData = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        price: parseFloat(document.getElementById("price").value),
        thumbnails: document.getElementById("thumbnails").value,
        code: document.getElementById("code").value,
        category: document.getElementById("category").value,
        status: document.getElementById("status").value
    };

    fetch("/api/products", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(productData)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Producto enviado con éxito:", data);
    })
    .catch(error => {
        console.error("Error al enviar el producto:", error);
    });
}

socket.on('products', (data) => {
    render(data);
})