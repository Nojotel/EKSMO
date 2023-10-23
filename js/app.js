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
    this.startRef = document.querySelector(".voice__start");
    this.stopRef = document.querySelector(".voice__stop");

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
}

const sendVoice = document.querySelector(".voice__start");
const stopVoice = document.querySelector(".voice__stop");
const successVoice = document.querySelector(".voice__success");
const answer = document.querySelector(".answer");
const svgTember = document.querySelector(".svg");

sendVoice.addEventListener("click", function () {
  sendVoice.classList.add("hidden");
  svgTember.classList.remove("hidden");
  stopVoice.classList.remove("hidden");
  answer.classList.add("click");
  answer.textContent = "Незнайка, а почему все переверну...";
});
stopVoice.addEventListener("click", function () {
  stopVoice.classList.add("hidden");
  svgTember.classList.add("hidden");
  successVoice.classList.remove("hidden");
  answer.textContent = "Это, наверно, не Луна перевернулась, а мы сами перевернулись.";
});
successVoice.addEventListener("click", function () {
  sendVoice.classList.remove("hidden");
  successVoice.classList.add("hidden");
  answer.textContent = "говорите";
  answer.classList.remove("click");
});

window.voiceRecorder = new VoiceRecorder();
