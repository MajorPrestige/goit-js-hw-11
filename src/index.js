import { PixabayApi } from './js/photo-card';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import photoCard from './templates/photo-card.hbs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('.search-bar');
const galleryEl = document.querySelector('.gallery');
const loadBtnEl = document.querySelector('.load-more');

const pixabayAPI = new PixabayApi();

const simplelightbox = new SimpleLightbox('.gallery__item a', {
  captionsDelay: 250,
});

formEl.addEventListener('submit', onFormSubmit);
loadBtnEl.addEventListener('click', onLoadBtnClick);

function onFormSubmit(e) {
  e.preventDefault();

  pixabayAPI.qeury = e.currentTarget.elements.search.value;
  pixabayAPI.page = 1;

  pixabayAPI
    .fetchPhotosByQuery()
    .then(response => {
      if (response.data.hits.length === 0) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        galleryEl.innerHTML = '';
        loadBtnEl.classList.add('is-hidden');
        e.target.reset();
        return;
      }

      if (pixabayAPI.page === response.data.totalHits) {
        loadBtnEl.classList.add('is-hidden');
        galleryEl.innerHTML = photoCard(response.data.hits);
        Notify.success(`Hooray! We found ${response.data.totalHits} images.`);
        return;
      }

      Notify.success(`Hooray! We found ${response.data.totalHits} images.`);
      galleryEl.innerHTML = photoCard(response.data.hits);
      loadBtnEl.classList.remove('is-hidden');
    })
    .then(() => {
      simplelightbox.refresh();
    })
    .catch(err => {
      console.log(err);
    });
}

function onLoadBtnClick() {
  pixabayAPI.page += 1;

  pixabayAPI
    .fetchPhotosByQuery()
    .then(response => {
      if (response.data.hits.length < 20) {
        loadBtnEl.classList.add('is-hidden');
        Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
      }

      galleryEl.insertAdjacentHTML('beforeend', photoCard(response.data.hits));
    })
    .then(() => {
      simplelightbox.refresh();
    })
    .catch(err => {
      console.log(err);
    });
}

const { height: cardHeight } = document
  .querySelector('.gallery')
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2,
  behavior: 'smooth',
});
