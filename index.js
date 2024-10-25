import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';

const upload = document.getElementById('upload');
const image = document.getElementById('image');
const cropButton = document.getElementById('crop');
const downloadButton = document.getElementById('download');
let cropper;

upload.addEventListener('change', (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
        const file = files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            image.src = e.target.result;
            cropper = new Cropper(image, {
                aspectRatio: 1,
                viewMode: 3
            });
        };
        reader.readAsDataURL(file);
    }
});

cropButton.addEventListener('click', () => {
    const croppedCanvas = cropper.getCroppedCanvas();
    const croppedImage = document.createElement('img');
    croppedImage.src = croppedCanvas.toDataURL('image/png');
    document.body.appendChild(croppedImage);
});

downloadButton.addEventListener('click', () => {
    const croppedCanvas = cropper.getCroppedCanvas();
    const croppedImage = croppedCanvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = croppedImage;
    link.download = 'cropped.png';
    link.click();
});
