import fs from 'fs';
import readline from 'readline';

/**
 * Returns the checksum of a tab-separated value (TSV) file.
 * 
 * The checksum is calculated by adding the differences between
 * the largest and smallest numbers of each line.
 */
export async function getChecksum(filename: string) {
  const reader = readline.createInterface({
    input: fs.createReadStream(filename)
  });

  const diffs: Array<number> = [];
  for await (const line of reader) {
    const numbers = line.split('\t').map(n => Number(n));
    let largestNumber = numbers[0];  // initial value
    let smallestNumber = numbers[0]; // initial value

    for (const number of numbers) {
      if (number > largestNumber) {
        largestNumber = number;
      } else if (number < smallestNumber) {
        smallestNumber = number;
      }
    }
    diffs.push(largestNumber - smallestNumber);
  }
  return diffs.reduce((diff1, diff2) => diff1 + diff2);
};

/**
 * Verifies a checksum against a TSV file.
 */
export async function verifyChecksum(checksum: number, filename: string) {
  const actualChecksum = await getChecksum(filename);
  return checksum === actualChecksum;
};
