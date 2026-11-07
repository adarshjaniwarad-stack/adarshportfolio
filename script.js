
/* =================================
   LOAD PORTFOLIO DATA
================================= */

document.addEventListener("DOMContentLoaded", loadPortfolio);

async function loadPortfolio() {

    try {

        const response = await fetch("data.json");

        if (!response.ok) {
            throw new Error("Unable to fetch JSON data.");
        }

        const data = await response.json();

        renderPortfolio(data);

        document.getElementById("loading").classList.add("d-none");

        document.getElementById("portfolioContent").classList.remove("d-none");

    } catch (error) {

        console.error("Portfolio loading error:", error);

        document.getElementById("loading").classList.add("d-none");

        document.getElementById("errorMessage").classList.remove("d-none");

    }

}

/* =================================
   RENDER ALL PORTFOLIO CONTENT
================================= */

function renderPortfolio(data) {

    renderPersonalDetails(data.personal);
    renderAbout(data.about);
    renderSkills(data.skills);
    renderProjects(data.projects);
    renderEducation(data.education);
    renderCertifications(data.certifications);
    renderContact(data.personal);
    renderSocials(data.social);
}

/* =================================
   PERSONAL DETAILS
================================= */

function renderPersonalDetails(personal) {

    document.getElementById("brandName").innerHTML =
        `${escapeHTML(personal.name)}<span>.</span>`;

    document.getElementById("studentName").textContent =
        personal.name;

    document.getElementById("studentRole").textContent =
        personal.role;

    document.getElementById("studentIntroduction").textContent =
        personal.introduction;

    document.getElementById("careerGoal").textContent =
        "Career Goal: " + personal.careerGoal;

    document.getElementById("profileImage").src =
        personal.profileImage;

    document.getElementById("profileImage").alt =
        personal.name + " Profile Photo";

    document.getElementById("resumeLink").href =
        personal.resume;

    document.getElementById("footerName").textContent =
        personal.name;

    document.getElementById("copyright").textContent =
        `© ${new Date().getFullYear()} ${personal.name}. All Rights Reserved.`;

    document.getElementById("personalDetails").innerHTML = `
        <div class="col-md-6 detail-item">
            <strong>Email</strong>
            ${escapeHTML(personal.email)}
        </div>

        <div class="col-md-6 detail-item">
            <strong>Phone</strong>
            ${escapeHTML(personal.phone)}
        </div>
    `;
}

/* =================================
   ABOUT SECTION
================================= */

function renderAbout(about) {

    document.getElementById("aboutTitle").textContent =
        about.title;

    document.getElementById("aboutDescription").textContent =
        about.description;

}

/* =================================
   SKILLS SECTION
================================= */

function renderSkills(skills) {

    const container = document.getElementById("skillsContainer");

    container.innerHTML = skills.map(skill => `

        <div class="col-sm-6 col-lg-4">

            <div class="skill-card">

                <div class="skill-icon">
                    <i class="bi ${escapeHTML(skill.icon)}"></i>
                </div>

                <h4>${escapeHTML(skill.name)}</h4>

                <p>${escapeHTML(skill.level)}</p>

                <div class="progress">
                    <div class="progress-bar"
                        style="width: ${getSafePercentage(skill.percentage)}%">
                    </div>
                </div>

            </div>

        </div>

    `).join("");

}

/* =================================
   PROJECTS SECTION
================================= */

function renderProjects(projects) {

    const container = document.getElementById("projectsContainer");

    container.innerHTML = projects.map(project => `

        <div class="col-md-6 col-lg-4">

            <div class="project-card">

                <img src="${escapeHTML(project.image)}"
                    alt="${escapeHTML(project.name)}"
                    loading="lazy">

                <div class="project-content">

                    <h4>${escapeHTML(project.name)}</h4>

                    <p>${escapeHTML(project.description)}</p>

                    <div>
                        ${project.technologies.map(tech => `
                            <span class="tech-badge">
                                ${escapeHTML(tech)}
                            </span>
                        `).join("")}
                    </div>

                    <a href="${safeURL(project.link)}"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="project-link">
                        View Project <i class="bi bi-arrow-up-right"></i>
                    </a>

                </div>

            </div>

        </div>

    `).join("");

}

/* =================================
   EDUCATION SECTION
================================= */

function renderEducation(education) {

    const container = document.getElementById("educationContainer");

    container.innerHTML = education.map(item => `

        <div class="education-card">

            <h4>${escapeHTML(item.course)}</h4>

            <h5>${escapeHTML(item.college)}</h5>

            <p>
                <i class="bi bi-calendar3"></i>
                ${escapeHTML(item.year)}
            </p>

            <p>
                <strong>Semester:</strong>
                ${escapeHTML(item.semester)}
            </p>

            <p>
                <strong>Academic Details:</strong>
                ${escapeHTML(item.details)}
            </p>

        </div>

    `).join("");

}

/* =================================
   CERTIFICATIONS SECTION
================================= */

function renderCertifications(certifications) {

    const container =
        document.getElementById("certificationsContainer");

    container.innerHTML = certifications.map(item => `

        <div class="col-md-6 col-lg-4">

            <div class="certificate-card">

                <i class="bi bi-award-fill"></i>

                <h5>${escapeHTML(item.name)}</h5>

                <p>${escapeHTML(item.provider)}</p>

                <small>${escapeHTML(item.date)}</small>

            </div>

        </div>

    `).join("");

}

/* =================================
   CONTACT DETAILS
================================= */

function renderContact(personal) {

    document.getElementById("contactDetails").innerHTML = `

        <div class="contact-detail">
            <i class="bi bi-envelope"></i>
            ${escapeHTML(personal.email)}
        </div>

        <div class="contact-detail">
            <i class="bi bi-telephone"></i>
            ${escapeHTML(personal.phone)}
        </div>

    `;

}

/* =================================
   SOCIAL MEDIA LINKS
================================= */

function renderSocials(social) {

    const icons = {
        github: "bi-github",
        linkedin: "bi-linkedin",
        instagram: "bi-instagram",
        twitter: "bi-twitter-x"
    };

    let html = "";

    Object.keys(social).forEach(platform => {

        if (!icons[platform]) return;

        const url = safeURL(social[platform]);

        if (url === "#") return;

        html += `
            <a href="${url}"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="${escapeHTML(platform)}">

                <i class="bi ${icons[platform]}"></i>

            </a>
        `;

    });

    document.getElementById("heroSocials").innerHTML = html;
    document.getElementById("footerSocials").innerHTML = html;

}

/* =================================
   CONTACT FORM VALIDATION
================================= */

document.getElementById("contactForm").addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        const name = document.getElementById("contactName").value.trim();

        const email = document.getElementById("contactEmail").value.trim();

        const subject = document.getElementById("contactSubject").value.trim();

        const message = document.getElementById("contactMessage").value.trim();

        const formMessage = document.getElementById("formMessage");

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        formMessage.className = "";

        if (!name || !email || !subject || !message) {

            showFormMessage("Please fill in all fields.", "danger");
            return;

        }

        if (!emailPattern.test(email)) {

            showFormMessage("Please enter a valid email address.", "danger");
            return;

        }

        showFormMessage(
            "Validation successful! The form is ready to connect to an email service.",
            "success"
        );

        this.reset();

    }
);

/* =================================
   FORM MESSAGE
================================= */

function showFormMessage(message, type) {

    const formMessage = document.getElementById("formMessage");

    formMessage.className = `alert alert-${type} mt-3`;

    formMessage.textContent = message;

}

/* =================================
   HELPER FUNCTIONS
================================= */

function escapeHTML(value) {

    return String(value ?? "").replace(/[&<>"']/g, character => {

        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

        return entities[character];

    });

}

function getSafePercentage(value) {

    const number = Number(value);

    if (!Number.isFinite(number)) return 0;

    return Math.max(0, Math.min(100, number));

}

function safeURL(value) {

    try {

        const url = new URL(value);

        if (url.protocol === "https:" || url.protocol === "http:") {
            return url.href;
        }

    } catch (error) {

        console.warn("Invalid URL:", value);

    }

    return "#";

}
