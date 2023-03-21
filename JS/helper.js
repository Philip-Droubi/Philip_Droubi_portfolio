// CRETEAD BY PHILIP DROUBI
import * as Req from './requests.js'
import { User } from './classes/User.js'

let msgBtn = document.querySelector(".Contact .msg-btn");
let subBtn = document.querySelector(".sub .sub-btn");
let loginBtn = document.querySelector('.login-form button');
let msgClicked = false;
let subclicked = false;
let loginClicked = false;

export function setInfo() {
    let date = new Date();
    let personalInfo = document.querySelectorAll('.identity div p');
    let phoneNum = document.querySelector('.phone-l');
    let mail = document.querySelector('.mail-l');
    let age = document.querySelector('.age');
    let copyRight = document.querySelector('footer .copy-right');
    fetch('./data.json')
        .then((response) => response.json())
        .then((data) => {
            personalInfo[0].textContent = data.personal_information.full_name;
            personalInfo[1].textContent = data.personal_information.address;
            personalInfo[2].textContent = data.personal_information.citizenship;
            personalInfo[3].textContent = data.personal_information.date_of_birth;
            personalInfo[4].textContent = data.personal_information.recruitment_state;
            phoneNum.textContent = `${data.phone_num}`;
            mail.textContent = `${data.email}`;
            copyRight.textContent = ` ${date.getFullYear()}`;
            age.textContent = date.getFullYear() - data.personal_information.birth_year;
            addSkills(data.skills);
        });
}

export function contactSpecFunc() {
    let contact_spec = document.querySelector('.contact-spec');
    contact_spec.innerHTML =
        `
        <a href = "#Contact" >
            <P>Liked What I Do?</P>
            <p>Contact Me</p>
        </a>
        `;
    document.body.appendChild(contact_spec);
    let contact_spec_func_Go = setTimeout(function () {
        contact_spec.style.right = 0;
    }, 80000);
}

export function clickOnContactSpec(contact_spec) {
    contact_spec.style.right = '-150px';
    setTimeout(function () {
        contact_spec.remove();
    }, 500);
}

export function showBTT(btt) {
    window.scrollY > 300 ? btt.classList.add('show') : btt.classList.remove('show');
}

export function backToTop() {
    window.scrollTo({
        top: 0
    });
}

export function addSkills(skills) {
    let skills_list = document.querySelector("main .Skills ul");
    skills.forEach(function (el) {
        let li = document.createElement('li');
        let p = document.createElement('p');
        p.innerHTML = el;
        li.appendChild(p);
        for (let i = 0; i < 4; i++) {
            let span = document.createElement('span');
            p.appendChild(span)
        }
        skills_list.appendChild(li);
    });
}

export function LEresize(lt821) {
    var LE = document.querySelector('.LEinner');
    if (window.innerWidth <= 820 && lt821 == false) {
        LE.classList.add('container');
    }
    else if (window.innerWidth > 820 && lt821 == true) {
        LE.classList.remove('container');
    }
};

export function sendMsg(e) {
    e.preventDefault();
    let form = document.querySelector(".message-form");
    if (Req.validateMessageForm(form)) {
        if (!msgClicked) {
            msgClicked = true;
            msgBtn.lastElementChild.innerHTML = "";
            msgBtn.firstElementChild.style.left = "-10%";
            msgBtn.style.backgroundColor = "transparent";
            msgBtn.lastElementChild.classList.add('loading');
            Req.newMsgReq(form)
                .then((data) => {
                    Req.hundleRes(data, form, 4);
                })
                .then(() => {
                    msgClicked = false;
                    msgBtn.lastElementChild.innerHTML = "send !";
                    msgBtn.lastElementChild.classList.remove('loading');
                    msgBtn.firstElementChild.style.left = "-145%";
                    msgBtn.style.backgroundColor = "rgba(140, 136, 155, 0.425)";
                    msgBtn.blur();
                }).catch((error) => {
                    msgClicked = false;
                    msgBtn.lastElementChild.innerHTML = "send !";
                    msgBtn.lastElementChild.classList.remove('loading');
                    msgBtn.firstElementChild.style.left = "-145%";
                    msgBtn.style.backgroundColor = "rgba(140, 136, 155, 0.425)";
                    msgBtn.blur();
                    Req.createNotification('error', `faild to connect`);
                });
        }
    }
}

export function subscribe(e) {
    e.preventDefault();
    let form = document.querySelector(".sub");
    if (Req.validateEmail(form[0])) {
        if (!subclicked) {
            subclicked = true;
            subBtn.firstElementChild.innerHTML = "";
            subBtn.firstElementChild.classList.add('loading');
            Req.newSubReq(document.querySelector('.sub'))
                .then((data) => Req.hundleRes(data, form, 1))
                .then(() => {
                    subclicked = false;
                    subBtn.firstElementChild.innerHTML = "subscribe";
                    subBtn.firstElementChild.classList.remove('loading');
                    subBtn.blur();
                }).catch((error) => {
                    subclicked = false;
                    subBtn.firstElementChild.innerHTML = "subscribe";
                    subBtn.firstElementChild.classList.remove('loading');
                    subBtn.blur();
                    Req.createNotification('error', `faild to connect`);
                })
        }
    }
}

export function login(e) {
    e.preventDefault();
    let form = document.querySelector(".login-form");
    let span = document.querySelector(".login-form button span");
    if (Req.validateloginForm(form)) {
        if (!loginClicked) {
            loginClicked = true;
            loginBtn.lastElementChild.innerHTML = "";
            loginBtn.firstElementChild.style.left = "-10%";
            loginBtn.style.backgroundColor = "transparent";
            loginBtn.lastElementChild.classList.add('loading');
            Req.loginReq(form)
                .then((data) => {
                    Req.hundleRes(data, form, 2);
                    if (data.status == 200) {
                        sessionStorage.setItem('token', data.data.token);
                        creatUser(data.data.user);
                        window.location.pathname = "HTML/Dash.html";
                    }
                })
                .then(() => {
                    loginClicked = false;
                    loginBtn.lastElementChild.innerHTML = "login";
                    loginBtn.lastElementChild.classList.remove('loading');
                    loginBtn.firstElementChild.style.left = "-145%";
                    loginBtn.style.backgroundColor = "rgba(140, 136, 155, 0.425)";
                    loginBtn.blur();
                }).catch((error) => {
                    loginClicked = false;
                    loginBtn.lastElementChild.innerHTML = "login";
                    loginBtn.lastElementChild.classList.remove('loading');
                    loginBtn.firstElementChild.style.left = "-145%";
                    loginBtn.style.backgroundColor = "rgba(140, 136, 155, 0.425)";
                    loginBtn.blur();
                    Req.createNotification('error', `faild to connect`);
                });
        }
    }
}

export function testToken() {
    Req.testToken()
        .then((data) => {
            if (data === 200) {
                window.location.pathname == "/HTML/Dash.html" ? null : window.location.pathname = "/HTML/Dash.html";
            } else {
                window.location.pathname == "/HTML/Dash.html" ? window.location.pathname = "/HTML/Login.html" : null;
                sessionStorage.removeItem('token');
            }
        });
}

function creatUser(user) {
    new User(user.name, user.email, user.id);
    sessionStorage.setItem('userName', user.name);
    sessionStorage.setItem('useremail', user.email);
    sessionStorage.setItem('userid', user.id);
}