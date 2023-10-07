// CRETEAD BY PHILIP DROUBI
import * as Req from './requests.js';
import { User } from './classes/User.js';
import { Project, addProject, getProjectByID } from './classes/Project.js';

let msgBtn = document.querySelector(".Contact .msg-btn");
let subBtn = document.querySelector(".sub .sub-btn");
let loginBtn = document.querySelector('.login-form button');
let msgClicked = false;
let subclicked = false;
let loginClicked = false;
let moreInfoSecShowen = false;
let cardsSpecialTreatmentArray = [2]; // this array contains projects that need some special work mostly for their images
let videoTime = 0;

export async function setInfo() {
    let date = new Date();
    let personalInfo = document.querySelectorAll('.identity div p');
    let phoneNum = document.querySelector('.phone-l');
    let mail = document.querySelector('.mail-l');
    let age = document.querySelector('.age');
    let copyRight = document.querySelector('footer .copy-right');
    await fetch('./data.json')
        .then((response) => response.json())
        .then((data) => {
            personalInfo[0].textContent = data.personal_information.full_name;
            personalInfo[1].textContent = data.personal_information.address;
            personalInfo[2].textContent = data.personal_information.citizenship;
            personalInfo[3].textContent = data.personal_information.date_of_birth;
            personalInfo[4].textContent = data.personal_information.recruitment_state;
            phoneNum.textContent = `${data.phone_num}`;
            mail.textContent = `${data.email}`;
            copyRight.textContent = ` ${date.getFullYear()}`;
            age.textContent = date.getFullYear() - data.personal_information.birth_year;
            addSkills(data.skills);
        });
}

export function contactSpecFunc() {
    let contact_spec = document.querySelector('.contact-spec');
    contact_spec.innerHTML =
        `
        <a href = "#Contact" >
            <P>Liked What I Do?</P>
            <p>Contact Me</p>
        </a>
        `;
    document.body.appendChild(contact_spec);
    let contact_spec_func_Go = setTimeout(function () {
        contact_spec.style.right = 0;
    }, 140000);
}

export function clickOnContactSpec(contact_spec) {
    contact_spec.style.right = '-150px';
    setTimeout(function () {
        contact_spec.remove();
    }, 500);
}

export function showBTT(btt) {
    window.scrollY > 300 ? btt.classList.add('show') : btt.classList.remove('show');
}

export function backToTop() {
    window.scrollTo({
        top: 0
    });
}

export function addSkills(skills) {
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
}

export function LEresize(lt821) {
    var LE = document.querySelector('.LEinner');
    if (window.innerWidth <= 820 && lt821 == false) {
        LE.classList.add('container');
    }
    else if (window.innerWidth > 820 && lt821 == true) {
        LE.classList.remove('container');
    }
};

export function sendMsg(e) {
    e.preventDefault();
    let form = document.querySelector(".message-form");
    if (Req.validateMessageForm(form)) {
        if (!msgClicked) {
            msgClicked = true;
            msgBtn.lastElementChild.innerHTML = "";
            msgBtn.firstElementChild.style.left = "-10%";
            msgBtn.style.backgroundColor = "transparent";
            msgBtn.lastElementChild.classList.add('loading');
            Req.newMsgReq(form)
                .then((data) => {
                    Req.hundleRes(data, form, 4);
                })
                .then(() => {
                    msgClicked = false;
                    msgBtn.lastElementChild.innerHTML = "send !";
                    msgBtn.lastElementChild.classList.remove('loading');
                    msgBtn.firstElementChild.style.left = "-145%";
                    msgBtn.style.backgroundColor = "rgba(140, 136, 155, 0.425)";
                    msgBtn.blur();
                }).catch((error) => {
                    msgClicked = false;
                    msgBtn.lastElementChild.innerHTML = "send !";
                    msgBtn.lastElementChild.classList.remove('loading');
                    msgBtn.firstElementChild.style.left = "-145%";
                    msgBtn.style.backgroundColor = "rgba(140, 136, 155, 0.425)";
                    msgBtn.blur();
                    Req.createNotification('error', `faild to connect`);
                });
        }
    }
}

export function subscribe(e) {
    e.preventDefault();
    let form = document.querySelector(".sub");
    if (Req.validateEmail(form[0])) {
        if (!subclicked) {
            subclicked = true;
            subBtn.firstElementChild.innerHTML = "";
            subBtn.firstElementChild.classList.add('loading');
            Req.newSubReq(document.querySelector('.sub'))
                .then((data) => Req.hundleRes(data, form, 1))
                .then(() => {
                    subclicked = false;
                    subBtn.firstElementChild.innerHTML = "subscribe";
                    subBtn.firstElementChild.classList.remove('loading');
                    subBtn.blur();
                }).catch((error) => {
                    subclicked = false;
                    subBtn.firstElementChild.innerHTML = "subscribe";
                    subBtn.firstElementChild.classList.remove('loading');
                    subBtn.blur();
                    Req.createNotification('error', `faild to connect`);
                })
        }
    }
}

export function login(e) {
    e.preventDefault();
    let form = document.querySelector(".login-form");
    let span = document.querySelector(".login-form button span");
    if (Req.validateloginForm(form)) {
        if (!loginClicked) {
            loginClicked = true;
            loginBtn.lastElementChild.innerHTML = "";
            loginBtn.firstElementChild.style.left = "-10%";
            loginBtn.style.backgroundColor = "transparent";
            loginBtn.lastElementChild.classList.add('loading');
            Req.loginReq(form)
                .then((data) => {
                    Req.hundleRes(data, form, 2);
                    if (data.status == 200) {
                        sessionStorage.setItem('token', data.data.token);
                        creatUser(data.data.user);
                        window.location.pathname = "HTML/Dash.html";
                    }
                })
                .then(() => {
                    loginClicked = false;
                    loginBtn.lastElementChild.innerHTML = "login";
                    loginBtn.lastElementChild.classList.remove('loading');
                    loginBtn.firstElementChild.style.left = "-145%";
                    loginBtn.style.backgroundColor = "rgba(140, 136, 155, 0.425)";
                    loginBtn.blur();
                }).catch((error) => {
                    loginClicked = false;
                    loginBtn.lastElementChild.innerHTML = "login";
                    loginBtn.lastElementChild.classList.remove('loading');
                    loginBtn.firstElementChild.style.left = "-145%";
                    loginBtn.style.backgroundColor = "rgba(140, 136, 155, 0.425)";
                    loginBtn.blur();
                    Req.createNotification('error', `faild to connect`);
                });
        }
    }
}

export function testToken() {
    Req.testToken()
        .then((data) => {
            if (data === 200) {
                window.location.pathname == "/HTML/Dash.html" ? null : window.location.pathname = "/HTML/Dash.html";
            } else {
                window.location.pathname == "/HTML/Dash.html" ? window.location.pathname = "/HTML/Login.html" : null;
                sessionStorage.removeItem('token');
            }
        });
}

function creatUser(user) {
    new User(user.name, user.email, user.id);
    sessionStorage.setItem('userName', user.name);
    sessionStorage.setItem('useremail', user.email);
    sessionStorage.setItem('userid', user.id);
}

export async function getProjects() {
    await fetch('./Projects.json')
        .then((response) => response.json())
        .then((data) => {
            storeProjects(data);
        });
    renderProjects();
    FinalTreatPosts();
    correctCardImgAspectRatio()
}

async function createProjectsCards() {
    let projects = Project.projectsData;
    let projectsSection = document.querySelector('.projectsGrid');
    projects.forEach(p => {
        let card = document.createElement('div');
        card.classList.add("card", "project");
        card.setAttribute('data-pid', `${p.id}`);
        card.setAttribute('data-type', `${p.type}`);
        let loadingBar = document.createElement('div');
        loadingBar.classList.add('loadingBar');
        card.appendChild(loadingBar);
        let imgSlider = document.createElement('div');
        imgSlider.classList.add('imgSlider');
        imgSlider.innerHTML =
            `
        <div class="img">
            <img src="${p.imgs[0]}" alt="${p.name} image 0">
        </div>
        <div class="img2">
            <img src="" alt="${p.name}">
        </div>
        `
        card.appendChild(imgSlider);
        let info = document.createElement('div');
        info.classList.add('info');
        info.innerHTML =
            `
        <p class="Pname">${p.name}</p>
        <p class="Pdesc">${p.desc}</p>
        <p class="type">Type : <span class="typeString">${getProjectType(p.type)}</span></p>
        `
        info.appendChild(getProjectsTechs(p.techs))
        card.appendChild(info);
        let links = getProjectLinks(p);
        card.appendChild(links);
        let after = document.createElement('span');
        after.classList.add('after');
        card.appendChild(after);
        projectsSection.appendChild(card);
    });
}

function getProjectType(type) {
    switch (type) {
        case 1:
            return "FrontEnd <i class=\"fa fa-paint-brush\" aria-hidden=\"true\"></i>"
            break;
        case 2:
            return "BackEnd <i class=\"fa fa-gears\" aria-hidden=\"true\"></i>"
            break;
        case 3:
            return "Game <i class=\"fa fa-gamepad\" aria-hidden=\"true\"></i>"
            break;
        case 4:
            return "FullStack"
            break;
        default:
            return "N/A"
            break;
    }
}

function getProjectsTechs(techs) {
    let techsDiv = document.createElement('div');
    techsDiv.classList.add('techs');
    let parg = document.createElement('p');
    parg.innerHTML = "Techs used : ";
    techsDiv.appendChild(parg);
    let ul = document.createElement('ul');
    techs.forEach(t => {
        let li = document.createElement('li');
        li.classList.add(`${t}Tag`, "tag");
        t == "CPP" ? t = "C++" : null;
        li.textContent = t;
        ul.appendChild(li);
    });
    techsDiv.appendChild(ul);
    return techsDiv;
}

function getProjectLinks(p) {
    let links = document.createElement('div');
    links.classList.add('links');
    if (p.codeSite.trim()) {
        let codeSiteLink = document.createElement('a');
        codeSiteLink.classList.add("codeSiteLink");
        codeSiteLink.setAttribute("href", `${p.codeSite}`);
        codeSiteLink.setAttribute("target", "_blank");
        codeSiteLink.setAttribute("rel", "noopener noreferrer");
        codeSiteLink.setAttribute("aria-label", `See ${p.name} Site Code`);
        codeSiteLink.setAttribute("title", "See The Code");
        codeSiteLink.setAttribute("data-desc", "See The Code");
        codeSiteLink.innerHTML = `Code`;
        // codeSiteLink.innerHTML = `<i class="fa fa-code" aria-hidden="true"></i> Code`;
        links.appendChild(codeSiteLink);
    }
    if (p.liveSite.trim()) {
        let liveSiteLink = document.createElement('a');
        liveSiteLink.classList.add("liveSiteLink");
        liveSiteLink.setAttribute("href", `${p.liveSite}`);
        liveSiteLink.setAttribute("target", "_blank");
        liveSiteLink.setAttribute("rel", "noopener noreferrer");
        liveSiteLink.setAttribute("aria-label", `See ${p.name} Site`);
        liveSiteLink.setAttribute("title", "Live Site");
        liveSiteLink.setAttribute("data-desc", "Live Site");
        liveSiteLink.innerHTML = `Live`;
        // liveSiteLink.innerHTML = `<i class="fas fa-broadcast-tower"></i>`;
        links.appendChild(liveSiteLink);
    }
    if (p.FEMLink.trim() && p.isFEM) {
        let FEMLink = document.createElement('a');
        FEMLink.classList.add("FEMLink");
        FEMLink.setAttribute("href", `${p.FEMLink}`);
        FEMLink.setAttribute("target", "_blank");
        FEMLink.setAttribute("rel", "noopener noreferrer");
        FEMLink.setAttribute("aria-label", `See ${p.name} Solution on Frontend Mentor`);
        FEMLink.setAttribute("title", `See ${p.name} Solution on Frontend Mentor`);
        FEMLink.setAttribute("data-desc", "See ${p.name} Solution on Frontend Mentor");
        FEMLink.innerHTML = `<img src="Images/favicon/FEMicon.png" alt="See ${p.name} solution on frontend mentor site">`;
        links.appendChild(FEMLink);
    }
    if (p.more.trim()) {
        let more = document.createElement('button');
        more.classList.add("moreTag", "moreInfoBtn");
        more.setAttribute("href", `${p.FEMLink}`);
        more.setAttribute("title", `Get more Info about the project`);
        more.innerHTML = `more...`;
        links.appendChild(more);
    }
    return links;
}

function createNewImg(p, i) {
    let imgSlider = document.querySelector(`[data-pid="${p.id}"] .imgSlider`);
    let oldImg = document.querySelector(`[data-pid="${p.id}"] .imgSlider .img`);
    let newImg = document.querySelector(`[data-pid="${p.id}"] .imgSlider .img2`);
    let newImgEle = document.querySelector(`[data-pid="${p.id}"] .imgSlider .img2 img`);
    oldImg.className = '';
    oldImg.classList.add("img0");
    newImg.className = '';
    newImg.classList.add("img");
    newImgEle.setAttribute('src', `${p.imgs[i]}`);
    let newestImg = document.createElement('div');
    newestImg.classList.add('img2');
    newestImg.innerHTML = `
    <img src="" alt="${p.name}">
    `
    imgSlider.appendChild(newestImg);
    setInterval(() => {
        oldImg.remove();
    }, 800);
}

function FinalTreatPosts() {
    cardsSpecialTreatmentArray.forEach(id => {
        let card = document.querySelector(`[data-pid="${id}"]`);
        card.classList.add(`card${id}`);
    });
}

export function correctCardImgAspectRatio() {
    cardsSpecialTreatmentArray.forEach(id => {
        let card = document.querySelector(`[data-pid="${id}"]`);
        const ruleList = document.styleSheets[8].cssRules;
        // in the bottom edit what you want
        for (let i = 0; i < ruleList.length; i++) {
            if (ruleList[i].selectorText == '.card2 .img0 img, .card2 .img2 img, .card2 .img img') {
                ruleList[i].style.setProperty("aspect-ratio", `${card.clientWidth - 30}/250`);
            }
        }
    });

}

export async function renderProjects() {
    await createProjectsCards();
    let projects = Project.projectsData;
    projects.forEach(p => {
        if (p.imgs.length > 1) {
            let i = 0;
            setInterval(() => {
                i++;
                if (i == p.imgs.length) i = 0;
                createNewImg(p, i);
            }, 6000);
        }
    });
}

export function sortProjects(type) {
    let projectCards = document.querySelectorAll(".projectsGrid .card");
    projectCards.forEach(p => {
        if (type == 0) {
            p.classList.remove("hidden");
        } else {
            if (p.getAttribute('data-type') != type) {
                p.classList.add("hidden");
            } else {
                p.classList.remove("hidden");
            }
        }
    });
}

export function storeProjects(data) {
    data.forEach(p => {
        let project = new Project(p.id, p.name, p.codeSite, p.liveSite, p.imgs, p.desc, p.type, p.techs, p.isFEM, p.FEMLink, p.more);
        addProject(p);
    });
}

export function checkOnScree(params) {

}

export function generateMoreInfoSec(Pid) {
    let moreInfo = document.querySelector(".moreInfo");
    let moreInfoContent = document.querySelector(".moreInfo .content");
    let backdrop = document.querySelector(".backdrop");
    backdrop.classList.remove("hidden");
    moreInfo.classList.remove("hidden");
    moreInfoContent.innerHTML = `${getProjectByID(Pid).more}`;
    moreInfoSecShowen = true;
    let video = document.querySelector('.moreInfo .content video');
    video.currentTime = videoTime;
}

export function closeMoreInfoSec() {
    let moreInfo = document.querySelector(".moreInfo");
    let backdrop = document.querySelector(".backdrop");
    let video = document.querySelector('.moreInfo .content video');
    backdrop.classList.add("hidden");
    moreInfo.classList.add("hidden");
    moreInfoSecShowen = false;
    if (video) {
        video.pause();
        videoTime = +video.currentTime.toFixed(1);
    }
}

export function createPopup(type, title = "", message = "", cls = "alertTF") {
    let pop = document.querySelector('.alertTF');
    let backdrop = document.querySelector(".backdrop");
    backdrop.classList.remove("hidden");
    pop.setAttribute('data-type', `${type}`);
    pop.classList.remove('hidden');
    document.querySelector(".alertTF h1").textContent = title;
    document.querySelector(".alertTF p").textContent = message;
    document.querySelector(".alertTF .yes").setAttribute('data-type', `${type}`);
    document.querySelector(".alertTF .no").setAttribute('data-type', `${type}`);
    return true;
}

export function closePopup() {
    let pop = document.querySelector('.alertTF');
    let backdrop = document.querySelector(".backdrop");
    backdrop.classList.add("hidden");
    pop.classList.add('hidden');
    return true;
}

export function activeChristmasFestival() {
    //landing
    let landing = document.getElementById("landing");
    landing.classList.add('snow-landing');
    let philipImage = document.querySelector('#landing .image');
    let gazelles = document.createElement('div');
    gazelles.innerHTML = `
    <dotlottie-player src="Images/festivals/christmas/gazelles.lottie"
    background="transparent" speed="1" direction="1" mode="normal" loop autoplay></dotlottie-player>
    `;
    landing.appendChild(gazelles);
    gazelles.classList.add('gazelles');
    let starsBalls = document.createElement('div');
    starsBalls.classList.add('landing-stars-balls');
    starsBalls.innerHTML = `
    <dotlottie-player src="Images/festivals/christmas/stars_from_top.lottie"
    background="transparent" speed="1" direction="1" mode="normal" loop autoplay></dotlottie-player>
    `;
    philipImage.appendChild(starsBalls);
    let snow = document.createElement('div');
    snow.classList.add('snow-wrapper');
    snow.innerHTML = `
    <div class="snow layer1 a"></div>
    <div class="snow layer1"></div> 
    <div class="snow layer2 a"></div>
    <div class="snow layer2"></div>
    <div class="snow layer3 a"></div>
    <div class="snow layer3"></div>
    `;
    landing.appendChild(snow);
    //contact
    let contact = document.getElementById("Contact");
    let threeTrees = document.createElement('div');
    threeTrees.classList.add('contact-trees');
    threeTrees.innerHTML = `
    <dotlottie-player src="Images/festivals/christmas/three_black_trees.lottie"
    background="transparent" speed="1" direction="1" mode="normal" loop autoplay></dotlottie-player>
    `;
    contact.appendChild(threeTrees);
    //footer
    let footer = document.getElementById('Subscribe');
    let christmasFooterTree = document.createElement('div');
    christmasFooterTree.classList.add('footer-tree');
    christmasFooterTree.innerHTML = `
    <dotlottie-player src="Images/festivals/christmas/footer_tree.lottie"
    background="transparent" speed="1" direction="1" mode="normal" loop autoplay></dotlottie-player>
    `;
    footer.appendChild(christmasFooterTree);
}

// popYesBtn.addEventListener('click', () => { });

