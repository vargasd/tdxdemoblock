import { getImages } from '../lib/api';
import './image-card';

const template = document.createElement('template');
template.innerHTML = `
<button class="slds-button slds-button_neutral">Select</button>
<div class="slds-grid slds-gutters slds-wrap slds-grid_vertical-stretch" style="display: none;"></div>
`;

class ImageSelector extends HTMLElement {
	constructor () {
		super();

		this._toggleSelector = this._toggleSelector.bind(this);
	}

	async connectedCallback() {
		this.appendChild(template.content.cloneNode(true));
		this.grid = this.getElementsByClassName('slds-grid')[0];

		this.getElementsByTagName('button')[0].addEventListener('click', this._toggleSelector);

		this.addEventListener('change', e => {
			this.value = e.detail.value;
			this._toggleSelector();
		});

		const images = await getImages();
		this.grid.innerHTML = images.items.map(this._getImageHTML).join('');
	}

	_getImageHTML(image) {
		return `
<div class="slds-col slds-size_1-of-2 slds-p-top_x-small">
	<image-card id="${image.id}" name="${image.name}" url="${image.fileProperties.publishedURL}"></image-card>
</div>
		`;
	}

	_toggleSelector() {
		this.grid.style.display = this.grid.style.display === 'none' ? 'flex' : 'none';
	}
}

customElements.define('image-selector', ImageSelector);
