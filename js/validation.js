

const form = document.querySelector('form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

nameInput.addEventListener('input', validateName);
emailInput.addEventListener('input', validateEmail);
messageInput.addEventListener('input', validateMessage);

form.addEventListener('submit', (event) => {
    event.preventDefault();
    validateName();
    validateEmail();
    validateMessage();
});

function validateName() {
    const name = nameInput.value.trim();
    const validationMessage = document.getElementById('one');
    if (name === '') {
        validationMessage.textContent = 'Name field cannot be empty';
        return false;
    } else {
        validationMessage.textContent = '';
        return true;
    }
}

function validateEmail() {
    const email = emailInput.value.trim();
    const validationMessage = document.getElementById('two');
    if (email === '') {
        validationMessage.textContent = 'Please enter your Email';
    } else if (!isValidEmail(email)) {
        validationMessage.textContent = 'Invalid email format';
        return false;
    } else {
        validationMessage.textContent = '';
        return true;
    }
}

function isValidEmail(email) {
    // Simple email format validation using regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);

}

function validateMessage() {
    const message = messageInput.value.trim();
    const validationMessage = document.getElementById('three');
    if (message === '') {
        validationMessage.textContent = 'Enter your message';
        return false;
    } else {
        validationMessage.textContent = '';
        return true;
    }
}


const scriptURL = 'https://script.google.com/macros/s/AKfycbw_baoxye5VvpHOFii56NjybmV6JhlJ9BBoREJeZtvFH_We70cYeGBcr3y3kqIdaU0oDA/exec';

form.addEventListener('submit', e => {
    e.preventDefault();
    const isValid = validateName();
    const emailValid = validateEmail();                                // Call validateForm() once and store the result.
    const messageValid = validateMessage();                                 // Call validateForm() once and store the result.
    if (isValid && emailValid && messageValid) {

        fetch(scriptURL, { method: 'POST', body: new FormData(form) })
            .then(response => {
                alert('Sent successfully')
                form.reset();
                validationMessage.innerHTML = ''
            })
            .catch(error => console.error('Error!', error.message));
    }
    else {
        alert('Fill all fields');
    }
});