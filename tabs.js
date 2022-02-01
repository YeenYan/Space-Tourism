'use strict';

const tabList = document.querySelector('[role="tabList"]');
const tabs = tabList.querySelectorAll('[role="tab"]');

let tabFocus = 0;

tabList.addEventListener('keydown', changeTabFocus);

tabs.forEach((tabChild) => {
    tabChild.addEventListener('click', changeTabPanel);
})

function changeTabFocus(e) {
    // console.log(e.keyCode); for keyDown keycode
    const keyDownLeft = 37;
    const keyDownRight = 39;

    // change tabindex of the current tab to -1
    if (e.keyCode === keyDownLeft || e.keyCode === keyDownRight) {
        tabs[tabFocus].setAttribute("tabindex", -1);

            // if the right key is pushed, move to the next tab on the right
        if (e.keyCode === keyDownRight) {
            tabFocus++;
            if (tabFocus >= tabs.length) {
                tabFocus = 0;
            }
        } else if (e.keyCode === keyDownLeft) { // if the left key is pushed, move to the next tab on the left
            tabFocus--;
            if (tabFocus < 0) {
                tabFocus = tabs.length - 1;
            }
        }

        tabs[tabFocus].setAttribute("tabindex", 0);
        tabs[tabFocus].focus(); 
    }   
}

function changeTabPanel(e) {
    const targetTab = e.target;
    const targetPanel = targetTab.getAttribute("aria-controls");
    const targetImage = targetTab.getAttribute("data-image");

    const tabContainer = targetTab.parentNode;
    const mainContainer = tabContainer.parentNode;


    // changing the active state or underlined
    tabContainer
        .querySelector('[aria-selected="true"]')
        .setAttribute("aria-selected", false);

    targetTab.setAttribute("aria-selected", true);


    // for changing the information
    hideContent(mainContainer, '[role="tabpanel"]')
    // mainContainer
    //     .querySelectorAll('[role="tabpanel"]')
    //     .forEach((panel) => panel.setAttribute("hidden", true));

    showContent(mainContainer, [`#${targetPanel}`]);
    // mainContainer.querySelector([`#${targetPanel}`]).removeAttribute('hidden');


    // for changing the image
    hideContent(mainContainer, 'picture');
    // mainContainer
    // .querySelectorAll('picture')
    // .forEach((image) => image.setAttribute("hidden", true));

    showContent(mainContainer, [`#${targetImage}`]);
    // mainContainer.querySelector([`#${targetImage}`]).removeAttribute('hidden');
}


    // FUNCTION for showing & changing the information
function hideContent(parent, content) {
    parent
        .querySelectorAll(content)
        .forEach((item) => 
            item.setAttribute("hidden", true));
}

function showContent(parent, content) {
    parent.querySelector(content).removeAttribute('hidden');
}