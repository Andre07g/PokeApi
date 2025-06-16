// Mostrar pantalla de carga al iniciar
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("pantalla-carga").style.display = "flex";
});

// Ocultar cuando todo esté cargado
window.onload = () => {
    document.getElementById("pantalla-carga").style.display = "none";

    const esTelefono = /Mobi|Android/i.test(navigator.userAgent);
    const pagina = location.pathname.split("/").pop(); // ejemplo: "index.html"

    if (esTelefono) {
        funcionesTelefono(pagina);
    } else {
        funcionesPC(pagina);
    }
};

// Funciones según dispositivo y página
function funcionesPC(pagina) {
    if (pagina === "index.html") {
        const listaFondos = ["../assets/wallpapers/wal1.gif", "../assets/wallpapers/wal2.gif", "../assets/wallpapers/wal3.gif", "../assets/wallpapers/wal4.gif", "../assets/wallpapers/wal5.gif", "../assets/wallpapers/wal6.gif", "../assets/wallpapers/wal7.gif", "../assets/wallpapers/wal8.gif", "../assets/wallpapers/wal9.gif", "../assets/wallpapers/wal10.gif",];
        const listaGif = ["../assets/pokegif/pokemon1.gif", "../assets/pokegif/pokemon2.gif", "../assets/pokegif/pokemon3.gif", "../assets/pokegif/pokemonultimo.gif",];
        const botonPokedex = document.getElementById("boton-pokedex");
        const botonCartas = document.getElementById("boton-cartas");
        const botonFondo = document.getElementById("boton-fondo");
        const botonGif = document.getElementById("pokemon-gif");
        const fondo = document.getElementsByClassName("cuerpo-index")[0];
        let posicionGif = 0;
        let posicionWal = 0;
        botonGif.addEventListener("click", () => {

            if (posicionGif < 4) { botonGif.setAttribute("src", listaGif[posicionGif]); posicionGif += 1 }
            else { botonGif.setAttribute("src", listaGif[0]); posicionGif = 1 }
        })
        botonFondo.addEventListener("click", () => {
            botonFondo.setAttribute("src", "../assets/variedsources/fondopulsado.png");
            botonFondo.style.top = "17.5vh";
            setTimeout(() => {
                botonFondo.setAttribute("src", "../assets/variedsources/fondonormal.png");
                botonFondo.style.top = "15vh";
            }, 200);
            if (posicionWal < 10) { fondo.style.backgroundImage = `url(${listaFondos[posicionWal]})`; posicionWal += 1 }
            else { fondo.style.backgroundImage = `url(${listaFondos[0]})`; posicionWal = 1 }
        })
        botonPokedex.addEventListener("click", () => {
            botonPokedex.setAttribute("src", "../assets/variedsources/pokedexpulsado.png");
            botonPokedex.style.top = "42vh";
            setTimeout(() => {
                botonPokedex.setAttribute("src", "../assets/variedsources/pokedexnormal.png");
                botonPokedex.style.top = "40vh";
            }, 200);
            setTimeout(() => { window.open("../html/pokedex.html", "_self") }, 300)
        });
        botonCartas.addEventListener("click", () => {
            botonCartas.setAttribute("src", "../assets/variedsources/cartaspulsado.png");
            botonCartas.style.top = "67vh";
            setTimeout(() => {
                botonCartas.setAttribute("src", "../assets/variedsources/cartasnormal.png");
                botonCartas.style.top = "65vh";
            }, 200);
            setTimeout(() => { window.open("../html/cards.html", "_self") }, 300)
        })

    } else if (pagina === "cards.html") {
        const cards = document.querySelectorAll('.carta');

        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.offsetY;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * 10;
                const rotateY = ((x - centerX) / centerX) * 10;

                card.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.1)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
            });
        });


        document.querySelector('.carta-contenedor').addEventListener('mouseleave', () => {
            card.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;
        });
    }
}

function funcionesTelefono(pagina) {
    if (pagina === "index.html") {
        console.log("TELÉFONO: funciones para index");
        // Aquí funciones para móviles
    } else if (pagina === "pokeapi.html") {
        console.log("TELÉFONO: funciones para pokeapi");
    }
}
