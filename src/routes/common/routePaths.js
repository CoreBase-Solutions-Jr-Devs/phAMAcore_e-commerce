export const AUTH_ROUTES = {};

export const PROTECTED_ROUTES = {};

export const isAuthRoute = (pathname) => {
	return Object.values(AUTH_ROUTES).some((routePattern) => {
		const regex = new RegExp(
			`^${routePattern.replace(/:[^/]+/g, '[^/]+')}$`
		);
		return regex.test(pathname);
	});
};


export const resolveRoute = (template, params = {}) => {
	return template.replace(/:([a-zA-Z]+)/g, (_, key) =>
		params[key] !== undefined ? params[key] : `:${key}`
	);
};