// Your script here.
const textToSpeak = document.querySelector('#text-to-speak');
const voiceSelector = document.querySelector('#voice-selector');
const startBtn = document.querySelector('#start-btn');
const stopBtn = document.querySelector('#stop-btn');
const rate = document.querySelector('#rate');
const pitch = document.querySelector('#pitch');
let speechSynthesis = window.speechSynthesis;
let voices = [];

function populateVoiceList() {
    voices = speechSynthesis.getVoices();
    voiceSelector.innerHTML = '';
    voices.forEach((voice) => {
        const option = document.createElement('option');
        option.textContent = `${voice.name} (${voice.lang})`;
        option.value = voice.name;
        voiceSelector.appendChild(option);
    });
}

populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
}

function speak() {
    const utterance = new SpeechSynthesisUtterance(textToSpeak.value);
    const selectedVoiceName = voiceSelector.value;
    const selectedVoice = voices.find((voice) => voice.name === selectedVoiceName);
    utterance.voice = selectedVoice;
    utterance.rate = rate.value;
    utterance.pitch = pitch.value;
    speechSynthesis.speak(utterance);
}

startBtn.addEventListener('click', () => {
    speak();
});

stopBtn.addEventListener('click', () => {
    speechSynthesis.cancel();
});