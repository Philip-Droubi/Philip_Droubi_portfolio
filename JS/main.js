// CRETEAD BY PHILIP DROUBI
import * as Req from './requests.js'
import * as helper from './helper.js';
import { Project, getProjectByID } from './classes/Project.js';
import { createNotification } from './requests.js';

/* all page Info */
helper.setInfo();
helper.getProjects();

/* Special Contact */
let contact_spec_func = setTimeout(helper.contactSpecFunc(), 100);

let contact_spec = document.querySelector('.contact-spec');
contact_spec.onclick = () => { helper.clickOnContactSpec(contact_spec) };
/* End Special Contact */


/* Back To Top */

let btt = document.getElementById("top");
window.onscroll = () => helper.showBTT(btt);
btt.onclick = helper.backToTop;

/* End Back To Top */

// L&E
var lt821 = false;  //window width less than 821px
helper.LEresize(lt821);
window.onresize = () => {
    helper.LEresize(lt821);
    lt821 = !lt821;
};
// End L&E

// Projects

// Sorting
let chosenCategory = 0;
let ProjectBtns = document.querySelectorAll('.Projects .buttons button');
ProjectBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        ProjectBtns.forEach(ele => ele.classList.remove("active"));
        btn.classList.add("active");
        chosenCategory = +btn.id;
        helper.sortProjects(chosenCategory);
    });
});

// End Sorting

// More info

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("moreInfoBtn")) {
        helper.generateMoreInfoSec(e.target.parentElement.parentElement.getAttribute('data-pid'));//Project id
    } else if (e.target.classList.contains("exit") || e.target.classList.contains("backdrop") || e.target.parentElement.classList.contains("exit")) {
        helper.closeMoreInfoSec();
    }
});

// End More info

// End Projects

//Contact
let msgBtn = document.querySelector(".Contact .msg-btn");
msgBtn.addEventListener("click", async (e) => helper.sendMsg(e));
// End Contact


// Subscribe
let subBtn = document.querySelector(".sub .sub-btn");
subBtn.addEventListener("click", async (e) => helper.subscribe(e));
//End Subscribe

//Others
window.onload = () => Req.newVisit();
// window.onload = () => newVisit().then((data) => console.log(data));

// Easter Eggs
let heart = document.querySelector("footer .wrapper");
let heartAfter = document.querySelector("footer .wrapper .after");
let heartBefore = document.querySelector("footer .wrapper .before");
let heartSpeed = 1;
heart.style.animationDuration = `${heartSpeed}s`
heartAfter.style.animationDuration = `${heartSpeed}s`
heartBefore.style.animationDuration = `${heartSpeed}s`

heart.addEventListener('click', () => {
    if (heartSpeed > 0) {
        heartSpeed -= 0.1;
        heartSpeed = heartSpeed.toFixed(1);
        heart.style.animationDuration = `${heartSpeed}s`;
        heartAfter.style.animationDuration = `${heartSpeed}s`;
        heartBefore.style.animationDuration = `${heartSpeed}s`;
        createNotification('error', getHeartMessage(heartSpeed));
        if (heartSpeed == 0) {
            heart.setAttribute("title", "You Killed me 💔");
            heart.style.cursor = "grab";
            createNotification('error', "Why did you kill me?! WHY? 💔");
        }
    }
});

function getHeartMessage(num) {
    console.log(num);
    switch (+num) {
        case 0.9:
            return "Ok I can handle it 😏";
        case 0.8:
            return "Would you please stop bOTHERING me? 🤨";
        case 0.7:
            return "STOP 😠";
        case 0.6:
            return "STOP IT 😤";
        case 0.5:
            return "TF with you! 😖";
        case 0.4:
            return "No 😟";
        case 0.3:
            return "Please stop 🥺";
        case 0.2:
            return "I'm dying 😭";
        case 0.1:
            return "One click and i'll pass away 🤕";
        default:
            return "You broke the system";
    }
}