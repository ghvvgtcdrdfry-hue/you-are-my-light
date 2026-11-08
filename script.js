
document.addEventListener("DOMContentLoaded", () => {

    // =====================================
    // 1. DAY / NIGHT MODE
    // =====================================

    const themeToggle = document.getElementById("themeToggle");
    const themeColor = document.querySelector('meta[name="theme-color"]');

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            document.body.classList.toggle("day-mode");

            const isDay = document.body.classList.contains("day-mode");

            themeToggle.textContent = isDay
                ? "🌙 Night mode"
                : "☀️ Day mode";

            themeColor?.setAttribute(
                "content",
                isDay ? "#fff5e8" : "#170d27"
            );
        });
    }


    // =====================================
    // 2. BACKGROUND MUSIC
    // =====================================

    const soundToggle = document.getElementById("soundToggle");
    const soundIcon = document.getElementById("soundIcon");
    const soundText = document.getElementById("soundText");
    const backgroundMusic = document.getElementById("backgroundMusic");

    let soundEnabled = false;

    if (backgroundMusic) {
        backgroundMusic.volume = 0.35;
        backgroundMusic.loop = true;
    }

    function updateMusicButton(isPlaying) {
        soundEnabled = isPlaying;

        if (soundIcon) {
            soundIcon.textContent = isPlaying ? "🔊" : "🔇";
        }

        if (soundText) {
            soundText.textContent = isPlaying ? "Music on" : "Music off";
        }

        if (soundToggle) {
            soundToggle.classList.toggle("music-playing", isPlaying);

            soundToggle.setAttribute(
                "aria-label",
                isPlaying ? "Turn music off" : "Turn music on"
            );
        }
    }

    if (soundToggle && backgroundMusic) {

        soundToggle.addEventListener("click", async (event) => {
            event.preventDefault();
            event.stopPropagation();

            if (soundEnabled) {
                backgroundMusic.pause();
                updateMusicButton(false);
                return;
            }

            try {
                await backgroundMusic.play();
                updateMusicButton(true);
            } catch (error) {
                updateMusicButton(false);

                if (soundText) {
                    soundText.textContent = "Music unavailable";
                }

                console.error("Music playback error:", error);
                alert(
                    "Music could not play. Please check that your MP3 file is in the correct music folder."
                );
            }
        });

        backgroundMusic.addEventListener("pause", () => {
            if (soundEnabled) {
                updateMusicButton(false);
            }
        });

        backgroundMusic.addEventListener("play", () => {
            updateMusicButton(true);
        });

        backgroundMusic.addEventListener("error", () => {
            updateMusicButton(false);
            console.error(
                "Audio file not found. Check the MP3 file path in index.html."
            );
        });
    }


    // =====================================
    // 3. CREATE BACKGROUND STARS
    // =====================================

    const starLayer = document.getElementById("starLayer");

    if (starLayer) {
        for (let i = 0; i < 45; i++) {
            const star = document.createElement("span");

            star.className = "star";
            star.textContent = Math.random() > 0.5 ? "✦" : "·";

            star.style.left = Math.random() * 100 + "%";
            star.style.top = Math.random() * 100 + "%";

            star.style.setProperty(
                "--duration",
                (2 + Math.random() * 4) + "s"
            );

            star.style.animationDelay = Math.random() * 4 + "s";

            starLayer.appendChild(star);
        }
    }


    // =====================================
    // 4. SCROLL REVEAL
    // =====================================

    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15
        });

        revealElements.forEach(element => observer.observe(element));

    } else {
        revealElements.forEach(element => {
            element.classList.add("visible");
        });
    }


    // =====================================
    // 5. FLOATING HEARTS AND SPARKLES
    // =====================================

    function createParticle(x, y, symbol) {
        const particle = document.createElement("span");

        particle.className = "floating-particle";
        particle.textContent = symbol;

        particle.style.left = x + "px";
        particle.style.top = y + "px";

        particle.style.fontSize =
            (16 + Math.random() * 18) + "px";

        particle.style.setProperty(
            "--move-x",
            (Math.random() * 180 - 90) + "px"
        );

        document.body.appendChild(particle);

        setTimeout(() => particle.remove(), 1900);
    }

    function heartBurst(x, y) {
        const hearts = ["💖", "💕", "✨", "💗", "❤️"];

        for (let i = 0; i < 12; i++) {
            setTimeout(() => {
                createParticle(
                    x + Math.random() * 50 - 25,
                    y + Math.random() * 30 - 15,
                    hearts[Math.floor(Math.random() * hearts.length)]
                );
            }, i * 60);
        }
    }


    // =====================================
    // 6. INTERACTIVE DIYAS
    // =====================================

    document.querySelectorAll(".diya:not(.static-diya)")
        .forEach(diya => {

            diya.addEventListener("click", () => {
                const rect = diya.getBoundingClientRect();

                diya.classList.add("diya-lit");

                heartBurst(
                    rect.left + rect.width / 2,
                    rect.top
                );

                const flame = diya.querySelector(".flame");

                if (flame) {
                    flame.animate(
                        [
                            { transform: "scale(1)" },
                            { transform: "scale(1.5)" },
                            { transform: "scale(1)" }
                        ],
                        {
                            duration: 500,
                            easing: "ease-in-out"
                        }
                    );
                }
            });
        });


    // =====================================
    // 7. CRACKER SPARK EFFECTS
    // =====================================

    function createSpark(container) {
        if (!container) return;

        const spark = document.createElement("span");

        spark.className = "spark";

        const rect = container.getBoundingClientRect();

        spark.style.left = Math.random() * rect.width + "px";
        spark.style.top = Math.random() * rect.height + "px";

        spark.style.setProperty(
            "--x",
            (Math.random() * 180 - 90) + "px"
        );

        spark.style.setProperty(
            "--y",
            (Math.random() * 180 - 90) + "px"
        );

        container.appendChild(spark);

        setTimeout(() => spark.remove(), 1000);
    }

    function sparkBurst(container, amount = 35) {
        if (!container) return;

        for (let i = 0; i < amount; i++) {
            setTimeout(() => createSpark(container), i * 12);
        }
    }


    // =====================================
    // 8. PHULJHADI, ANAR & CHAKRI
    // =====================================

    function activateCracker(card) {
        const type = card.dataset.cracker;
        const effect = card.querySelector(".cracker-effect");

        if (card.dataset.busy === "true") return;

        card.dataset.busy = "true";

        if (type === "phuljhadi") {
            const visual = card.querySelector(".phuljhadi-visual");

            visual?.classList.remove("active");
            void visual?.offsetWidth;
            visual?.classList.add("active");

            sparkBurst(effect, 55);

            setTimeout(() => {
                visual?.classList.remove("active");
            }, 1600);
        }

        if (type === "anar") {
            const visual = card.querySelector(".anar-visual");

            visual?.classList.remove("active");
            void visual?.offsetWidth;
            visual?.classList.add("active");

            sparkBurst(effect, 75);

            setTimeout(() => {
                visual?.classList.remove("active");
            }, 1800);
        }

        if (type === "chakri") {
            const wheel = card.querySelector(".chakri-wheel");

            if (wheel) {
                wheel.classList.remove("active");
                void wheel.offsetWidth;
                wheel.classList.add("active");
            }

            sparkBurst(effect, 50);

            setTimeout(() => {
                wheel?.classList.remove("active");
            }, 1500);
        }

        setTimeout(() => {
            card.dataset.busy = "false";
        }, 1900);
    }

    document.querySelectorAll(".cracker-card").forEach(card => {
        card.addEventListener("click", () => {
            activateCracker(card);
        });
    });


    // =====================================
    // 9. SURPRISE LOVE LETTER MODAL
    // =====================================

    const surpriseBtn = document.getElementById("surpriseBtn");
    const surpriseModal = document.getElementById("surpriseModal");
    const closeModal = document.getElementById("closeModal");
    const celebrateBtn = document.getElementById("celebrateBtn");

    function openModal() {
        if (!surpriseModal) return;

        surpriseModal.classList.add("show");
        surpriseModal.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";

        setTimeout(() => closeModal?.focus(), 100);

        heartBurst(
            window.innerWidth / 2,
            window.innerHeight / 2
        );
    }

    function closeSurprise() {
        if (!surpriseModal) return;

        surpriseModal.classList.remove("show");
        surpriseModal.setAttribute("aria-hidden", "true");

        document.body.style.overflow = "";

        surpriseBtn?.focus();
    }

    surpriseBtn?.addEventListener("click", openModal);
    closeModal?.addEventListener("click", closeSurprise);

    surpriseModal?.addEventListener("click", event => {
        if (event.target === surpriseModal) {
            closeSurprise();
        }
    });

    document.addEventListener("keydown", event => {
        if (
            event.key === "Escape" &&
            surpriseModal?.classList.contains("show")
        ) {
            closeSurprise();
        }
    });


    // =====================================
    // 10. FIREWORKS CELEBRATION
    // =====================================

    function fireworks() {
        const symbols = ["✨", "💛", "🎆", "💖", "⭐", "🌟"];

        for (let burst = 0; burst < 7; burst++) {
            setTimeout(() => {
                const x = Math.random() * window.innerWidth;
                const y = Math.random() * window.innerHeight * 0.65;

                for (let i = 0; i < 20; i++) {
                    const symbol =
                        symbols[Math.floor(Math.random() * symbols.length)];

                    createParticle(x, y, symbol);
                }
            }, burst * 250);
        }
    }

    celebrateBtn?.addEventListener("click", () => {
        closeSurprise();
        fireworks();
    });

    document.getElementById("celebrateAgain")
        ?.addEventListener("click", fireworks);


    // =====================================
    // 11. CLICK ANYWHERE FOR SPARKLES
    // =====================================

    document.addEventListener("click", event => {
        if (
            event.target.closest("button") ||
            event.target.closest("a") ||
            event.target.closest(".modal-card") ||
            event.target.closest(".cracker-card") ||
            event.target.closest(".diya")
        ) {
            return;
        }

        if (Math.random() > 0.5) {
            createParticle(
                event.clientX,
                event.clientY,
                "✨"
            );
        }
    });


    // =====================================
    // 12. WELCOME MESSAGE
    // =====================================

    console.log("✨ Welcome to A Little Universe of Light!");
    console.log("Made with love, just for Love Baby ❤️");

});
