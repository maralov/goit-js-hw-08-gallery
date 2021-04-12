import imagesData from '../gallery-items.js'

const modalActiveClass = 'is-open'
const refs = {
  galleryContainer: document.querySelector('.js-gallery'),
  modal: document.querySelector('.js-lightbox'),
  modalOverlay: document.querySelector('.js-lightbox'),
  modalImage: document.querySelector('.lightbox__image')
}

// Make & render gallery layout START

const makeGalleryMarkup = images => {
  return images.map(({
    preview: previewImgSrc,
    original: originalImgSrc,
    description: altText }) => {
    return `
      <li class="gallery__item">
        <a
          class="gallery__link"
          href="${originalImgSrc}"
        >
          <img
            class="gallery__image"
            src="${previewImgSrc}"
            data-source="${originalImgSrc}"
            alt="${altText}"
          />
        </a>
      </li>
    `
  }).join('')
};

const renderGalleryListItems = (itemsArray) => {
  refs.galleryContainer.innerHTML = makeGalleryMarkup(itemsArray);
};

renderGalleryListItems(imagesData);

// Make & render gallery layout END

// Open & close gallery modal START
const setModalImage = (src, altTxt) => {
  refs.modalImage.src = src
  refs.modalImage.alt = altTxt
}

const clearModalImage = () => {
  refs.modalImage.src = ''
  refs.modalImage.alt = ''
}

const onModalOpen = e => {
  e.preventDefault();
  const { target } = e;
  const imageSrc = target.dataset.source;
  const imageAltText = target.alt;

  if (!target.classList.contains('gallery__image')) return

  setModalImage(imageSrc, imageAltText);

  refs.modal.classList.add(modalActiveClass);

  document.addEventListener('keyup', onModalClose);

}

const onModalClose = e => {
  const { target } = e;

  if (target.dataset.action || target.classList.contains('lightbox__overlay') || e.code === "Escape") {

    refs.modal.classList.remove(modalActiveClass);
    clearModalImage();
    document.removeEventListener('keyup', onModalClose);
  }

}


refs.modal.addEventListener('click', onModalClose);

refs.galleryContainer.addEventListener('click', onModalOpen);

// Open & close gallery modal END