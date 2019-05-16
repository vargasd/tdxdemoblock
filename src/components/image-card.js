let template = document.createElement('template');
template.innerHTML = `
<article class="slds-box slds-box" style="cursor: pointer; height: 100%;">
	<span class="name" style="word-break: break-all;"></span>
	<div class="slds-card__body slds-card__body_inner">
		<img />
	</div>
</article>
`;

class ImageCard extends HTMLElement {
	connectedCallback() {
		this.appendChild(template.content.cloneNode(true));

		this.getElementsByClassName('name')[0].innerText = this.getAttribute('name');
		this.getElementsByTagName('img')[0].src = this.getAttribute('url');

		this.addEventListener('click', () => {
			this.dispatchEvent(new CustomEvent('change', {
				detail: {
					value: this.getAttribute('url')
				},
				bubbles: true
			}));
		});
	}
}

customElements.define('image-card', ImageCard);
