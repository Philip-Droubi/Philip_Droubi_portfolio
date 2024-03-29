//CREATED BU PHILIP DROUBI
const k = 'o8teoSL8FW1evoKylF9polLStF5SXB9MMsTcbUark16IKEUSMHQBpfuGfoQmaWHN';
const url = 'https://philip-droubi-portfolio.000webhostapp.com';
const url2 = 'http://127.0.0.1:8000/api';

export async function getAdmins() {
    const req = await fetch(`${url2}/getAdmins`, {
        method: 'Get',
        headers: {
            'Accept': 'application/json',
            'X-Api-Key': k,
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        },
    });
    return req.json();
}

export async function logout() {
    const req = await fetch(`${url2}/logout`, {
        method: 'Get',
        headers: {
            'Accept': 'application/json',
            'X-Api-Key': k,
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        },
    });
    return req.json();
}