class ClockElement extends HTMLElement {
    static get observedAttributes() {
        return ['time'];
    }

    attributeChangedCallback(attr, oldValue, newValue) {
        if (attr === 'time') {
            this.textContent = `${newValue}`;
        }
    }
}

// class GreetingElement extends HTMLElement {
//     static get observedAttributes() {
//         return ['user'];
//     }
//
//     attributeChangedCallback(attr, oldValue, newValue) {
//         if (attr === 'user') {
//             this.textContent = `Hello, ${newValue}
//             Have a good day! :)`;
//         }
//     }
// }
//
// class QuoteElement extends HTMLElement {
//     static get observedAttributes() {
//         return ['sentence'];
//     }
//
//     attributeChangedCallback(attr, oldValue, newValue) {
//         if (attr === 'sentence') {
//             this.textContent = `${newValue}`;
//         }
//     }
// }

customElements.define('clock-component', ClockElement);
// customElements.define('greeting-component', GreetingElement);
// customElements.define('quote-component', QuoteElement);