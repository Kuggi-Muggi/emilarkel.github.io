document.addEventListener("DOMContentLoaded", function () {

//a function that inserts the images from "startbilder" into "mainContainer".
//a function that inserts the images from "casebilder" into "mainContainer" when mouseenter left side of "mainContainer"
//a function that inserts the images from "jobbarBilder" into "mainContainer" when mouseenter bottom side of "mainContainer"
//a function that inserts the images from "meBilder" into "mainContainer" when mouseenter right side of "mainContainer"

//a function that loops the images in "mainContainer"
//a function that empties the images from "mainContainer"
//a function that recognizes the left side of "mainContainer"
//a function that recognizes the right side of "mainContainer"
//a function that recognizes the bottom side of "mainContainer"
    
    // Get all images
    const startbilder = document.querySelectorAll('.startbilder img');
    let currentImage = 0;
    
    // Start the animation
    const animationInterval = setInterval( () => {
        startbilder[currentImage].style.display = 'none'; // går in i "startbilder i html.index" tar sedan fram bilden på plast 0 (currentImage), 
                                                          //sedan ändrar jag css (genom .style") på elementet "startbilder" som finns i html.index, 
                                                          //sedan ändrar jag hur den visas (.display) till "none" (dvs. inga bilder visas!)

        currentImage++;

        if (currentImage >= startbilder.length) {
            currentImage = 0;
        }

        startbilder[currentImage].style.display = 'block';
    }, 300);


        // Animeringne för cases
        const casebilder = document.querySelectorAll('.casebilder img');
        let currentCaseImage = 0;
        
        // Start the animation
        const animationCaseInterval = setInterval( () => {
            casebilder[currentCaseImage].style.display = 'none'; // går in i "casebilder i html.index" tar sedan fram bilden på plast 0 (currentImage), 
                                                              //sedan ändrar jag css (genom .style") på elementet "casebilder" som finns i html.index, 
                                                              //sedan ändrar jag hur den visas (.display) till "none" (dvs. inga bilder visas!
            
            currentCaseImage++;
    
            if (currentCaseImage >= casebilder.length) {
                currentCaseImage = 0;
            }
    
            casebilder[currentCaseImage].style.display = 'block';
        }, 300);


        // När man tar musen över mainContainer
    const mainContainer = document.getElementsByClassName("mainContainer");

    function hoverLeft(event){
        event.target.casebilder
        console.log(event);
    }

    for (let i = 0; i < mainContainer.length; i++) {
        console.log('Adding event listener to element:', mainContainer[i]);
        mainContainer[i].addEventListener("mouseenter", hoverLeft);
    }
    

    

















});
