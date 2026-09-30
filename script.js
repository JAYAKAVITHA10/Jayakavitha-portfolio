/* =====================================================
   MOBILE MENU
===================================================== */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("show");
    });

}


/* Close mobile menu when a link is clicked */

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        if (navLinks) {
            navLinks.classList.remove("show");
        }

    });

});


/* =====================================================
   DARK / LIGHT MODE
===================================================== */

const themeToggle =
    document.getElementById("themeToggle");

if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {

            themeToggle.textContent = "☀️";

        } else {

            themeToggle.textContent = "🌙";

        }

    });

}


/* =====================================================
   TYPING EFFECT
===================================================== */

const typingElement =
    document.getElementById("typing");

const words = [
    "Cloud Computing",
    "DevOps & Automation",
    "Frontend Development",
    "Building Digital Experiences"
];

let wordIndex = 0;
let characterIndex = 0;
let deleting = false;


function typeEffect() {

    if (!typingElement) {
        return;
    }

    const currentWord =
        words[wordIndex];

    if (!deleting) {

        typingElement.textContent =
            currentWord.substring(
                0,
                characterIndex + 1
            );

        characterIndex++;

        if (
            characterIndex ===
            currentWord.length
        ) {

            deleting = true;

            setTimeout(
                typeEffect,
                1500
            );

            return;
        }

    } else {

        typingElement.textContent =
            currentWord.substring(
                0,
                characterIndex - 1
            );

        characterIndex--;

        if (characterIndex === 0) {

            deleting = false;

            wordIndex++;

            if (
                wordIndex ===
                words.length
            ) {

                wordIndex = 0;

            }

        }

    }

    setTimeout(
        typeEffect,
        deleting ? 50 : 90
    );

}

typeEffect();


/* CONTACT FORM */

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm && formMessage) {

    contactForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        // Get form values
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        // Get submit button
        const submitButton = contactForm.querySelector(".contact-submit");
        const submitText = submitButton
            ? submitButton.querySelector("span:first-child")
            : null;

        // Basic validation
        if (!name || !email || !message) {

            formMessage.textContent =
                "Please fill in all the fields.";

            return;
        }

        // Show sending status
        formMessage.textContent = "Sending...";

        if (submitButton) {
            submitButton.disabled = true;
        }

        if (submitText) {
            submitText.textContent = "Sending...";
        }

        try {

            // Send data to backend
            const response = await fetch(
                "https://jayakavitha-portfolio-api.onrender.com/api/contact",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        name: name,
                        email: email,
                        message: message
                    })
                }
            );

            // Convert backend response to JSON
            const data = await response.json();

            // Backend returned an error
            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Unable to send your message."
                );

            }

            // Success message
            formMessage.textContent =
                "Thank you! Your message has been sent successfully.";

            // Clear form
            contactForm.reset();

        } catch (error) {

            console.error(
                "Contact form error:",
                error
            );

            formMessage.textContent =
                "Unable to send your message. Please try again.";

        } finally {

            // Enable button again
            if (submitButton) {
                submitButton.disabled = false;
            }

            if (submitText) {
                submitText.textContent = "Send Message";
            }

        }

    });

}


/* =====================================================
   CURRENT YEAR
===================================================== */

const yearElement =
    document.getElementById("year");

if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}


/* =====================================================
   SCROLL TO TOP
===================================================== */

const scrollTopButton =
    document.getElementById("scrollTop");


window.addEventListener(
    "scroll",
    () => {

        if (!scrollTopButton) {
            return;
        }

        if (window.scrollY > 500) {

            scrollTopButton.classList.add("show");

        } else {

            scrollTopButton.classList.remove("show");

        }

    }
);


if (scrollTopButton) {

    scrollTopButton.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


/* =====================================================
   SCROLL PROGRESS
===================================================== */

const scrollProgress =
    document.getElementById("scrollProgress");

const header =
    document.querySelector(".header");


function updateScrollProgress() {

    if (!scrollProgress) {
        return;
    }

    const scrollTop =
        window.scrollY;

    const documentHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    if (documentHeight <= 0) {

        scrollProgress.style.width = "0%";

        return;

    }

    const scrollPercentage =
        (scrollTop / documentHeight) * 100;

    scrollProgress.style.width =
        `${scrollPercentage}%`;


    /* Navbar shadow */

    if (header) {

        if (scrollTop > 20) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }

}


window.addEventListener(
    "scroll",
    updateScrollProgress
);


/* Run once when page loads */

updateScrollProgress();


/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

const sections =
    document.querySelectorAll(
        "main section[id]"
    );

const navigationLinks =
    document.querySelectorAll(
        ".nav-link"
    );


function updateActiveNavigation() {

    let currentSection = "home";

    const scrollPosition =
        window.scrollY + 180;


    sections.forEach(section => {

        const sectionTop =
            section.offsetTop;

        const sectionHeight =
            section.offsetHeight;

        const sectionId =
            section.getAttribute("id");


        if (
            scrollPosition >= sectionTop &&
            scrollPosition <
                sectionTop + sectionHeight
        ) {

            currentSection =
                sectionId;

        }

    });


    navigationLinks.forEach(link => {

        link.classList.remove("active");

        const target =
            link.getAttribute("href");

        if (
            target ===
            `#${currentSection}`
        ) {

            link.classList.add("active");

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveNavigation
);


/* Run once on page load */

updateActiveNavigation();


/* =====================================================
   INTERACTIVE SKILLS
===================================================== */

const skillDescriptions = {

    "HTML & CSS":
        "Used for creating and styling responsive web interfaces and portfolio layouts.",

    "JavaScript":
        "Used for adding interactive behaviour, dynamic content, event handling, and frontend functionality.",

    "React.js":
        "Used for building reusable UI components and interactive web application interfaces.",

    "Bootstrap":
        "Used for responsive layouts, UI components, and faster frontend development.",

    "Tailwind CSS":
        "Used for utility-based styling and creating responsive user interfaces.",

    "C#":
        "Used for application development and backend programming with the .NET ecosystem.",

    ".NET MVC":
        "Used for developing web applications following the Model-View-Controller architecture.",

    "SQL":
        "Used for working with relational databases, queries, and application data.",

    "Dapper":
        "Used as a lightweight data access solution for working with databases in .NET applications.",

    "LINQ":
        "Used for querying and working with collections and database-related data in .NET.",

    "AWS":
        "Hands-on learning with AWS cloud infrastructure including compute, networking, storage, and load balancing.",

    "Microsoft Azure":
        "Hands-on learning with Azure networking, storage, virtual machines, load balancing, and cloud infrastructure.",

    "Google Cloud":
        "Hands-on learning with Google Cloud services including Cloud Run, Cloud SQL, Spanner, and cloud infrastructure.",

    "Terraform":
        "Used in cloud learning projects to define and provision infrastructure using Infrastructure as Code.",

    "Jenkins":
        "Used for learning CI/CD automation and pipeline-based software delivery.",

    "Docker":
        "Used for containerization and learning container-based application deployment.",

    "Kubernetes":
        "Used for learning container orchestration, deployments, services, and scalable workloads.",

    "Ansible":
        "Used for learning configuration management and infrastructure automation."

};


function showSkill(skillName) {

    const panel =
        document.getElementById(
            "skillInfoPanel"
        );

    const title =
        document.getElementById(
            "skillInfoTitle"
        );

    const description =
        document.getElementById(
            "skillInfoDescription"
        );


    if (
        !panel ||
        !title ||
        !description
    ) {

        return;

    }


    title.textContent =
        skillName;

    description.textContent =
        skillDescriptions[skillName] ||
        "Technology information will be added soon.";

    panel.classList.add("show");

    panel.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
    });

}


function closeSkill() {

    const panel =
        document.getElementById(
            "skillInfoPanel"
        );

    if (!panel) {
        return;
    }

    panel.classList.remove("show");

}