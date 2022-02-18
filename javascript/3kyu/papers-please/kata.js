class Inspector {
  static countries;

  constructor() {
    const countries = [
      "arstotzka", "antegria", "impor", "kolechia", "obristan", "republia", "united federation"
    ];

    Inspector.countries = countries;
    Inspector.normalize = function (string) {
      return string.toLowerCase().split(', ').reverse().join(' ')
    };
    this.requirements = {};
    this.allowedCountries = new Set();
    this.workerRequirements = new Set();
    this.restrictedCountries = new Set();
    this.wantedCriminal = null;

    for (let i = 0; i < countries.length; i++) {
      const country = countries[i];

      this.requirements[country] = new Set();
      this.restrictedCountries.add(country);
    }
  }

  updateRequirements(update) {
    console.log(update);

    const who = update.match(/entrants|foreigners|citizens|workers/)[0];
    const isNoLongerRequired = update.includes('no longer');
    const document = update.match(/require (.*)/)[1];
    let countries = null;

    if (who === 'entrants') {
      countries = Inspector.countries;
    } else if (who === 'foreigners') {
      countries = Inspector.countries.filter(country => country !== 'arstotzka');
    } else if (who === 'citizens') {
      countries = update.match(/citizens of (.*) require/)[1].split(', ');
    }

    if (who === 'workers') {
      if (isNoLongerRequired) {
        this.workerRequirements.delete(document);
      } else {
        this.workerRequirements.add(document);
      }
    } else {
      for (let i = 0; i < countries.length; i++) {
        const country = countries[i];

        if (isNoLongerRequired) {
          this.requirements[country].delete(document);
        } else {
          this.requirements[country].add(document);
        }
      }
    }
  }

  updateTravelBans(update) {
    console.log(update);

    const action = update.match(/allow|deny/)[0];
    const countries = update.match(/citizens of (.*)/)[1].split(', ');

    for (let i = 0; i < countries.length; i++) {
      const country = countries[i];

      if (action === "allow") {
        this.allowedCountries.add(country);
        this.restrictedCountries.delete(country);
      } else {
        this.allowedCountries.delete(country);
        this.restrictedCountries.add(country);
      }
    }
  }

  updateWantedCriminal(update) {
    console.log(update);

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

  inspect(person) {
    const map = new Map();

    for (const document in person) {
      const information = person[document].split('\n').map(info => info.split(': '));

      for (const [key, value] of information) {
        if (key === 'NAME' && Inspector.normalize(value) === this.wantedCriminal) {
          return 'Detainment: Entrant is a wanted criminal.';
        }

        if (key === 'EXP') {
          if (new Date(value) <= new Date('1982.11.22')) {
            return 'Entry denied: ' + document + ' expired.'
          }
        } else if (!map.has(key)) {
          map.set(key, value);
        } else if (map.get(key) !== value) {
          if (key === 'ID#') return 'Detainment: ID number mismatch.';
        }
      }
    }

    if (map.size === 0) return 'Entry denied: missing required passport.';

    const nation = map.get('NATION').toLowerCase();

    if (this.restrictedCountries.has(nation)) return 'Entry denied: citizen of banned nation.'

    const hasRequiredDocuments = Object.keys(person).every(document => {
      return this.requirements[map.get('NATION').toLowerCase()].has(document);
    });

    if (!hasRequiredDocuments) return 'Entry denied: missing required passport.';

    return nation === 'arstotzka' ? 'Glory to Arstotzka.' : 'Cause no trouble.';
  }
}
