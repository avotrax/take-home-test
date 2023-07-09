/**
 * Each Drug has its own array of update rates.
 * An update rate is a pair where:
 * The first element is the expiresIn until which the associated update value must
 * be used during drug daily udpate.
 * The second element is the update to add to the drug's benefit.
 * For instance [0, 1] means: "Until it's expired, the benefit of the drug increase
 * by +1 each day".
 * To specify the update rate after expiration, use -1 as first element.
 */
export const UPDATE_RATES = {
    "Herbal Tea": [ [0, 1], [-1, 2] ],
    "Magic Pill": [ [-1, 0] ],
    "Fervex": [ [10, 1], [5, 2], [0, 3] ],
    "Dafalgan": [ [0, -2], [-1, -4]],
    "Default": [ [0, -1], [-1, -2]],
};