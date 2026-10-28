// Mobile nav toggle
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.nav-links');
  if (toggle) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
  }

  // Render tech stack
  const techGrid = document.querySelector('#tech-grid');
  if (techGrid) {
    const techs = [
      'HTML', 'CSS', 'JavaScript', 'PHP',
      'AJAX', 'MySQL', 'jQuery', 'Bootstrap',
      'GitHub', 'cPanel'
    ];
    techGrid.innerHTML = techs.map(t => `
      <div class="tech-item">
        <span class="dot"></span>
        ${t}
      </div>
    `).join('');
  }

  // Render featured projects on home
  const featuredGrid = document.querySelector('#featured-grid');
  if (featuredGrid && typeof projects !== 'undefined') {
    const featured = projects.filter(p => p.featured);
    featuredGrid.innerHTML = featured.map(renderProjectCard).join('');
  }
});

// Reusable project card renderer
function renderProjectCard(p) {
  const tagClass = p.category === 'completed' ? 'completed' : 'progress';
  const tagLabel = p.category === 'completed' ? 'Completed' : 'In Progress';
  return `
    <article class="card project-card">
      <div class="project-thumb"><img src="${p.image}" alt="${p.title}" class="project-image"></div>
      <div class="project-body">
        <h3 class="project-title">${p.title}</h3>
        <p class="project-desc">${p.description}</p>
        <span class="tag ${tagClass}">${tagLabel}</span>
      </div>
    </article>
  `;
}