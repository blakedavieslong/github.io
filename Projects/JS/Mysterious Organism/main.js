// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const pAequorFactory = (specimenNum, dna) => ({
  specimenNum,
  dna,
  mutate () {
    // select a random base to mutate
    const baseToMutate = Math.floor(Math.random() * 15);
    let newBase = dna[baseToMutate];
    // the new base must be different than the original
    while (newBase === dna[baseToMutate]) {
      newBase = returnRandBase();
    }
    dna[baseToMutate] = newBase;
      return this.dna;
  },
  compareDNA (toCompare) {
    let same = 0;
    // for each base see if they are the same between the strands
    for (let i = 0; i < this.dna.length; i++) {
      if (this.dna[i] === toCompare.dna[i]) {
        same++;
      }
    }
    console.log(`specimen #${this.specimenNum} and specimen #${toCompare.specimenNum} have ${same/(this.dna.length) * 100}% DNA in common`);
  },
  willLikelySurvive () {
    let good = 0;
    // check each base if it is a C or G
    for (let i = 0; i < this.dna.length; i++) {
      if (this.dna[i] === 'C' || this.dna[i] === 'G') {
        good++;
      }
    }
    // only a total of 60% C or G is likely to survive
    if ((good/this.dna.length) >= 0.6) {
      return true;
    } else {
      return false;
    }
  }
});

// create 30 specimens to work with
let specimens = [];
for (let i = 1; i <= 30; i++) {
  specimens.push(pAequorFactory(i, mockUpStrand()));
}

// testing output
console.log(specimens[0]);
console.log(specimens[0].dna);
console.log(specimens[0].willLikelySurvive());
console.log(specimens[1]);
console.log(specimens[1].dna);
console.log(specimens[1].willLikelySurvive());
specimens[0].compareDNA(specimens[1]);
