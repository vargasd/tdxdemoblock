async function post (url, data) {
	const response = await fetch('/proxy/' + url, {
		method: 'POST',
		body: JSON.stringify(data),
	});
	return await response.json();
}

export async function getBlock(id) {
	const response = await fetch(`/proxy/asset/v1/content/assets/${id}`);
	return await response.json();
}

export async function getCustomTemplates() {
	return await post('asset/v1/content/assets/query', {
		query: {
			property: 'tags',
			simpleOperator: 'where',
			value: 'customblock-template'
		}
	});
}

function getImagesCached() {
	let images;
	return async () => {
		if (!images) {
			images = post('asset/v1/content/assets/query', {
				query: {
					property: "assetType.id",
					simpleOperator: "in",
					value: [20, 22, 23, 28]
				}
			});
		}
		return images;
	}
}

export const getImages = getImagesCached();
