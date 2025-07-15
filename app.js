const SPRITE_SRC = 'compass_sprite.png';
const SPRITE_FRAME_COUNT = 34;
const SPRITE_FRAME_WIDTH = 64;
const SPRITE_FRAME_HEIGHT = 64;
const REFERENCE_FRAME = 16; // 0'dan başlıyor, 17. kare için 16

const canvas = document.getElementById('compass');
const ctx = canvas.getContext('2d');
const img = new Image();
img.src = SPRITE_SRC;

let currentFrame = 0;

img.onload = function() {
  drawFrame(currentFrame);
};

function drawFrame(frame) {
  ctx.clearRect(0, 0, SPRITE_FRAME_WIDTH, SPRITE_FRAME_HEIGHT);
  ctx.drawImage(
    img,
    0, frame * SPRITE_FRAME_HEIGHT,
    SPRITE_FRAME_WIDTH, SPRITE_FRAME_HEIGHT,
    0, 0,
    SPRITE_FRAME_WIDTH, SPRITE_FRAME_HEIGHT
  );
}

canvas.addEventListener('click', () => {
  currentFrame = REFERENCE_FRAME;
  drawFrame(currentFrame);
});

const sensorBtn = document.getElementById('sensor-btn');
sensorBtn.addEventListener('click', async () => {
  if (window.DeviceOrientationEvent && typeof DeviceOrientationEvent.requestPermission === 'function') {
    // iOS 13+ için izin iste
    try {
      const response = await DeviceOrientationEvent.requestPermission();
      if (response === 'granted') {
        alert('Sensör izni verildi!');
        // Burada sensör verisini dinlemeye başlayabilirsin
      } else {
        alert('Sensör izni reddedildi.');
      }
    } catch (e) {
      alert('İzin istenirken hata oluştu: ' + e);
    }
  } else {
    // Android veya masaüstü için
    alert('Bu tarayıcıda manuel izin gerekmiyor veya desteklenmiyor.');
  }
}); 