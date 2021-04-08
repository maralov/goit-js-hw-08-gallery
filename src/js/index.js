import imagesData from '../gallery-items.js'

const refs = {
  galleryContainer: document.querySelector('.js-gallery'),
}

const makeGalleryMarkup = (images) => {
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

const renderGalleryListItems = () => {
  refs.galleryContainer.innerHTML = makeGalleryMarkup(imagesData)
};

renderGalleryListItems();