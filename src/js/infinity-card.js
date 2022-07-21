'use strict';
import axios from 'axios';

export class PixabayPhotoAPI {
  #BASE_URL = 'https://pixabay.com/api/';
  #API_KEY = '28742881-7ed4fdaa96807499761d63f05';

  constructor() {
    this.page = 1;
    this.query = null;
  }

  fetchPhotoByQuery() {
    return axios.get(`${this.#BASE_URL}`, {
      params: {
        key: this.#API_KEY,
        q: this.query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: this.page,
        per_page: 20,
      },
    });
  }
}
