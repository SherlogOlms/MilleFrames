/* Mille Frames — Couche 2.0 (améliorations). Non destructif. */
(function(){
  "use strict";

  // 1) Chargement progressif des images lazy
  document.querySelectorAll('img[loading="lazy"]').forEach(function(img){
    if (img.complete) img.classList.add('chargee');
    else img.addEventListener('load', function(){ img.classList.add('chargee'); });
  });

  // 2) Apparition au défilement
  var cibles = document.querySelectorAll('.album, .seances-cont, .inclus-cont, .me, .gallery-section h3, #reservation h3');
  cibles.forEach(function(el){ el.setAttribute('data-rev',''); });
  var revs = document.querySelectorAll('[data-rev]');
  if ('IntersectionObserver' in window){
    var obs = new IntersectionObserver(function(entries){
      entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('vu'); obs.unobserve(e.target); } });
    }, { threshold:.12 });
    revs.forEach(function(el){ obs.observe(el); });
  } else { revs.forEach(function(el){ el.classList.add('vu'); }); }

  // 3) Bouton retour en haut
  var st = document.createElement('button');
  st.id = 'scrollTop'; st.textContent = '↑'; st.setAttribute('aria-label','Revenir en haut');
  document.body.appendChild(st);
  st.addEventListener('click', function(){ window.scrollTo({ top:0, behavior:'smooth' }); });
  window.addEventListener('scroll', function(){ st.classList.toggle('visible', window.scrollY > 500); });

  // 4) Lightbox améliorée (pages galerie) : flèches + compteur + clavier
  var imgs = Array.prototype.slice.call(document.querySelectorAll('.galerie-img'));
  var lb = document.getElementById('lightbox');
  var lbImg = document.getElementById('lightboxImg');
  if (imgs.length && lb && lbImg){
    var idx = 0;
    function maj(){ lbImg.src = imgs[idx].src; lbImg.alt = imgs[idx].alt || ''; cpt.textContent = (idx+1)+' / '+imgs.length; }
    imgs.forEach(function(im,i){ im.addEventListener('click', function(){ idx = i; maj(); }); });

    function bouton(cls, txt, label){ var b=document.createElement('button'); b.className='lb-nav '+cls; b.textContent=txt; b.setAttribute('aria-label',label); document.body.appendChild(b); return b; }
    var prev = bouton('lb-prev','‹','Photo précédente');
    var next = bouton('lb-next','›','Photo suivante');
    var cpt = document.createElement('div'); cpt.className='lb-compteur'; document.body.appendChild(cpt);

    prev.addEventListener('click', function(e){ e.stopPropagation(); idx=(idx-1+imgs.length)%imgs.length; maj(); });
    next.addEventListener('click', function(e){ e.stopPropagation(); idx=(idx+1)%imgs.length; maj(); });

    // Affiche/masque les flèches selon l'état de la lightbox
    var mo = new MutationObserver(function(){
      var actif = lb.classList.contains('active');
      [prev,next].forEach(function(b){ b.classList.toggle('actif', actif); });
      cpt.classList.toggle('actif', actif);
    });
    mo.observe(lb, { attributes:true, attributeFilter:['class'] });

    document.addEventListener('keydown', function(e){
      if (!lb.classList.contains('active')) return;
      if (e.key === 'ArrowLeft'){ idx=(idx-1+imgs.length)%imgs.length; maj(); }
      if (e.key === 'ArrowRight'){ idx=(idx+1)%imgs.length; maj(); }
    });
  }
})();
