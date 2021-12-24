class QuoteElement extends HTMLElement {
    static get observedAttributes() {
        return ['sentence'];
    }

    attributeChangedCallback(attr, oldValue, newValue) {
        if (attr === 'sentence') {
            this.textContent = `${newValue}`;
        }
    }
}

customElements.define('quote-component', QuoteElement);