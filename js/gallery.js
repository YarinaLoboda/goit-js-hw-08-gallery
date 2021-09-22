
import { galleryItems } from '../app.js';


function createGalleryItemsMarkup(images) {
   let i = 0;
    return images.map(({preview, original, description}) => {
     

        return `
        <li class="gallery__item">
        <a href="${original}" class="gallery__link" onclick="event.preventDefault()">
          <img
            src="${preview}"
            alt="${description}"
            class="gallery__image"
            data-source="${original}"
            data-chain="${i++}"
          />
        </a>
      </li>  
        `;
    }).join('');
}


function onGalleryContainerClick(e) {

    const isGalleryImageEl = e.target.classList.contains('gallery__image');

    if (!isGalleryImageEl) return; 
    
 
    showHideModalWindow();
    document.addEventListener('keydown', onModalKeydown);
    lightboxOverlay.addEventListener('click', onLightboxOverlayClick);
    lightboxButtonClose.addEventListener('click', onLightboxButtonClose);
    
    lightboxImage.src = e.target.dataset.source;
    lightboxImage.alt = e.target.alt;
    currentNumber = e.target.dataset.chain;
  
}

function onLightboxOverlayClick(e){
    onLightboxButtonClose();
}

function onLightboxButtonClose() {
    showHideModalWindow();

    lightboxImage.src = '';
    lightboxImage.alt = '';
    currentNumber = -1;
    document.removeEventListener('keydown', onModalKeydown);
    lightboxOverlay.removeEventListener('click', onLightboxOverlayClick);
    lightboxButtonClose.removeEventListener('click', onLightboxButtonClose);
}

function showHideModalWindow() {
    modalWindowContainer.classList.toggle('is-open'); 
}

function getNextImage() {
    if ((currentNumber < (galleryItems.length - 1)) && (currentNumber >= 0)) {
       
        const currentObj = galleryItems[++currentNumber];

        lightboxImage.src = currentObj.original;
        lightboxImage.alt = currentObj.description;
    }
}

function getPreviousImage() {
    if ((currentNumber > 0) && (currentNumber <= (galleryItems.length - 1))) 
    {
        const currentObj = galleryItems[--currentNumber];
  
        lightboxImage.src = currentObj.original;
        lightboxImage.alt = currentObj.description;
  
        }
       
}

function onModalKeydown(e) {

    switch (e.code) {
    
  case 'Escape':
   onLightboxButtonClose();
            break;
        
  case 'ArrowRight':
    getNextImage();
            break;
        
     case 'ArrowLeft':
    getPreviousImage();
            break;
}

}

let currentNumber = -1;

const galleryContainer = document.querySelector('.js-gallery');
const modalWindowContainer = document.querySelector('.js-lightbox');
const lightboxOverlay = modalWindowContainer.querySelector('div.lightbox__overlay');
const lightboxImage = modalWindowContainer.querySelector('img.lightbox__image');
const lightboxButtonClose = modalWindowContainer.querySelector('button[data-action="close-lightbox"]');


const galleryItemsMarkup = createGalleryItemsMarkup(galleryItems);

galleryContainer.insertAdjacentHTML('beforeend', galleryItemsMarkup);

galleryContainer.addEventListener('click', onGalleryContainerClick);
