let peliculas = [];
let btn = document.getElementById('btnBuscar');
let input = document.getElementById('inputBuscar');
let contenedor = document.getElementById('lista');
const offcanvasElement = document.getElementById('offcanvasTop');
const offcanvas = new bootstrap.Offcanvas(offcanvasElement);


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
            <p class='p'>${peli.tagline}</p>
            <p class='text-end'><span style='color:gold;'>${star}</span></p>
            <p class='p izq'>Language: <span style='color: white'>${peli.original_language}</span></p>
          </div>
          `;
          contenedor.appendChild(item);

          item.addEventListener('click', ()=>{
            let year = peli.release_date.split("-")[0];
            document.getElementById('offcanvasTopLabel').textContent = peli.title;
            document.querySelector('.offcanvas-body').innerHTML = `
              <p>${peli.overview}</p>
              <p><strong>Géneros:</strong> ${peli.genres.map(g => g.name).join(', ')}</p>
              <div class="dropdown">
              <button class="end btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Mostrar
              </button>
                <ul class="dropdown-menu">
                  <li><p><strong>Año:</strong> ${year} min</p></li>
                  <li><p><strong>Duración:</strong> ${peli.runtime} min</p></li>
                  <li><p><strong>Presupuesto:</strong> $${peli.budget.toLocaleString()}</p></li>
                  <li><p><strong>Ingresos:</strong> $${peli.revenue.toLocaleString()}</p></li>
                </ul>
              </div>
            `;
            offcanvas.show();
          });
        }
      });
    });
    
  })
  .catch(error => {
    console.error('Hubo un problema con el fetch:', error);

});
