document.addEventListener('DOMContentLoaded', () => {
    const selects = document.querySelectorAll('.select');

    selects.forEach((select, index) => {
        const arrowDown = document.querySelector(`.arrow-down-${index + 1}`);
        const arrowUp = document.querySelector(`.arrow-up-${index + 1}`);

        // Handle focus event
        select.addEventListener('focus', () => {
            arrowDown.style.display = 'none';
            arrowUp.style.display = 'block';
        });

        // Handle blur event
        select.addEventListener('blur', () => {
            arrowDown.style.display = 'block';
            arrowUp.style.display = 'none';
        });

        // Handle change event
        select.addEventListener('change', () => {
            arrowDown.style.display = 'block';
            arrowUp.style.display = 'none';
        });

        // Handle click event to ensure up arrow appears on click
        select.addEventListener('click', () => {
            arrowDown.style.display = 'none';
            arrowUp.style.display = 'block';
        });
    });
});
