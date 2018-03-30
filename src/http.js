const got = require('got');

const baseUrls = {
	v1: 'https://api.flatlandchurch.com/v1',
	v2: 'https://api.flatlandchurch.com/v2'
};

class NotFoundError extends Error {
	constructor() {
		super('Resource not found');
		this.message = 'Resource was not found';
		this.name = 'NotFoundError';
		this.statusCode = 404;
	}
}

const handleError = err => {
	if (err.statusCode === 404) {
		throw new NotFoundError();
	}
	return err;
}

module.exports = version => ({
	get: (method, query = {}) => {
		const url = baseUrls[version] + method;
		const queryObj = query;
		queryObj.key = 'pk_e6afff4e5ad186e9ce389cc21c225';
		return got(url, {
			method: 'GET',
			query: queryObj
		})
			.then(res => JSON.parse(res.body))
			.catch(handleError);
	},
	post: (method, data) => {
		const url = baseUrls[version] + method;
		return got(url, {
			method: 'POST',
			body: data,
			query: { key: '202f1c42-7054-46ee-8ca2-ddc85f9c789b' }
		})
			.then(res => JSON.parse(res.body))
			.catch(handleError);
	}
});
