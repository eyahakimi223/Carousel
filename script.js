document.addEventListener('DOMContentLoaded', function () {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const slideshowImages = document.querySelectorAll('#slideshow img');
    const prevButton = document.getElementById('previous-page');
    const playButton = document.getElementById('play');
    const prev = document.getElementById('prev'); 
    const next = document.getElementById('next');
    const randomButton = document.getElementById('random');
    const nextButton = document.getElementById('next-page');
    const toggleToolbarButton = document.getElementById('toggle-toolbar');
    const toolbar = document.getElementById('toolbar'); 
    const thumbnailsPerPage = 5;
    let currentPage = 0;
    let intervalId = null;
    let currentSlide = 0;

    function showSlide(slideIndex) {
        console.log('Showing slide with index:', slideIndex);
        slideshowImages.forEach(image => image.classList.remove('active'));
        thumbnails.forEach(thumbnail => thumbnail.classList.remove('active'));
    
        slideshowImages[slideIndex].classList.add('active');
        thumbnails[slideIndex].classList.add('active');
    
        // Hide content of all slides
        const contents = document.querySelectorAll('#slideshow .content');
        contents.forEach(content => {
            content.style.display = 'none';
        });
    
        // Show content of current slide
        const currentSlide = slideshowImages[slideIndex];
        const currentContent = currentSlide.nextElementSibling;
        currentContent.style.display = 'block';
    }
    
    function showThumbnails(pageIndex) {
        const startIndex = pageIndex * thumbnailsPerPage;
        const endIndex = Math.min(startIndex + thumbnailsPerPage, slideshowImages.length);
    
        for (let i = 0; i < slideshowImages.length; i++) {
            if (i >= startIndex && i < endIndex) {
                thumbnails[i].style.display = 'block';
            } else {
                thumbnails[i].style.display = 'none';
            }
        }
    }
    
    function toggleToolbar() {
        toolbar.style.display = (toolbar.style.display === 'none' || toolbar.style.display === '') ? 'block' : 'none';
        prevButton.style.display = toolbar.style.display === 'none' ? 'block' : 'none';
        nextButton.style.display = toolbar.style.display === 'none' ? 'block' : 'none';
        if (toolbar.style.display === 'block') {
            thumbnails.forEach((thumbnail, index) => {
                thumbnail.style.display = 'none';
            });
            // Ajoutez la classe pour modifier l'icône vers le bas
            toggleToolbarButton.classList.add('down-arrow');
            // Supprimez la classe pour réinitialiser l'icône vers la droite
            toggleToolbarButton.classList.remove('right-arrow');
        } else {
            thumbnails.forEach((thumbnail, index) => {
                thumbnail.style.display = index < 5 ? 'block' : 'none';
            });
            // Supprimez la classe pour réinitialiser l'icône vers le bas
            toggleToolbarButton.classList.remove('down-arrow');
            // Ajoutez la classe pour modifier l'icône vers la droite
            toggleToolbarButton.classList.add('right-arrow');
        }
    }
    
    
    
    
    
    
    
    

    function nextSlide() {
        currentSlide++;
        if (currentSlide >= slideshowImages.length) {
            currentSlide = 0;
        }
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide--;
        if (currentSlide < 0) {
            currentSlide = slideshowImages.length - 1;
        }
        showSlide(currentSlide);
    }

    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', function () {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });
    function startPlay() {
        if (intervalId === null) {
            intervalId = setInterval(nextSlide, 3000); // Change 3000 to desired interval in milliseconds
        }
    }

    function stopPlay() {
        clearInterval(intervalId);
        intervalId = null;
    }
    document.addEventListener('keydown', function(event) {
        if (event.code === 'Space') {
            if (intervalId) {
                stopPlay();
                playButton.innerHTML = '<i class="fas fa-play"></i>';
            } else {
                startPlay();
                playButton.innerHTML = '<i class="fas fa-pause"></i>';
            }
        } else if (event.code === 'ArrowLeft') {
            prevSlide();
        } else if (event.code === 'ArrowRight') {
            nextSlide();
        }
    });
    function randomSlide() {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * slideshowImages.length);
        } while (randomIndex === currentSlide);
    
        currentSlide = randomIndex;
        showSlide(currentSlide);
    }
    toggleToolbarButton.addEventListener('click', toggleToolbar);

    nextButton.addEventListener('click', function () {
        if (currentPage < Math.ceil(slideshowImages.length / thumbnailsPerPage) - 1) {
            currentPage++;
            showThumbnails(currentPage);
        }
    });

    prevButton.addEventListener('click', function () {
        if (currentPage > 0) {
            currentPage--;
            showThumbnails(currentPage);
        }
    });
    playButton.addEventListener('click', function() {
        if (intervalId) {
            stopPlay();
            playButton.innerHTML = '<i class="fas fa-play"></i>';
        } else {
            startPlay();
            playButton.innerHTML = '<i class="fas fa-pause"></i>';
        }
    });
    randomButton.addEventListener('click', randomSlide); // Attach event listener to random button

    prev.addEventListener('click', prevSlide); // Attach event listener to prev button

    // Initial display of thumbnails
    showThumbnails(currentPage);

    // Initial display of the first slide
    showSlide(currentSlide);

    next.addEventListener('click', nextSlide);
});
