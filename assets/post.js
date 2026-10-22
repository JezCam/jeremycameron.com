(function () {
  var body = document.querySelector('.post-body');
  if (!body) return;

  // Reading progress: how far the bottom of the screen is through the post body.
  var bar = document.querySelector('.progress-bar');
  function updateProgress() {
    var rect = body.getBoundingClientRect();
    var total = rect.height - window.innerHeight;
    var done = total > 0 ? -rect.top / total : 1;
    bar.style.transform = 'scaleX(' + Math.min(Math.max(done, 0), 1) + ')';
  }

  // Contents: built from the post's section headings, shown on wide screens.
  var toc = document.querySelector('.toc');
  var headings = body.querySelectorAll('h2[id]');
  var links = [];
  if (toc && headings.length >= 2) {
    var list = toc.querySelector('ol');
    headings.forEach(function (h) {
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = '#' + h.id;
      a.textContent = h.textContent;
      li.appendChild(a);
      list.appendChild(li);
      links.push(a);
    });
    toc.hidden = false;
  }

  function updateActive() {
    var current = -1;
    headings.forEach(function (h, i) {
      if (h.getBoundingClientRect().top < window.innerHeight * 0.3) current = i;
    });
    // The last sections may be too short to scroll up to the line, so finish on the last one.
    var atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    if (atBottom) current = headings.length - 1;
    links.forEach(function (a, i) {
      if (i === current) a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');
    });
  }

  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      updateProgress();
      if (links.length) updateActive();
      ticking = false;
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();
})();
