// CRETEAD BY PHILIP DROUBI
import * as Req from './requests.js'

let msgBtn = document.querySelector(".Contact .msg-btn");
let subBtn = document.querySelector(".sub .sub-btn");
let msgClicked = false;
let subclicked = false;

export function setInfo(data) {
    let date = new Date();
    let personalInfo = document.querySelectorAll('.identity div p');
    let phoneNum = document.querySelector('.phone-l');
    let mail = document.querySelector('.mail-l');
    let age = document.querySelector('.age');
    let copyRight = document.querySelector('footer .copy-right');
    personalInfo[0].textContent = data.personal_information.full_name;
    personalInfo[1].textContent = data.personal_information.address;
    personalInfo[2].textContent = data.personal_information.citizenship;
    personalInfo[3].textContent = data.personal_information.date_of_birth;
    personalInfo[4].textContent = data.personal_information.recruitment_state;
    phoneNum.textContent = `${data.phone_num}`;
    mail.textContent = `${data.email}`;
    copyRight.textContent = ` ${date.getFullYear()}`;
    age.textContent = date.getFullYear() - data.personal_information.birth_year;
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
    }, 500);
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
    let form = document.querySelector(".message-form")
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
                }).catch((error) => {
                    msgClicked = false;
                    msgBtn.lastElementChild.innerHTML = "send !";
                    msgBtn.lastElementChild.classList.remove('loading');
                    msgBtn.firstElementChild.style.left = "-145%";
                    msgBtn.style.backgroundColor = "rgba(140, 136, 155, 0.425)";
                    Req.createNotification('error', `faild to connect`);
                })
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
                }).catch((error) => {
                    subclicked = false;
                    subBtn.firstElementChild.innerHTML = "subscribe";
                    subBtn.firstElementChild.classList.remove('loading');
                    Req.createNotification('error', `faild to connect`);
                })
        }
    }
}