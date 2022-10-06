// CRETEAD BY PHILIP DROUBI

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
}, 5000);

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