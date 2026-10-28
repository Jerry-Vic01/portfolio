/* ============================================
   PORTFOLIO PAGE — FILTER & RENDER
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  const grid       = document.getElementById('portfolio-grid');
  const emptyState = document.getElementById('empty-state');
  const filterBtns = document.querySelectorAll('.filter-btn');

  if (!grid || typeof projects === 'undefined') return;

  /* ---------- Counts ---------- */
  const counts = {
    all:          projects.length,
    completed:    projects.filter(p => p.category === 'completed').length,
    'in-progress':projects.filter(p => p.category === 'in-progress').length
  };

  document.getElementById('count-all').textContent       = counts.all;
  document.getElementById('count-completed').textContent = counts.completed;
  document.getElementById('count-progress').textContent  = counts['in-progress'];

  /* ---------- Render ---------- */
  function renderProjects(list) {
    if (!list.length) {
      grid.innerHTML = '';
      emptyState.style.display = 'block';
      return;
    }
    emptyState.style.display = 'none';
    grid.innerHTML = list.map(renderPortfolioCard).join('');

    // Stagger the entrance animation
    document.querySelectorAll('.portfolio-card').forEach((card, i) => {
      card.style.animationDelay = (i * 60) + 'ms';
    });
  }

  /* ---------- Card Template ---------- */
  function renderPortfolioCard(p) {
    const isCompleted = p.category === 'completed';
    const statusClass = isCompleted ? 'completed' : 'in-progress';
    const statusLabel = isCompleted ? 'Completed' : 'In Progress';

    // Generate initials-style thumb text (first letters of title words)
    const initials = p.title
      .split(' ')
      .filter(w => /^[A-Za-z]/.test(w))
      .slice(0, 2)
      .map(w => w[0].toUpperCase())
      .join('');

    const techPills = (p.tech || [])
      .map(t => `<span class="tech-pill">${t}</span>`)
      .join('');

    const linkHtml = p.link && p.link !== '#'
      ? `<a class="portfolio-link" href="${p.link}" target="_blank" rel="noopener">View Project →</a>`
      : `<span class="portfolio-link" style="opacity:0.45;">Coming Soon</span>`;

    return `
      <article class="portfolio-card" data-category="${p.category}">
        <div class="portfolio-thumb">
<img src="${p.image}" alt="${p.title}" class="project-image">        </div>
        <div class="portfolio-body">
          <h3 class="portfolio-title">${p.title}</h3>
          <p class="portfolio-desc">${p.description}</p>
          <div class="portfolio-tech">${techPills}</div>
          ${linkHtml}
        </div>
      </article>
    `;
  }

  /* ---------- Initial Render ---------- */
  renderProjects(projects);

  /* ---------- Filter Handling ---------- */
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      const filtered = filter === 'all'
        ? projects
        : projects.filter(p => p.category === filter);

      renderProjects(filtered);
    });
  });

});