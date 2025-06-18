
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("pantalla-carga").style.display = "flex";
  window._inicioCarga = Date.now();
});

window.onload = () => {
  const tiempoTranscurrido = Date.now() - window._inicioCarga;
  const tiempoRestante = 1000 - tiempoTranscurrido;

  setTimeout(() => {
    document.getElementById("pantalla-carga").style.display = "none";

    const esTelefono = /Mobi|Android/i.test(navigator.userAgent);
    const pagina = location.pathname.split("/").pop();
console.log("prendio")
    if (esTelefono) {
      funcionesTelefono(pagina);
      console.log("aaaa")
    } else {
      funcionesPC(pagina);
    }
  }, Math.max(tiempoRestante, 0));
};


const listaGif = ["./assets/pokegif/pokemon2.gif", "./assets/pokegif/pokemon3.gif", "./assets/pokegif/pokemon4.gif",
      "./assets/pokegif/1.gif", "./assets/pokegif/5.gif",
      "./assets/pokegif/6.gif", "./assets/pokegif/7.gif", "./assets/pokegif/8.gif", "./assets/pokegif/9.gif", "./assets/pokegif/pokemonultimo.gif"
    ]
    const listaFondos = ["./assets/wallpapers/wal1.gif", "./assets/wallpapers/wal2.gif", "./assets/wallpapers/wal3.gif", "./assets/wallpapers/wal4.gif", "./assets/wallpapers/wal5.gif", "./assets/wallpapers/wal6.gif", "./assets/wallpapers/wal7.gif", "./assets/wallpapers/wal8.gif", "./assets/wallpapers/wal9.gif", "./assets/wallpapers/wal10.gif", "./assets/wallpapers/wal11.gif", "./assets/wallpapers/wal12.gif", "./assets/wallpapers/wal13.gif"];
    precargarImagenes(listaFondos);
precargarImagenes(listaGif);
  
const video = document.getElementById("video-poke");
const introYaVista = localStorage.getItem("intro-vista");

if (!introYaVista) {
  document.querySelector(".video-intro").style.display = "block";
  document.getElementById("activarSonido").addEventListener("click", () => {
  video.muted = false;
  video.volume = 1;
  document.getElementById("activarSonido").style.display = "none";
});
  video.addEventListener("ended", () => {
    document.querySelector(".video-intro").style.display = "none";
    localStorage.setItem("intro-vista", "true");
  });
} else {
  document.querySelector(".video-intro").style.display = "none";
}

function funcionesPC(pagina) {
  if (document.body.classList.contains("index-html")) {
    

   const botonPokedex = document.getElementById("boton-pokedex");
    const botonCartas = document.getElementById("boton-cartas");
    const botonFondo = document.getElementById("boton-fondo");
    const botonGif = document.getElementById("pokemon-gif");
    const fondo = document.getElementsByClassName("cuerpo-index")[0];
    let posicionGif = 0;
    let posicionWal = 0;
    botonGif.addEventListener("click", () => {

      if (posicionGif < 10) { console.log(posicionGif); botonGif.setAttribute("src", listaGif[posicionGif]); posicionGif += 1; console.log(posicionGif); console.log(listaGif[posicionGif]) }
      else { botonGif.setAttribute("src", listaGif[0]); posicionGif = 1 }
    })
    botonFondo.addEventListener("click", () => {
      botonFondo.setAttribute("src", "./assets/variedsources/fondopulsado.png");
      botonFondo.style.top = "17.5vh";
      setTimeout(() => {
        botonFondo.setAttribute("src", "./assets/variedsources/fondonormal.png");
        botonFondo.style.top = "15vh";
      }, 200);
      if (posicionWal < 13) {

        fondo.style.backgroundImage = `url(${listaFondos[posicionWal]})`; posicionWal += 1
      }
      else { fondo.style.backgroundImage = `url(${listaFondos[0]})`; posicionWal = 1 }
    })
    botonPokedex.addEventListener("click", () => {
      botonPokedex.setAttribute("src", "./assets/variedsources/pokedexpulsado.png");
      botonPokedex.style.top = "42vh";
      setTimeout(() => {
        botonPokedex.setAttribute("src", "./assets/variedsources/pokedexnormal.png");
        botonPokedex.style.top = "40vh";
      }, 200);
      setTimeout(() => { window.open("./html/pokedex.html", "_self") }, 300)
    });
    botonCartas.addEventListener("click", () => {
      botonCartas.setAttribute("src", "./assets/variedsources/cartaspulsado.png");
      botonCartas.style.top = "67vh";
      setTimeout(() => {
        botonCartas.setAttribute("src", "./assets/variedsources/cartasnormal.png");
        botonCartas.style.top = "65vh";
      }, 200);
      setTimeout(() => { window.open("./html/cards.html", "_self") }, 300)
    })

  } else if (document.body.classList.contains("cartas-html")) {
    const botonPagCartas = document.getElementById("logo-cartas");
    botonPagCartas.addEventListener("click", () => { window.open("./index.html", "_self") });
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
  else if (document.body.classList.contains("pokedex-html")) {
    const botonPagPokedex = document.getElementById("logo-pokedex");
    botonPagPokedex.addEventListener("click", () => { window.open("./index.html", "_self") });
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

        const tipoPrincipal = data.types[0].type.name;
        const tipejo = String(tipoPrincipal)
        const tipoColorMapping = [
          { tipo: 'fire', color: '#ff795c' },
          { tipo: 'water', color: '#5cdcff' },
          { tipo: 'grass', color: '#cdff91 ' },
          { tipo: 'electric', color: '#fdff69 ' },
          { tipo: 'psychic', color: '#ff94f7  ' },
          { tipo: 'rock', color: '#c1a382' },
          { tipo: 'ground', color: '#c4925b' },
          { tipo: 'ice', color: '#cbffff ' },
          { tipo: 'dragon', color: '#ff6565 ' },
          { tipo: 'fairy', color: '#ffbae4 ' },
          { tipo: 'bug', color: '#89c771 ' },
          { tipo: 'ghost', color: '#c4c1e6 ' },
          { tipo: 'fighting', color: '#851616 ' },
          { tipo: 'normal', color: 'lightgray' },
          { tipo: 'poison', color: '#c764ff' },
          { tipo: 'flying', color: 'skyblue' },
          { tipo: 'dark', color: 'black' },
          { tipo: 'steel', color: 'silver' }
        ];

        const tipoEncontrado = tipoColorMapping.find(t => t.tipo === tipejo);

        let tipomarca = tipoEncontrado ? tipoEncontrado.color : 'gray';
        tarjeta.style.backgroundColor = tipomarca;
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

        return tipoPrincipal;

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
  if (document.body.classList.contains("index-html")) {
const botonPokedex = document.getElementById("boton-pokedex");
    const botonCartas = document.getElementById("boton-cartas");
    const botonFondo = document.getElementById("boton-fondo");
    const botonGif = document.getElementById("pokemon-gif");
    const fondo = document.getElementsByClassName("cuerpo-index")[0];
    let posicionGif = 0;
    let posicionWal = 0;
    botonGif.addEventListener("click", () => {

      if (posicionGif < 10) { botonGif.setAttribute("src", listaGif[posicionGif]); posicionGif += 1 }
      else { botonGif.setAttribute("src", listaGif[0]); posicionGif = 1 }
    })
    botonFondo.addEventListener("click", () => {
      botonFondo.setAttribute("src", "./assets/variedsources/fondopulsado.png");
      botonFondo.style.top = "17.5vh";
      setTimeout(() => {
        botonFondo.setAttribute("src", "./assets/variedsources/fondonormal.png");
        botonFondo.style.top = "15vh";
      }, 200);
      if (posicionWal < 13) { fondo.style.backgroundImage = `url(${listaFondos[posicionWal]})`; posicionWal += 1 }
      else { fondo.style.backgroundImage = `url(${listaFondos[0]})`; posicionWal = 1 }
    })
    botonPokedex.addEventListener("click", () => {
      botonPokedex.setAttribute("src", "./assets/variedsources/pokedexpulsado.png");
      botonPokedex.style.top = "42vh";
      setTimeout(() => {
        botonPokedex.setAttribute("src", "./assets/variedsources/pokedexnormal.png");
        botonPokedex.style.top = "40vh";
      }, 200);
      setTimeout(() => { window.open("./html/pokedex.html", "_self") }, 300)
    });
    botonCartas.addEventListener("click", () => {
      botonCartas.setAttribute("src", "./assets/variedsources/cartaspulsado.png");
      botonCartas.style.top = "67vh";
      setTimeout(() => {
        botonCartas.setAttribute("src", "./assets/variedsources/cartasnormal.png");
        botonCartas.style.top = "65vh";
      }, 200);
      setTimeout(() => { window.open("./html/cards.html", "_self") }, 300)
    })

  } else if (document.body.classList.contains("cartas-html")) {
    const botonPagCartas = document.getElementById("logo-cartas");
    botonPagCartas.addEventListener("click", () => { window.open("./index.html", "_self") });
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
  } else if (document.body.classList.contains("pokedex-html")) {
    document.getElementById("consola").setAttribute("src", "")
    const botonPagPokedex = document.getElementById("logo-pokedex");
    botonPagPokedex.addEventListener("click", () => { window.open("./index.html", "_self") });
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

        const tipoPrincipal = data.types[0].type.name;
        const tipejo = String(tipoPrincipal)
        const tipoColorMapping = [
          { tipo: 'fire', color: '#ff795c' },
          { tipo: 'water', color: '#5cdcff' },
          { tipo: 'grass', color: '#cdff91 ' },
          { tipo: 'electric', color: '#fdff69 ' },
          { tipo: 'psychic', color: '#ff94f7  ' },
          { tipo: 'rock', color: '#c1a382' },
          { tipo: 'ground', color: '#c4925b' },
          { tipo: 'ice', color: '#cbffff ' },
          { tipo: 'dragon', color: '#ff6565 ' },
          { tipo: 'fairy', color: '#ffbae4 ' },
          { tipo: 'bug', color: '#89c771 ' },
          { tipo: 'ghost', color: '#c4c1e6 ' },
          { tipo: 'fighting', color: '#851616 ' },
          { tipo: 'normal', color: 'lightgray' },
          { tipo: 'poison', color: '#c764ff' },
          { tipo: 'flying', color: 'skyblue' },
          { tipo: 'dark', color: 'black' },
          { tipo: 'steel', color: 'silver' }
        ];

        const tipoEncontrado = tipoColorMapping.find(t => t.tipo === tipejo);

        let tipomarca = tipoEncontrado ? tipoEncontrado.color : 'gray';
        tarjeta.style.backgroundColor = tipomarca;
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

        return tipoPrincipal;

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
function precargarImagenes(lista) {
  lista.forEach(src => {
    const img = new Image();
    img.src = src;
  });
}