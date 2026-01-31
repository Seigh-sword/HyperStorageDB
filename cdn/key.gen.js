const hyperKey = {
  animals: ['cats', 'dogs', 'lions', 'bears', 'wolves', 'birds', 'fish', 'owls' ],
  
  gen(fancyPrefix = 'LL') {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
    for (let i = 0; i < 15; i++) {
      randomString += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    let randomNums = '';
    for (let i = 0; i < 5; i++) {
      randomNums += Math.floor(Math.random() * 10);
    }

    const animal = this.animals[Math.floor(Math.random() * this.animals.length)];

    return `HyperStorageDB_${fancyPrefix}${randomString}-${randomNums}-${animal}`;
  }
};