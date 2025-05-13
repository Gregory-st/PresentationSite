
const template = document.getElementById('card-template');
const container = document.querySelector('.content-spliter');

function renderTemplate(project, container, isStrech) {
    const clone = template.content.cloneNode(true);

    clone.querySelector('.description-card h3').textContent = project.dates;
    clone.querySelector('.description-card h1').textContent = project.title;
    clone.querySelector('.description-card p').textContent = project.description;

    const preview = clone.querySelector('.preview-card');
    project.imageUrls.forEach(element => {
        const img = document.createElement('img');
        img.src = element;
        preview.appendChild(img);
    });

    const header = clone.querySelector('.header-card');
    header.innerHTML = '';
    project.tags.forEach(tag => {
        const h2 = document.createElement('h2');
        h2.textContent = tag;
        header.appendChild(h2);
    })

    if(isStrech) clone.children[0].classList.add('strech');

    container.appendChild(clone);
}

container.innerHTML = '';
let host = window.sessionStorage.getItem('presentation_site_url');
host += '/projects';
fetch(host)
    .then(response => response.json())
    .then(data => {
        let i = 0;
        data.objects.forEach(obj => {
            renderTemplate(obj, container, i % 3 === 0);
            i++;
        });
    })
    .catch(error => console.error(error));