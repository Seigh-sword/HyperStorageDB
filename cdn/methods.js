const hyperMethod = {
  config: {
    url: "https://hyperstoragedb.vercel.app",
    activeRepo: "" 
  },

  async post(path, data) {
    const res = await fetch(`${this.config.url}/hyper-save`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        repo: this.config.activeRepo,
        path: path,
        content: JSON.stringify(data)
      })
    });
    return res.json();
  },

  async get(path) {
    const res = await fetch(`${this.config.url}/hyper-get`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        repo: this.config.activeRepo,
        path: path
      })
    });
    const result = await res.json();
    try {
      return JSON.parse(result.data);
    } catch (e) {
      return result.data;
    }
  },

  async put(path, data) {
    return await this.post(path, data);
  },

  async del(path) {
    return await this.post(path, { __deleted: true });
  }
};