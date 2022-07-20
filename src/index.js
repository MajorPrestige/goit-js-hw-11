import { PixabayApi } from './js/photo-card';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import photoCard from './templates/photo-card.hbs';

const formEl = document.querySelector('.search-bar');
const galleryEl = document.querySelector('.gallery');
const loadBtnEl = document.querySelector('.load-more');

const pixabayAPI = new PixabayApi();

formEl.addEventListener('submit', onFormSubmit);
loadBtnEl.addEventListener('click', onLoadBtnClick);

function onFormSubmit(e) {
  e.preventDefault();

  pixabayAPI.qeury = e.currentTarget.elements['search'].value;
  pixabayAPI.page = 1;

  pixabayAPI
    .fetchPhotosByQuery()
    .then(response => {
      if (response.data.hits.length === 0) {
        galleryEl.innerHTML = '';
        loadBtnEl.classList.add('is-hidden');
        e.target.reset();
        return;
      }

      if (pixabayAPI.page === response.data.totalHits) {
        loadBtnEl.classList.add('is-hidden');
        galleryEl.innerHTML = photoCard(response.data.hits);
        return;
      }

      galleryEl.innerHTML = photoCard(response.data.hits);
      loadBtnEl.classList.remove('is-hidden');
    })
    .then(() => {
      new SimpleLightbox('.gallery__item a', {
        captionsData: 'alt',
        captionsDelay: 250,
      });
    })
    .catch(err => {
      console.log(err);
    });
}

function onLoadBtnClick(e) {
  pixabayAPI.page += 1;

  pixabayAPI
    .fetchPhotosByQuery()
    .then(response => {
      if (pixabayAPI.page === response.data.totalHits) {
        loadBtnEl.classList.add('is-hidden');
      }
      console.log(response.data.totalHits);
      galleryEl.insertAdjacentHTML('beforeend', photoCard(response.data.hits));
    })
    .then(() => {
      new SimpleLightbox('.gallery__item a', {
        captionsData: 'alt',
        captionsDelay: 250,
      });
    })
    .catch(err => {
      console.log(err);
    });
}
