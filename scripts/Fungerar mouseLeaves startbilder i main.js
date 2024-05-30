document.addEventListener('DOMContentLoaded', function() {

    // Global variable to store the interval ID for cycling images
    let cycleIntervalId;

    // Function to cycle through images in mainContainer
    function cycleImagesInMainContainer() {
        // Clear any existing cycle interval
        if (cycleIntervalId) {
            clearInterval(cycleIntervalId);
        }

        const mainContainerImages = document.querySelectorAll('.mainContainer img');
        let currentImage = 0;
        
        // Initially hide all images except the first one
        mainContainerImages.forEach((img, index) => {
            img.style.display = index === 0 ? 'block' : 'none';
        });
        
        // Cycle through images every 300ms
        cycleIntervalId = setInterval(() => {
            // Hide the current image
            mainContainerImages[currentImage].style.display = 'none';
            
            // Move to the next image
            currentImage++;
            
            // If reached the end, reset to start
            if (currentImage >= mainContainerImages.length) {
                currentImage = 0;
            }
            
            // Show the new current image
            mainContainerImages[currentImage].style.display = 'block';
        }, 300);
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
            clonedImage.style.display = 'none';  // Initially hide cloned images
            mainContainer.appendChild(clonedImage);
        });
        
        // Restart the image cycling after adding new images
        cycleImagesInMainContainer();

        // Restore the scroll position
        window.scrollTo(scrollLeft, scrollTop);
    }
    
/* --------------------------------------------------------------------- */

    function setupEventListeners() {
        // Function to handle mouseenter events
        function handleMouseEnter(containerClass, sourceContainer) {
            return function() {
                // When the mouse enters the specified container class, add images from the source container to mainContainer
                addImagesToMainContainer(sourceContainer);
            };
        }
    
        // Function to handle mouseleave events
        function handleMouseLeave(sourceContainer) {
            return function() {
                // When the mouse leaves the specified container class, add images from startbilder to mainContainer
                addImagesToMainContainer(sourceContainer);
            };
        }

        // Function to handle click events
		function handleClick(sourceContainerSelector) {
			return function() {
				// When the specified container class is clicked, add images from the source container to mainContainer
				addImagesToMainContainer(sourceContainerSelector);
				
				// Start animation
				startAnimation(handleClickAnimation);

				// Add mouseleave event listener to stop animation when the user leaves the clicked element
				const stopAnimationOnLeave = function() {
					clearInterval(currentAnimationId);
					mainAnimationRunning = false;
					this.removeEventListener('mouseleave', stopAnimationOnLeave);
				};
				document.querySelector('.mainContainer').addEventListener('mouseleave', stopAnimationOnLeave);
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
            const mouseLeaveHandler = handleMouseLeave('.startbilder');
    
            // Add mouseenter event listener
            element.addEventListener('mouseenter', handleMouseEnter(selector, hoverSource));
            
            // Add mouseleave event listener
            element.addEventListener('mouseleave', mouseLeaveHandler);

            // Add click event listener
            element.addEventListener('click', handleClick(clickSource, element, mouseLeaveHandler));
        });
    }

    // Initialize the cycling of images in mainContainer
    cycleImagesInMainContainer();
    
    // Setup event listeners
    setupEventListeners();
});