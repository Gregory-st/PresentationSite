document.addEventListener('DOMContentLoaded', () => {
    if(window.sessionStorage.getItem('presentation_site_url') === null){
        window.sessionStorage.setItem('presentation_site_url', 'https://serverpresentation.onrender.com/presentation.site');
    }
    
});
