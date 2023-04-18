//CREATED BY PHILIP DROUBI
import * as dReq from './dashRequests.js'
import * as helper from '../helper.js'
import { createNotification } from '../requests.js';

let popYesBtn = document.querySelector('.alertTF .yes');
let popNoBtn = document.querySelector('.alertTF .no');

export function getPage(pageName) {
    let pages = document.querySelectorAll('.dashMain .page div');
    pages.forEach(p => {
        p.classList.add('hidden');
    })
    switch (pageName) {
        case 'admins':
            getAdminsPage();
            break;
        case 'logout':
            logoutPage();
            break;
        default:
            break;
    }
}

function getAdminsPage() {
    document.querySelector('.adminsPage').classList.remove('hidden');
    let table = document.querySelector('.adminsTable');
    let tr;
    for (let i = table.childElementCount; i > 1; i--) {
        table.lastElementChild.remove();
    }
    dReq.getAdmins()
        .then((data) => {
            data.data.forEach(ele => {
                tr = document.createElement('tr');
                if (ele.id == 1) {
                    tr.innerHTML =
                        `
                    <tr>
                        <td>${ele.id}</td>
                        <td>${ele.name}</td>
                        <td>${ele.email}</td>
                        <td></td>
                    </tr>
                    `
                } else {
                    tr.innerHTML =
                        `
                    <tr>
                        <td>${ele.id}</td>
                        <td>${ele.name}</td>
                        <td>${ele.email}</td>
                        <td class="options"><button class="remove" aria-label="remove admin"><i
                                    class="fas fa-trash-alt    "></i></button>
                        </td>
                    </tr>
                    `
                }
                table.appendChild(tr);
            });
        });
}

function logoutPage() {
    helper.createPopup('logout', 'Logout', "Are you sure you wany yo logout ?");
}

popYesBtn.addEventListener('click', () => {
    if (popNoBtn.getAttribute('data-type') == 'logout') {
        dReq.logout().then((data) => {
            if (data.status == 200) {
                console.log(data.status);
                window.location.pathname == "/HTML/Dash.html" ? window.location.pathname = "/HTML/Login.html" : null;
                sessionStorage.removeItem('token');
            } else {
                createNotification('error', 'Failed to logout');
            }
        }).catch(e => {
            createNotification('error', 'Failed to logout');
        });
        helper.closePopup();
    }
});

popNoBtn.addEventListener('click', () => {
    if (popNoBtn.getAttribute('data-type') == 'logout')
        helper.closePopup();
});

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("backdrop")) {
        helper.closePopup();
    }
});