const root = document.documentElement;
const toggleBtn = document.querySelector("#themeToggle");

function initTema() {
  const temaSalvo = localStorage.getItem("tema") || "dark";
  root.setAttribute("data-theme", temaSalvo);
  toggleBtn.textContent = temaSalvo === "dark" ? "☀️" : "🌙";
}

function alternarTema() {
  const temaAtual = root.getAttribute("data-theme");
  const novoTema = temaAtual === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", novoTema);
  toggleBtn.textContent = novoTema === "dark" ? "☀️" : "🌙";
  localStorage.setItem("tema", novoTema);
}

initTema();

// clique
toggleBtn.addEventListener("click", alternarTema);
