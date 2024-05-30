document.addEventListener('DOMContentLoaded', function() {
    // Global variable to store the interval ID for cycling images
    let cycleIntervalId;

    // Flag to control the mouseenter event
    let mouseenterEnabled = true;
    let wasInCaseRange = false;


    // Function to cycle through images in mainContainer
    function cycleImagesInMainContainer() {
        // Clear any existing cycle interval
        if (cycleIntervalId) {
            clearInterval(cycleIntervalId);
        }

        const mainContainerImages = document.querySelectorAll('.mainContainer img');
        let currentImage = 0;
        
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
            img.remove()
        });
    }
    
    // Function to add images to mainContainer from a specified source container
    function addImagesToMainContainer(sourceContainerSelector) {
        // Clear the existing images in mainContainer
        emptyMainContainer();
        
        const sourceContainer = document.querySelector(sourceContainerSelector);
        const mainContainer = document.querySelector('.mainContainer');
        
        // Get all images in the source container
        const images = sourceContainer.querySelectorAll('img');
        
        // Clone each image and append to mainContainer
        images.forEach(img => {
            const clonedImage = img.cloneNode();
            mainContainer.appendChild(clonedImage);
        });
        
        // Restart the image cycling after adding new images
        cycleImagesInMainContainer();
    }
    
    // Setup event listeners
    function setupEventListeners() {
        // Define the main container and ranges with actions
        const fixedPoint = document.querySelector('.mainContainer');
        const ranges = [
            {
                xRange: [210, 220],
                yRange: [58, 205],
                onEnter: () => addImagesToMainContainer('.casesHoverLeft'),
                onLeave: () => addImagesToMainContainer('.startbilder'),
                entered: false
            },
            {
                xRange: [468, 479],
                yRange: [100, 360],
                onEnter: () => addImagesToMainContainer('.meBilder'),
                onLeave: () => addImagesToMainContainer('.startbilder'),
                entered: false
            },
            {
                xRange: [215, 455],
                yRange: [205, 215],
                onEnter: () => addImagesToMainContainer('.jobbarBilder'),
                onLeave: () => addImagesToMainContainer('.startbilder'),
                entered: false
            },
            // Add more range-action pairs as needed
        ];
    
        // Event listener for mousemove
        fixedPoint.addEventListener('mousemove', (event) => {

            const rect = fixedPoint.getBoundingClientRect();

            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;

            console.log(`Mouse X: ${mouseX}, Mouse Y: ${mouseY}`);
    
            // Iterate through ranges and handle enter/leave events
            for (const range of ranges) {
                const { xRange, yRange, onEnter, onLeave } = range;
                const isInRange = mouseX >= xRange[0] && mouseX <= xRange[1] && 
                                    mouseY >= yRange[0] && mouseY <= yRange[1];
                
                if (isInRange && !range.entered) {
                    onEnter();
                    range.entered = true;
                } else if (!isInRange && range.entered) {
                    onLeave();
                    range.entered = false;
                }
            }
        });
    }
    
    
    // Initialize the cycling of images in mainContainer
    cycleImagesInMainContainer();
    
    // Setup event listeners
    setupEventListeners();
    

});
