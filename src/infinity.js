import { PixabayPhotoAPI } from './js/infinity-card';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import photoCardMarkup from './templates/photo-card.hbs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const searchFormEl = document.getElementById('search-bar');
const galleryEl = document.querySelector('.gallery');

const pixabayPhotoAPI = new PixabayPhotoAPI();

const simplelightbox = new SimpleLightbox('.gallery__item a', {
  captionsDelay: 250,
});

searchFormEl.addEventListener('submit', onSerachFormSubmit);

const observer = new IntersectionObserver(
  entries => {
    if (entries[0].isIntersecting) {
      giveInfinityScroll();
    }
  },
  {
    root: null,
    rootMargin: '50px',
    threshold: 0.01,
  }
);

async function giveInfinityScroll() {
  pixabayPhotoAPI.page += 1;
  console.log('object');

  try {
    const response = await pixabayPhotoAPI.fetchPhotoByQuery();

    if (response.data.hits.length < 20) {
      Notify.info("We're sorry, but you've reached the end of search results.");
      observer.unobserve(document.querySelector('.for-infinity-scroll'));
    }

    galleryEl.insertAdjacentHTML(
      'beforeend',
      photoCardMarkup(response.data.hits)
    );

    simplelightbox.refresh();
  } catch (err) {
    console.log(err);
  }
}

async function onSerachFormSubmit(e) {
  e.preventDefault();

  pixabayPhotoAPI.query = e.currentTarget.elements.search.value;
  pixabayPhotoAPI.page = 1;

  try {
    const response = await pixabayPhotoAPI.fetchPhotoByQuery();
    console.log(response.data);

    if (response.data.totalHits === 0) {
      galleryEl.innerHTML = '';
      e.target.reset();
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }

    if (pixabayPhotoAPI.page === response.data.totalHits) {
      galleryEl.innerHTML = photoCardMarkup(response.data.hits);
      Notify.success(`Hooray! We found ${response.data.totalHits} images.`);
      return;
    }

    Notify.success(`Hooray! We found ${response.data.totalHits} images.`);
    galleryEl.innerHTML = photoCardMarkup(response.data.hits);

    simplelightbox.refresh();

    observer.observe(document.querySelector('.for-infinity-scroll'));
  } catch (err) {
    console.log(err);
  }
}
