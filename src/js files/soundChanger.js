const body = document.querySelector("body");

let sound = true;

function createSoundChanger() {
  const soundChanger = document.querySelector('.button-sound')
  soundChanger.addEventListener("click", toggleSound);
  body.append(soundChanger);
}

function toggleSound() {
  if (sound) {
    sound = false;
  } else {
    sound = true;
  }
}

export { sound, createSoundChanger };
