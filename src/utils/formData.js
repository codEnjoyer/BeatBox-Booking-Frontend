export const toJson = (formData) => {
	const object = {};
	formData.forEach((value, key) => object[key] = value);
	return JSON.stringify(object);
}