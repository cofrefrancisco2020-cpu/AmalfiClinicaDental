const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-site-nav]");
const year = document.querySelector("[data-year]");
const form = document.querySelector("[data-booking-form]");

const setHeaderState = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 12);
};

const closeMenu = () => {
  document.body.classList.remove("menu-open");
  header?.classList.remove("menu-active");
  nav?.classList.remove("is-open");
  menuToggle?.setAttribute("aria-expanded", "false");
};

setHeaderState();
year.textContent = new Date().getFullYear();

window.addEventListener("scroll", setHeaderState, { passive: true });

menuToggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  document.body.classList.toggle("menu-open", isOpen);
  header.classList.toggle("menu-active", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

const revealItems = document.querySelectorAll("[data-reveal]");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

form?.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(form);
  const nombre = String(data.get("nombre") || "").trim();
  const servicio = String(data.get("servicio") || "").trim();
  const fecha = String(data.get("fecha") || "").trim();
  const mensaje = String(data.get("mensaje") || "").trim();

  const lines = [
    `Hola, soy ${nombre}. Quiero agendar una hora en Amalfi Clínica Dental.`,
    servicio ? `Servicio de interés: ${servicio}.` : "",
    fecha ? `Fecha preferida: ${fecha}.` : "",
    mensaje ? `Mensaje: ${mensaje}` : "",
  ].filter(Boolean);

  const url = `https://wa.me/56942729970?text=${encodeURIComponent(lines.join("\n"))}`;
  window.open(url, "_blank", "noopener,noreferrer");
});
