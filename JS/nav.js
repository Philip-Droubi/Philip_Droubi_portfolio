// CRETEAD BY PHILIP DROUBI
let berg_icon = document.querySelector('.berg_icon');
let page_width = this.innerWidth;
let Berger = false;
let berg_clicked = false;
const construction = false;

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
            <li><a href="#Projects">Projects</a></li>
            <li><a href="#Contact">Contact</a></li>
            <li><a href="#Subscribe">Subscribe</a></li>
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

    if (berg_clicked == false) {
        open_Berger();
    }
    else if (berg_clicked == true) {
        close_Berger();
    }
    berg_clicked == false ? berg_clicked = true : berg_clicked = false;
}

function open_Berger() {
    if (document.querySelectorAll('.nav_menu').length > 0) {
        force_Close_Berger(document.querySelectorAll('.nav_menu').length);
    }
    let nav_menu = document.createElement('div');
    let date = new Date()
    nav_menu.innerHTML =
        `
        <div class="image">
                <img src="Images/Philip/Logo.jpeg" alt="Philip Droubi">
            </div>
            <ul>
                <li><a href="#About">About</a></li>
                <li><a href="#Skills">Skills</a></li>
                <li><a href="#Projects">Projects</a></li>
                <li><a href="#Contact">Contact</a></li> 
                <li><a href="#Subscribe">Subscribe</a></li>
            </ul>
            <p class="copy-right-date">&copy; ${date.getFullYear()}</p>
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

function force_Close_Berger(num) {
    for (let i = 0; i < num; i++) {
        let nav_menu = document.querySelector('.nav_menu');
        nav_menu.remove();
        berg_icon.classList.remove('close-berg');
    }
    //On fast click when menu is open nav_menu open several time which cause a bug 
    //So that this function is required
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
);

if (!construction) constructionFunc();

function constructionFunc() {
    let constructionSection = document.querySelector('.construction');
    constructionSection.classList.add('hidden');
}


