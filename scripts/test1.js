// This is a shorter version of document ready if you remember (The function that waits for the page to load)
document.addEventListener("DOMContentLoaded", function() {
    let index = 0;
    let intervalReference;
    let isAnimating = false;

    function swapImage() {
        if (index === 6) {
            index = 0;
        }
        const imageContainer = document.querySelector("#ImageContainer");
        imageContainer.innerHTML = ''; // Clear the container
        const imageElement = document.createElement("img");
        imageElement.className = "showCaseImage";
        imageElement.src = `../Images/${index + 1}.png`;
        imageElement.alt = `Image ${index + 1} Missing`;
        imageContainer.appendChild(imageElement);
        index++; // Increment index by 1
    }

    // Event listeners for hovering over the element
    const imageContainer = document.querySelector("#ImageContainer");
    imageContainer.addEventListener("mouseenter", function() {
        if (isAnimating) return;

        isAnimating = true;
        swapImage(); // Initial swap
        intervalReference = setInterval(swapImage, 200);
    });

    imageContainer.addEventListener("mouseleave", function() {
        clearInterval(intervalReference);
        isAnimating = false;
    });
});
