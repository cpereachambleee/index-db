
import './style.css';
import javascriptLogo from './javascript.svg';
import { setupCounter } from './counter.js';

if (!('indexedDB' in window)) {
  console.log("This browser doesn't support IndexedDB");
  return;
}

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`;

setupCounter(document.querySelector('#counter'));

const dbProm = idb.open('MovieSearch', 1, function (upgradeDB) {
  console.log('Creating a new object store');
  if (!upgradeDB.objectStoreNames.contains('movieDets')) {
    const movieObjStore = upgradeDb.createObjectStore('movieDets', {
      keyPath: 'imdbID',
    });
    movieObjStore.createIndex('movieList', 'movieList', { unique: true });
  }
  if (!upgradeDB.objectStoreNames.contains('notes')) {
    const notesObjStore = upgradeDb.createObjectStore('notes', {
      autoIncrement: true,
    });
    notesObjStore.createIndex('movieList', 'movieList', { unique: false });
  }
  if (!upgradeDB.objectStoreNames.contains('poster')) {
    const posterObjStore = upgradeDb.createObjectStore('poster', {
      autoIncrement: true,
    });
    posterObjStore.createIndex('movieList', 'movieList', { unique: false });
  }
});

dbProm.then(function (db) {
  const taction = db.transaction('store', 'readwrite');
});