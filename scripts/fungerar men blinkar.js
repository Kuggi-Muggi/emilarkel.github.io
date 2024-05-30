document.addEventListener('DOMContentLoaded', function() {
    // Global variables
    let cycleIntervalId;
    let clickAnimationTriggered = false;

    // Function to cycle through images in mainContainer
    function cycleImagesInMainContainer(images) {
        // Clear any existing cycle interval
        if (cycleIntervalId) {
            clearInterval(cycleIntervalId);
        }

        let currentImage = 0;

        // Initially hide all images except the first one
        images.forEach((img, index) => {
            img.style.display = index === 0 ? 'block' : 'none';
        });

        // Cycle through images every 200ms
        cycleIntervalId = setInterval(() => {
            // Hide the current image
            images[currentImage].style.display = 'none';

            // Move to the next image
            currentImage++;

            // If reached the end
            if (currentImage >= images.length) {
                // If click animation has been triggered, stop at last frame
                if (clickAnimationTriggered) {
                    clearInterval(cycleIntervalId);
                    images[currentImage - 1].style.display = 'block';
                    return;
                }
                // Otherwise, reset to start and continue looping
                currentImage = 0;
            }

            // Show the new current image
            images[currentImage].style.display = 'block';
        }, 200);
    }

    // Function to empty the images in mainContainer
    function emptyMainContainer() {
        const mainContainer = document.querySelector('.mainContainer');
        const images = mainContainer.querySelectorAll('img');
        images.forEach(img => {
            img.remove();
        });
    }

    // Function to add images to mainContainer from a specified source container
    function addImagesToMainContainer(sourceContainerSelector) {
        // Save the current scroll position
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

        // Clear the existing images in mainContainer
        emptyMainContainer();

        const sourceContainer = document.querySelector(sourceContainerSelector);
        const mainContainer = document.querySelector('.mainContainer');

        // Get all images in the source container
        const images = sourceContainer.querySelectorAll('img');

        // Clone each image and append to mainContainer
        images.forEach(img => {
            const clonedImage = img.cloneNode();
            clonedImage.style.display = 'none'; // Initially hide cloned images
            mainContainer.appendChild(clonedImage);
        });

        // Restart the image cycling after adding new images
        cycleImagesInMainContainer(Array.from(mainContainer.querySelectorAll('img')));

        // Restore the scroll position
        window.scrollTo(scrollLeft, scrollTop);
    }

    // Function to reset to the initial state
    function resetToInitialState() {
        clickAnimationTriggered = false;
        addImagesToMainContainer('.startbilder');
    }

    function setupEventListeners() {
        // Function to handle mouseenter events
        function handleMouseEnter(containerClass, sourceContainer) {
            return function() {
                // If the click animation has been triggered, do nothing
                if (clickAnimationTriggered) return;

                // When the mouse enters the specified container class, add images from the source container to mainContainer
                addImagesToMainContainer(sourceContainer);
            };
        }

        // Function to handle mouseleave events
        function handleMouseLeave(sourceContainer) {
            return function() {
                // If the click animation has been triggered, do nothing
                if (clickAnimationTriggered) return;

                // When the mouse leaves the specified container class, add images from startbilder to mainContainer
                addImagesToMainContainer(sourceContainer);
            };
        }

        // Function to handle click events
        function handleClick(sourceContainerSelector) {
            return function(event) {
                // Prevent default click behavior (e.g., scrolling)
                event.preventDefault();

                // When the specified container class is clicked, add images from the source container to mainContainer
                addImagesToMainContainer(sourceContainerSelector);
                clickAnimationTriggered = true; // Set flag to indicate click animation has been triggered
            };
        }

        // Define the event listeners for the specified container classes
        const containers = [
            { selector: '.leftSide', hoverSource: '.casebilder', clickSource: '.clickLeft' },
            { selector: '.rightSide', hoverSource: '.meBilder', clickSource: '.clickRight' },
            { selector: '.bottom', hoverSource: '.jobbarBilder', clickSource: '.clickBottom' }
        ];

        // Set up event listeners for each container class
        containers.forEach(({ selector, hoverSource, clickSource }) => {
            const element = document.querySelector(selector);

            // Add mouseenter event listener
            element.addEventListener('mouseenter', handleMouseEnter(selector, hoverSource));

            // Add mouseleave event listener
            element.addEventListener('mouseleave', handleMouseLeave('.startbilder'));

            // Add click event listener
            element.addEventListener('click', handleClick(clickSource));
        });

        // Add click event listener to the logotype
        const logotype = document.querySelector('.logotyper img');
        logotype.addEventListener('click', resetToInitialState);
    }

    // Setup event listeners
    setupEventListeners();

    // Initialize the cycling of images in mainContainer
    const initialImages = Array.from(document.querySelectorAll('.mainContainer img'));
    cycleImagesInMainContainer(initialImages);
});