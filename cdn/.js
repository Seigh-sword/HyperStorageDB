const HyperDB = {
    config: {
        url: "https://hyperstoragedb.vercel.app",
        registryRepo: "HyperStorageDB.ProjectsCollection",
        activeRepo: "HyperStorageDB.ProjectsCollection"
    },

    keys: {
        animals: ['cats', 'dogs', 'lions', 'bears', 'wolves', 'birds', 'fish', 'owls'],
        gen(prefix = 'LL') {
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let str = '';
            for (let i = 0; i < 15; i++) str += chars.charAt(Math.floor(Math.random() * chars.length));
            const animal = this.animals[Math.floor(Math.random() * this.animals.length)];
            return `HyperStorageDB_${prefix}${str}-${Math.floor(10000 + Math.random() * 90000)}-${animal}`;
        }
    },

    async save(path, data, targetRepo = null) {
        const repo = targetRepo || this.config.activeRepo;
        const res = await fetch(`${this.config.url}/hyper-save`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                repo: repo,
                path: path,
                content: JSON.stringify(data)
            })
        });
        return res.json();
    },

    async get(path, targetRepo = null) {
        const repo = targetRepo || this.config.activeRepo;
        const res = await fetch(`${this.config.url}/hyper-get?repo=${repo}&path=${path}`);
        return res.json();
    },

    setProject(repoName) {
        this.config.activeRepo = repoName;
        console.log("Switched to project:", repoName);
    }
};

console.log("HyperStorageDB Single-File Engine Loaded ");