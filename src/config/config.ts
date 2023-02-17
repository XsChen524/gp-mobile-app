const config = {
    "url": {
        "env":{
            "dev": "http://localhost:7001"
        },
        "index": "/",
        "auth": {
            "index": "/",
            "signup": "/auth/signup",
            "login": "/auth/login"
        }
    }
}

export default config;