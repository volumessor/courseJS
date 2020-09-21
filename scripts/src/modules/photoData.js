const photoData = () => {
    document.getElementById(`command`).querySelectorAll(`img`).forEach((item) => {
        item.addEventListener('mouseenter', () => {
            item.dataset.lastImg = item.src;
            item.src = item.dataset.img;
        });
        item.addEventListener(`mouseout`, () => {
            item.dataset.newImg = item.src;
            item.src = item.dataset.lastImg;
        })
    });
}

export default photoData;