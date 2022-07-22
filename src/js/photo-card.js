'use strict';
import axios from 'axios';

export class PixabayApi {
  #BASE_URL = 'https://pixabay.com/api/';
  #API_KEY = '28742881-7ed4fdaa96807499761d63f05';

  constructor() {
    this.page = 1;
    this.qeury = null;
    this.per_page = 21;
  }

  fetchPhotosByQuery() {
    return axios.get(`${this.#BASE_URL}`, {
      params: {
        key: this.#API_KEY,
        q: this.qeury,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page: this.page,
        per_page: this.per_page,
      },
    });
  }
}
