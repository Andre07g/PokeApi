
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("pantalla-carga").style.display = "flex";
  window._inicioCarga = Date.now(); 
});

window.onload = () => {
  const tiempoTranscurrido = Date.now() - window._inicioCarga;
  const tiempoRestante = 2000 - tiempoTranscurrido;

  setTimeout(() => {
    document.getElementById("pantalla-carga").style.display = "none";

    const esTelefono = /Mobi|Android/i.test(navigator.userAgent);
    const pagina = location.pathname.split("/").pop();

    if (esTelefono) {
      funcionesTelefono(pagina);
    } else {
      funcionesPC(pagina);
    }
  }, Math.max(tiempoRestante, 0)); 
};

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
    const botonPagCartas = document.getElementById("logo-cartas");
    botonPagCartas.addEventListener("click", () => { window.open("../index.html", "_self") });
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
  else if (pagina === "pokedex.html") {
    const botonPagPokedex = document.getElementById("logo-pokedex");
    botonPagPokedex.addEventListener("click", () => { window.open("../index.html", "_self") });
    async function obtenerPrimeros151Pokemon() {
      const url = "https://pokeapi.co/api/v2/pokemon?limit=151";
      const res = await fetch(url);
      const data = await res.json();

      const detalles = await Promise.all(
        data.results.map(async (p, i) => {
          const resDetalle = await fetch(p.url);
          const detalle = await resDetalle.json();
          return {
            name: detalle.name,
            id: detalle.id,
            sprite: detalle.sprites.front_default
          };
        })
      );

      return detalles;
    }


    async function mostrarPokemon(nombre) {
      try {
        const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre.toLowerCase()}`);
        if (!resp.ok) throw new Error("Pokémon no encontrado");
        const data = await resp.json();

        const respSpecies = await fetch(data.species.url);
        if (!respSpecies.ok) throw new Error("No se pudo obtener especie");
        const species = await respSpecies.json();

        const descripcionObj = species.flavor_text_entries.find(entry => entry.language.name === 'es');
        const descripcion = descripcionObj ? descripcionObj.flavor_text.replace(/\f/g, ' ') : 'Sin descripción disponible.';

        const pantalla = document.querySelector('.pantallapoke');
        pantalla.innerHTML = '';

        const tarjeta = document.createElement('div');
        tarjeta.classList.add('tarjeta-pokemon');

        const tiposHTML = data.types.map(t => {
          const tipo = t.type.name;
          return `<img src="https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/${tipo}.svg" alt="${tipo}" title="${tipo}">`;
        }).join('');

        tarjeta.innerHTML = `
      <div class="barra-superior">
        <h1>POKÉMON</h1>
      </div>

      <div class="nombre-sprite">
        <h1>${data.name.toUpperCase()}</h1>
        <img class="sprite-pokemon" src="${data.sprites.front_default}" alt="${data.name}">
      </div>

      <div class="caracteristicas">
        <h1><span class="carac">NÚMERO</span>${String(data.id).padStart(3, '0')}</h1>
        <h1><span class="carac">NOMBRE</span>${data.name}</h1>
        <div class="imagen-tipos">
          <h1><span class="carac">TIPO</span></h1>
          ${tiposHTML}
        </div>
        <h1><span class="carac">ALTURA</span>${data.height / 10} m</h1>
        <h1><span class="carac">PESO</span>${data.weight / 10} kg</h1>
      </div>

      <div class="descripcion">
        <h1>Notas Extra</h1>
        <p>${descripcion}</p>
      </div>
    `;

        pantalla.appendChild(tarjeta);

      } catch (error) {
        console.error("Error mostrando Pokémon:", error);
        alert("No se pudo mostrar el Pokémon.");
      }
    }

    function generarBarraBusqueda(lista) {
      const input = document.getElementById("buscador");
      const contenedor = document.getElementById("barra-resultados");

      function renderLista(filtrados) {
        contenedor.innerHTML = "";

        filtrados.forEach(pokemon => {
          const item = document.createElement("div");
          item.classList.add("item-barra");

          item.innerHTML = `
        <span>#${String(pokemon.id).padStart(3, '0')}</span>
        <span>${pokemon.name}</span>
        <img src="${pokemon.sprite}" alt="${pokemon.name}" height="40">
      `;

          item.addEventListener("click", () => {
            mostrarPokemon(pokemon.name);
          });

          contenedor.appendChild(item);
        });
      }

      input.addEventListener("input", () => {
        const texto = input.value.toLowerCase();
        const filtrados = texto
          ? lista.filter(p => p.name.includes(texto))
          : lista;
        renderLista(filtrados);
      });

      renderLista(lista);
    }


    (async () => {
      const lista = await obtenerPrimeros151Pokemon();
      generarBarraBusqueda(lista);
    })();

  }


}

function funcionesTelefono(pagina) {
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
    const botonPagCartas = document.getElementById("logo-cartas");
    botonPagCartas.addEventListener("click", () => { window.open("../index.html", "_self") });
    const cards = document.querySelectorAll('.carta');

    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.offsetY;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * 2;
        const rotateY = ((x - centerX) / centerX) * 2;

        card.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.1)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
      });
    });


    document.querySelector('.carta-contenedor').addEventListener('mouseleave', () => {
      card.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;
    });
  } else if (pagina==="pokedex.html"){
    document.getElementById("consola").setAttribute("src","")
    const botonPagPokedex = document.getElementById("logo-pokedex");
    botonPagPokedex.addEventListener("click", () => { window.open("../index.html", "_self") });
    async function obtenerPrimeros151Pokemon() {
      const url = "https://pokeapi.co/api/v2/pokemon?limit=151";
      const res = await fetch(url);
      const data = await res.json();

      const detalles = await Promise.all(
        data.results.map(async (p, i) => {
          const resDetalle = await fetch(p.url);
          const detalle = await resDetalle.json();
          return {
            name: detalle.name,
            id: detalle.id,
            sprite: detalle.sprites.front_default
          };
        })
      );

      return detalles;
    }


    async function mostrarPokemon(nombre) {
      try {
        const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre.toLowerCase()}`);
        if (!resp.ok) throw new Error("Pokémon no encontrado");
        const data = await resp.json();

        const respSpecies = await fetch(data.species.url);
        if (!respSpecies.ok) throw new Error("No se pudo obtener especie");
        const species = await respSpecies.json();

        const descripcionObj = species.flavor_text_entries.find(entry => entry.language.name === 'es');
        const descripcion = descripcionObj ? descripcionObj.flavor_text.replace(/\f/g, ' ') : 'Sin descripción disponible.';

        const pantalla = document.querySelector('.pantallapoke');
        pantalla.innerHTML = '';

        const tarjeta = document.createElement('div');
        tarjeta.classList.add('tarjeta-pokemon');

        const tiposHTML = data.types.map(t => {
          const tipo = t.type.name;
          return `<img src="https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/${tipo}.svg" alt="${tipo}" title="${tipo}">`;
        }).join('');

        tarjeta.innerHTML = `
      <div class="barra-superior">
        <h1>POKÉMON</h1>
      </div>

      <div class="nombre-sprite">
        <h1>${data.name.toUpperCase()}</h1>
        <img class="sprite-pokemon" src="${data.sprites.front_default}" alt="${data.name}">
      </div>

      <div class="caracteristicas">
        <h1><span class="carac">NÚMERO</span>${String(data.id).padStart(3, '0')}</h1>
        <h1><span class="carac">NOMBRE</span>${data.name}</h1>
        <div class="imagen-tipos">
          <h1><span class="carac">TIPO</span></h1>
          ${tiposHTML}
        </div>
        <h1><span class="carac">ALTURA</span>${data.height / 10} m</h1>
        <h1><span class="carac">PESO</span>${data.weight / 10} kg</h1>
      </div>

      <div class="descripcion">
        <h1>Notas Extra</h1>
        <p>${descripcion}</p>
      </div>
    `;

        pantalla.appendChild(tarjeta);

      } catch (error) {
        console.error("Error mostrando Pokémon:", error);
        alert("No se pudo mostrar el Pokémon.");
      }
    }

    function generarBarraBusqueda(lista) {
      const input = document.getElementById("buscador");
      const contenedor = document.getElementById("barra-resultados");

      function renderLista(filtrados) {
        contenedor.innerHTML = "";

        filtrados.forEach(pokemon => {
          const item = document.createElement("div");
          item.classList.add("item-barra");

          item.innerHTML = `
        <span>#${String(pokemon.id).padStart(3, '0')}</span>
        <span>${pokemon.name}</span>
        <img src="${pokemon.sprite}" alt="${pokemon.name}" height="40">
      `;

          item.addEventListener("click", () => {
            mostrarPokemon(pokemon.name);
          });

          contenedor.appendChild(item);
        });
      }

      input.addEventListener("input", () => {
        const texto = input.value.toLowerCase();
        const filtrados = texto
          ? lista.filter(p => p.name.includes(texto))
          : lista;
        renderLista(filtrados);
      });

      renderLista(lista);
    }


    (async () => {
      const lista = await obtenerPrimeros151Pokemon();
      generarBarraBusqueda(lista);
    })();

  }
}
