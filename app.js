const escapeHTML = (value) => String(value).replace(/[&<>"']/g, (character) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
})[character]);

function renderJourney(experience) {
  return experience.map((job) => `
    <article class="journey-stop">
      <div class="stop-meta"><span class="stop-dot" aria-hidden="true"></span><span class="mono">${escapeHTML(job.period)}</span><span class="stop-rule"></span></div>
      <div class="stop-content">
        <div class="stop-title"><div><h3>${escapeHTML(job.role)}</h3><div class="company-line">${escapeHTML(job.company)}${job.product ? ` <span>· ${escapeHTML(job.product)}</span>` : ""}</div></div><span class="location-tag">${escapeHTML(job.location)}</span></div>
        <p class="stop-story">${escapeHTML(job.story)}</p>
        <ul class="highlight-list">${job.highlights.map((highlight) => `<li>${escapeHTML(highlight)}</li>`).join("")}</ul>
      </div>
    </article>
  `).join("");
}

function renderProject(project) {
  const steps = project.visual === "orders"
    ? ["Incoming email", "Review & validate", "Purchase order"]
    : ["Admin panel", "Blogs & events", "Public website"];
  const visual = `<div class="project-diagram"><span class="mono">${escapeHTML(project.name)} / WORKFLOW</span><ol>${steps.map(step => `<li>${escapeHTML(step)}</li>`).join("")}</ol><p>Workflow illustration</p></div>`;
  return `
    <article class="project-card">
      <div class="project-art project-art-${escapeHTML(project.visual)}">${visual}<span class="project-number mono">PROJECT ${escapeHTML(project.number)}</span></div>
      <div class="project-copy">
        <div class="project-type mono">${escapeHTML(project.type)}</div>
        <h3>${escapeHTML(project.name)}</h3>
        <div class="project-role">${escapeHTML(project.role)}</div>
        <p class="project-description">${escapeHTML(project.description)}</p>
        <p class="project-story">${escapeHTML(project.story)}</p>
        <ul class="project-details">${project.details.map((detail) => `<li>${escapeHTML(detail)}</li>`).join("")}</ul>
        <div class="project-stack">${project.stack.map((item) => `<span>${escapeHTML(item)}</span>`).join("")}</div>
      </div>
    </article>
  `;
}

function renderSkills(groups) {
  return groups.map((group, index) => `
    <article class="skill-group">
      <div class="skill-heading"><span class="skill-index mono">0${index + 1}</span><h3>${escapeHTML(group.category)}</h3></div>
      <div class="skill-chips">${group.skills.map((skill) => `<span class="skill-chip">${escapeHTML(skill)}</span>`).join("")}</div>
    </article>
  `).join("");
}

async function loadPortfolio() {
  const response = await fetch("data.json");
  if (!response.ok) throw new Error(`Could not load portfolio content (${response.status}).`);
  const data = await response.json();

  document.title = `${data.profile.name} — Frontend developer`;
  document.querySelector("#hero-location").textContent = `${data.profile.availability.toUpperCase()}`;
  document.querySelector("#hero-intro").textContent = data.profile.intro;
  document.querySelector("#footer-location").textContent = data.profile.location.toUpperCase();
  document.querySelector("#contact-email").href = `mailto:${data.profile.email}`;
  document.querySelector("#contact-email > span:first-child").textContent = data.profile.email;
  const phoneLink = document.querySelector("#phone-link");
  phoneLink.href = `tel:${data.profile.phone.replace(/[^\d+]/g, "")}`;
  phoneLink.textContent = data.profile.phone;
  document.querySelector("#copyright-year").textContent = `© ${new Date().getFullYear()} DEVRAJ`;
  document.querySelector("#journey-list").innerHTML = renderJourney(data.experience);
  document.querySelector("#projects-grid").innerHTML = data.projects.map(renderProject).join("");
  document.querySelector("#skill-groups").innerHTML = renderSkills(data.skills);

}

loadPortfolio().catch((error) => {
  console.error("Portfolio content failed to load:", error);
  const notice = document.createElement("p");
  notice.className = "load-error";
  notice.textContent = "The portfolio content couldn’t be loaded. Please try again.";
  document.body.append(notice);
});
