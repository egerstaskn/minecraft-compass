const needle = document.getElementById('needle');
const sensorBtn = document.getElementById('sensor-btn');
const slider = document.getElementById('angle-slider');
const degreeLabel = document.getElementById('degree-label');

function setNeedle(angle) {
  needle.setAttribute('transform', `rotate(${angle} 100 100)`);
  degreeLabel.textContent = `${Math.round(angle)}°`;
}

// Masaüstü için slider ile test
slider.addEventListener('input', (e) => {
  setNeedle(e.target.value);
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
    setNeedle(360 - angle); // Kuzey yukarıda olacak şekilde
  }
}

// Eğer mobil değilse slider ile test et
if (!/Mobi|Android/i.test(navigator.userAgent)) {
  slider.style.display = 'block';
  setNeedle(slider.value);
} else {
  setNeedle(0);
} 