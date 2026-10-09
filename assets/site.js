(function () {
  var nav = document.querySelector("[data-nav]");
  if (nav) {
    var onScroll = function () { nav.classList.toggle("is-scrolled", window.scrollY > 8); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  // App Store panel rail arrows.
  var rail = document.querySelector("[data-rail]");
  document.querySelectorAll("[data-rail-dir]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (!rail) return;
      var card = rail.querySelector("figure");
      var step = card ? card.getBoundingClientRect().width + 22 : 300;
      rail.scrollBy({ left: step * Number(btn.getAttribute("data-rail-dir")), behavior: "smooth" });
    });
  });

  // Steps -> minutes budget calculator (500 steps = 15 minutes).
  document.querySelectorAll("[data-budget]").forEach(function (root) {
    var input = root.querySelector("input[type=range]");
    var stepsOut = root.querySelector("[data-steps]");
    var minsOut = root.querySelector("[data-mins]");
    var fmt = function (n) { return n.toLocaleString("en-US"); };
    var dur = function (m) {
      var h = Math.floor(m / 60), r = m % 60;
      if (!h) return m + " min";
      return r ? h + "h " + r + "m" : h + (h === 1 ? " hour" : " hours");
    };
    var update = function () {
      var steps = Number(input.value);
      stepsOut.textContent = fmt(steps);
      minsOut.textContent = dur(Math.floor(steps / 500) * 15);
      input.setAttribute("aria-valuetext", fmt(steps) + " steps earns " + dur(Math.floor(steps / 500) * 15));
    };
    input.addEventListener("input", update);
    update();
  });
})();
