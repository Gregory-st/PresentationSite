export async function loaded() {
    let url = window.sessionStorage.getItem('presentation_site_url');
    url += '/services';
    
    const list = document.querySelector('.list');
    function renderElement(elements) {
        elements.forEach(element => {
            const h1 = document.createElement('h1');
            h1.textContent = element.title;
            h1.classList.add('item');
            h1.dataset.desc = element.description;
    
            list.appendChild(h1);
        });
    }
    
    return fetch(url)
        .then(response => response.json())
        .then(data => {
            if(!data.success) throw new Error(data.message);
            renderElement(data.objects);
        })
        .catch(error => console.error(error));
}