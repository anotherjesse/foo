const originalImage = document.getElementById("original-image");
const jpegifiedImage = document.getElementById("jpegified-image");
const button = document.getElementById("jpegify-button");

button.addEventListener("click", jpegify);

async function loadImageFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });
}

async function loadImageFromFileUpload(event) {
  if (event?.dataTransfer?.files?.length) {
    const firstFile = Array.from(event.dataTransfer.files)[0];
    if (firstFile.type.startsWith("image/")) {
      const imageDataUrl = await loadImageFile(firstFile);
      originalImage.src = imageDataUrl;
      jpegifiedImage.src = imageDataUrl;
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("dragover", (event) => {
    event.preventDefault();
  });

  document.body.addEventListener("drop", (event) => {
    event.preventDefault();
    loadImageFromFileUpload(event);
  });
});

function jpegify() {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const img = new Image();
  img.src = jpegifiedImage.src;

  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, img.width, img.height);
    const jpegUrl = canvas.toDataURL("image/jpeg", 0.9);
    jpegifiedImage.src = jpegUrl;
  };
}
