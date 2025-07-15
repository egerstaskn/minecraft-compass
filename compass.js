const compassSprite = document.getElementById('compass-sprite');
const resetBtn = document.getElementById('reset-btn');
const info = document.getElementById('info');
const permissionRequest = document.getElementById('permission-request');
const permissionBtn = document.getElementById('permission-btn');

let permissionGranted = false;
let orientationListenerAdded = false;
let referenceSet = false;

const FRAME_COUNT = 32; // Sprite sheet'teki toplam kare sayısı
const FRAME_HEIGHT = 128; // Her bir karenin yüksekliği (px)
const REFERENCE_FRAME = 16; // 17. görsel (0'dan başlıyor)

function setCompassFrameByFrameIndex(frame) {
  frame = frame % FRAME_COUNT;
  compassSprite.style.backgroundPosition = `0px -${frame * FRAME_HEIGHT}px`;
}

function setCompassFrame(angle) {
  let frame = Math.floor((angle % 360) / 360 * FRAME_COUNT);
  setCompassFrameByFrameIndex(frame);
}

function handleOrientation(event) {
  if (referenceSet) {
    setCompassFrameByFrameIndex(REFERENCE_FRAME);
    return;
  }
  let alpha = event.alpha;
  if (typeof event.webkitCompassHeading !== 'undefined') {
    alpha = event.webkitCompassHeading;
  }
  setCompassFrame(alpha);
}

function setReference(event) {
  referenceSet = true;
  info.textContent = 'Referans noktası ayarlandı! Sıfırlamak için butona basın.';
  setCompassFrameByFrameIndex(REFERENCE_FRAME);
}

function resetReference() {
  referenceSet = false;
  info.textContent = 'Cihazınızı döndürün veya ekrana dokunarak referans noktası belirleyin.';
}

function addOrientationListener() {
  if (!orientationListenerAdded) {
    window.addEventListener('deviceorientation', handleOrientation, true);
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