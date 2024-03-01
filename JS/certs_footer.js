// CRETEAD BY PHILIP DROUBI
import { createNotification } from './requests.js';

//Footer
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
//End Footer