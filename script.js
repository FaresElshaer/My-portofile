```javascript
/* =========================
   CONFIGURATION
========================= */

const githubUsername = "FaresElshaer";


/* =========================
   MOBILE MENU
========================= */

const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");

menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("show");

    const icon = menuBtn.querySelector("i");

    if (navLinks.classList.contains("show")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");
    } else {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
    }

});


/* Close menu after clicking a link */

document.querySelectorAll(".nav-link").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("show");

        const icon = menuBtn.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});


/* =========================
   DARK / LIGHT MODE
========================= */

const themeBtn = document.getElementById("theme-btn");

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("light");

    const icon = themeBtn.querySelector("i");

    if (document.body.classList.contains("light")) {

        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");

        localStorage.setItem("theme", "light");

    } else {

        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");

        localStorage.setItem("theme", "dark");

    }

});


/* Load saved theme */

if (localStorage.getItem("theme") === "light") {

    document.body.classList.add("light");

    const icon = themeBtn.querySelector("i");

    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");

}


/* =========================
   TYPING EFFECT
========================= */

const typingElement = document.getElementById("typing");

const roles = [
    ".NET Backend Developer",
    "C# Developer",
    "ASP.NET Core Developer",
    "Computer Science Student"
];

let roleIndex = 0;
let characterIndex = 0;
let deleting = false;


function typeEffect() {

    const currentRole = roles[roleIndex];

    if (!deleting) {

        typingElement.textContent =
            currentRole.substring(0, characterIndex + 1);

        characterIndex++;

        if (characterIndex === currentRole.length) {

            deleting = true;

            setTimeout(typeEffect, 1500);

            return;
        }

    } else {

        typingElement.textContent =
            currentRole.substring(0, characterIndex - 1);

        characterIndex--;

        if (characterIndex === 0) {

            deleting = false;

            roleIndex++;

            if (roleIndex >= roles.length) {
                roleIndex = 0;
            }

        }

    }

    setTimeout(typeEffect, deleting ? 50 : 90);
}

typeEffect();


/* =========================
   HTML ESCAPE
========================= */

function escapeHTML(value) {

    return String(value).replace(/[&<>"']/g, character => {

        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        };

        return entities[character];

    });

}


/* =========================
   GITHUB PROJECTS
========================= */

const projectsContainer =
    document.getElementById("projects-container");


async function loadGithubProjects() {

    try {

        const response = await fetch(
            `https://api.github.com/users/${githubUsername}/repos?sort=updated&direction=desc&per_page=100`
        );

        if (!response.ok) {
            throw new Error("Unable to fetch GitHub repositories.");
        }

        const repositories = await response.json();


        /*
            Remove forks and the profile repository.

            If you want to display everything,
            remove these filters.
        */

        const projects = repositories
            .filter(repo => !repo.fork)
            .filter(repo => repo.name !== githubUsername);


        if (projects.length === 0) {

            projectsContainer.innerHTML = `
                <div class="loading">
                    No public projects found.
                </div>
            `;

            return;
        }


        projectsContainer.innerHTML = projects.map(repo => {

            const description =
                repo.description ||
                "No description available.";

            const language =
                repo.language ||
                "Project";


            return `

                <article class="project-card">

                    <div class="project-header">

                        <div class="project-icon">

                            <i class="fa-brands fa-github"></i>

                        </div>

                        <span class="project-language">

                            ${escapeHTML(language)}

                        </span>

                    </div>


                    <h3>
                        ${escapeHTML(repo.name)}
                    </h3>


                    <p>
                        ${escapeHTML(description)}
                    </p>


                    <div class="project-meta">

                        <span>
                            <i class="fa-solid fa-star"></i>
                            ${repo.stargazers_count}
                        </span>

                        <span>
                            <i class="fa-solid fa-code-fork"></i>
                            ${repo.forks_count}
                        </span>

                        <span>
                            <i class="fa-solid fa-code-branch"></i>
                            ${repo.default_branch}
                        </span>

                    </div>


                    <a
                        href="${repo.html_url}"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="project-link">

                        View on GitHub

                        <i class="fa-solid fa-arrow-up-right-from-square"></i>

                    </a>

                </article>

            `;

        }).join("");


    } catch (error) {

        console.error(error);

        projectsContainer.innerHTML = `

            <div class="loading">

                <i class="fa-solid fa-triangle-exclamation"></i>

                Unable to load GitHub projects.

                <br>

                <a
                    href="https://github.com/${githubUsername}"
                    target="_blank"
                    class="project-link">

                    Open GitHub Profile

                </a>

            </div>

        `;

    }

}


loadGithubProjects();


/* =========================
   CONTACT FORM
========================= */

const contactForm =
    document.getElementById("contact-form");


contactForm.addEventListener("submit", event => {

    event.preventDefault();

    const name =
        document.getElementById("name").value;

    alert(
        `Thanks ${name}! Your message form is ready to be connected to a backend/email service.`
    );

    contactForm.reset();

});


/* =========================
   ACTIVE NAVIGATION
========================= */

const sections =
    document.querySelectorAll("section");

const navItems =
    document.querySelectorAll(".nav-link");


window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 120;

        if (window.scrollY >= sectionTop) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navItems.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            `#${currentSection}`
        ) {

            link.classList.add("active");

        }

    });

});

