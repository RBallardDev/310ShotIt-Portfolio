document.addEventListener('DOMContentLoaded', () => {
    const leftItem = document.getElementById('left-item');
    const middleItem = document.getElementById('middle-item');
    const rightItem = document.getElementById('right-item');
    const leftNumber = document.getElementById('left-number');
    const middleNumber = document.getElementById('middle-number');
    const rightNumber = document.getElementById('right-number');

    const leftImages = ['photo1.jpg', 'photo2.jpg', 'photo3.jpg', 'photo4.jpg', 'photo5.jpg', 'photo6.jpg', 'photo7.jpg', 'photo8.jpg', 'photo9.jpg', 'photo10.jpg'];
    const middleImages = ['photo1.jpg', 'photo2.jpg', 'photo3.jpg', 'photo4.jpg', 'photo5.jpg', 'photo6.jpg', 'photo7.jpg', 'photo8.jpg', 'photo9.jpg', 'photo10.jpg'];
    const rightImages = ['photo1.jpg', 'photo2.jpg', 'photo3.jpg', 'photo4.jpg', 'photo5.jpg', 'photo6.jpg', 'photo7.jpg', 'photo8.jpg', 'photo9.jpg', 'photo10.jpg'];

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function getNextImage(images, currentImage) {
        let shuffledImages = shuffleArray([...images]);
        shuffledImages = shuffledImages.filter(image => image !== currentImage);
        return shuffledImages[0];
    }

    function rollNumberAndImage(numberElement, imageElement, fadeImageElement, originalNumber, imageFolder, images) {
        let currentImage = imageElement.src.split('/').pop();
        let rollSequence = shuffleArray([...Array(10).keys(), ...Array(10).keys()]); // Array of 0-9 twice

        let rollIndex = 0;
        imageElement.style.transition = 'opacity 0.5s linear';
        fadeImageElement.style.transition = 'opacity 0.5s linear';
        fadeImageElement.style.opacity = 0;

        const newImage = getNextImage(images, currentImage); // Pre-select new image
        fadeImageElement.src = `${imageFolder}/${newImage}`; // Set the new image src

        let rollInterval = setInterval(() => {
            numberElement.textContent = rollSequence[rollIndex];
            rollIndex++;
            if (rollIndex >= rollSequence.length) {
                clearInterval(rollInterval);
                numberElement.textContent = originalNumber;
            }
        }, 100);

        setTimeout(() => {
            imageElement.style.opacity = 0;
            fadeImageElement.style.opacity = 1;
            setTimeout(() => {
                imageElement.src = fadeImageElement.src; // Update the original image src
                imageElement.style.opacity = 1; // Reset opacity
                fadeImageElement.style.opacity = 0; // Hide fade image
            }, 500); // Ensure this matches the fade-out duration
        }, rollSequence.length * 100 - 500); // Start fade-out after rolling
    }

    function startRolling() {
        rollNumberAndImage(leftNumber, leftItem.querySelector('.home-img:not(.fade-img)'), leftItem.querySelector('.fade-img'), 3, 'images/left', leftImages);
        rollNumberAndImage(rightNumber, rightItem.querySelector('.home-img:not(.fade-img)'), rightItem.querySelector('.fade-img'), 0, 'images/right', rightImages);
        rollNumberAndImage(middleNumber, middleItem.querySelector('.home-img:not(.fade-img)'), middleItem.querySelector('.fade-img'), 1, 'images/middle', middleImages);
    }

    function repeatRolling() {
        startRolling();
        setInterval(() => {
            startRolling();
        }, 15000); // Every 15 seconds
    }

    repeatRolling();
});
