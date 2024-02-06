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
