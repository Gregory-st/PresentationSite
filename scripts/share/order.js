import { validateDataElements } from "./validation";

const sendButton = document.getElementById('send');

sendButton.addEventListener('click', (event) => {
    event.preventDefault();

    const checkedRadio = document.querySelector('input[name="radio-group1"]:checked');
    const quistionDescription = document.getElementById('quistion-desk');
    const personEmail = document.getElementById('person-email');
    const personName = document.getElementById('person-name');
    const personTel = document.getElementById('person-tel');

    if(!validateDataElements(
        [quistionDescription, personEmail, personName, personTel]
    )){
        return;
    }

    let url = window.sessionStorage.getItem('presentation_site_url');
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'name': personName.value,
            'phone': personTel.value,
            'price': checkedRadio.value,
            'email': personEmail.value,
            'description': quistionDescription.value
        })
    })
    .then(response => response.json())
    .then(data => {
        if(!data.success) throw new Error(data.message);
        personTel.value = '';
        personName.value = '';
        personEmail.value = '';
        quistionDescription.value = '';
        alert(data.message);
    })
    .catch(error => console.error(error));
})