const partners = document.querySelector('.icon-container');
partners.innerHTML = '';
function renderIncons(partner) {
    const img = document.createElement('img');

    img.src = partner.url;
    img.alt = partner.name;
    
    partners.appendChild(img);
}

let url = window.sessionStorage.getItem('presentation_site_url');
url += '/partners';
fetch(url)
    .then(response => response.json())
    .then(data => {
        if(!data.success) throw new Error(data.message);

        data.objects.forEach(obj => {
            renderIncons(obj);
        });
    })
    .catch(error => console.error(error));