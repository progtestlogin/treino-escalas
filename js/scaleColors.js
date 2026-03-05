const escalaCores = {
  "major": { azul: "#42a5f5", amarelo: "#ffd54f" },
  "minor": { azul: "#7e57c2", amarelo: "#ffb74d" },
  "harmonic minor": { azul: "#5e35b1", amarelo: "#ff7043" },
  "melodic minor": { azul: "#3949ab", amarelo: "#ffee58" },
  "major pentatonic": { azul: "#26c6da", amarelo: "#fff176" },
  "minor pentatonic": { azul: "#ab47bc", amarelo: "#ffca28" },
  "chromatic": { azul: "#90a4ae", amarelo: "#ffeb3b" }
};

function aplicarCoresEscala(escala) {
  const paleta = escalaCores[escala] || escalaCores.major;
  document.documentElement.style.setProperty("--azul-secundario", paleta.azul);
  document.documentElement.style.setProperty("--amarelo", paleta.amarelo);
}

document
  .querySelector("#tipoEscalaSel")
  .addEventListener("change", function () {
    aplicarCoresEscala(this.value);
  });
