async function post (url, data) {
	const response = await fetch('/proxy/' + url, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: self.headers,
		credentials: 'include',
		mode: 'no-cors'
	});
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

export function getImagesCached() {
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
