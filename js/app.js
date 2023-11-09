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
const timeHello = 0;
const input = document.querySelector(".container_keyboard");
const inputClose = document.querySelector(".inputClose");
const cursor = document.querySelector(".inputText");

/*function start() {
  helloGIF.src = "./img/Book.gif";
}
start();
function visibilityHello() {
  hello.classList.add("hidden");
  main.classList.remove("hidden");
}
setTimeout(visibilityHello, timeHello);*/

function visibilityStar() {
  star.classList.add("opacity");
}
setTimeout(visibilityStar, 2000 + timeHello);

function visibilityHome() {
  home.classList.add("opacity");
}
setTimeout(visibilityHome, 2000 + timeHello);

function visibilityKeyboard() {
  keyboard.classList.add("opacity");
}
setTimeout(visibilityKeyboard, 2500 + timeHello);

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

function visibilityMicro() {
  startMicro.classList.add("opacity");
}
setTimeout(visibilityMicro, 9050 + timeHello);

function sizeMicro() {
  startMicro.classList.add("pulse");
}
setTimeout(sizeMicro, 10050 + timeHello);

function stateNeznayka() {
  neznayka.src = "./img/Незнайка в ожидании.gif";
}
setTimeout(stateNeznayka, 12050 + timeHello);

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
    //question.textContent = "Подожди, я думаю";
    question.textContent = "";
    function visibilityAnswerText() {
      let text = `Подожди, я думаю...`;
      let delay = 40;
      let elem = question;

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
    visibilityAnswerText();
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
  //question.textContent = `${response.recognized_text}`;
  //answer.textContent = "Александр, я легко отвечу на такой вопрос. Земля круглая!";

  question.textContent = ``;
  function visibilityAnswerText1() {
    let text = `${response.recognized_text}`;
    let delay = 40;
    let elem = question;

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
  visibilityAnswerText1();

  answer.textContent = "";
  function visibilityAnswerText2() {
    let text = "Александр, я легко отвечу на такой вопрос. Земля круглая!";
    let delay = 40;
    let elem = answer;

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
  visibilityAnswerText2();
  neznayka.src = "./img/wait-for-question-and-answer.gif";
  function stateNeznayka() {
    neznayka.src = "./img/Незнайка в ожидании.gif";
  }
  setTimeout(stateNeznayka, 7100);
  answerQuestion.style.transform = "scale(0.8)";
  answerText.style.backgroundImage = "url('./img/dialog-Незнайка-yellow.png')";
  answerText.style.transform = "scale(1.2)";
  answerQuestion.style.backgroundImage = "url('./img/dialog-user.png')";
}

const keyboardPress = [1081, 1094, 1091, 1082, 1077, 1085, 1075, 1096, 1097, 1079, 1093, 1098, 8, 1092, 1099, 1074, 1072, 1087, 1088, 1086, 1083, 1076, 1078, 1101, 63, 13, 0, 1103, 1095, 1089, 1084, 1080, 1090, 1100, 1073, 1102, 44, 46, 0, 32];
function init() {
  let out = "";
  for (let i = 0; i < keyboardPress.length; i++) {
    if (i === 12) {
      out += `<div class='key' data=${keyboardPress[i]}"></div>`;
    } else {
      if (i === 13 || i === 26 || i === 39) {
        out += `<div class='clearfix'></div>`;
      }
      out += `<div class='key' data=${keyboardPress[i]}>${String.fromCharCode(keyboardPress[i])}</div>`;
    }
  }

  document.querySelector("#keyboard").innerHTML = out;
}
init();

document.onkeypress = function (event) {
  document.querySelectorAll("#keyboard .key").forEach(function (element) {
    element.classList.remove("pressKey");
  });
  document.querySelector('#keyboard .key[data="' + event.keyCode + '"]').classList.add("pressKey");

  function visibilityKeyboard() {
    document.querySelector('#keyboard .key[data="' + event.keyCode + '"]').classList.remove("pressKey");
  }
  setTimeout(visibilityKeyboard, 500);
};

document.querySelectorAll("#keyboard .key").forEach((element) => {
  const currentElement = element;

  element.onclick = function (event) {
    document.querySelectorAll("#keyboard .key").forEach((element) => {
      element.classList.remove("pressKey");
    });
    let code = this.getAttribute("data");
    console.log(code);
    this.classList.add("pressKey");
    cursor.value += this.textContent;
    if (code === '8"') {
      cursor.value = cursor.value.substring(0, cursor.value.length - 1);
    }

    function visibilityKeyboard() {
      currentElement.classList.remove("pressKey");
    }

    setTimeout(visibilityKeyboard, 500);
  };
});

const sendVoice = document.querySelector(".microphone_start");
const stopVoice = document.querySelector(".microphone_stop");
const answer = document.querySelector(".neznayka__answer");
const question = document.querySelector(".neznayka__question");

sendVoice.addEventListener("click", function () {
  input.classList.add("hidden");
  keyboard.classList.remove("click");

  sendVoice.classList.add("hidden");
  stopVoice.classList.remove("hidden");
  //question.textContent = "Идет запись...";
  function visibilityQuestionText() {
    answerQuestion.classList.add("opacity");
  }
  setTimeout(visibilityQuestionText, 500);
  question.textContent = "";
  function visibilityAnswerText() {
    let text = `Идет запись...`;
    let delay = 40;
    let elem = question;

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
  visibilityAnswerText();
  answer.textContent = "...";
  answerText.style.backgroundImage = "url('./img/dialog-Незнайка.png')";
  answerQuestion.style.transform = "scale(1.2)";
  answerText.style.transform = "scale(0.8)";
  answerQuestion.style.backgroundImage = "url('./img/dialog-user-green.png')";
});
stopVoice.addEventListener("click", function () {
  stopVoice.classList.add("hidden");
  sendVoice.classList.remove("hidden");
});

home.addEventListener("click", function () {
  startMicro.animationPlayPtate = "paused";
});

keyboard.addEventListener("click", function () {
  input.classList.toggle("hidden");
  keyboard.classList.toggle("click");
  cursor.select();
});

home.addEventListener("click", function () {
  home.classList.add("clear");
  answerText.textContent = "Привет! Меня зовут Незнайка. Возьми микрофон, поболтаем";
  answerQuestion.style.transform = "scale(1)";
  answerText.style.backgroundImage = "url('./img/dialog-Незнайка.png')";
  answerText.style.transform = "scale(1)";
  answerQuestion.style.backgroundImage = "url('./img/dialog-user.png')";
  question.textContent = "...";
  function off() {
    home.classList.remove("clear");
  }
  setTimeout(off, 1000);
});

inputClose.addEventListener("click", function () {
  input.classList.toggle("hidden");
  keyboard.classList.toggle("click");
});

window.voiceRecorder = new VoiceRecorder();
