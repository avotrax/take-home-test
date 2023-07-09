import { UPDATE_RATES } from "./update_rates";

const MAX_BENEFIT = 50;
const MIN_BENEFIT = 0;

/** Class representing a Drug */
export class Drug {
  /**
   * Create a drug.
   * @param {string} name - The drug's name.
   * @param {number} expiresIn - Number of days before expiration (>0)
   * or after expiration (<0)
   * @param {benefit} benefit - The drug's benefit. In the [0-50] range.
   */
  constructor(name, expiresIn, benefit) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
  }

  /**
   * Update the drug's benefit and expiresIn attributes.
   */
  update() {
    this.updateBenefitValue();
    this.updateExpiresInValue();
  }

  /**
   * Update the drug's benefit based on its update rates
   * @returns {number} The updated benefit
   */
  updateBenefitValue() {
    const update_rate = this.getCurrentUpdateRate();

    if (update_rate > 0) {
      this.benefit = Math.min(this.benefit + update_rate, MAX_BENEFIT);
    } else {
      this.benefit = Math.max(this.benefit + update_rate, MIN_BENEFIT);
    }

    return this.benefit;
  }

  /**
   * Decrement the expiresIn attribute except for Magic Pill.
   * @returns {number} The updated expiresIn attribute
   */
  updateExpiresInValue() {
    if (this.name != "Magic Pill") {
      this.expiresIn--;
    }

    return this.expiresIn;
  }

  /**
   * Get the update rate to apply to the benefit, based on the current expiresIn
   * value
   * @returns {number} the update rate
   */
  getCurrentUpdateRate() {
    var drug_update_rates = [];
    var current_pair = [];

    // Use the update rates for the current drug
    if (this.name in UPDATE_RATES) {
      drug_update_rates = UPDATE_RATES[this.name];
    } else {
      drug_update_rates = UPDATE_RATES["Default"];
    }

    // Sort in case UPDATES_RATES is not declared in descending order
    drug_update_rates.sort(function (a, b) {
      return b[0] - a[0];
    });

    // Before expiration
    if (this.expiresIn > 0) {
      current_pair = drug_update_rates.find((elem) => this.expiresIn > elem[0]);
      return current_pair[1];
    } else {
      // After expiration
      current_pair = drug_update_rates.find((elem) => elem[0] < 0);
      if (current_pair != undefined) {
        return current_pair[1];
      } else {
        // if no update rate is given for after the expiration date, we suppose that the drug is not
        // efficient anymore. Like Fervex.
        return -this.benefit;
      }
    }
  }
}

/** Class representing a Pharmacy. A pharmacy is an array of drugs */
export class Pharmacy {
  /** Create a pharmacy
   * @param {[Drug]} drugs - an array of Drugs
   */
  constructor(drugs = []) {
    this.drugs = drugs;
  }

  /**
   * Call the update function for each drug in the pharmacy
   * @returns {[Drug]} - the updated drugs
   */
  updateBenefitValue() {
    for (var i = 0; i < this.drugs.length; i++) {
      this.drugs[i].update();
    }

    return this.drugs;
  }
}
