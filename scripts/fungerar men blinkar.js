document.addEventListener('DOMContentLoaded', function() {
    let cycleIntervalId;
    let clickAnimationTriggered = false;

    function cycleImagesInMainContainer(images) {
        if (cycleIntervalId) {
            clearInterval(cycleIntervalId);
        }

        let currentImage = 0;
        images.forEach((img, index) => {
            img.style.display = index === 0 ? 'block' : 'none';
        });

        cycleIntervalId = setInterval(() => {
            images[currentImage].style.display = 'none';
            currentImage++;
            if (currentImage >= images.length) {
                if (clickAnimationTriggered) {
                    clearInterval(cycleIntervalId);
                    images[currentImage - 1].style.display = 'block';
                    return;
                }
                currentImage = 0;
            }
            images[currentImage].style.display = 'block';
        }, 200);
    }

    function emptyMainContainer() {
        const mainContainer = document.querySelector('.mainContainer');
        const images = mainContainer.querySelectorAll('img');
        images.forEach(img => {
            img.remove();
        });
    }

    function addImagesToMainContainer(sourceContainerSelector) {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

        emptyMainContainer();

        const sourceContainer = document.querySelector(sourceContainerSelector);
        const mainContainer = document.querySelector('.mainContainer');
        const images = sourceContainer.querySelectorAll('img');

        images.forEach(img => {
            const clonedImage = img.cloneNode();
            clonedImage.style.display = 'none';
            mainContainer.appendChild(clonedImage);
        });

        cycleImagesInMainContainer(Array.from(mainContainer.querySelectorAll('img')));

        window.scrollTo(scrollLeft, scrollTop);
    }

    function resetToInitialState() {
        clickAnimationTriggered = false;
        addImagesToMainContainer('.startBilderContainer');
    }

    function setupEventListeners() {
        function handleMouseEnter(containerClass, sourceContainer) {
            return function() {
                if (clickAnimationTriggered) return;
                addImagesToMainContainer(sourceContainer);
            };
        }

        function handleMouseLeave(sourceContainer) {
            return function() {
                if (clickAnimationTriggered) return;
                addImagesToMainContainer(sourceContainer);
            };
        }

        function handleClick(sourceContainerSelector) {
            return function(event) {
                event.preventDefault();
                addImagesToMainContainer(sourceContainerSelector);
                clickAnimationTriggered = true;
            };
        }

        const containers = [
            { selector: '.leftSide', hoverSource: '.casesHoverLeft', clickSource: '.clickLeft' },
            { selector: '.rightSide', hoverSource: '.hoverRight', clickSource: '.clickRight' },
            { selector: '.bottom', hoverSource: '.hoverFloor', clickSource: '.clickBottom' }
        ];

        containers.forEach(({ selector, hoverSource, clickSource }) => {
            const element = document.querySelector(selector);
            element.addEventListener('mouseenter', handleMouseEnter(selector, hoverSource));
            element.addEventListener('mouseleave', handleMouseLeave('.startBilderContainer'));
            element.addEventListener('click', handleClick(clickSource));
        });

        const logotype = document.querySelector('.logotyper img');
        logotype.addEventListener('click', resetToInitialState);
    }

    setupEventListeners();
    const initialImages = Array.from(document.querySelectorAll('.mainContainer img'));
    cycleImagesInMainContainer(initialImages);
});
