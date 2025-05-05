import gsap from "gsap";

const wheel = document.querySelector('.text-scroll');
const list = document.querySelector('.list');
const itemHeight = wheel.querySelector('.item').offsetHeight;
const items = gsap.utils.toArray('.item');
const lenItems = items.length;
let centerOffset = (wheel.clientHeight - itemHeight) / 2;
let position = 0;

wheel.querySelectorAll('.item').forEach(i => i.addEventListener('click', handleClick));

document.addEventListener('DOMContentLoaded', () => {
    position = gsap.getProperty(list, 'y');
    while(position <= -itemHeight) {
        list.appendChild(list.firstElementChild);
        position += itemHeight;
    }
    while(position >= itemHeight) {
        list.insertBefore(list.lastElementChild, list.firstElementChild);
        position -= itemHeight;
    }
    gsap.set(list, { y:position });
})

function handleClick(event) {
    const clicked = event.currentTarget;
    const index = items.indexOf(clicked);
    const currentY = position;
    const targetY = currentY - (clicked.offsetTop + currentY - centerOffset);

    gsap.to(items, {
        y: targetY,
        duration: 0.6,
        ease: 'power2.out',
        onComplete: () => {
            position = gsap.getProperty(list, 'y');
            while(position <= -itemHeight) {
                list.appendChild(list.firstElementChild);
                position += itemHeight;
            }
            while(position >= itemHeight) {
                list.insertBefore(list.lastElementChild, list.firstElementChild);
                position -= itemHeight;
            }
            gsap.set(list, { y:position });
        }
    });
}