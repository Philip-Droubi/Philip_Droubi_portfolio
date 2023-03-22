//CREATED BU PHILIP DROUBI
const k = 'o8teoSL8FW1evoKylF9polLStF5SXB9MMsTcbUark16IKEUSMHQBpfuGfoQmaWHN';
const url = 'https://philip-droubi-portfolio.000webhostapp.com/api';

export async function getAdmins() {
    const req = await fetch(`${url}/getAdmins`, {
        method: 'Get',
        headers: {
            'Accept': 'application/json',
            'X-Api-Key': k,
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        },
    });
    return req.json();
}