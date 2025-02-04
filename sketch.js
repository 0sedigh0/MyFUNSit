let audioContext, audioSource, panner, gainNode;
let isAudioEnabled = false;
let circle, container;
let targetX, targetY, posX, posY;
const audio = document.querySelector(".MP4arcane");

// تابع ایجاد گره‌های صوتی
function initAudioNodes() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    audioSource = audioContext.createMediaElementSource(audio);
    panner = audioContext.createStereoPanner();
    gainNode = audioContext.createGain();
    
    audioSource.connect(panner);
    panner.connect(gainNode);
    gainNode.connect(audioContext.destination);
  }
}

// مقداردهی اولیه پس از لود صفحه
document.addEventListener('DOMContentLoaded', () => {
  // انتخاب عناصر با کلاس
  circle = document.querySelector(".circle");
  container = document.querySelector(".soundBox");
  
  // تنظیم موقعیت اولیه
  targetX = container.offsetWidth / 2 - circle.offsetWidth / 2;
  targetY = container.offsetHeight / 2 - circle.offsetHeight / 2;
  posX = targetX;
  posY = targetY;

  // رویداد کلیک دکمه
  document.getElementById('enableSound').addEventListener('click', async () => {
    if (!isAudioEnabled) {
      try {
        initAudioNodes();
        await audio.play();
        document.getElementById('enableSound').innerHTML = '<?xml version="1.0" encoding="UTF-8"?> <svg class="pause" xmlns="http://www.w3.org/2000/svg" id="Filled" viewBox="0 0 27 24" width="28" height="28"><path d="M6.5,0A3.5,3.5,0,0,0,3,3.5v17a3.5,3.5,0,0,0,7,0V3.5A3.5,3.5,0,0,0,6.5,0Z"/><path d="M17.5,0A3.5,3.5,0,0,0,14,3.5v17a3.5,3.5,0,0,0,7,0V3.5A3.5,3.5,0,0,0,17.5,0Z"/></svg>';
        isAudioEnabled = true;
      } catch (err) {
        console.error('خطا:', err);
      }
    }
  });

  // رویداد پخش کنترلر اصلی
  audio.addEventListener('play', async () => {
    if (!isAudioEnabled) {
      try {
        initAudioNodes();
        isAudioEnabled = true;
      } catch (err) {
        console.error('خطا:', err);
      }
    }
  });

  // انیمیشن
  function animate() {
    // محاسبه موقعیت
    posX += (targetX - posX) * 0.05;
    posY += (targetY - posY) * 0.05;

    // محدودیت حرکت
    posX = Math.max(0, Math.min(posX, container.offsetWidth - circle.offsetWidth));
    posY = Math.max(0, Math.min(posY, container.offsetHeight - circle.offsetHeight));

    // اعمال موقعیت
    circle.style.left = posX + 'px';
    circle.style.top = posY + 'px';

    // اعمال تنظیمات صوتی
    if (isAudioEnabled) {
      panner.pan.value = (posX / container.offsetWidth) * 2 - 1;
      gainNode.gain.value = 1 - (posY / container.offsetHeight);
    }

    requestAnimationFrame(animate);
  }

  // رویداد حرکت موس
  document.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    
    // تعریف محدوده توسعه‌یافته برای تشخیص خروج موس
    const expandedLeft = rect.left - 100; // 30 پیکسل فاصله از چپ
    const expandedRight = rect.right + 100; // 30 پیکسل فاصله از راست
    const expandedTop = rect.top - 100; // 30 پیکسل فاصله از بالا
    const expandedBottom = rect.bottom + 100; // 30 پیکسل فاصله از پایین

    // بررسی خروج موس از محدوده
    if (
      e.clientX < expandedLeft ||
      e.clientX > expandedRight ||
      e.clientY < expandedTop ||
      e.clientY > expandedBottom
    ) {
      // موس خارج از محدوده: دایره به مرکز بازگردد
      targetX = container.offsetWidth / 2 - circle.offsetWidth / 2;
      targetY = container.offsetHeight / 2 - circle.offsetHeight / 2;
    } else {
      // موس در محدوده: موقعیت دایره بر اساس موس تنظیم شود
      targetX = e.clientX - rect.left - circle.offsetWidth / 2;
      targetY = e.clientY - rect.top - circle.offsetHeight / 2;
    }
  });

  animate();
});

