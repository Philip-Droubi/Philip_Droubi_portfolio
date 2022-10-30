// CRETEAD BY PHILIP DROUBI
const k = 'o8teoSL8FW1evoKylF9polLStF5SXB9MMsTcbUark16IKEUSMHQBpfuGfoQmaWHN';
const url = 'http://192.168.43.113:8000/api';

async function newVisit() {
    try {
        const req = await fetch(`${url}/visit`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'X-Api-Key': k
            }
        });
        return req.json();
    } catch (e) {
        console.error(e);
    }
}


/* Special Contact */
let contact_spec_func = setTimeout(function () {
    let contact_spec = document.querySelector('.contact-spec');
    contact_spec.innerHTML =
        `
    <a href="#Contact">
        <P>Liked What I Do?</P>
        <p>Contact Me</p>
    </a>
    `;
    document.body.appendChild(contact_spec);
    let contact_spec_func_Go = setTimeout(function () {
        contact_spec.style.right = 0;
    }, 500);
}, 1000);

let contact_spec = document.querySelector('.contact-spec');
contact_spec.onclick = function () {
    contact_spec.style.right = '-150px';
    setTimeout(function () {
        contact_spec.remove();
    }, 500);
}
/* End Special Contact */


/* Back To Top */
// let btt = document.querySelector(".top");
let btt = document.getElementById("top");

window.onscroll = function () {
    this.scrollY > 300 ? btt.classList.add('show') : btt.classList.remove('show');
};

btt.onclick = function () {
    window.scrollTo({
        top: 0
    });
};
/* End Back To Top */

/*   SKILLS    */
let skills = ['Laravel', 'SQL', 'MySQL', 'HTML', 'CSS', 'JavaScript', 'Git & GitHub'];

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
// End Skills

// L&E

var LE = document.querySelector('.LEinner');
var lt821 = false;  //window width less than 821px
LEresize();
window.onresize = () => {
    LEresize();
};

function LEresize() {
    if (window.innerWidth <= 820 && lt821 == false) {
        lt821 = true;
        LE.classList.add('container');
    }
    else if (window.innerWidth > 820 && lt821 == true) {
        lt821 = false;
        LE.classList.remove('container');
    }
};

// End L&E

// Subscribe
let subsub = document.querySelector(".sub .sub-btn");
let subclicked = false;
subsub.addEventListener("click", async (e) => {
    e.preventDefault();
    if (validateEmail(document.querySelector(".sub .email"))) {
        if (!subclicked) {
            subclicked = true;
            subsub.firstElementChild.innerHTML = "";
            subsub.firstElementChild.classList.add('loading');
            newSub()
                .then((data) => hundleSub(data))
                .then(() => {
                    subclicked = false;
                    subsub.firstElementChild.innerHTML = "subscribe";
                    subsub.firstElementChild.classList.remove('loading');
                }).catch((error) => {
                    subclicked = false;
                    subsub.firstElementChild.innerHTML = "subscribe";
                    subsub.firstElementChild.classList.remove('loading');
                    createNotification('error', `faild to connect`);
                })
        }
    }
});

async function newSub() {
    var formData = new FormData(document.querySelector(".sub"));
    const req = await fetch(`${url}/Subscribe`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'X-Api-Key': k
        },
        body: formData
    });
    return req.json();
}

function validateEmail(emailField) {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(emailField.value) == false) {
        createNotification('error', 'Invalid Email !');
        return false;
    }
    return true;
}

function hundleSub(data) {
    if (data.status == 201 || data.status == 200) {
        createNotification('correct', `${data.message}`);
    } else {
        createNotification('error', `${data.message}`);
    }
}

//End Subscribe

function createNotification(nClass, parg) {
    if (document.querySelector(".notifi-box")) {
        let Elter = document.querySelector(".notifi-box");
        Elter.remove();
    }
    let Ealert = document.createElement('div');
    Ealert.classList.add(`${nClass}`, 'notifi-box');
    Ealert.innerHTML =
        `
            <p>${parg}</p>
            `;
    document.body.appendChild(Ealert);
    setTimeout(function () {
        Ealert.style.top = '80px';
    }, 50)
    setTimeout(() => {
        Ealert.style.top = '-100px';
        setTimeout(() => {
            Ealert.remove();
        }, 400)
    }, 3500);
}

//Requests
window.onload = () => newVisit().then((data) => console.log(data));

