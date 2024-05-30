document.addEventListener('DOMContentLoaded', function() {
    let cycleIntervalId;

    // Function to cycle through images in mainContainer
    function cycleImages() {
        if (cycleIntervalId) {
            clearInterval(cycleIntervalId);
        }

        const images = document.querySelectorAll('.mainContainer img');
        let currentImage = 0;

        cycleIntervalId = setInterval(() => {
            images[currentImage].style.display = 'none';
            currentImage = (currentImage + 1) % images.length;
            images[currentImage].style.display = 'block';
        }, 300);
    }

    // Function to update images in mainContainer from a specified source
    function updateMainContainer(sourceSelector) {
        const mainContainer = document.querySelector('.mainContainer');

        // Clear existing images in mainContainer, while preserving the .boxes element
        mainContainer.querySelectorAll('img').forEach(img => mainContainer.removeChild(img));

        // Append images from source container to mainContainer
        const sourceContainer = document.querySelector(sourceSelector);
        const images = sourceContainer.querySelectorAll('img');
        images.forEach(img => mainContainer.appendChild(img.cloneNode()));

        // Restart cycling of images
        cycleImages();
    }

    // Event handler for mouse events
    function handleMouseEvent(eventType, targetSelector, sourceSelector) {
        document.querySelector(targetSelector).addEventListener(eventType, () => {
            updateMainContainer(sourceSelector);
        });
    }

    // Setup event listeners for each interaction
    handleMouseEvent('mouseenter', '.leftSide', '.casebilder');
    handleMouseEvent('mouseenter', '.rightSide', '.meBilder');
    handleMouseEvent('mouseenter', '.bottom', '.jobbarBilder');
    handleMouseEvent('mouseleave', '.boxes', '.startbilder');

    // Start cycling images in the mainContainer initially
    cycleImages();
});
