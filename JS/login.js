// CRETEAD BY PHILIP DROUBI
import * as helper from './helper.js'

const eye = document.querySelector('.eye');
const passinput = document.querySelector('#pass');
const i = document.querySelector('.password i');

eye.addEventListener('click', () => {
    passinput.type === 'password' ? passinput.type = 'text' : passinput.type = 'password';
    if (i.classList.contains('fa-eye')) {
        i.classList.remove('fa-eye');
        i.classList.add('fa-eye-slash');
    } else {
        i.classList.add('fa-eye');
        i.classList.remove('fa-eye-slash');
    }
});

let msgBtn = document.querySelector(".msg-btn");
msgBtn.addEventListener("click", async (e) => helper.login(e));
