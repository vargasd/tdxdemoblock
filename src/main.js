import '../node_modules/@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.css';
import './components/templating-block-app';
import SDK from 'blocksdk';
import { getHtml, parseTemplate } from './lib/templating-block-utils';

var sdk = new SDK();

async function triggerAuth() {
	const response = await fetch('/appID');
	sdk.triggerAuth(await response.text());
}

function initializeApp() {
	const app = document.createElement('templating-block-app');
	if (window.location.hash) {
		app.assetId = window.location.hash.substring(1);
	}

	// respond to app changes
	app.addEventListener('change', e => {
		// always get current data
		sdk.getData(blockData => {
			const newBlockData = blockData;

			// extend current data with new data
			switch (e.detail.type) {
				case 'template':
					newBlockData.template = e.detail.template;
					newBlockData.fields = parseTemplate(newBlockData.template);
					app.fields = newBlockData.fields;
					break;
				case 'fields':
					newBlockData.fields = e.detail.fields;
					break;
				default:
					break;
			}

			// always set data with latest
			sdk.setData(newBlockData);
			// set content with latest changes
			sdk.setContent(getHtml(newBlockData.template, newBlockData.fields, false));
			// update preview to use latest, with placeholders for preview
			sdk.setSuperContent(getHtml(newBlockData.template, newBlockData.fields, true));
		});
	});

	document.getElementById('workspace').appendChild(app);
}

triggerAuth();
initializeApp();
