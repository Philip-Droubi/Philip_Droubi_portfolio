//CREATED BY PHILIP DROUBI
import * as dReq from './dashRequests.js'
export function getPage(pageName) {
    let pages = document.querySelectorAll('.dashMain .page div');
    pages.forEach(p => {
        p.classList.add('hidden');
    })
    switch (pageName) {
        case 'admins':
            getAdminsPage();
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