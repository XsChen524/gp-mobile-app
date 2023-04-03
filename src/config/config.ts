const config = {
	env: {
		dev: "http://192.168.1.110:7001",
		pro: "https://mobile.tracechain.top",
	},
	url: {
		index: "/",
		auth: {
			index: "/",
			signup: "/auth/signup",
			login: "/auth/login",
		},
		user: {
			index: "/user",
		},
		item: {
			index: "/items",
			getAll: "/items/all",
		},
	},
};

export default config;
