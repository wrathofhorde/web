(function onLoad(params) {
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

    const reader = new FileReader();
    
    reader.addEventListener('load', event => {
      const binary = event.target.result;
      const md5 = CryptoJS.MD5(binary).toString();
      console.log(md5);
    });
    file.arrayBuffer()
      .then(data => {
        console.log(data);
        const blob = new Blob([new Uint8Array(data, 0, data.length)]);
        reader.readAsBinaryString(blob);
      })
      .catch(e => {
        alert(e);
      });
  });
})();
