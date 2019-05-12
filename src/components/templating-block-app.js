import './templating-block-selector';
import './templating-block-fieldset';

const template = document.createElement('template');
template.innerHTML = `
<templating-block-selector></templating-block-selector>
<templating-block-fieldset></templating-block-fieldset>
`;

class TemplatingBlockApp extends HTMLElement {
	set fields(val) {
		this.querySelector('templating-block-fieldset').fields = val;
	}

	connectedCallback() {
		const dispatchEvent = type => e =>
			this.dispatchEvent(new CustomEvent('change', {
				detail: {
					...e.detail,
					type: type
				},
				bubbles: false
			}));

		// not using shadow DOM to avoid loading SLDS styles _everywhere_
		this.appendChild(template.content.cloneNode(true));

		this.querySelector('templating-block-selector').addEventListener('change', dispatchEvent('template'));
		this.querySelector('templating-block-fieldset').addEventListener('change', dispatchEvent('fields'));
	}
}

customElements.define('templating-block-app', TemplatingBlockApp);
