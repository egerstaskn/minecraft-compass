let referenceAlpha = null;
const compassImg = document.getElementById('compass');
const referenceIndicator = document.getElementById('reference-indicator');
const resetBtn = document.getElementById('reset-btn');
const info = document.getElementById('info');
const permissionRequest = document.getElementById('permission-request');
const permissionBtn = document.getElementById('permission-btn');

let permissionGranted = false;
let orientationListenerAdded = false;

function setCompassRotation(alpha) {
  compassImg.style.transform = `rotate(${-alpha}deg)`;
}

function setReferenceIndicator(show) {
  referenceIndicator.style.display = show ? 'block' : 'none';
}

function handleOrientation(event) {
  let alpha = event.alpha;
  if (typeof event.webkitCompassHeading !== 'undefined') {
    // iOS
    alpha = event.webkitCompassHeading;
  }
  if (referenceAlpha !== null) {
    let diff = alpha - referenceAlpha;
    setCompassRotation(diff);
    setReferenceIndicator(true);
  } else {
    setCompassRotation(alpha);
    setReferenceIndicator(false);
  }
}

function setReference(event) {
  if (window.lastAlpha !== undefined) {
    referenceAlpha = window.lastAlpha;
    info.textContent = 'Referans yön belirlendi! Sıfırlamak için butona basın.';
    setReferenceIndicator(true);
  }
}

function resetReference() {
  referenceAlpha = null;
  info.textContent = 'Cihazınızı döndürün veya ekrana dokunarak referans yönü belirleyin.';
  setReferenceIndicator(false);
}

function addOrientationListener() {
  if (!orientationListenerAdded) {
    window.addEventListener('deviceorientation', function(event) {
      let alpha = event.alpha;
      if (typeof event.webkitCompassHeading !== 'undefined') {
        alpha = event.webkitCompassHeading;
      }
      window.lastAlpha = alpha;
      handleOrientation(event);
    }, true);
    orientationListenerAdded = true;
  }
}

// Ekrana dokununca referans yönü belirle
window.addEventListener('touchend', setReference);
window.addEventListener('click', setReference);
resetBtn.addEventListener('click', resetReference);

// Sensör izni isteme akışı
function showPermissionRequest() {
  permissionRequest.style.display = 'block';
  info.style.display = 'none';
  resetBtn.style.display = 'none';
}
function hidePermissionRequest() {
  permissionRequest.style.display = 'none';
  info.style.display = '';
  resetBtn.style.display = '';
}

function requestPermissionIfNeeded() {
  if (typeof DeviceOrientationEvent !== 'undefined' &&
      typeof DeviceOrientationEvent.requestPermission === 'function') {
    // iOS: Buton göster, izin verilince event ekle
    showPermissionRequest();
    permissionBtn.onclick = function() {
      DeviceOrientationEvent.requestPermission().then(function(permissionState) {
        if (permissionState === 'granted') {
          permissionGranted = true;
          hidePermissionRequest();
          info.textContent = 'Cihazınızı döndürün veya ekrana dokunun.';
          addOrientationListener();
        } else {
          info.textContent = 'Lütfen sensör izni verin.';
        }
      }).catch(function() {
        info.textContent = 'İzin alınamadı.';
      });
    };
  } else {
    // Android veya masaüstü: otomatik izin ve event listener
    permissionGranted = true;
    hidePermissionRequest();
    addOrientationListener();
  }
}

window.addEventListener('load', requestPermissionIfNeeded); 