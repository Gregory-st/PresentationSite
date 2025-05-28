let url = window.sessionStorage.getItem('presentation_site_url');
url += '/contacts';

const info = document.querySelector('.info-contact');
const link = document.querySelector('.links-contact');
info.innerHTML = '';
link.innerHTML = '';

function renderContact(element) {
    const h2 = document.createElement('h2');
    const p = document.createElement('p');

    h2.textContent = `${element.firstname} ${element.name}`;
    p.textContent = 'Испольняющий директор';
    info.appendChild(h2);
    info.appendChild(p);

    for(let i = 0; i < element.urls[0].length; i++) {
        const a = document.createElement('a');
        a.textContent = element.urls[0][i];
        a.href = element.urls[1][i];
        info.appendChild(a);
    }

    const h3 = document.createElement('h3');
    const a1 = document.createElement('a');
    const a2 = document.createElement('a');

    h3.textContent='Для связи';
    a1.href = `tel:${element.phone}`;
    a1.textContent = element.phone;
    a2.href = `mailto:${element.email}`;
    a2.textContent = element.email;

    link.appendChild(h3);
    link.appendChild(a1);
    link.appendChild(a2);
}

fetch(url)
    .then(response => response.json())
    .then(data => {
        if(!data.success) throw new Error(data.message);
        renderContact(data.entity);
    })
    .catch(error => console.error(error));