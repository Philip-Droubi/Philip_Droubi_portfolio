// CRETEAD BY PHILIP DROUBI
const url = 'https://philip-droubi-portfolio.000webhostapp.com/api';
const k = 'o8teoSL8FW1evoKylF9polLStF5SXB9MMsTcbUark16IKEUSMHQBpfuGfoQmaWHN';
const url2 = 'http://127.0.0.1:8000/api';


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
        console.log(e);
    }
}


async function newSubReq(form) {
    var formData = new FormData(form);
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

async function newMsgReq(form) {
    var formData = new FormData(form);
    const req = await fetch(`${url}/message`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'X-Api-Key': k
        },
        body: formData
    });
    return req.json();
}

function validateMessageForm(form) {
    let name = form[0].value.length;
    let subject = form[2].value.length;
    let msg = form[3].value.length;

    if (name == 0) {
        createNotification('error', '"Name" field is required');
        return false
    } else if (name < 2) {
        createNotification('error', 'Invalid Name');
        return false
    }

    if (subject == 0) {
        createNotification('error', '"Subject" field is required');
        return false
    } else if (subject < 2) {
        createNotification('error', 'Invalid Subject');
        return false
    }

    if (msg == 0) {
        createNotification('error', '"message body" field is required');
        return false
    } else if (msg < 2) {
        createNotification('error', 'Invalid message body');
        return false
    }
    return validateEmail(form[1]);
}

function validateEmail(emailField) {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(emailField.value) == false) {
        createNotification('error', 'Invalid Email !');
        return false;
    }
    return true;
}

function validateloginForm(form) {
    let name = form[0].value.length;
    let password = form[1].value.length;

    if (name == 0) {
        createNotification('error', '"Name" field is required');
        return false
    } else if (name < 2) {
        createNotification('error', 'Invalid Name');
        return false
    }

    if (password == 0) {
        createNotification('error', '"password" field is required');
        return false
    } else if (password < 6) {
        createNotification('error', 'Invalid password');
        return false
    }
    return true;
}

async function loginReq(form) {
    var formData = new FormData(form);
    const req = await fetch(`${url}/login`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'X-Api-Key': k
        },
        body: formData
    });
    return req.json();
}

async function testToken() {
    const req = await fetch(`${url}/testToken`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'X-Api-Key': k,
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        },
    });
    return req.status;
}

function hundleRes(data, form, length = 1) {
    if (data.status == 201 || data.status == 200) {
        createNotification('correct', `${data.message}`);
        for (let i = 0; i < length; i++) {
            form[i].value = "";
        }
    } else {
        createNotification('error', `${data.message}`);
    }
}

function createNotification(nClass = 'correct', parg) {
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

export {
    newSubReq, newVisit, newMsgReq, validateMessageForm,
    validateEmail, hundleRes, createNotification, validateloginForm, loginReq, testToken
}