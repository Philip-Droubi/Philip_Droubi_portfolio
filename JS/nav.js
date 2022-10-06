// CRETEAD BY PHILIP DROUBI

let berg_icon = document.querySelector('.berg_icon');
let page_width = this.innerWidth;
let Berger = false;
let berg_clicked = false;

if (page_width < 625) {
    nav_Berg();
    Berger = true;
};

window.addEventListener('resize', () => {
    page_width = window.innerWidth;
    if (page_width < 625 && Berger == false) {
        nav_Berg();
    }
    else if (page_width >= 625 && Berger == true) {
        nav_List();
    };
});

function nav_Berg() {
    main_nav_bar = document.querySelector('.list');
    main_nav_bar.remove();
    berg_icon.innerHTML =
        `
            <span></span>
            <span></span>
            <span></span>
    `;
    berg_icon.classList.remove('hidden');
    Berger = true;
};

function nav_List() {

    let nav_ul = document.createElement("ul");
    nav_ul.classList.add('list');
    nav_ul.innerHTML =
        `
            <li><a href="#About">About</a></li>
            <li><a href="#Skills">Skills</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#Contact">Contact</a></li>
        `;
    berg_icon.classList.add('hidden');
    if (nav_menu = document.querySelector(".nav_menu")) {
        close_Berger();
        berg_clicked = false;
    }
    document.querySelector('nav .container').appendChild(nav_ul);
    Berger = false;
};


berg_icon.onclick = function () {
    berg_clicked == false ? berg_clicked = true : berg_clicked = false;
    if (berg_clicked == true) {
        click_On_Berger();
    }
    else if (berg_clicked == false) {
        close_Berger();
    }
}

function click_On_Berger() {
    let nav_menu = document.createElement('div');
    nav_menu.innerHTML =
        `
        <div class="image">
                <img src="Images/Philip/Logo.jpeg" alt="Philip Droubi">
            </div>
            <ul>
                <li><a href="#About">About</a></li>
                <li><a href="#Skills">Skills</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#Contact">Contact</a></li>
            </ul>
            <p>&copy; 2022</p>
        `
    nav_menu.classList.add('nav_menu');
    document.body.appendChild(nav_menu);
    setTimeout(() => {
        nav_menu.style.right = 0;
    }, 1);
    berg_icon.classList.add('close-berg');
}

function close_Berger() {
    let nav_menu = document.querySelector('.nav_menu');
    nav_menu.style.right = '-50%';
    setTimeout(() => {
        nav_menu.remove();
    }, 400);
    berg_icon.classList.remove('close-berg');
}

document.addEventListener('click', event => {
    if (innerWidth < 625 && berg_clicked == true) {
        const nav_menu = document.querySelector('.nav_menu');
        const berg_icon = document.querySelector('.berg_icon');
        const isClickInside = berg_icon.contains(event.target) || nav_menu.contains(event.target);
        if (!isClickInside) {
            berg_clicked = false;
            nav_menu.style.right = '-50%';
            setTimeout(() => {
                nav_menu.remove();
            }, 400);
            berg_icon.classList.remove('close-berg');
        }
    }
}
)


