import { validateDataElements } from "./validation";

const sendButton = document.getElementById('send');
const personTel = document.getElementById('person-tel');
const personEmail = document.getElementById('person-email');

personTel.addEventListener('input', () => {
    // Убираем всё, кроме цифр
    let numbers = personTel.value.replace(/\D/g, '');
    // Добавляем первый плюс и семёрку, если пользователь не ввёл их сам
    if (numbers.startsWith('7')) {
      numbers = '+7' + numbers.slice(1);
    } else if (!numbers.startsWith('+7')) {
      numbers = '+7' + numbers;
    }
    // Форматируем по маске +7 (XXX) XXX-XX-XX
    const match = numbers.match(/^\+7(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})$/);
    if (match) {
      let formatted = '+7';
      if (match[1]) formatted += ' (' + match[1];
      if (match[1] && match[1].length === 3) formatted += ')';
      if (match[2]) formatted += ' ' + match[2];
      if (match[3]) formatted += '-' + match[3];
      if (match[4]) formatted += '-' + match[4];
      personTel.value = formatted;
    }
});

sendButton.addEventListener('click', (event) => {
    event.preventDefault();

    const checkedRadio = document.querySelector('input[name="radio-group1"]:checked');
    const quistionDescription = document.getElementById('quistion-desk');
    const personName = document.getElementById('person-name');
    
    if(!validateDataElements(
        [quistionDescription, personEmail, personName, personTel]
    )){
        alert('Не указаны данные');
        return;
    }
    
    if(checkedRadio === null) {
        alert('Не выбран бюджет');
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