"use strict";

window.addEventListener('load', ()=> {
  const player = document.querySelector('#player');
  const picker = document.querySelector('#file-picker');

  // click event trigger
  player.addEventListener('click', () => {
    player.pause();
    
    const click = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true
    });
    picker.dispatchEvent(click);
  });

  picker.addEventListener('change', (event)=>{
    const file = picker.files[0];

    if (file === undefined) return;

    waitAll()
      .then(values => {
        console.log(values);
        const data = values[0];
        const img = values[1];
        const dotIndex = file.name.lastIndexOf('.');
        const name = file.name.substring(0, dotIndex + 1) + 'jpg';

        const alink = document.createElement('a');
        alink.setAttribute('download', name);
        alink.setAttribute('href', URL.createObjectURL(img));
        alink.click();

        player.setAttribute('src', URL.createObjectURL(file));
        player.play();
      })

    async function getDriveData() {
      let count = 0;
      const driveData = [];
      const DATA_OF_ONESEC = 40;
      const value = await file.arrayBuffer();
      const sep = 'EXTD,';
      const [E, X, T, D, COMMA] = [
        sep.charCodeAt(0), sep.charCodeAt(1), sep.charCodeAt(2), sep.charCodeAt(3), sep.charCodeAt(4)];
      let begin = 0, end = 0;
      const buffer = new Uint8Array(value);
      let onesecData;
      
      while (true) {
        begin = buffer.indexOf(E, begin);
        if (begin === -1) break;
        if (begin + 3 >= buffer.length) break;
        if (buffer[begin + 1] === X && buffer[begin + 2] === T && buffer[begin + 3] === D) {
          if (count % DATA_OF_ONESEC === 0) {
            onesecData = new Array();
            driveData.push(onesecData);
          }
          ++count;
          end = buffer.indexOf(COMMA, begin);
          // console.log(String.fromCharCode.apply(null, buffer.subarray(begin + 5, end)));
          const record = new DriveRecord(String.fromCharCode.apply(null, buffer.subarray(begin + 5, end)));
          onesecData.push(record);
        }
        ++begin;
      }
      // console.log(driveData);
      return driveData;
    }

    async function waitAll() {
      const url = URL.createObjectURL(file);
      const driveData = getDriveData();
      const getCover = getVideoCover(url, 0);

      return await Promise.all([driveData, getCover]);
    }

    function DriveRecord(str) {
      const arr = str.split('/');
      this.valid = arr[0] === '1';
      this.longitude = parseFloat(arr[1]);
      this.latitude = parseFloat(arr[2]);
      this.speed = parseInt(arr[3]);
    }
  });
});

function getVideoCover(src, seekTo = 0.5) {
  console.log(`getting video cover for file: ${src}`);
  return new Promise((resolve) => {
      // load the file to a video player
      const video = document.createElement('video');
      video.setAttribute('src', src);
      video.load();
      video.addEventListener('error', (e) => {
          console.log(`error when loading video file ${e}`);
          return new Error(e);
      });
      
      // load metadata of the video to get video duration and dimensions
      video.addEventListener('loadedmetadata', () => {
          // seek to user defined timestamp (in seconds) if possible
          if (video.duration < seekTo) {
              return new Error('video is too short.');
          }
          // delay seeking or else 'seeked' event won't fire on Safari
          setTimeout(() => {
            video.currentTime = seekTo;
          }, 200);
          // extract video thumbnail once seeking is complete
          video.addEventListener('seeked', () => {
              // console.log(`video is now paused at ${seekTo}s`);
              // define a canvas to have the same dimension as the video
              const canvas = document.createElement('canvas');
              canvas.width = video.videoWidth / 4;
              canvas.height = video.videoHeight / 4;
              // draw the video frame to canvas
              const ctx = canvas.getContext('2d');
              ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
              // return the canvas image as a blob
              ctx.canvas.toBlob(
                  blob => {
                      resolve(blob);
                  },
                  "image/jpeg",
                  0.75 /* quality */
              );
          });
      });
  });
}
