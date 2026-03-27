const galerieImages = document.querySelectorAll('.galerie-img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const closeLightbox = document.getElementById('closeLightbox');


if (galerieImages.length > 0 && lightbox && lightboxImg && closeLightbox) {
  galerieImages.forEach(image => {
    image.addEventListener('click', () => {
      lightboxImg.src = image.src;
      lightbox.classList.add('active');
    });
  });

  closeLightbox.addEventListener('click', () => {
    lightbox.classList.remove('active');
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target !== lightboxImg) {
      lightbox.classList.remove('active');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      lightbox.classList.remove('active');
    }
  });
}