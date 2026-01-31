const hyperRandom = {
  generate(length = 5) {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  },

  createRepoName(projectName) {
    const suffix = this.generate(5);
    return `HyperStorageDB-${projectName}-${suffix}`;
  }
};