class InteractiveAudioPlayer {
    constructor(audioElement, circleElement, containerElement) {
      this.audio = audioElement;
      this.circle = circleElement;
      this.container = containerElement;
      
      this.audioContext = null;
      this.audioSource = null;
      this.panner = null;
      this.gainNode = null;
      this.isAudioEnabled = false;
      
      this.targetX = 0;
      this.targetY = 0;
      this.posX = 0;
      this.posY = 0;
      
      this.init();
    }
    
    init() {
      // تنظیم موقعیت اولیه دایره
      this.targetX = this.container.offsetWidth / 2 - this.circle.offsetWidth / 2;
      this.targetY = this.container.offsetHeight / 2 - this.circle.offsetHeight / 2;
      this.posX = this.targetX;
      this.posY = this.targetY;
      
      this.initAudioNodes();
      this.setupEventListeners();
      this.animate();
    }
    
    initAudioNodes() {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      this.audioSource = this.audioContext.createMediaElementSource(this.audio);
      this.panner = this.audioContext.createStereoPanner();
      this.gainNode = this.audioContext.createGain();
      
      this.audioSource.connect(this.panner);
      this.panner.connect(this.gainNode);
      this.gainNode.connect(this.audioContext.destination);
    }
    
    setupEventListeners() {
      document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    }
    
    handleMouseMove(e) {
      const rect = this.container.getBoundingClientRect();
      
      // محاسبه موقعیت توسعه‌یافته
      const expandedLeft = rect.left - 100;
      const expandedRight = rect.right + 100;
      const expandedTop = rect.top - 100;
      const expandedBottom = rect.bottom + 100;
      
      if (
        e.clientX < expandedLeft ||
        e.clientX > expandedRight ||
        e.clientY < expandedTop ||
        e.clientY > expandedBottom
      ) {
        // بازگشت به مرکز
        this.targetX = this.container.offsetWidth / 2 - this.circle.offsetWidth / 2;
        this.targetY = this.container.offsetHeight / 2 - this.circle.offsetHeight / 2;
      } else {
        // تنظیم موقعیت بر اساس موس
        this.targetX = e.clientX - rect.left - this.circle.offsetWidth / 2;
        this.targetY = e.clientY - rect.top - this.circle.offsetHeight / 2;
      }
    }
    
    animate() {
      // محاسبه موقعیت
      this.posX += (this.targetX - this.posX) * 0.05;
      this.posY += (this.targetY - this.posY) * 0.05;
      
      // محدودسازی حرکت
      this.posX = Math.max(0, Math.min(this.posX, this.container.offsetWidth - this.circle.offsetWidth));
      this.posY = Math.max(0, Math.min(this.posY, this.container.offsetHeight - this.circle.offsetHeight));
      
      // اعمال موقعیت
      this.circle.style.left = this.posX + 'px';
      this.circle.style.top = this.posY + 'px';
      
      // تنظیمات صوتی
      if (this.isAudioEnabled) {
        this.panner.pan.value = (this.posX / this.container.offsetWidth) * 2 - 1;
        this.gainNode.gain.value = 1 - (this.posY / this.container.offsetHeight);
      }
      
      requestAnimationFrame(() => this.animate());
    }
    
    enableAudio() {
      if (!this.isAudioEnabled) {
        this.initAudioNodes();
        this.audio.play();
        this.isAudioEnabled = true;
      }
    }
  }
  
  // نحوه استفاده
  document.addEventListener('DOMContentLoaded', () => {
    const audioElements = document.querySelectorAll('.MP4arcane');
    const circleElements = document.querySelectorAll('.circle');
    const containerElements = document.querySelectorAll('.soundBox');
    
    audioElements.forEach((audio, index) => {
      new InteractiveAudioPlayer(audio, circleElements[index], containerElements[index]);
    });
  });