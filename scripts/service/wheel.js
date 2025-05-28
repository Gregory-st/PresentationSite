import gsap from "gsap";
import { loaded } from "./service-get";

const wheel = document.querySelector('.text-scroll');
let list = null;
let itemHeight = wheel.querySelector('.item').offsetHeight;
let items = gsap.utils.toArray('.item');
let position = 0;
let centerOffset = (wheel.clientHeight - itemHeight) / 2;
let lenItems = items.length;

loaded()
.then(() => {
    list = document.querySelector('.list');
    items = gsap.utils.toArray('.item');
    itemHeight = wheel.querySelector('.item').offsetHeight;
    centerOffset = (wheel.clientHeight - itemHeight) / 2;
    lenItems = items.length;
    
    wheel.querySelectorAll('.item').forEach(i => i.addEventListener('click', handleClick));
    const id = Math.round(items.length / 2);
    document.querySelector('#desc-service').textContent = items[id].dataset.desc;
    
    position = gsap.getProperty(list, 'y');
    gsap.set(list, { y:position });
});

function handleClick(event) {
    const clicked = event.currentTarget;
    const currentY = position;
    const targetY = currentY - (clicked.offsetTop + currentY - centerOffset);
    document.querySelector('#desc-service').textContent = clicked.dataset.desc;

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