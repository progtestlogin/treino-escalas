// CONSTANTES
// C4 = Notas[32]
const Notas = [
    [   "E1", "F1", "F#1", "G1", "G#1", "A1", "A#1", "B1", "C2", "C#2", "D2", "D#2",
        "E2", "F2", "F#2", "G2", "G#2", "A2", "A#2", "B2", "C3", "C#3", "D3", "D#3",
        "E3", "F3", "F#3", "G3", "G#3", "A3", "A#3", "B3", "C4", "C#4", "D4", "D#4",
        "E4", "F4", "F#4", "G4", "G#4", "A4", "A#4", "B4", "C5", "C#5", "D5", "D#5",
        "E5", "F5", "F#5", "G5", "G#5", "A5", "A#5", "B5", "C6" ],
    [   "E1", "F1", "Gb1", "G1", "Ab1", "A1", "Bb1", "B1", "C2", "Db2", "D2", "Eb2",
        "E2", "F2", "Gb2", "G2", "Ab2", "A2", "Bb2", "B2", "C3", "Db3", "D3", "Eb3",
        "E3", "F3", "Gb3", "G3", "Ab3", "A3", "Bb3", "B3", "C4", "Db4", "D4", "Eb4",
        "E4", "F4", "Gb4", "G4", "Ab4", "A4", "Bb4", "B4", "C5", "Db5", "D5", "Eb5",
        "E5", "F5", "Gb5", "G5", "Ab5", "A5", "Bb5", "B5", "C6" ]
];

const defVelNotas = 100;
const defVolNotas = 0;
const defDurNotas = "4n";
const defTipoEscala = "major";


let IndexNotas = 32;
let UltSusBml = 0;
const OitavaDist = 12;
const NotasLen = Notas[UltSusBml].length;
let playing = false;

// Carrega as variáveis que apontarão para os elemntos HTML
const tonicaTxt = document.querySelector("#tonicaTxt");
const seqEscala = document.querySelector("#sobeEscala");
const textBtnPlayPause = document.querySelector("#escalaPlayPause");
const textVelNotas = document.querySelector("#velcNotasLblVal");
const textVolNotas = document.querySelector("#volNotasLblVal");
const rngVelNotas = document.querySelector("#velcNotasRng");
const rngVolNotas = document.querySelector("#volNotasRng");
const durNotas = document.querySelector("#duraNotasSel");
const qntNotas = document.querySelector("#qntNotasSel");
const tipoEscala = document.querySelector("#tipoEscalaSel");

rngVelNotas.addEventListener('change', function() {
    textVelNotas.textContent = this.value + " bpm";
});

rngVolNotas.addEventListener('change', function() {
    textVolNotas.textContent = this.value + " dB";
});

tipoEscala.addEventListener('change', function() {

    let note = Notas[UltSusBml][IndexNotas];
    let lenEscala = Tonal.Scale.get(note.concat(` ${this.value}`)).notes.length + 1;

    let qntNotasOld = qntNotas.value;
    qntNotas.options.length = 0;

    for (let idx = 1; idx <= lenEscala; idx++) {
        qntNotas.add(new Option(idx, idx));
    }

    if ( qntNotasOld > qntNotas.options.length ) {
        qntNotas.value = qntNotas.options.length;
    } else {
        qntNotas.value = qntNotasOld;
    }
    
});

// Carrega valores padrões
tonicaTxt.innerHTML = Notas[UltSusBml][IndexNotas].replaceAll("#","&#9839;").replaceAll("b","&#9837;");
seqEscala.checked = true;
textBtnPlayPause.textContent = "Play"
rngVelNotas.value = defVelNotas;
rngVelNotas.dispatchEvent(new Event('change'));
rngVolNotas.value = defVolNotas;
rngVolNotas.dispatchEvent(new Event('change'));
durNotas.value = defDurNotas;
tipoEscala.value = defTipoEscala;
tipoEscala.dispatchEvent(new Event('change'));
qntNotas.value = qntNotas.options.length;

// Cria um sintetizador básico (Synth) e conecta-o à saída principal (destination)
let synth = new Tone.Synth({
    oscillator: {
        type: 'sine4',    //'sine', // Define o tipo de onda (sine, triangle, square, sawtooth)
        volume: 0   //volNotas
    },
    envelope: {
        attack: 0.005,
        decay: 0.1,
        sustain: 0.3,
        release: 1.0
    }
}).toDestination();

// Verifica qual ordem de notas foi selecionada
function verificaSeqNotasSel() {
    const radioBtnSel = document.querySelector('input[name="sequenciaNotas"]:checked');

    if (radioBtnSel) {
        const valorSelecionado = radioBtnSel.value;
        return valorSelecionado;
    } else {
        return None;
    }
}


// Valida Botões Inc/Dec Nota
function valBtnIncDec() {
    const incNotaBtn = document.querySelector('#incNota');
    const decNotaBtn = document.querySelector('#decNota');
    const incOitavaBtn = document.querySelector('#incOitava');
    const decOitavaBtn = document.querySelector('#decOitava');
    
    // Valida o botão que incrementa a nota
    if (IndexNotas == NotasLen - 1) {
        incNotaBtn.disabled = true;
    } else {
        incNotaBtn.disabled = false;
    }
    // Valida o botão que decrementa a nota
    if (IndexNotas == 0) {
        decNotaBtn.disabled = true;
    } else {
        decNotaBtn.disabled = false;
    }
    // Valida o botão que incrementa a oitava
    if (IndexNotas > NotasLen - 1 - OitavaDist) {
        incOitavaBtn.disabled = true;
    } else {
        incOitavaBtn.disabled = false;
    }
    // Valida o botão que decrementa a oitava
    if (IndexNotas < OitavaDist) {
        decOitavaBtn.disabled = true;
    } else {
        decOitavaBtn.disabled = false;
    }

}

// Incrementa a Nota
function incrementaNota() {

    if ( IndexNotas < NotasLen - 1) {
        IndexNotas++;
        document.querySelector("#tonicaTxt").innerHTML = Notas[0][IndexNotas].replaceAll("#","&#9839;");
        UltSusBml = 0;
    }
    valBtnIncDec();
}


// Decrementa a Nota
function decrementaNota() {

    if ( IndexNotas > 0) {
        IndexNotas--;
        document.querySelector("#tonicaTxt").innerHTML = Notas[1][IndexNotas].replaceAll("b","&#9837;");
        UltSusBml = 1;
    }
    valBtnIncDec();
}


// Incrementa a Oitava
function incrementaOitava() {

    if ( IndexNotas + OitavaDist < NotasLen ) {
        IndexNotas += OitavaDist;
        document.querySelector("#tonicaTxt").innerHTML = Notas[UltSusBml][IndexNotas].replaceAll("#","&#9839;").replaceAll("b","&#9837;");
    }
    valBtnIncDec();
}


// Decrementa a Oitava
function decrementaOitava() {

    if ( IndexNotas > OitavaDist - 1) {
        IndexNotas -= OitavaDist;
        document.querySelector("#tonicaTxt").innerHTML = Notas[UltSusBml][IndexNotas].replaceAll("#","&#9839;").replaceAll("b","&#9837;");
    }
    valBtnIncDec();
}


async function playPause() {

    await Tone.start(); // Inicia o contexto de áudio após o clique do usuário.
    
    if (Tone.Transport.state !== 'started') {
        Tone.Transport.start();
    } else {
        Tone.Transport.pause(); // Pauses the audio
    }
    
    if (playing) {
        stopSound();
        return;
    }

    const note = Notas[UltSusBml][IndexNotas];
    const seqNotas = verificaSeqNotasSel();
    const qntNotas = document.querySelector("#qntNotasSel").value;

    const durNotas = document.querySelector("#duraNotasSel").value;
    const bpmNotas = document.querySelector("#velcNotasRng").value;
    const volNotas = document.querySelector("#volNotasRng").value;
    const tipoEscala = document.querySelector("#tipoEscalaSel").value;

    let paramNotasPorTempo = 60.0/bpmNotas;

    synth.envelope.attack.value = 0.005;
    synth.envelope.decay.value = paramNotasPorTempo * 0.1;
    synth.envelope.sustain.value = paramNotasPorTempo * 0.3;
    synth.envelope.release.value = paramNotasPorTempo * 1.0;
    synth.oscillator.volume.value = volNotas;

    const escala = Tonal.Scale.get(note.concat(` ${tipoEscala}`)).notes;

    let escala8Nota = Tonal.Note.transpose(escala[0], "8P");
    let escalaComOitv = escala.concat(escala8Nota);
    let escalaPt1 = escala.slice(0,qntNotas-1);
    let escalaPt2 = escalaComOitv.slice(0,qntNotas);
    let escalaUltNota = escalaPt2.slice(-1);
    let escalaPlay = [];

    if (seqNotas == "sobe") {
        escalaPlay = escalaPt2;
    } else if (seqNotas == "desce") {
        escalaPlay = escalaPt2.reverse();
    } else if (seqNotas == "sobe-desce") {
        escalaPlay = escalaPt1.concat(escalaPt2.reverse());
    } else if (seqNotas == "desce-sobe") {
        escalaPt1.shift();
        escalaPlay = escalaPt2.reverse().concat(escalaPt1).concat(escalaUltNota);
    } else {
        //
    }

    // Agenda a reprodução das notas em sequência
    let notasPlayidx = 0;

    Tone.Transport.bpm.value = bpmNotas;

    Tone.Transport.scheduleRepeat((time) => {
    if ( notasPlayidx < escalaPlay.length ) {
        document.querySelector("#tonicaTxt").innerHTML = escalaPlay[notasPlayidx].replaceAll("#","&#9839;").replaceAll("b","&#9837;");
        synth.triggerAttackRelease(escalaPlay[notasPlayidx], durNotas, time);
        animarBotaoNota();
        notasPlayidx += 1;
    } else {
        stopSound(time, notasPlayidx);
    }
    }, `${durNotas}`);

    startSound(synth);
}

function startSound(synth) {
    
    btnDisable(['#incNota', '#decNota', '#incOitava', '#decOitava']);
    playing = true;
    document.querySelector("#escalaPlayPause").textContent = "Stop";
    
    Tone.position = 0;
    Tone.Transport.start();

    setTimeout(() => {
        //
    }, 2000);
}

function stopSound(time=0, notasPlayidx=0) {
    playing = false;
  
    synth.triggerRelease(time);
    Tone.Transport.stop(time);
    Tone.Transport.position = 0;
    Tone.Transport.cancel();
    notasPlayidx = 0;
    document.querySelector("#escalaPlayPause").textContent = "Play";
    document.querySelector("#tonicaTxt").innerHTML = Notas[UltSusBml][IndexNotas].replaceAll("#","&#9839;").replaceAll("b","&#9837;");
    btnEnable(['#incNota', '#decNota', '#incOitava', '#decOitava']);
}

function btnEnable(btnList) {

    btnList.forEach(selector => {
        document.querySelector(selector).disabled = false;
    });
}

function btnDisable(btnList) {

    btnList.forEach(selector => {
        document.querySelector(selector).disabled = true;
    });
}