//Textarea растет в высоту
const textarea = document.querySelector(".textarea");
const padding = textarea.offsetHeight - textarea.clientHeight;
textarea.oninput = (e) => {
  textarea.style.height = "auto";
  textarea.style.height = textarea.scrollHeight + padding + "px";
};
// Вывод сообщения пользователя
const answer = document.querySelector(".answer");
textarea.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    answer.classList.add("click");
    answer.textContent = textarea.value;

    if (textarea.value == "") {
      answer.classList.add("click");
      answer.textContent = "Это, наверно, не Луна перевернулась, а мы сами перевернулись.";
    }
    textarea.value = "";
  }
});

//Micro
const voice = document.querySelector(".voice");
const svg = document.querySelector(".svg");
let click = 0;
voice.addEventListener("click", function () {
  if (click == 0) {
    voice.classList.add("active");
    answer.textContent = "Незнайка, а почему все переверну...";
    answer.classList.add("click");
    svg.classList.remove("hidden");
    textarea.classList.add("hidden");
  } else if (click == 1) {
    answer.textContent = "Это, наверно, не Луна перевернулась, а мы сами перевернулись.";
    svg.classList.add("hidden");
    voice.classList.remove("active");
    voice.classList.add("active_success");
  } else if (click == 2) {
    voice.classList.remove("active_success");
    answer.textContent = "говорите";
    answer.classList.remove("click");
    textarea.classList.remove("hidden");
    click = -1;
  }
  click++;
});
