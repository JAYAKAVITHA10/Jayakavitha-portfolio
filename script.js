/* =====================================================
   MOBILE MENU
===================================================== */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("show");

});


/* Close mobile menu when a link is clicked */

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("show");

    });

});


/* =====================================================
   DARK / LIGHT MODE
===================================================== */

const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {

        themeToggle.textContent = "☀️";

    } else {

        themeToggle.textContent = "🌙";

    }

});


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

    const currentWord = words[wordIndex];

    if (!deleting) {

        typingElement.textContent =
            currentWord.substring(
                0,
                characterIndex + 1
            );

        characterIndex++;

        if (characterIndex === currentWord.length) {

            deleting = true;

            setTimeout(typeEffect, 1500);

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

            if (wordIndex === words.length) {
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


/* =====================================================
   PROJECT FILTER
===================================================== */

const filterButtons =
    document.querySelectorAll(".filter-btn");

const projectCards =
    document.querySelectorAll(".project-card");


filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const filter =
            button.getAttribute("data-filter");

        projectCards.forEach(card => {

            const category =
                card.getAttribute("data-category");

            if (
                filter === "all" ||
                category === filter
            ) {

                card.classList.remove("hide");

            } else {

                card.classList.add("hide");

            }

        });

    });

});


/* =====================================================
   CONTACT FORM
===================================================== */

const contactForm =
    document.getElementById("contactForm");

const formMessage =
    document.getElementById("formMessage");


contactForm.addEventListener("submit", (event) => {

    event.preventDefault();

    formMessage.textContent =
        "Thank you! Your message has been received.";

    contactForm.reset();

});


/* =====================================================
   CURRENT YEAR
===================================================== */

document.getElementById("year").textContent =
    new Date().getFullYear();


/* =====================================================
   SCROLL TO TOP
===================================================== */

const scrollTop =
    document.getElementById("scrollTop");


window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        scrollTop.classList.add("show");

    } else {

        scrollTop.classList.remove("show");

    }

});


scrollTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});

/* =====================================================
   STEP 2 - SCROLL PROGRESS
===================================================== */

const scrollProgress =
    document.getElementById("scrollProgress");

const header =
    document.querySelector(".header");


function updateScrollProgress() {

    const scrollTop =
        window.scrollY;

    const documentHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const scrollPercentage =
        (scrollTop / documentHeight) * 100;

    scrollProgress.style.width =
        `${scrollPercentage}%`;


    /* Add shadow to navbar */

    if (scrollTop > 20) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}


window.addEventListener(
    "scroll",
    updateScrollProgress
);


/* Run once when page loads */

updateScrollProgress();


/* =====================================================
   STEP 2 - ACTIVE NAVIGATION
===================================================== */

const sections =
    document.querySelectorAll("main section[id]");

const navigationLinks =
    document.querySelectorAll(".nav-link");


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

            currentSection = sectionId;

        }

    });


    navigationLinks.forEach(link => {

        link.classList.remove("active");


        const target =
            link.getAttribute("href");


        if (target === `#${currentSection}`) {

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
   PROJECT DETAILS MODAL
===================================================== */


/* Project information */

const projectDetails = {

    1: {
        number: "PROJECT 01",
        title: "AWS Cloud Infrastructure",

        description:
            "Designed and documented a cloud infrastructure setup using AWS services and Terraform. The project focused on networking, compute resources, load balancing and infrastructure as code.",

        technologies: [
            "AWS",
            "Terraform",
            "VPC",
            "EC2",
            "ALB",
            "S3"
        ],

        work: [
            "Created and configured a VPC-based cloud infrastructure.",
            "Worked with public and private subnet concepts.",
            "Configured EC2 instances for application infrastructure.",
            "Worked with Application Load Balancer concepts.",
            "Used Terraform for infrastructure as code.",
            "Documented the complete infrastructure setup."
        ]
    },


    2: {
        number: "PROJECT 02",
        title: "Scalable Ticket Platform",

        description:
            "A cloud architecture prototype focused on building a scalable ticketing platform using Google Cloud services.",

        technologies: [
            "Google Cloud",
            "Cloud Run",
            "Cloud SQL",
            "Spanner",
            "Cloud Storage"
        ],

        work: [
            "Designed a scalable cloud architecture.",
            "Worked with Cloud Run for application deployment.",
            "Configured Cloud SQL for relational database requirements.",
            "Explored Spanner for scalable database workloads.",
            "Worked with Google Cloud infrastructure concepts.",
            "Documented the architecture and deployment process."
        ]
    },


    3: {
        number: "PROJECT 03",
        title: "Azure Infrastructure",

        description:
            "A cloud infrastructure project focused on Azure networking, virtual networks, peering, load balancing and storage concepts.",

        technologies: [
            "Microsoft Azure",
            "VNet",
            "VNet Peering",
            "Load Balancer",
            "Storage",
            "Availability Sets"
        ],

        work: [
            "Created and configured Azure virtual networks.",
            "Worked with VNet peering concepts.",
            "Configured availability and infrastructure components.",
            "Worked with Azure Load Balancer concepts.",
            "Explored Azure Storage configurations.",
            "Documented the Azure infrastructure design."
        ]
    },


    4: {
        number: "PROJECT 04",
        title: "CI/CD Pipeline",

        description:
            "A DevOps learning project focused on automated application build, containerization and deployment using commonly used DevOps tools.",

        technologies: [
            "Jenkins",
            "Docker",
            "Git",
            "Kubernetes",
            "CI/CD"
        ],

        work: [
            "Created a basic CI/CD workflow.",
            "Worked with Jenkins pipeline concepts.",
            "Containerized applications using Docker.",
            "Worked with Git-based source control.",
            "Explored Kubernetes deployment concepts.",
            "Documented the build and deployment workflow."
        ]
    },


    5: {
        number: "PROJECT 05",
        title: "Responsive Web Applications",

        description:
            "Worked on responsive web development using reusable frontend components, JavaScript and API integration.",

        technologies: [
            "React.js",
            "JavaScript",
            "HTML",
            "CSS",
            "REST APIs"
        ],

        work: [
            "Developed reusable frontend components.",
            "Created responsive web interfaces.",
            "Integrated APIs with web applications.",
            "Worked with JavaScript-based interactions.",
            "Focused on clean and responsive layouts.",
            "Worked with frontend development practices."
        ]
    },


    6: {
        number: "PROJECT 06",
        title: "Document Automation",

        description:
            "Worked on document automation and workflow-based solutions designed to simplify business processes and document-related tasks.",

        technologies: [
            "C#",
            ".NET",
            "APIs",
            "Document Automation",
            "Workflow Automation"
        ],

        work: [
            "Worked on document automation solutions.",
            "Supported workflow-based business processes.",
            "Worked with C# and .NET technologies.",
            "Integrated APIs with application workflows.",
            "Worked with document-based solutions.",
            "Supported reusable and automated processes."
        ]
    }

};


/* Open project */

function openProject(projectNumber) {

    const project = projectDetails[projectNumber];

    if (!project) {
        return;
    }


    /* Get modal elements */

    const modal =
        document.getElementById("projectModal");

    const modalNumber =
        document.getElementById("modalNumber");

    const modalTitle =
        document.getElementById("modalTitle");

    const modalDescription =
        document.getElementById("modalDescription");

    const modalTech =
        document.getElementById("modalTech");

    const modalWork =
        document.getElementById("modalWork");


    /* Add project information */

    modalNumber.textContent =
        project.number;

    modalTitle.textContent =
        project.title;

    modalDescription.textContent =
        project.description;


    /* Technologies */

    modalTech.innerHTML = "";

    project.technologies.forEach(technology => {

        const tech =
            document.createElement("span");

        tech.textContent =
            technology;

        modalTech.appendChild(tech);

    });


    /* Work */

    modalWork.innerHTML = "";

    project.work.forEach(item => {

        const listItem =
            document.createElement("li");

        listItem.textContent =
            item;

        modalWork.appendChild(listItem);

    });


    /* Show modal */

    modal.classList.add("show");

    /* Prevent page scrolling */

    document.body.style.overflow = "hidden";
}


/* Close project */

function closeProject() {

    const modal =
        document.getElementById("projectModal");

    modal.classList.remove("show");

    /* Allow page scrolling again */

    document.body.style.overflow = "";
}


/* Close when clicking outside the box */

document.addEventListener("click", (event) => {

    const modal =
        document.getElementById("projectModal");

    if (event.target === modal) {

        closeProject();

    }

});


/* Close with Escape key */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        closeProject();

    }

});

/* ================= INTERACTIVE SKILLS ================= */

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

    const panel = document.getElementById("skillInfoPanel");
    const title = document.getElementById("skillInfoTitle");
    const description = document.getElementById("skillInfoDescription");

    if (!panel || !title || !description) {
        return;
    }

    title.textContent = skillName;

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

    const panel = document.getElementById("skillInfoPanel");

    if (!panel) {
        return;
    }

    panel.classList.remove("show");
}