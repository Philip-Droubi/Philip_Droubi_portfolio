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
}, 60000);

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

window.onload = () => {

}