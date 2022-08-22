const form = document.getElementById("generate-form");
const qr = document.getElementById("qrcode");

const onGenerateSubmit = (e) => {
  clearUI();
  e.preventDefault();
  const url = document.getElementById("url").value;
  const size = document.getElementById("size").value;
  console.log(url, size);

  if (url === "") {
    alert("Please enter a URL");
  } else {
    showSpinner();

    setTimeout(() => {
      hideSpinner();
      generateQRCode(url, size);
      setTimeout(() => {
        const saveUrl = qr.querySelector("img").src;
        createSaveButton(saveUrl);
      }, 50);
    }, 1000);
  }
};

const generateQRCode = (url, size) => {
  const qrcode = new QRCode(document.getElementById("qrcode"), {
    text: url,
    width: size,
    height: size,
  });
};

const showSpinner = () => {
  document.getElementById("spinner").style.display = "block";
};

const hideSpinner = () => {
  document.getElementById("spinner").style.display = "none";
};

const clearUI = () => {
  qr.innerHTML = "";
  const saveButton = document.getElementById("save-link");
  if (saveButton) {
    saveButton.remove();
  }
};

const createSaveButton = (saveUrl) => {
  const link = document.createElement("a");
  link.id = "save-link";
  link.classList = "btn btn-danger btn my-3 py-2";
  link.style.width = "30%";
  link.href = saveUrl;
  link.download = "qrcode";
  link.innerText = "Save Image";
  document.getElementById("generated").appendChild(link);
};

hideSpinner();

form.addEventListener("submit", onGenerateSubmit);
