import './templating-block-selector';
import './templating-block-fieldset';

class TemplatingBlockApp extends HTMLElement {
	set fields(val) {
		this.fieldSet.fields = val;
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
		if (!this.locked) {
			const selector = document.createElement('templating-block-selector');
			selector.assetId = this.assetId;
			this.appendChild(selector);
			selector.addEventListener('change', dispatchEvent('template'));
		}

		this.fieldSet = document.createElement('templating-block-fieldset');
		this.appendChild(this.fieldSet);

		this.fieldSet.addEventListener('change', dispatchEvent('fields'));
	}
}

customElements.define('templating-block-app', TemplatingBlockApp);
