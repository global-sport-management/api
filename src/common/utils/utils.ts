
const crypto = require('crypto');

export function roundToNearest15(date = new Date()) {
  const minutes = 15;
  const ms = 1000 * 60 * minutes;

  return new Date(Math.floor(date.getTime() / ms) * ms);
}

export function roundToNearest30(date = new Date()) {
  const minutes = 30;
  const ms = 1000 * 60 * minutes;

  return new Date(Math.floor(date.getTime() / ms) * ms);
}

export function getProp(o, props, defaultValue = undefined) {
  return props
    ? props
        .split('.')
        .reduce(
          (a, b) => (a && typeof a[b] !== 'undefined' ? a[b] : defaultValue),
          o,
        )
    : defaultValue;
}

export async function deleteCacheKey(storeManager, key) {
  const cacheList = await storeManager.keys(`*${key}*`);

  if (cacheList) {
    await Promise.all(
      cacheList.map(async (key) => {
        await storeManager.del(key);
      }),
    );
  }
  return cacheList;
}

export const compareNumber = (n1: number, n2: number, isDesc = false): number =>
  (isDesc ? -1 : 1) * (n1 > n2 ? 1 : n1 < n2 ? -1 : 0);

export interface CryptoNetwork {
  id: number;
  rpc: string;
  name: string;
  native_token_address: string;
  native_symbol: string;
}

export function generateBankAccountNumber(phoneNumber:string) {
  let accountNumber = '';
  
  do {
      accountNumber = '';
      for (let i = 0; i < 12; i++) {
          accountNumber += Math.floor(Math.random() * 10);
      }
  } while (accountNumber === phoneNumber);

  return accountNumber;
};
export function generateCIF(phoneNumber) {
  const phoneDigits = phoneNumber.split('').map(Number);
  let sum = 0;

  // Step 1: Add all digits of the phone number
  for (let i = 0; i < phoneDigits.length; i++) {
      sum += phoneDigits[i];
  }

  // Step 2: Generate a base CIF by appending the sum to the phone number
  let cif = phoneNumber + sum;

  // Step 3: Ensure the CIF number is 8-12 digits long (you can adjust this)
  // If it's too long, truncate; if too short, add some random digits
  if (cif.length > 12) {
      cif = cif.substring(0, 12);
  } else {
      while (cif.length < 8) {
          cif += Math.floor(Math.random() * 10);
      }
  }

  return cif;
}
export function generateCreditCardFromPhone(phoneNumber) {
  // Ensure the phone number is at least 10 digits
  if (phoneNumber.length < 10) {
      throw new Error('Phone number must be at least 10 digits long.');
  }

  // Use the first 6 digits of the phone number as the IIN (Issuer Identification Number)
  let creditCardNumber = phoneNumber.slice(0, 6);

  // Use the last 9 digits of the phone number for the next part of the credit card number
  let remainingDigits = phoneNumber.slice(-9);

  // Append a random digit to make it a 15-digit number (before the checksum digit)
  creditCardNumber += remainingDigits.slice(0, 9);

  // Apply the Luhn algorithm to generate the last check digit
  function luhnChecksum(ccNum) {
      let sum = 0;
      let doubleUp = false;
      for (let i = ccNum.length - 1; i >= 0; i--) {
          let digit = parseInt(ccNum[i]);
          if (doubleUp) {
              digit *= 2;
              if (digit > 9) {
                  digit -= 9;
              }
          }
          sum += digit;
          doubleUp = !doubleUp;
      }
      return sum % 10 === 0 ? 0 : 10 - (sum % 10);
  }

  // Generate the checksum digit
  let checksum = luhnChecksum(creditCardNumber);
  
  // Append the checksum digit to make it a valid credit card number
  creditCardNumber += checksum;

  return creditCardNumber;
}


export function generateCreditCardFromCIF(cifNumber) {
  // Ensure the CIF number is at least 8 digits
  if (cifNumber.length < 8) {
      throw new Error('CIF number must be at least 8 digits long.');
  }

  // Use the first 6 digits of the CIF number as the IIN (Issuer Identification Number)
  let creditCardNumber = cifNumber.slice(0, 6);

  // Use the remaining digits of the CIF number (or pad with random digits if needed) for the next part
  let remainingDigits = cifNumber.slice(6);
  if (remainingDigits.length < 9) {
      remainingDigits += Math.floor(Math.random() * Math.pow(10, 9 - remainingDigits.length))
                            .toString()
                            .padStart(9 - remainingDigits.length, '0');
  }

  // Combine to form the first 15 digits of the credit card number
  creditCardNumber += remainingDigits.slice(0, 9);

  // Apply the Luhn algorithm to generate the last check digit
  function luhnChecksum(ccNum) {
      let sum = 0;
      let doubleUp = false;
      for (let i = ccNum.length - 1; i >= 0; i--) {
          let digit = parseInt(ccNum[i]);
          if (doubleUp) {
              digit *= 2;
              if (digit > 9) {
                  digit -= 9;
              }
          }
          sum += digit;
          doubleUp = !doubleUp;
      }
      return sum % 10 === 0 ? 0 : 10 - (sum % 10);
  }

  // Generate the checksum digit
  let checksum = luhnChecksum(creditCardNumber);
  
  // Append the checksum digit to make it a valid credit card number
  creditCardNumber += checksum;

  return creditCardNumber;
}
export function generateApiKey() {
  return crypto.randomBytes(32).toString('hex');
}



