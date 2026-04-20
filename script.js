const WHATSAPP_NUMBER = "5511981940463";
const CONTACT_EMAIL = "mvtcontabilidade@gmail.com";

const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector("#mainNav");
const navLinks = document.querySelectorAll(".main-nav a");
const whatsappLinks = document.querySelectorAll(".whatsapp-link");
const planLinks = document.querySelectorAll(".plan-link");
const contactForm = document.querySelector("#contactForm");
const formStatus = document.querySelector("#formStatus");

function buildWhatsAppUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function setHeaderState() {
  if (header) {
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  }
}

function closeMenu() {
  document.body.classList.remove("nav-open");
  if (mainNav) mainNav.classList.remove("is-open");
  if (navToggle) navToggle.setAttribute("aria-expanded", "false");
}

function toggleMenu() {
  if (!mainNav || !navToggle) return;

  const isOpen = mainNav.classList.toggle("is-open");
  document.body.classList.toggle("nav-open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
}

function setContactLinks() {
  const defaultMessage = "Olá! Vim pelo site da MOVENTIS e gostaria de entender melhor como vocês podem ajudar minha empresa.";

  whatsappLinks.forEach((link) => {
    link.href = buildWhatsAppUrl(defaultMessage);
  });

  planLinks.forEach((link) => {
    const plan = link.dataset.plan;
    const message = `Olá! Tenho interesse no plano ${plan} da MOVENTIS e gostaria de mais informações.`;
    link.href = buildWhatsAppUrl(message);
  });
}

function buildFormMessage(formData) {
  return [
    "Olá! Vim pelo site da MOVENTIS e quero atendimento.",
    `Nome: ${formData.get("clientName")}`,
    `E-mail: ${formData.get("clientEmail")}`,
    `Mensagem: ${formData.get("clientMessage")}`
  ].join("\n");
}

function handleFormSubmit(event) {
  event.preventDefault();

  if (!contactForm.checkValidity()) {
    contactForm.reportValidity();
    return;
  }

  const formData = new FormData(contactForm);
  const message = buildFormMessage(formData);
  const mailSubject = encodeURIComponent("Contato pelo site MOVENTIS");
  const mailBody = encodeURIComponent(message);

  if (formStatus) {
    formStatus.textContent = "Abrindo WhatsApp para agilizar seu atendimento...";
    formStatus.classList.add("is-success");
  }

  window.open(buildWhatsAppUrl(message), "_blank", "noopener");

  contactForm.setAttribute(
    "action",
    `mailto:${CONTACT_EMAIL}?subject=${mailSubject}&body=${mailBody}`
  );
}

setHeaderState();
setContactLinks();

window.addEventListener("scroll", setHeaderState, { passive: true });

if (navToggle) {
  navToggle.addEventListener("click", toggleMenu);
}

navLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

if (contactForm) {
  contactForm.addEventListener("submit", handleFormSubmit);
}