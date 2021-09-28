/*  === Const and vars === */

/* API */
var NEXT_PAGE = 1;

const API_BASE_URL = 'https://rickandmortyapi.com/api/';
const API_CHARACTERS_URL = `${API_BASE_URL}character/`;
const API_GET_CHARACTERS_BY_PAGE_URL = `${API_CHARACTERS_URL}?page=${NEXT_PAGE}`;
const API_GET_CHARACTER_BY_NAME = `${API_CHARACTERS_URL}?name=`;

/* DOM */
let cards_container = document.querySelector('.js-card-container');
let load_more_btn = document.querySelector('.js-load-more-btn');

/* === END Const and vars === */

/* Get data from API */
const getDataFromUrl = (url) => {
  fetch( url )
    .then( response => response.json() )
    .then( data => generateCards( data ) );
}

/* Generate Cards */
function generateCards( cards ) {

  /* And now, generate cards*/
  cards['results'].forEach(card => {

    let status_custom_class = '';

    switch ( card.status ) {
      
      case 'Alive':
        break;
      case 'Dead':
        status_custom_class = 'isDead';
        break;
      case 'unknown':
        status_custom_class = 'isUnknown';
        break;

    }

    let card_info = `
      <div class="col-12 col-md-6 col-lg-4 col-xl-3 mb-4">
        <div class="c-card">
          <div class="c-card__head">
            <img src="${card.image}">
          </div>
          <div class="c-card__body">
            <p class="c-card__name mb-1">${card.name}</p>
            <p class="c-card__specie">${card.species}</p>
            <p class="c-card__status ${status_custom_class}">${card.status}</p>
            <p class="c-card__origin">${card['origin'].name}</p>
          </div>
        </div>
      </div>
    `;

    root.innerHTML += card_info;

  });

  /* Increment value of load more btn*/
  load_more_btn.setAttribute( 'data-next-page', NEXT_PAGE );

}

/* Load next page */
function loadMore(page) {
  /* Set next page */
  NEXT_PAGE = parseInt(page) + 1;

  /* Get data from API */
  getDataFromUrl(`https://rickandmortyapi.com/api/character/?page=${NEXT_PAGE}`);
}

/* Remove all childres */
function removeAllChildNodes(parent) {
  while ( parent[0] ) {
    parent[0].parentNode.removeChild(parent[0]);
  }
}

/* Add data to root container */
function writeText(text) {
  root.innerHTML += `<p>${text}</p>`;
}

/* Init get data */
getDataFromUrl(API_GET_CHARACTERS_BY_PAGE_URL);