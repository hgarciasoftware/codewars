class Inspector {
  constructor() {
    this.requirements = new Map();
    this.restrictedCountries = new Set();
    this.wantedCriminal = null;

    for (let i = 0; i < Inspector.countries.length; i++) {
      const country = Inspector.countries[i];

      this.requirements.set(country, new Set());
      this.restrictedCountries.add(country);
    }
  }

  updateRequirements(update) {
    const who = update.match(/entrants|foreigners|citizens/)[0];
    const documentName = update.match(/require (.*)/)[1];

    let countries = null;

    if (who === 'entrants') {
      countries = Inspector.countries;
    } else if (who === 'foreigners') {
      countries = Inspector.countries.filter(country => country !== 'arstotzka');
    } else if (who === 'citizens') {
      countries = update.match(/citizens of (.*) require/)[1].split(', ');
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
    console.log(bulletin);
    console.log('------');

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
    console.log(person);
    console.log('======');

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

    if (entrantInformation.size === 0) return 'Entry denied: missing required passport.';
    if (expiredDocument !== null) return `Entry denied: ${expiredDocument} expired.`;

    const entrantNation = entrantInformation.get('nation');

    if (this.restrictedCountries.has(entrantNation)) return 'Entry denied: citizen of banned nation.';

    const requirementList = Array.from(this.requirements.get(entrantNation));
    const entrantDocuments = Object.keys(person).map(documentName => documentName.replace(/_/g, ' '));

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

      const entrantHasRequiredDocument = entrantDocuments.includes(documentName);

      if (!entrantHasRequiredDocument) {
        missingDocument = documentName;
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
