const text = document.querySelector('.text'),
    select = document.querySelector('.select'),
    height = document.querySelector('.height'),
    width = document.querySelector('.width'),
    bg = document.querySelector('.bg'),
    fontSize = document.querySelector('.fontSize'),
    button = document.querySelector('.button'),
    newElemDiv = document.querySelector('.new-elem');

function DomElement () {
    this.text = 0,
    this.selector = 0,
    this.height = 0,
    this.width = 0,
    this.bg = 0,
    this.fontSize = 0
};

DomElement.prototype.start = function () {
    this.text = text.value;
    this.selector = select.value;
    this.height = height.value;
    this.width = width.value;
    this.bg = bg.value;
    this.fontSize = fontSize.value;

    this.addElement();
    this.elementStyle();
};

DomElement.prototype.eventListener = function () {
    button.addEventListener('click', this.start.bind(this));
}

DomElement.prototype.addElement = function () {
    if(this.selector.charAt(0) === ".") {
        newElemDiv.innerHTML = '<div class="' + this.selector.slice(1) + '" <span>' + this.text + '</span> </div>';
       
    } else if (this.selector.charAt(0) === "#") {
        newElemDiv.innerHTML = '<p id="' + this.selector.slice(1) + '"<span>' + this.text + '</span></p>';
    } else {
        alert("Условие не подходит");
    };
};

DomElement.prototype.elementStyle = function () {
    let elem = newElemDiv.querySelector('div');
    console.log(elem);
    // elem.style.height = this.height + "px";
    // elem.style.width = this.width + "px";
    // elem.style.background = this.bg;
    // elem.style.fontSize = this.fontSize + "px";
    elem.style.cssText = `height:` + this.height + `px;
        width: ` + this.width + `px; 
        background-color: ` + this.bg + `; 
        font-size: ` + this.fontSize + `px;`
} 

let domElement = new DomElement();
domElement.eventListener();
console.log(domElement);