"use strict";

window.addEventListener('load', ()=> {
  const player = document.querySelector('#player');
  const picker = document.querySelector('#file-picker');

  // click event trigger
  player.addEventListener('click', () => {
    const click = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true
    });
    picker.dispatchEvent(click);
  });

  picker.addEventListener('change', (event)=>{
    const file = picker.files[0];
    // console.log(file);
    file.arrayBuffer().then(value => {
      const [E, X, T, D] = [69, 88, 84, 68];
      let index = 0;
      const buffer = new Uint8Array(value);
      
      while (true) {
        index = buffer.indexOf(E, index);
        if (index === -1) break;
        if (index + 3 >= buffer.length) break;

        if (buffer[index + 1] === X && buffer[index + 2] === T && buffer[index + 3] === D) {
          console.log("find!!!");
          break;
        }
        ++index;
      }
    });
    
    const url = URL.createObjectURL(file); 
    // console.log(url);
    getVideoCover(url, 0)
      .then(value => {
        console.log(value);
        const dotIndex = file.name.lastIndexOf('.');
        const name = file.name.substring(0, dotIndex + 1) + 'jpg';
        console.log(name);
        const alink = document.createElement('a');
        alink.setAttribute('download', name);
        // alink.setAttribute('href', canvas.toDataURL("image/png"));
        alink.setAttribute('href', URL.createObjectURL(value));
        alink.click();
      })
      .catch(e => console.log(e));
      player.setAttribute('src', url); 
      player.play();
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
              console.log(`video is now paused at ${seekTo}s`);
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
