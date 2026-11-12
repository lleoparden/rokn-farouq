// rokn-farouq interactions: mobile nav, scroll reveal, lightbox, active nav
(function(){
  "use strict";
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("mainNav");
  if (toggle && nav) {
    toggle.addEventListener("click", function(){
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.addEventListener("click", function(e){
      if (e.target.closest("a")) { nav.classList.remove("open"); toggle.setAttribute("aria-expanded","false"); }
    });
  }
  var io = ("IntersectionObserver" in window) ? new IntersectionObserver(function(es){
    es.forEach(function(en){ if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
  }, {threshold:.12}) : null;
  document.querySelectorAll(".reveal").forEach(function(el){
    if (io) io.observe(el); else el.classList.add("in");
  });
  // lightbox
  var lb = document.getElementById("lightbox"), img = document.getElementById("lbImg"),
      cap = document.getElementById("lbCap"), close = document.getElementById("lbClose");
  document.querySelectorAll(".g-item").forEach(function(b){
    b.addEventListener("click", function(){
      img.src = b.getAttribute("data-full"); img.alt = b.getAttribute("data-cap") || "";
      cap.textContent = b.getAttribute("data-cap") || "";
      lb.hidden = false; document.body.style.overflow = "hidden"; close.focus();
    });
  });
  function hide(){ lb.hidden = true; document.body.style.overflow = ""; }
  close.addEventListener("click", hide);
  lb.addEventListener("click", function(e){ if (e.target === lb) hide(); });
  document.addEventListener("keydown", function(e){ if (e.key === "Escape" && !lb.hidden) hide(); });
  // active nav
  var links = Array.prototype.slice.call(document.querySelectorAll("[data-nav]"));
  var secs = links.map(function(a){ return document.querySelector(a.getAttribute("href")); }).filter(Boolean);
  var nio = ("IntersectionObserver" in window) ? new IntersectionObserver(function(es){
    es.forEach(function(en){
      if (en.isIntersecting) {
        links.forEach(function(a){ a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id); });
      }
    });
  }, {rootMargin:"-40% 0px -55% 0px"}) : null;
  if (nio) secs.forEach(function(s){ nio.observe(s); });
})();
