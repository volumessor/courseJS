const toggleMenu = () => {
    const menu = document.querySelector('menu');

    document.addEventListener(`click`, (event) => {
        let target = event.target;
        if(!menu.matches(`.active-menu`)) {
            target = target.closest(`.menu`);
            if(target) handlerMenu();
        } else {
            if (target.matches(`.close-btn`) || !target.matches(`menu`)) {
                handlerMenu();
            }
        }
    })
    const handlerMenu = () => {
        menu.classList.toggle(`active-menu`);
    }
}

export default toggleMenu;