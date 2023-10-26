const home = document.querySelector(".navigation__home");
const keyboard = document.querySelector(".navigation__keyboard");
const star = document.querySelector(".star");
const neznayka = document.querySelector(".neznayka__image");
const answerText = document.querySelector(".neznayka__answer");
const answerQuestion = document.querySelector(".neznayka__question");
const startMicro = document.querySelector(".microphone_start");
const hello = document.querySelector(".hello_container");
const main = document.querySelector(".container");
const helloGIF = document.querySelector(".hello__gif");
const timeHello = 6000;

function start() {
  helloGIF.src = "./img/Book.gif";
}
start();
function visibilityHello() {
  hello.classList.add("hidden");
  main.classList.remove("hidden");
}
setTimeout(visibilityHello, timeHello);

function visibilityStar() {
  star.classList.add("opacity");
}
setTimeout(visibilityStar, 2000 + timeHello);

function visibilityHome() {
  home.classList.add("opacity");
}
setTimeout(visibilityHome, 2010 + timeHello);

function visibilityKeyboard() {
  keyboard.classList.add("opacity");
}
setTimeout(visibilityKeyboard, 2510 + timeHello);

function visibilityAnswerText() {
  answerText.classList.add("opacity");
  let text = "Привет! Меня зовут Незнайка. Возьми микрофон, поболтаем";
  let delay = 40;
  let elem = document.querySelector(".neznayka__answer");

  let print_text = function (text, elem, delay) {
    if (text.length > 0) {
      elem.innerHTML += text[0];

      setTimeout(function () {
        print_text(text.slice(1), elem, delay);
      }, delay);
    }
  };

  print_text(text, elem, delay);
}
setTimeout(visibilityAnswerText, 8050 + timeHello);

function visibilityNeznayka() {
  neznayka.src = "./img/Привет, меня зовут Незн. Давай поболтаем.gif";
  neznayka.classList.add("opacity");
}
setTimeout(visibilityNeznayka, 3050 + timeHello);

function visibilityQuestionText() {
  answerQuestion.classList.add("opacity");
}
setTimeout(visibilityQuestionText, 9050 + timeHello);

function visibilityMicro() {
  startMicro.classList.add("opacity");
}
setTimeout(visibilityMicro, 9050 + timeHello);

function sizeMicro() {
  startMicro.classList.add("pulse");
}
setTimeout(sizeMicro, 10050 + timeHello);

class VoiceRecorder {
  constructor() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      console.log("getUserMedia supported");
    } else {
      console.log("getUserMedia is not supported on your browser!");
    }

    this.mediaRecorder;
    this.stream;
    this.chunks = [];
    this.isRecording = false;

    this.recorderRef = document.querySelector(".recorder");
    this.playerRef = document.querySelector(".player");
    this.startRef = document.querySelector(".microphone_start");
    this.stopRef = document.querySelector(".microphone_stop");

    this.startRef.onclick = this.startRecording.bind(this);
    this.stopRef.onclick = this.stopRecording.bind(this);

    this.constraints = {
      audio: true,
      video: false,
    };
  }

  handleSuccess(stream) {
    this.stream = stream;
    this.stream.oninactive = () => {
      console.log("Stream ended!");
    };
    this.recorderRef.srcObject = this.stream;
    this.mediaRecorder = new MediaRecorder(this.stream);
    console.log(this.mediaRecorder);
    this.mediaRecorder.ondataavailable = this.onMediaRecorderDataAvailable.bind(this);
    this.mediaRecorder.onstop = this.onMediaRecorderStop.bind(this);
    this.recorderRef.play();
    this.mediaRecorder.start();
  }

  handleError(error) {
    console.log("navigator.getUserMedia error: ", error);
  }

  onMediaRecorderDataAvailable(e) {
    this.chunks.push(e.data);
  }

  onMediaRecorderStop(e) {
    const blob = new Blob(this.chunks, { type: "audio/mp3" });
    const audioURL = window.URL.createObjectURL(blob);
    this.playerRef.src = audioURL;
    this.chunks = [];
    this.stream.getAudioTracks().forEach((track) => track.stop());
    this.stream = null;
    senVoice(blob);
  }

  startRecording() {
    if (this.isRecording) return;
    this.isRecording = true;
    this.playerRef.src = "";
    navigator.mediaDevices.getUserMedia(this.constraints).then(this.handleSuccess.bind(this)).catch(this.handleError.bind(this));
  }

  stopRecording() {
    if (!this.isRecording) return;
    this.isRecording = false;
    this.recorderRef.pause();
    this.mediaRecorder.stop();
    question.textContent = "Подожди, я думаю";
  }
}

async function senVoice(blob) {
  let formData = new FormData();
  formData.append("audio", blob);
  console.log(blob);
  let promise = await fetch("https://farm.pythonanywhere.com/upload/", {
    method: "POST",
    body: formData,
  });
  let response = await promise.json();
  console.log(response.recognized_text);
  question.textContent = `${response.recognized_text}`;
  answer.textContent = "Александр, я легко отвечу на такой вопрос. Земля круглая!";
  neznayka.src = "./img/wait-for-question-and-answer.gif";
}

const sendVoice = document.querySelector(".microphone_start");
const stopVoice = document.querySelector(".microphone_stop");
const answer = document.querySelector(".neznayka__answer");
const question = document.querySelector(".neznayka__question");

sendVoice.addEventListener("click", function () {
  sendVoice.classList.add("hidden");
  stopVoice.classList.remove("hidden");
  question.textContent = "Идет запись...";
  answer.textContent = "...";
});
stopVoice.addEventListener("click", function () {
  stopVoice.classList.add("hidden");
  sendVoice.classList.remove("hidden");
});

home.addEventListener("click", function () {
  startMicro.animationPlayPtate = "paused";
});

window.voiceRecorder = new VoiceRecorder();
