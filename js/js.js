let peliculas = [];
let btn = document.getElementById('btnBuscar');
let input = document.getElementById('inputBuscar');
let contenedor = document.getElementById('lista');

function estrellas(cantidad){
  let canti = Math.round(cantidad);
  let cant = 10 - canti;
  let stars = '';
  for(let i = 0; i < canti; i++){
    stars += '★';
  }
  for(let i=0; i<cant; i++){
    stars+= '☆';
  }
  return stars;
}

fetch('https://japceibal.github.io/japflix_api/movies-data.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Error en la respuesta');
    }
    return response.json();
  })
  .then(data => {
    console.log('Datos recibidos:', data);
    
    peliculas = data;
    btn.addEventListener('click', ()=>{

      contenedor.innerHTML="";
      let btnin = document.getElementById('inputBuscar').value.toLowerCase();
      if (btnin === ''){
        return;
      }
      peliculas.forEach((peli)=>{
        let incluye = false;
        //es mejor hacer un while, porque no siempre se va a llegar al final del arreglo, por lo que estariamos recorriendo siempre el arreglo cuando la mayoria de las veces no será necesario.
        peli.genres.forEach((genero)=>{
          if (genero.name.toLowerCase().includes(btnin)){
            incluye = true;
          }
        });
        if (btnin != '' && (peli.title.toLowerCase().includes(btnin) || peli.overview.toLowerCase().includes(btnin) || incluye || peli.tagline.toLowerCase().includes(btnin))){
          const item = document.createElement('div');
          let star = estrellas(peli.vote_average);
          item.className = 'list card bg-dark text-white mb-3';
          item.innerHTML=`
          <div class='card-body'>
            <h4>${peli.title}</h4>
            <p>${peli.tagline}</p>
            <p class='text-end'><span style='color:gold;'>${star}</span></p>
            <p class='der'>Language: <span style='color: white'>${peli.original_language}</span></p>
          </div>
          `;
          contenedor.appendChild(item);
        }
      });
    });
    
  })
  .catch(error => {
    console.error('Hubo un problema con el fetch:', error);

});
