/* =======================
   DOM ELEMENTLERİ
======================= */
const wordEl = document.getElementById("word");
const wrongLettersEl = document.getElementById("wrong-letters");
const popup = document.getElementById("popup-container");
const resultMessage = document.getElementById("result-message");
const playAgainBtn = document.getElementById("play-again");
const notification = document.getElementById("notification");
const bodyParts = document.querySelectorAll(".item");

/* =======================
   OYUN VERİLERİ
======================= */
const words = ["javascript", "python", "css", "html", "react"];
let selectedWord = getRandomWord();
const correctLetters = [];
const wrongLetters = [];

/* =======================
   FONKSİYONLAR
======================= */

/**
 * Rastgele kelime seçer
 */
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

/**
 * Kelimeyi ekrana basar
 * Doğru tahmin edilen harfleri gösterir
 */
function displayWord() {
  wordEl.innerHTML = selectedWord
    .split("")
    .map(letter => `
      <div class="letter">
        ${correctLetters.includes(letter) ? letter : ""}
      </div>
    `)
    .join("");

  // Kazanma kontrolü
  const guessedWord = wordEl.innerText.replace(/\n/g, "");
  if (guessedWord === selectedWord) {
    showPopup("🎉 Kazandın!");
  }
}

/**
 * Hatalı harfleri ve adamın parçalarını gösterir
 */
function updateWrongLetters() {
  wrongLettersEl.innerHTML = `
    <h4>Hatalı Harfler</h4>
    ${wrongLetters.map(l => `<span>${l}</span>`).join(" ")}
  `;

  bodyParts.forEach((part, index) => {
    part.style.display = index < wrongLetters.length ? "block" : "none";
  });

  // Kaybetme kontrolü
  if (wrongLetters.length === bodyParts.length) {
    showPopup("😢 Kaybettin!");
  }
}

/**
 * Uyarı mesajı gösterir
 */
function showNotification() {
  notification.classList.add("show");
  setTimeout(() => notification.classList.remove("show"), 1500);
}

/**
 * Popup açar
 */
function showPopup(message) {
  resultMessage.innerText = message;
  popup.style.display = "flex";
}

/**
 * Oyunu sıfırlar
 */
function resetGame() {
  correctLetters.length = 0;
  wrongLetters.length = 0;
  selectedWord = getRandomWord();
  popup.style.display = "none";
  displayWord();
  updateWrongLetters();
}

/* =======================
   EVENTLER
======================= */

// Klavye dinleme
window.addEventListener("keydown", e => {
  if (e.key >= "a" && e.key <= "z") {
    if (selectedWord.includes(e.key)) {
      if (!correctLetters.includes(e.key)) {
        correctLetters.push(e.key);
        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(e.key)) {
        wrongLetters.push(e.key);
        updateWrongLetters();
      } else {
        showNotification();
      }
    }
  }
});

// Tekrar oyna
playAgainBtn.addEventListener("click", resetGame);

/* =======================
   BAŞLAT
======================= */
displayWord();
