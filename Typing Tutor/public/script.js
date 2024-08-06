document.addEventListener('DOMContentLoaded', () => {
    const typingArea = document.getElementById('typingArea');
    const feedback = document.getElementById('feedback');
    let selectedVoice = null;
  
    function populateVoiceList() {
      if (typeof speechSynthesis === 'undefined') {
        return;
      }
  
      const voices = speechSynthesis.getVoices();
      selectedVoice = voices.find(voice => voice.default === false) || voices[0];
      console.log('Available voices:', voices);
    }
  
    populateVoiceList();
  
    if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = populateVoiceList;
    }
  
    typingArea.addEventListener('keydown', (event) => {
      const keyName = event.key;
      provideFeedback(keyName);
    });
  
    function provideFeedback(key) {
      if (key === ' ') {
        feedback.textContent = 'Space';
        speak('Space');
      } else {
        feedback.textContent = `Key pressed: ${key}`;
        speak(key);
      }
    }
  
    function speak(text) {
      const utterance = new SpeechSynthesisUtterance(text);
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
      speechSynthesis.speak(utterance);
    }
  });
  