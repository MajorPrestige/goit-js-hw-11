function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},o={},r={},n=t.parcelRequired7c6;null==n&&((n=function(e){if(e in o)return o[e].exports;if(e in r){var t=r[e];delete r[e];var n={id:e,exports:{}};return o[e]=n,t.call(n.exports,n,n.exports),n.exports}var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,t){r[e]=t},t.parcelRequired7c6=n);var a=n("3Dor9"),i=n("fZKcF"),s=n("cgQaQ"),l=n("iQIUW");const c=document.getElementById("search-bar"),u=document.querySelector(".gallery"),d=new(0,a.PixabayPhotoAPI),f=new(e(i))(".gallery__item a",{captionsDelay:250});c.addEventListener("submit",(async function(e){e.preventDefault(),d.query=e.currentTarget.elements.search.value,d.page=1;try{const t=await d.fetchPhotoByQuery();if(console.log(t.data),0===t.data.totalHits)return u.innerHTML="",e.target.reset(),void l.Notify.failure("Sorry, there are no images matching your search query. Please try again.");if(d.page===t.data.totalHits)return u.innerHTML=(0,s.default)(t.data.hits),void l.Notify.success(`Hooray! We found ${t.data.totalHits} images.`);l.Notify.success(`Hooray! We found ${t.data.totalHits} images.`),u.innerHTML=(0,s.default)(t.data.hits),f.refresh(),y.observe(document.querySelector(".for-infinity-scroll"))}catch(e){console.log(e)}}));const y=new IntersectionObserver((e=>{e[0].isIntersecting&&async function(){d.page+=1,console.log("object");try{const e=await d.fetchPhotoByQuery();e.data.hits.length<20&&(l.Notify.info("We're sorry, but you've reached the end of search results."),y.unobserve(document.querySelector(".for-infinity-scroll"))),u.insertAdjacentHTML("beforeend",(0,s.default)(e.data.hits)),f.refresh()}catch(e){console.log(e)}}()}),{root:null,rootMargin:"50px",threshold:.01});
//# sourceMappingURL=infinity.9a6d1e90.js.map
