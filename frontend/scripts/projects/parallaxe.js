window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    document.querySelectorAll('.parallaxe').forEach(el => {
        const speed = parseFloat(el.dataset.speed);
        el.style.top = `${scrolled * speed}px`;
    });
});