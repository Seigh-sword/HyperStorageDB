const hyperChain = {
  config: {
    currentRepo: "HyperStorageDB.ProjectsCollection",
    currentFile: "1.json"
  },

  async nextStep(type, currentName) {
    let nextName;
    if (type === 'file') {
      const num = parseInt(currentName.split('.')[0]) + 1;
      nextName = `${num}.json`;
    } else {
      const parts = currentName.split('.');
      const version = parts.length > 1 ? parseInt(parts[parts.length - 1]) + 1 : 2;
      nextName = `HyperStorageDB.ProjectsCollection.${version}`;
    }

    await hyperMethod.post("more.txt", { next: nextName });
    return nextName;
  },

  async saveWithCheck(path, data) {
    const content = JSON.stringify(data);
    
    if (content.length > 95000000) {
      const nextFile = await this.nextStep('file', this.config.currentFile);
      this.config.currentFile = nextFile;
    }

    const res = await fetch(`${hyperMethod.config.url}/hyper-save`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        repo: this.config.currentRepo,
        path: this.config.currentFile,
        content: content
      })
    });

    if (res.status === 403) {
      const nextRepo = await this.nextStep('repo', this.config.currentRepo);
      this.config.currentRepo = nextRepo;
      return this.saveWithCheck(path, data);
    }

    return res.json();
  }
};