const placeholderRegex = /\[\[(\w+)\|([^|]+)\|([^\]]*)\]\]/g;

export function parseTemplate (template) {
	const fields = [];
	let match;

	while (match = placeholderRegex.exec(template.content)) {
		fields.push({
			type: match[1],
			title: match[2]
		});
	}

	return fields;
}

export function getHtml(template, fields = [], isFallback) {
	let idx = 0;
	return template.content.replace(placeholderRegex,
		(match, type, title, placeholder) => {
			let replaceVal = '';
			if (fields[idx] && fields[idx].value) {
				replaceVal = fields[idx].value;
			} else if (isFallback) {
				replaceVal = placeholder;
			}
			idx++;
			return replaceVal;
		}
	);
}
