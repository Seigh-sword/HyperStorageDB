const HyperDB = {
    async init() {
        const scripts = [
            'cdn.helper.json',
            'random.char.gen.js',
            'methods.js',
            'project.manager.js',
            'hyper.key.js',
            'key.gen.js'
        ];

        for (const file of scripts) {
            if (file.endsWith('.json')) {
                const res = await fetch(`./${file}`);
                this.config = await res.json();
            } else {
                await this.loadScript(`./${file}`);
            }
        }
        
        this.methods = hyperMethod;
        this.random = hyperRandom;
        this.project = hyperChain;
        this.keyManager = hyperKeyManager;
        this.keyGen = hyperKey;
        
        this.methods.config.url = this.config.settings.api_url;
        this.methods.config.activeRepo = this.config.active_repo;
        
        console.log("HyperStorageDB Loaded & Ready");
    },

    loadScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }
};

HyperDB.init();