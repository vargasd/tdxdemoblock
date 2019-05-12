import { getCustomTemplates } from '../lib/api';

const template = document.createElement('template');
template.innerHTML = `
<fieldset class="slds-form-element slds-box slds-m-bottom_x-small">
  <legend class="slds-form-element__legend slds-form-element__label">Choose a block template</legend>
  <div class="slds-form-element__control">
  </div>
</fieldset>
`;

class TemplatingBlockSelector extends HTMLElement {
	async connectedCallback() {
		this.appendChild(template.content.cloneNode(true));

		this.querySelector('.slds-form-element__control').addEventListener('change', e => {
			e.stopPropagation();
			if (assets) {
				this.dispatchEvent(new CustomEvent('change', {
					detail: {
						template: assets.items.find(asset => e.target.value == asset.id)
					},
					bubbles: false
				}));
			}
		});

		const assets = await getCustomTemplates();

		this.querySelector('.slds-form-element__control').innerHTML = assets.items.map(this.getRadioHtml).join('');
		if (this.assetId) {
			document.getElementById(this.assetId).checked = 'checked';
		}
	}

	getRadioHtml(asset) {
		return `
<span class="slds-radio">
	<input type="radio" id="${asset.id}" value="${asset.id}" name="template" />
	<label class="slds-radio__label" for="${asset.id}">
		<span class="slds-radio_faux"></span>
		<span class="slds-form-element__label">${asset.name}</span>
	</label>
</span>`;
	}
}

customElements.define('templating-block-selector', TemplatingBlockSelector);
