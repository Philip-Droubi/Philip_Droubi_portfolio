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