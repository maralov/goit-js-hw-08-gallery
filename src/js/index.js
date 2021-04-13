import imagesData from '../gallery-items.js'

const modalActiveClass = 'is-open'

const refs = {
  galleryContainer: document.querySelector('.js-gallery'),
  modal: document.querySelector('.js-lightbox'),
  modalOverlay: document.querySelector('.js-lightbox'),
  modalImage: document.querySelector('.lightbox__image')
}
const imagesSrcArr = imagesData.map(img => img.original);

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
  document.addEventListener('keyup', onSlideImage);

}

const onModalClose = e => {
  const { target } = e;

  if (target.dataset.action || target.classList.contains('lightbox__overlay') || e.code === "Escape") {

    refs.modal.classList.remove(modalActiveClass);

    clearModalImage();

    document.removeEventListener('keyup', onModalClose);
    document.removeEventListener('keyup', onSlideImage);
  }
}

// Open & close gallery modal END

// modal slider modal START

const slideModalImage = {
  currentImgIndex: 0,

  prevSlide() {
    const index = imagesSrcArr.indexOf(refs.modalImage.src)

    this.setIndex(index - 1);

    if (this.currentImgIndex < 0) {
      this.setIndex(imagesSrcArr.length - 1);
    }

    const { src, alt } = this.getImageData(this.currentImgIndex);

    setModalImage(src, alt);
  },

  nextSlide() {
    const index = imagesSrcArr.indexOf(refs.modalImage.src);

    this.setIndex(index + 1);

    if (this.currentImgIndex > imagesSrcArr.length - 1) {
      this.setIndex(0);
    }

    const { src, alt } = this.getImageData(this.currentImgIndex);

    setModalImage(src, alt);
  },


  setIndex(index) {
    this.currentImgIndex = index
  },


  getImageData(index) {
    return {
      src: imagesData[index].original,
      alt: imagesData[index].description,
    }
  }

}

const onSlideImage = (e) => {
  switch (e.code) {
    case 'ArrowLeft':
      slideModalImage.prevSlide()
      break;
    case 'ArrowRight':
      slideModalImage.nextSlide();
      break;
  }
}

// modal slider modal END

// Listeners START

refs.modal.addEventListener('click', onModalClose);

refs.galleryContainer.addEventListener('click', onModalOpen);

// Listeners END