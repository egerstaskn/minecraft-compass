let referenceAlpha = null;
const compassSprite = document.getElementById('compass-sprite');
const referenceIndicator = document.getElementById('reference-indicator');
const resetBtn = document.getElementById('reset-btn');
const info = document.getElementById('info');
const permissionRequest = document.getElementById('permission-request');
const permissionBtn = document.getElementById('permission-btn');

let permissionGranted = false;
let orientationListenerAdded = false;

const FRAME_COUNT = 32; // Sprite sheet'teki toplam kare sayısı
const FRAME_HEIGHT = 64; // Her bir karenin yüksekliği (px)
const FRAME_OFFSET = 17; // 17. kare yukarı bakıyor

function setCompassFrame(angle) {
  let frame = (Math.floor((angle % 360) / 360 * FRAME_COUNT) + FRAME_OFFSET) % FRAME_COUNT;
  compassSprite.style.backgroundPosition = `0px -${frame * FRAME_HEIGHT}px`;
}

function handleOrientation(event) {
  let alpha = event.alpha;
  if (typeof event.webkitCompassHeading !== 'undefined') {
    alpha = event.webkitCompassHeading;
  }
  let angle = alpha;
  if (referenceAlpha !== null) {
    angle = (alpha - referenceAlpha + 180 + 360) % 360; // 180 derece kaydır
  }
  setCompassFrame(angle);
}

function setReference(event) {
  if (window.lastAlpha !== undefined) {
    referenceAlpha = window.lastAlpha;
    info.textContent = 'Referans yön belirlendi! Sıfırlamak için butona basın.';
    // setReferenceIndicator(true); // Removed as per edit hint
  }
}

function resetReference() {
  referenceAlpha = null;
  info.textContent = 'Cihazınızı döndürün veya ekrana dokunarak referans yönü belirleyin.';
  // setReferenceIndicator(false); // Removed as per edit hint
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