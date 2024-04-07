import "./FusionStorm.css"
import {useEffect, useState} from "react";

export function SpaceDust() {
    const [width, setWidth] = useState(Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0))
    const [height, setHeight] = useState(Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0))
    useEffect(() => {
        const canvas = document.getElementById("fusionstorm");
        if (canvas.getContext) {
            const ctx = canvas.getContext("2d", {alpha: false});
            ctx.imageSmoothingEnabled = false;
            ctx.fillStyle = `rgba(255, 0, 0, 1)`;


            const numParticles = 3000; // Number of particles
            const particleRadius = 1; // Radius of each particle
            // const minRed = 200;// Minimum red value
            // const maxRed = 255; // Maximum red value
            const speed = 10; // Movement speed

            // Array to store particles' positions and velocities
            const particles = [];

            // Initialize particles
            for (let i = 0; i < numParticles; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: Math.random() * speed * 2 - speed,
                    vy: Math.random() * speed * 2 - speed,
                    // red: Math.floor(Math.random() * (maxRed - minRed + 1) + minRed)
                });
            }

            // Function to draw a single particle
            // function drawParticle(x, y) {
            //     ctx.beginPath();
            //     ctx.arc(x, y, particleRadius, 0, Math.PI * 2);
            //     ctx.fill();
            // }
            function drawParticle(x, y) {
                ctx.moveTo(x + particleRadius, y);
                ctx.arc(x, y, particleRadius, 0, Math.PI * 2);
            }

            // Function to update particles' positions
            function updateParticles() {
                for (let i = 0; i < numParticles; i++) {
                    let particle = particles[i];
                    particle.x += particle.vx;
                    particle.y += particle.vy;

                    // Wrap around canvas edges
                    if (particle.x < 0) particle.x = canvas.width;
                    if (particle.x > canvas.width) particle.x = 0;
                    if (particle.y < 0) particle.y = canvas.height;
                    if (particle.y > canvas.height) particle.y = 0;
                }
            }

            // Function to animate the particles
            function animate() {
                // Clear canvas
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                // Update particles
                updateParticles();

                // Draw particles
                ctx.beginPath();
                for (let i = 0; i < numParticles; i++) {
                    const {x, y} = particles[i];
                    drawParticle(x, y);
                }
                ctx.stroke();
                ctx.fill();

                // Request animation frame
                requestAnimationFrame(animate);
            }

            // Start animation
            animate();
        }


        // window.addEventListener("resize", () => {
        //     setWidth(Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0))
        //     setHeight(Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0))
        // })
    }, [])


    return (
        <>
            <canvas className="fusionstorm" id="fusionstorm" width={width} height={height}></canvas>
        </>
    );
}