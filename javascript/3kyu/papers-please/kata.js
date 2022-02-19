class Inspector {
  constructor() {
    this.requirements = new Map();
    this.workerRequirements = new Set();
    this.restrictedCountries = new Set();
    this.wantedCriminal = null;

    for (let i = 0; i < Inspector.countries.length; i++) {
      const country = Inspector.countries[i];

      this.requirements.set(country, new Set());
      this.restrictedCountries.add(country);
    }
  }

  updateRequirements(update) {
    const who = update.match(/entrants|foreigners|citizens|workers/)[0];
    const documentName = update.match(/require (.*)/)[1];

    if (who === 'workers') {
      if (update.includes('no longer')) {
        this.workerRequirements.delete(documentName);
      } else {
        this.workerRequirements.add(documentName);
      }
    } else {
      let countries = [];

      if (who === 'entrants') {
        countries = Inspector.countries;
      } else if (who === 'foreigners') {
        countries = Inspector.countries.filter(country => country !== 'arstotzka');
      } else if (who === 'citizens') {
        countries = update.match(/citizens of (.*?) (?:no longer )?require/)[1].split(', ');
      }

      for (let i = 0; i < countries.length; i++) {
        const requirementSet = this.requirements.get(countries[i]);

        if (update.includes('no longer')) {
          requirementSet.delete(documentName);
        } else {
          requirementSet.add(documentName);
        }
      }
    }
  }

  updateTravelBans(update) {
    const action = update.match(/allow|deny/)[0];
    const countries = update.match(/citizens of (.*)/)[1].split(', ');

    for (let i = 0; i < countries.length; i++) {
      const country = countries[i];

      if (action === "allow") {
        this.restrictedCountries.delete(country);
      } else {
        this.restrictedCountries.add(country);
      }
    }
  }

  updateWantedCriminal(update) {
    const criminal = update.match(/wanted by the state: (.*)/)[1];

    this.wantedCriminal = criminal;
  }

  receiveBulletin(bulletin) {
    const bulletinArray = bulletin.split('\n');

    for (let i = 0; i < bulletinArray.length; i++) {
      const update = bulletinArray[i].toLowerCase();

      if (update.includes('require')) {
        this.updateRequirements(update);
      } else if (update.includes('allow') || update.includes ('deny')) {
        this.updateTravelBans(update);
      } else if (update.includes('wanted')) {
        this.updateWantedCriminal(update);
      } else {
        console.log('unhandled update: ' + update);
      }
    }
  }

  isAWantedCriminal(name) {
    name = name.split(', ').reverse().join(' ');

    return name === this.wantedCriminal;
  }

  inspect(person) {
    const entrantInformation = new Map();

    let expiredDocument = null;

    for (let documentName in person) {
      const infoList = person[documentName].split('\n');
      const infoEntries = infoList.map(info => info.toLowerCase().split(': '));

      for (const [key, value] of infoEntries) {
        if (key === 'name' && this.isAWantedCriminal(value)) {
          return 'Detainment: Entrant is a wanted criminal.';
        }

        if (entrantInformation.has(key) && entrantInformation.get(key) !== value) {
          if (key === 'id#') return 'Detainment: ID number mismatch.';
          if (key === 'nation') return 'Detainment: nationality mismatch.'
        }

        if (key === 'exp') {
          if (new Date(value) <= Inspector.cutoffDate) {
            expiredDocument = documentName.replace(/_/g, ' ');
          }
        } else if (!entrantInformation.has(key)) {
          entrantInformation.set(key, value);
        }
      }
    }

    if (!person.hasOwnProperty('passport')) return 'Entry denied: missing required passport.';
    if (expiredDocument !== null) return `Entry denied: ${expiredDocument} expired.`;

    const entrantNation = entrantInformation.get('nation');

    if (this.restrictedCountries.has(entrantNation)) return 'Entry denied: citizen of banned nation.';

    const requirementList = [...this.requirements.get(entrantNation)];

    if (entrantInformation.get('purpose') === 'work') {
      requirementList.push(...this.workerRequirements);
    }

    const entrantDocuments = Object.keys(person).map(documentName => documentName.toLowerCase().replace(/_/g, ' '));

    let entrantIsAuthorizedDiplomat = null;
    let missingDocument = null;

    const hasRequiredDocuments = requirementList.every(documentName => {
      if (documentName === 'access permit') {
        if (entrantDocuments.includes('grant of asylum')) return true;
        if (entrantDocuments.includes('diplomatic authorization')) {
          entrantIsAuthorizedDiplomat = entrantInformation.get('access').includes('arstotzka');

          return entrantIsAuthorizedDiplomat;
        }
      }

      let entrantHasRequiredDocument = entrantDocuments.includes(documentName);

      if (!entrantHasRequiredDocument) {
        if (documentName.includes('vaccination')) {
          if (entrantInformation.has('vaccines')) {
            const vaccination = documentName.match(/(.*) vaccination/)[1];
            const vaccinationList = entrantInformation.get('vaccines').split(', ');

            missingDocument = vaccinationList.includes(vaccination) ? null : 'vaccination';
            entrantHasRequiredDocument = missingDocument === null;
          } else {
            missingDocument = 'certificate of vaccination';
          }
        } else if (documentName === 'id card') {
          missingDocument = 'ID card';
        } else {
          missingDocument = documentName;
        }
      }

      return entrantHasRequiredDocument;
    });

    if (!hasRequiredDocuments) {
      if (entrantIsAuthorizedDiplomat === false) {
        return 'Entry denied: invalid diplomatic authorization.'
      }

      return `Entry denied: missing required ${missingDocument}.`;
    }

    return entrantNation === 'arstotzka' ? 'Glory to Arstotzka.' : 'Cause no trouble.';
  }
}

Inspector.countries = [
  "arstotzka", "antegria", "impor", "kolechia", "obristan", "republia", "united federation"
];
Inspector.cutoffDate = new Date('1982.11.22');
