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

    function rollNumberAndImage(numberElement, imageElement, originalNumber, imageFolder, images) {
        let currentImage = imageElement.src.split('/').pop();
        let rollSequence = shuffleArray([...Array(10).keys(), ...Array(10).keys()]); // Array of 0-9 twice

        let rollIndex = 0;
        imageElement.style.transition = 'opacity 1.5s linear';
        imageElement.style.opacity = 0;

        const newImage = getNextImage(images, currentImage); // Pre-select new image

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
            setTimeout(() => {
                imageElement.src = `${imageFolder}/${newImage}`; // Change the image source to the new image
                imageElement.style.opacity = 1;
            }, 500); // Ensure this matches the fade-out duration
        }, rollSequence.length * 100 - 500); // Start fade-out after rolling
    }

    function startRolling() {
        rollNumberAndImage(leftNumber, leftItem.querySelector('.home-img'), 3, 'images/left', leftImages);
        rollNumberAndImage(rightNumber, rightItem.querySelector('.home-img'), 0, 'images/right', rightImages);
        rollNumberAndImage(middleNumber, middleItem.querySelector('.home-img'), 1, 'images/middle', middleImages);
    }

    function repeatRolling() {
        setTimeout(() => {
            startRolling();
            setInterval(() => {
                startRolling();
            }, 15000); // Every 15 seconds
        }, 15000); // Initial delay of 15 seconds
    }

    repeatRolling();
});

// Smooth scroll to sections
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth'
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            } else {
                entry.target.classList.remove('show');
            }
        });
    });

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));
});