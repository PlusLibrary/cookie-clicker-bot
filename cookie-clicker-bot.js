(() => {
    const createElement = (parent, type, ...classes) => {
        let element = document.createElement(type);
        element.classList.add(...classes);
        parent.appendChild(element);
        return element;
    }
    document.querySelector("#cheat")?.remove();
    const cheat = createElement(document.body, "div", "framed");
    cheat.id = "cheat";
    cheat.setAttribute("style", "box-sizing: border-box; width: 350px; position: fixed; left: 0px; top: 0px; z-index: 10000000; padding: 8px 16px");

    let drag = { x: 0, y: 0, active: false };
    cheat.addEventListener("mousedown", event => drag = { x: event.clientX, y: event.clientY, active: true });
    window.addEventListener("mousemove", event => {
        if (!drag.active) return;
        const left = parseInt(cheat.style.left) - drag.x + event.clientX;
        const top = parseInt(cheat.style.top) - drag.y + event.clientY;
        cheat.style.left = Math.min(window.innerWidth - cheat.offsetWidth, Math.max(0, left)) + "px";
        cheat.style.top = Math.min(window.innerHeight - cheat.offsetHeight, Math.max(0, top)) + "px";
        Object.assign(drag, { x: event.clientX, y: event.clientY });
    });
    window.addEventListener("mouseup", () => drag.active = false);

    createElement(cheat, "div", "name").innerText = "Cookie Clicker bot";
    createElement(cheat, "small").innerText = "Author: Plus";
    createElement(cheat, "div", "line").setAttribute("style", "margin-bottom: 10px");

    let timers = {};
    const addCheat = (text, callback) => {
        timers[text] = 0;
        const parent = createElement(cheat, "div");
        parent.setAttribute("style", "height: 24px; position: relative;");
        createElement(parent, "label").innerText = text;
        const button = createElement(parent, "a", "option", "off");
        button.innerText = "OFF";
        button.setAttribute("style", "right: 0px; position: absolute; top: -7px; width: 24px; text-align: center");
        button.addEventListener("click", () => {
            button.classList.toggle("off");
            button.innerText = button.innerText == "OFF" ? "ON" : "OFF";
            if (button.innerText == "ON") {
                timers[text] = callback();
            } else {
                clearInterval(timers[text]);
            }
        });
    }

    addCheat("Auto click.", () => setInterval(() => document.getElementById("bigCookie").click(), 0));
    addCheat("Auto click golden cookies.", () => setInterval(() => document.querySelector(".shimmer")?.click(), 10));
    addCheat("Auto purchase buildings and upgrades.", () => setInterval(() => {
        document.querySelectorAll("#upgrades.storeSection.upgradeBox div.enabled")[0]?.click();
        document.querySelectorAll("[id^='product'].product.unlocked.enabled")[0]?.click();
    }, 1000));
    addCheat("Auto click fortune.", () => setInterval(() => document.getElementById("commentsText").getElementsByClassName("fortune")[0]?.parentNode.click(), 500));
})();