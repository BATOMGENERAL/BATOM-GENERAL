const galleries=[
{element:document.getElementById("pv-gallery"),path:"photos/pv",count:50,title:"Photovoltaïque BATOM GENERAL"},
{element:document.getElementById("renovation-gallery"),path:"photos/renovation",count:95,title:"Rénovation BATOM GENERAL"}
];

galleries.forEach(gallery=>{
 if(!gallery.element)return;
 for(let i=1;i<=gallery.count;i++){
  const img=document.createElement("img");
  img.src=`${gallery.path}/${i}.jpg`;
  img.alt=`${gallery.title} ${i}`;
  img.loading="lazy";
  img.decoding="async";
  img.onerror=()=>img.remove();
  gallery.element.appendChild(img);
 }
});

const lightbox=document.getElementById("lightbox");
const lightboxImg=document.getElementById("lightbox-img");
const closeBtn=document.getElementById("lightbox-close");
const prevBtn=document.getElementById("lightbox-prev");
const nextBtn=document.getElementById("lightbox-next");
let currentIndex=0;

function visibleImages(){return Array.from(document.querySelectorAll(".gallery img"))}
function openLightbox(index){
 const imgs=visibleImages();
 if(!imgs[index])return;
 currentIndex=index;
 lightboxImg.src=imgs[currentIndex].src;
 lightbox.classList.add("is-open");
 document.body.style.overflow="hidden";
}
function closeLightbox(){lightbox.classList.remove("is-open");lightboxImg.src="";document.body.style.overflow=""}
function showNext(){const imgs=visibleImages();currentIndex=(currentIndex+1)%imgs.length;lightboxImg.src=imgs[currentIndex].src}
function showPrev(){const imgs=visibleImages();currentIndex=(currentIndex-1+imgs.length)%imgs.length;lightboxImg.src=imgs[currentIndex].src}

document.addEventListener("click",e=>{
 if(e.target.matches(".gallery img"))openLightbox(visibleImages().indexOf(e.target));
 if(e.target===lightbox)closeLightbox();
});
closeBtn.addEventListener("click",closeLightbox);
nextBtn.addEventListener("click",showNext);
prevBtn.addEventListener("click",showPrev);
document.addEventListener("keydown",e=>{
 if(!lightbox.classList.contains("is-open"))return;
 if(e.key==="Escape")closeLightbox();
 if(e.key==="ArrowRight")showNext();
 if(e.key==="ArrowLeft")showPrev();
});