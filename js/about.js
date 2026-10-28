// Animate skill bars when they scroll into view
document.addEventListener('DOMContentLoaded', () => {
  const fills = document.querySelectorAll('.skill-fill');
  if (!fills.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const level = el.getAttribute('data-level') || 0;
        // Small delay for a smoother feel
        setTimeout(() => { el.style.width = level + '%'; }, 150);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  fills.forEach(el => observer.observe(el));
});