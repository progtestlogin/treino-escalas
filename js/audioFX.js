function animarBotaoNota() {
  const btn = document.querySelector("#tonicaTxt");
  btn.classList.remove("playing");
  void btn.offsetWidth;
  btn.classList.add("playing");
}
