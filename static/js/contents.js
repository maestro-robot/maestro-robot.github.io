document.addEventListener('DOMContentLoaded', function () {
  var links = Array.from(document.querySelectorAll('.contents-links a[href^="#"]'));
  var entries = links.map(function (link) {
    return { link: link, target: document.getElementById(link.hash.slice(1)) };
  }).filter(function (entry) { return entry.target; });
  var current = null;
  var pending = false;
  function update() {
    pending = false;
    var offset = window.innerWidth <= 1023 ? 130 : 80;
    var active = entries[0];
    entries.forEach(function (entry) {
      if (entry.target.getBoundingClientRect().top <= offset) active = entry;
    });
    if (!active || active.link === current) return;
    links.forEach(function (link) { link.removeAttribute('aria-current'); });
    active.link.setAttribute('aria-current', 'location');
    current = active.link;
    if (window.innerWidth <= 1023) {
      var bar = document.querySelector('.contents-links');
      var left = active.link.offsetLeft;
      var right = left + active.link.offsetWidth;
      if (left < bar.scrollLeft || right > bar.scrollLeft + bar.clientWidth) {
        bar.scrollLeft = Math.max(0, left - 12);
      }
    }
  }
  function schedule() {
    if (pending) return;
    pending = true;
    window.requestAnimationFrame(update);
  }
  entries.forEach(function (entry) {
    entry.link.addEventListener('click', function (event) {
      event.preventDefault();
      if (window.location.hash !== entry.link.hash) {
        window.history.pushState(null, '', entry.link.hash);
      }
      entry.target.scrollIntoView({ block: 'start', behavior: 'auto' });
      update();
    });
  });
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', function () { current = null; schedule(); });
  update();
});
