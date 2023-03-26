// CRETEAD BY PHILIP DROUBI
import * as Req from './requests.js'
import * as helper from './helper.js';

/* all page Info */
helper.setInfo();
let data = helper.getProjects();
// helper.renderProjects();

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
let chosenCategory = "All";
let ProjectBtns = document.querySelectorAll('.Projects .buttons button');
ProjectBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        ProjectBtns.forEach(ele => ele.classList.remove("active"));
        btn.classList.add("active");
        chosenCategory = btn.id;
    });
});
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
window.onload = () => Req.newVisit()
// window.onload = () => newVisit().then((data) => console.log(data));
