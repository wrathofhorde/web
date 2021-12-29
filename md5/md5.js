(function onLoad(params) {
  const FILE_SIZE = 42236928;
  const STR_OK = "OK";
  const STR_NG = "NG";
  const STR_CHECKING = "Checking...";
  const HASH_KEY = "7757c2a407df65edbd96f91f719b2c05";
  const display = document.querySelector(".display");
  const btn = document.querySelector(".button");
  const select = document.querySelector(".select");

  btn.addEventListener("click", () => {
    const event = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      view: window,
    });
    select.value = "";
    select.dispatchEvent(event);
  });

  select.addEventListener("input", (event) => {
    const file = event.target.files[0];

    if (file.length === 0) {
      alert("Invalid path");
      return;
    }
    const startTime = new Date().getTime();
    display.innerText = STR_CHECKING;
    display.classList.remove(STR_NG);
    display.classList.remove(STR_OK);

    const reader = new FileReader();

    reader.addEventListener("load", (event) => {
      const binary = event.target.result;
      const md5 = CryptoJS.MD5(binary).toString();
      if (HASH_KEY === md5) {
        display.innerText = STR_OK;
        display.classList.add(STR_OK);
      } else {
        display.innerText = STR_NG;
        display.classList.add(STR_NG);
      }
      console.log(new Date().getTime() - startTime);
    });

    file
      .arrayBuffer()
      .then((data) => {
        const blob = new Blob([new Uint8Array(data, 0, data.length)]);
        reader.readAsBinaryString(blob);
      })
      .catch((e) => {
        alert(e);
      });
  });
})();
