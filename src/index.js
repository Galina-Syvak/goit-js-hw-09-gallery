import './sass/main.scss';

import galleryItems from './js/gallery-items.js';

const refs = {
  listGallery: document.querySelector('.js-gallery'),
  isModalWindow: document.querySelector('.js-lightbox'),
  isImgModal: document.querySelector('.lightbox__image'),
  isOverlay: document.querySelector('.lightbox__overlay'),
  btnModalClose: document.querySelector('[data-action="close-lightbox"]'),
};

refs.listGallery.addEventListener('click', onTargetImgClick);

const makeGalleryItemsMarkup = galleryItems
  .map(({ preview, original, description }) => {
    return `<li class="gallery__item">
      <a
        class="gallery__link"
        href="${original}"
      >
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </li>`;
  })
  .join('');

refs.listGallery.insertAdjacentHTML('beforeend', makeGalleryItemsMarkup);

function onTargetImgClick(evt) {
  evt.preventDefault();
  const isGalleryImgEl = evt.target.classList.contains('gallery__image');

  if (!isGalleryImgEl) {
    return;
  }

  const element = evt.target;

  overrideImageValue(element);
  onOpenModal();

  refs.btnModalClose.addEventListener('click', onCloseModal);
  refs.isOverlay.addEventListener('click', onCloseModal);
  window.addEventListener('keydown', onTargetEscapeClick);
}

function onOpenModal() {
  refs.isModalWindow.classList.add('is-open');
}

function onCloseModal() {
  refs.isModalWindow.classList.remove('is-open');
  refs.isImgModal.src = '';
  refs.isImgModal.alt = '';

  refs.btnModalClose.removeEventListener('click', onCloseModal);
  refs.isOverlay.removeEventListener('click', onCloseModal);
}

function onTargetEscapeClick(evt) {
  if (evt.key === 'Escape') {
    onCloseModal();
  }
}

function overrideImageValue(el) {
  refs.isImgModal.src = el.dataset.source;
  refs.isImgModal.alt = el.alt;
}
