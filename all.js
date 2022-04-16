const musicUrl = "https://spmdl.github.io/json-files/rain.mp3";
const audioPlayer = document.createElement('audio');
let totalLength = 0;

if (audioPlayer.canPlayType('audio/mpeg')) {
  audioPlayer.setAttribute('src', musicUrl);
  audioPlayer.volume = 0.5;
  setTimeout(() => {
    totalLength = audioPlayer.duration;
    timeLeft.textContent = `00:${Math.round(totalLength)}`;
  }, 100)
}

// 播放 & 暫停
const audioPlay = document.querySelector('.audioPlay');
const audioPause = document.querySelector('.audioPause');
console.log(audioPlayer.currentTime)

audioPlay.addEventListener('click', (e) => {
  audioPlayer.play();
  audioPlay.classList.add('d-none');
  audioPause.classList.remove('d-none');
})

audioPause.addEventListener('click', (e) => {
  audioPlayer.pause();
  audioPlay.classList.remove('d-none');
  audioPause.classList.add('d-none');
})

// 有聲音 & 靜音
const audioVolume = document.querySelector('.audioVolume');
const audioMuted = document.querySelector('.audioMuted');

audioVolume.addEventListener('click', (e) => {
  audioPlayer.muted = true;
  audioVolume.classList.add('d-none');
  audioMuted.classList.remove('d-none');
})

audioMuted.addEventListener('click', (e) => {
  audioPlayer.muted = false;
  audioVolume.classList.remove('d-none');
  audioMuted.classList.add('d-none');
})

// 快轉、倒退 2 秒
const audioBackward = document.querySelector('.audioBackward');
const audioForward = document.querySelector('.audioForward');

audioBackward.addEventListener('click', (e) => {
  audioPlayer.currentTime -= 2;
})

audioForward.addEventListener('click', (e) => {
  audioPlayer.currentTime += 2;
})

// 音量 + -
const audioVolumeLow = document.querySelector('.audioVolumeLow');
const audioVolumeHigh = document.querySelector('.audioVolumeHigh');

audioVolumeLow.addEventListener('click', (e) => {
  if (audioPlayer.volume >= 0) {
    audioPlayer.volume -= 0.1;
  }
})

audioVolumeHigh.addEventListener('click', (e) => {
  if (audioPlayer.volume < 1) {
    audioPlayer.volume += 0.1;
  }
})

// 倍速 1 1.25 1.5 2 5
const speed = [1, 1.25, 1.5, 2, 5];
const audioSpeed = document.querySelector('.audioSpeed');
const speedRate = document.querySelector('.speed-rate');
let idx = 0;
speedRate.textContent = speed[idx];
audioSpeed.addEventListener('click', (e) => {
  if (idx === speed.length - 1) {
    idx = 0;
    audioPlayer.playbackRate = speed[idx];
    speedRate.textContent = speed[idx];
  } else {
    idx++;
    audioPlayer.playbackRate = speed[idx];
    speedRate.textContent = speed[idx];
  }
})

// 音量期間 input[type="range"]、時間顯示
const timeSpent = document.querySelector('#timeSpent');
const timeLeft = document.querySelector('#timeLeft');
const progress = document.querySelector('.progress-line');
const progressInput = document.querySelector('.progress');
progress.style.width = 0;
timeSpent.textContent = '00:00';

audioPlayer.addEventListener('timeupdate', (e) => {
  let minSpent = Math.round(audioPlayer.currentTime / 60);
  let secSpent = Math.round(audioPlayer.currentTime % 60);
  let minLeft = Math.round((totalLength - audioPlayer.currentTime) / 60);
  let secLeft = Math.round((totalLength - audioPlayer.currentTime) % 60);
  progress.style.width = `${(secSpent / Math.round(totalLength))*100}%`;
  progressInput.value = `${(secSpent / Math.round(totalLength)) * 100}%`;
  timeSpent.textContent = `${paddedFormat(minSpent)}:${paddedFormat(secSpent)}`;
  timeLeft.textContent = `${paddedFormat(minLeft)}:${paddedFormat(secLeft)}`;
})

function paddedFormat(num) {
  return num < 10 ? "0" + num : num;
}

// 時間軸拖曳或點選音樂時間會跟著改變
progressInput.addEventListener('input', (e) => {
  audioPlayer.currentTime = progressInput.value;
})

// 播放完畢
audioPlayer.addEventListener('ended', (e) => {
  audioPlay.classList.remove('d-none');
  audioPause.classList.add('d-none');
})