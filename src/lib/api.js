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
