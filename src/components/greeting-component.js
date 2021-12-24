class GreetingElement extends HTMLElement {
    static get observedAttributes() {
        return ['user'];
    }

    attributeChangedCallback(attr, oldValue, newValue) {
        if (attr === 'user') {
            this.textContent = `Hello, ${newValue} 
            Have a good day! :)`;
        }
    }
}

customElements.define('greeting-component', GreetingElement);