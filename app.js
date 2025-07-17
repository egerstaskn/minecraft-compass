const compassImg = document.getElementById('compass-sprite-img');
const sensorBtn = document.getElementById('sensor-btn');
const slider = document.getElementById('angle-slider');
const degreeLabel = document.getElementById('degree-label');

const SPRITE_COUNT = 90;
const SPRITE_WIDTH = 560;
const SPRITE_HEIGHT = 480;
const SPRITE_START_INDEX = 22; // 23. sprite (0'dan başlıyor)

function setCompass(angle) {
  // 0-360 arası açıyı 0-89 arası sprite indexine çevir
  let spriteIndex = Math.round((angle % 360) / (360 / SPRITE_COUNT));
  // 23. sprite başlangıç olacak şekilde kaydır
  spriteIndex = (spriteIndex + SPRITE_START_INDEX) % SPRITE_COUNT;
  // Sprite'ı sola kaydır
  const left = -spriteIndex * SPRITE_WIDTH;
  compassImg.style.left = left + 'px';
  degreeLabel.textContent = `${Math.round(angle)}°`;
}

// Masaüstü için slider ile test
slider.addEventListener('input', (e) => {
  setCompass(e.target.value);
});

// Sensör izni ve yön okuma
sensorBtn.addEventListener('click', async () => {
  if (window.DeviceOrientationEvent && typeof DeviceOrientationEvent.requestPermission === 'function') {
    // iOS için izin iste
    try {
      const response = await DeviceOrientationEvent.requestPermission();
      if (response === 'granted') {
        window.addEventListener('deviceorientation', handleOrientation);
        sensorBtn.style.display = 'none';
        slider.style.display = 'none';
      } else {
        alert('Sensör izni reddedildi.');
      }
    } catch (e) {
      alert('İzin istenirken hata oluştu: ' + e);
    }
  } else if ('ondeviceorientationabsolute' in window || 'ondeviceorientation' in window) {
    // Android ve diğer tarayıcılar
    window.addEventListener('deviceorientation', handleOrientation);
    sensorBtn.style.display = 'none';
    slider.style.display = 'none';
  } else {
    alert('Cihazda pusula sensörü desteklenmiyor.');
  }
});

function handleOrientation(event) {
  let angle = event.alpha;
  if (typeof angle === 'number') {
    setCompass(360 - angle); // Kuzey yukarıda olacak şekilde
  }
}

// Eğer mobil değilse slider ile test et
if (!/Mobi|Android/i.test(navigator.userAgent)) {
  slider.style.display = 'block';
  setCompass(slider.value);
} else {
  setCompass(0);
} 