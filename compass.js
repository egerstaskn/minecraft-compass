let referenceAlpha = null;
const compassSprite = document.getElementById('compass-sprite');
const resetBtn = document.getElementById('reset-btn');
const info = document.getElementById('info');
const permissionRequest = document.getElementById('permission-request');
const permissionBtn = document.getElementById('permission-btn');

let permissionGranted = false;
let orientationListenerAdded = false;

const FRAME_COUNT = 32; // Sprite sheet'teki toplam kare sayısı
const FRAME_HEIGHT = 128; // Her bir karenin yüksekliği (px)
const REFERENCE_FRAME = 17; // 17. kare ok yukarıda

function setCompassFrameByFrameIndex(frame) {
  frame = frame % FRAME_COUNT;
  compassSprite.style.backgroundPosition = `0px -${frame * FRAME_HEIGHT}px`;
}

function setCompassFrame(angle) {
  let frame = Math.floor((angle % 360) / 360 * FRAME_COUNT);
  setCompassFrameByFrameIndex(frame);
}

function handleOrientation(event) {
  let alpha = event.alpha;
  if (typeof event.webkitCompassHeading !== 'undefined') {
    alpha = event.webkitCompassHeading;
  }
  if (referenceAlpha !== null) {
    // Referans alındıysa, pusula sabit 17. karede kalsın
    setCompassFrameByFrameIndex(REFERENCE_FRAME);
  } else {
    setCompassFrame(alpha);
  }
}

function setReference(event) {
  if (window.lastAlpha !== undefined) {
    referenceAlpha = window.lastAlpha;
    info.textContent = 'Referans yön belirlendi! Sıfırlamak için butona basın.';
    setCompassFrameByFrameIndex(REFERENCE_FRAME);
  }
}

function resetReference() {
  referenceAlpha = null;
  info.textContent = 'Cihazınızı döndürün veya ekrana dokunarak referans yönü belirleyin.';
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

window.addEventListener('touchend', setReference);
window.addEventListener('click', setReference);
resetBtn.addEventListener('click', resetReference);

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
    permissionGranted = true;
    hidePermissionRequest();
    addOrientationListener();
  }
}

window.addEventListener('load', requestPermissionIfNeeded); 