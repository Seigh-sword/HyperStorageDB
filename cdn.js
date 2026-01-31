const HyperStorage = {
  version: "1.0.0",
  
  async init() {
    await HyperDB.init();
    console.log("Console.log(Console.log(Console.log(Console.log(Console.log(Console.log(Console.log(Console.log(Console.log(I like 69!)))))))))");
  },

  save: async (path, data) => await hyperMethod.post(path, data),
  load: async (path) => await hyperMethod.get(path),
  
  admin: {
    generateKey: (prefix) => hyperKey.gen(prefix),
    createNewNode: (name) => hyperRandom.createRepoName(name),
    registerProject: (name, id) => hyperChain.registerNode(name, id)
  }
};

window.HyperStorage = HyperStorage;