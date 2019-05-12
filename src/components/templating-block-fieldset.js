import './image-selector';

const template = document.createElement('template');
template.innerHTML = `
<div class="slds-box">
</div>
`;

class TemplatingBlockFieldSet extends HTMLElement {
	set fields(val) {
		if (val) {
			this.firstElementChild.innerHTML = val.map(this.getFieldHtml).join('');
			this._fields = val;
		}
	}

	async connectedCallback() {
		this.appendChild(template.content.cloneNode(true));

		this.firstElementChild.addEventListener('change', e => {
			e.stopPropagation();
			this.dispatchEvent(new CustomEvent('change', {
				detail: {
					fields: this._fields.map(
						(field, idx) => {
							return {
								...field,
								value: this.querySelector(`#template-field-${idx}`).value
							};
						}
					)
				},
				bubbles: false
			}));
		});
	}

	getFieldHtml(field, idx) {
		return `
<div class="slds-form-element">
	<label class="slds-form-element__label" for="template-field-${idx}">${field.title}</label>
	<div class="slds-form-element__control">
		${field.type === 'image' ?
			'<image-selector ' :
			'<input type="text" class="slds-input" '
		} id="template-field-${idx}" value="${field.value || ''}" />
	</div>
</div>
`;
	}
}

customElements.define('templating-block-fieldset', TemplatingBlockFieldSet);
