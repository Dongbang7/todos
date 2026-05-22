// public/timer-worker.js
let timer = null;
let endTime = null;

self.onmessage = (e) => {
  const { action, duration } = e.data;

  if (action === 'start') {
    console.log('timer-worker start', duration);
    endTime = Date.now() + duration;
    timer = setInterval(() => {
      const remaining = Math.max(0, endTime - Date.now());
      self.postMessage({ remaining });
      if (remaining <= 0) clearInterval(timer);
    }, 1000);
  } else if (action === 'stop') {
    clearInterval(timer);
    console.log('timer-worker stop');
  }
};

// export default self;
