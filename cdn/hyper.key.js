const hyperKeyManager = {
  async verify(inputKey, repoName) {
    const res = await hyperMethod.getCustom(repoName, "hyper.key");
    if (!res) return false;
    return res.key === inputKey;
  },

  async create(projectName, fancyKey) {
    const keyData = {
      key: fancyKey,
      project: projectName,
      created: new Date().toISOString(),
      status: "active"
    };
    
    return await hyperMethod.post("hyper.key", keyData);
  }
};