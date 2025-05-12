document.addEventListener('DOMContentLoaded', () => {
    if(window.sessionStorage.getItem('presentation_site_url') === null){
        window.sessionStorage.setItem('presentation_site_url', 'http://localhost:8080/presentation.site');
    }
    
});