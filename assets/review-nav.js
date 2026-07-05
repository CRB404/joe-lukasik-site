// Internal-only review switcher. Floats at top-center on every direction.
// NOT part of the real site — it's for comparing the three directions.
// Remove this one <script> tag before shipping the chosen direction.
(function () {
  var DIRECTIONS = [
    { file: "v1.html", n: "01", label: "Editorial" },
    { file: "v2.html", n: "02", label: "Cinematic" },
    { file: "v3.html", n: "03", label: "Atelier" },
  ];

  // Normalise the current page to a bare slug (handles clean URLs like /v2,
  // trailing slashes, and index.html → the default direction).
  function slug(name) {
    return (name || "").toLowerCase().replace(/\.html?$/, "");
  }
  var here = slug(location.pathname.split("/").pop());
  if (here === "" || here === "index") here = "v2";

  var css = `
  .rev-nav{position:fixed;top:14px;left:50%;transform:translateX(-50%);z-index:2147483000;
    display:flex;align-items:center;gap:4px;padding:5px 6px 5px 12px;border-radius:999px;
    background:rgba(12,12,14,.82);backdrop-filter:blur(14px) saturate(1.4);
    -webkit-backdrop-filter:blur(14px) saturate(1.4);border:1px solid rgba(255,255,255,.14);
    box-shadow:0 8px 30px rgba(0,0,0,.35);font-family:ui-sans-serif,-apple-system,"Segoe UI",Roboto,sans-serif;
    transition:opacity .3s ease;user-select:none}
  .rev-nav:hover{opacity:1}
  .rev-nav.dim{opacity:.28}
  .rev-lab{color:#8b8b92;font-size:10px;letter-spacing:.14em;text-transform:uppercase;
    font-weight:600;white-space:nowrap;padding-right:4px}
  .rev-dot{width:6px;height:6px;border-radius:50%;background:#ff5f57;box-shadow:0 0 8px #ff5f57;margin-right:2px;flex:0 0 auto}
  .rev-a{display:flex;align-items:center;gap:6px;text-decoration:none;color:#cfcfd6;
    font-size:12px;font-weight:600;padding:6px 12px;border-radius:999px;line-height:1;
    transition:background .18s ease,color .18s ease;white-space:nowrap}
  .rev-a .num{font-variant-numeric:tabular-nums;font-size:10px;opacity:.6;font-weight:700}
  .rev-a:hover{background:rgba(255,255,255,.08);color:#fff}
  .rev-a.on{background:#fff;color:#0c0c0e}
  .rev-a.on .num{opacity:.5}
  .rev-hint{color:#66666e;font-size:10px;padding:0 8px 0 4px;letter-spacing:.04em;white-space:nowrap}
  @media (max-width:620px){.rev-lab,.rev-hint{display:none}.rev-a{padding:6px 10px}}
  `;
  var style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  var nav = document.createElement("nav");
  nav.className = "rev-nav";
  nav.setAttribute("aria-label", "Internal direction switcher");
  var inner = '<span class="rev-dot"></span><span class="rev-lab">Preview · pick a direction</span>';
  DIRECTIONS.forEach(function (d) {
    var on = slug(d.file) === here ? " on" : "";
    inner +=
      '<a class="rev-a' + on + '" href="' + d.file + '">' +
      '<span class="num">' + d.n + '</span>' + d.label + "</a>";
  });
  inner += '<span class="rev-hint">keys 1–3</span>';
  nav.innerHTML = inner;

  function mount() {
    document.body.appendChild(nav);
  }
  if (document.body) mount();
  else document.addEventListener("DOMContentLoaded", mount);

  // Keyboard 1/2/3 to jump between directions.
  document.addEventListener("keydown", function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    var t = e.target;
    if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
    var i = { "1": 0, "2": 1, "3": 2 }[e.key];
    if (i != null && slug(DIRECTIONS[i].file) !== here) location.href = DIRECTIONS[i].file;
  });

  // Fade the bar while actively scrolling so it never fights the design.
  var to;
  window.addEventListener(
    "scroll",
    function () {
      nav.classList.add("dim");
      clearTimeout(to);
      to = setTimeout(function () { nav.classList.remove("dim"); }, 550);
    },
    { passive: true }
  );
})();
