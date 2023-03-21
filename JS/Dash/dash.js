//CREATED BY PHILIP DROUBI
import { User } from '../classes/User.js';
import * as helper from '../helper.js'
import * as dhelper from './dashHelper.js'

//INIT
helper.testToken();
document.querySelector('nav .name').textContent = `${sessionStorage.getItem('userName')}`;

//Left Side Nav
let navBtns = document.querySelectorAll('.dashMain section ul li button');
let pageName = 'statistics';
dhelper.getPage(pageName);

navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        navBtns.forEach(e => {
            e.classList.remove('active');
        });
        btn.classList.add('active');
        pageName = btn.id;
        dhelper.getPage(pageName);
    });
});
// End Left Side Nav