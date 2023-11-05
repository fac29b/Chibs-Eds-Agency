document.addEventListener('DOMContentLoaded', function () {
    document.body.addEventListener('click', function (e) {
        if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const targetId = e.target.getAttribute('href');
            const targetPosition = document.querySelector(targetId).offsetTop;
            window.scroll({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});