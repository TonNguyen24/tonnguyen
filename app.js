document.addEventListener("DOMContentLoaded", function() {
    const images = [
        { src: "./images/img1.png", text: "" },
        { src: "./images/img2.png", text: "" },
        "./images/img3.png",
        "./images/img4.png",
        "./images/img5.png",
        "./images/img6.png",
        "./images/img7.png",
        "./images/img8.png",
        "./images/img9.png",
        "./images/img10.png",
        "./images/img11.png",
        "./images/img12.png"
    ];

    function createSlider() {
        const slider = document.getElementById("slider");

        function handleMouseOver(e) {
            e.currentTarget.style.left = "45%";
        }

        function handleMouseOut(e) {
            e.currentTarget.style.left = "0%";
        }

        images.forEach((imgData, index) => {
            const card = document.createElement("div");
            card.className = "card";
            card.addEventListener("mouseover", handleMouseOver);
            card.addEventListener("mouseout", handleMouseOut);
            
            const img = document.createElement("img");
            img.src = typeof imgData === 'string' ? imgData : imgData.src;
            img.alt = `img${index + 1}`;
            
            card.appendChild(img);

            // Add text overlay if applicable
            if (typeof imgData !== 'string' && imgData.text) {
                const overlayText = document.createElement("div");
                overlayText.className = "overlay-text";
                overlayText.textContent = imgData.text;
                card.appendChild(overlayText);
            }

            slider.appendChild(card);
        });
    }

    window.onload = createSlider;

    const imagePreview = document.getElementById('imagePreview');
    const navItems = document.querySelectorAll('.nav a');

    navItems.forEach(item => {
        item.addEventListener('mouseover', () => {
            imagePreview.style.display = 'block'; // Show the image
        });

        item.addEventListener('mousemove', (e) => {
            const offsetX = 20; // Adjust offset as needed
            const offsetY = 20; // Adjust offset as needed

            imagePreview.style.left = `${e.pageX + offsetX}px`;
            imagePreview.style.top = `${e.pageY + offsetY}px`;
        });

        item.addEventListener('mouseout', () => {
            imagePreview.style.display = 'none'; // Hide the image
        });
    });
});
