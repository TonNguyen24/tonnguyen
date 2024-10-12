let newX = 0, newY = 0, startX = 0, startY = 0, isDragging = false;
let currentCard = null;

const cards = document.querySelectorAll(".pieces img");

cards.forEach(card => {
    card.addEventListener('mousedown', mouseDown);

    function mouseDown(e) {
        currentCard = card;
        startX = e.clientX;
        startY = e.clientY;
        isDragging = true;

        // Only attach mousemove and mouseup during drag
        document.addEventListener('mousemove', mouseMove);
        document.addEventListener('mouseup', mouseUp);
    }

    function mouseMove(e) {
        if (!isDragging) return;

        newX = e.clientX - startX;
        newY = e.clientY - startY;

        // Use requestAnimationFrame to optimize the drag operation
        requestAnimationFrame(() => {
            currentCard.style.top = `${currentCard.offsetTop + newY}px`;
            currentCard.style.left = `${currentCard.offsetLeft + newX}px`;
        });

        startX = e.clientX;
        startY = e.clientY;
    }

    function mouseUp() {
        isDragging = false;

        // Remove event listeners to clean up
        document.removeEventListener('mousemove', mouseMove);
        document.removeEventListener('mouseup', mouseUp);
    }
});

