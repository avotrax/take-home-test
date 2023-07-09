import { UPDATE_RATES } from "./update_rates";

const MAX_BENEFIT = 50;
const MIN_BENEFIT = 0;

export class Drug {
  constructor(name, expiresIn, benefit) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
  }

  update() {
    this.updateBenefitValue();
    this.updateExpiresInValue();
  }

  updateBenefitValue() {
    const update_rate = this.getCurrentUpdateRate();

    if (update_rate > 0) {
      this.benefit = Math.min(this.benefit + update_rate, MAX_BENEFIT);
    } else {
      this.benefit = Math.max(this.benefit + update_rate, MIN_BENEFIT);
    }

    return this.benefit;
  }

  updateExpiresInValue() {
    if (this.name != "Magic Pill") {
      this.expiresIn--;
    }

    return this.expiresIn;
  }

  getCurrentUpdateRate() {
    var drug_update_rates = [];
    var current_pair= [];

    if (this.name in UPDATE_RATES) {
      drug_update_rates = UPDATE_RATES[this.name];
    } else {
      drug_update_rates = UPDATE_RATES["Default"];
    }

    // Sort in case UPDATES_RATES is not declared properly
    drug_update_rates.sort(function(a, b) {return b[0] - a[0]});

    // Before expiration
    if (this.expiresIn > 0) {
      current_pair = drug_update_rates.find(elem => this.expiresIn > elem[0]);
      return current_pair[1];
    } else {
      // After expiration
      current_pair = drug_update_rates.find(elem => elem[0] < 0);
      if (current_pair != undefined) {
        return current_pair[1];
      } else {
        //if no update rate is given for after the expiration date, we suppose that the drug is not
        // efficient anymore. Like Fervex.
        return -this.expiresIn;
      }
    }

  }
}

export class Pharmacy {
  constructor(drugs = []) {
    this.drugs = drugs;
  }
  updateBenefitValue() {
    for (var i = 0; i < this.drugs.length; i++) {
      this.drugs[i].update();
    }

    return this.drugs;
    }
}
