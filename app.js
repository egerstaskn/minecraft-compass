const compassImg = document.getElementById('compass-sprite-img');
const compassSprite = document.querySelector('.compass-sprite');
const sensorBtn = document.getElementById('sensor-btn');
const slider = document.getElementById('angle-slider');
const degreeLabel = document.getElementById('degree-label');

const SPRITE_COUNT = 90;
const SPRITE_WIDTH = 560;
const SPRITE_HEIGHT = 480;
const SPRITE_START_INDEX = 22; // 23. sprite (0'dan başlıyor)

function setCompass(angle) {
  let spriteIndex = Math.round((angle % 360) / (360 / SPRITE_COUNT));
  spriteIndex = (spriteIndex + SPRITE_START_INDEX) % SPRITE_COUNT;
  // Responsive için ölçekli left hesapla
  const containerWidth = compassSprite.offsetWidth;
  const scale = containerWidth / SPRITE_WIDTH;
  const left = -spriteIndex * SPRITE_WIDTH * scale;
  compassImg.style.transform = `scale(${scale})`;
  compassImg.style.left = left + 'px';
  degreeLabel.textContent = `${Math.round(angle)}°`;
}

slider.addEventListener('input', (e) => {
  setCompass(e.target.value);
});

sensorBtn.addEventListener('click', async () => {
  if (window.DeviceOrientationEvent && typeof DeviceOrientationEvent.requestPermission === 'function') {
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
    setCompass(360 - angle);
  }
}

function handleResize() {
  // Yeniden boyutlanınca pusula güncellensin
  const angle = slider.value || 0;
  setCompass(angle);
}

window.addEventListener('resize', handleResize);

if (!/Mobi|Android/i.test(navigator.userAgent)) {
  slider.style.display = 'block';
  setCompass(slider.value);
} else {
  setCompass(0);
} 