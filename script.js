// Function to create white flash effect
function createWhiteFlash() {
    const flashDiv = document.createElement('div');
    flashDiv.style.position = 'fixed';
    flashDiv.style.top = '0';
    flashDiv.style.left = '0';
    flashDiv.style.width = '100%';
    flashDiv.style.height = '100%';
    flashDiv.style.backgroundColor = 'white';
    document.body.appendChild(flashDiv);

    gsap.to(flashDiv, { opacity: 0, duration: 0.2, onComplete: () => {
        flashDiv.remove();
    }});
}

// Pinning the right div to the background in the center of the screen
ScrollTrigger.create({
    trigger: ".gallery",
    start: "top top",
    end: "bottom 5",
    pin: ".right",
    pinSpacing: false, // Disable spacing so the pinned element is not pushed down
});

// Animate the appearance of left divs one by one as you scroll
gsap.utils.toArray('.details').forEach((details, index) => {
    const tl = gsap.timeline({
        scrollTrigger: {
            scrub: 1,
            trigger: details,
            start: "top 60%", // Adjust this value as needed
            end: "bottom 30%", // Adjust this value as needed
            toggleActions: "play none none none",
            onEnter: () => {
                createWhiteFlash(); // Trigger white flash effect
                // Hide all photo divs initially
                document.querySelectorAll('.right > div').forEach(div => {
                    div.style.display = 'none';
                });
                // Show the corresponding photo div based on the index
                document.querySelector(`.photos${index + 1}`).style.display = 'block';
            },
            onLeaveBack: () => {
                // Show the previous photo div when scrolling upwards
                if (index > 0) {
                    createWhiteFlash(); // Trigger white flash effect
                    document.querySelectorAll('.right > div').forEach(div => {
                        div.style.display = 'none';
                    });
                    document.querySelector(`.photos${index}`).style.display = 'block';
                }
            }
        }
    });

    tl.fromTo(details, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.7 });
});
