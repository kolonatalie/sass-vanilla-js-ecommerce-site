export function setupScrollReveal() {

  function handleIntersection(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }

  const observer = new IntersectionObserver(handleIntersection, {
    root: null,
    threshold: 0.05
  });

  const animatedSections = document.querySelectorAll('.fade-in-section');

  animatedSections.forEach(section => {
    observer.observe(section);
  });
}