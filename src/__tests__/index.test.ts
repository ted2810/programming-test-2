import {getChecksum, verifyChecksum} from '../index';

test('getChecksum()', async () => {
  const checksum = await getChecksum('data.tsv');
  expect(checksum).toBe(32121);
});

test('verifyChecksum()', async () => {
  const [result1, result2] = await Promise.all([
    verifyChecksum(32121, 'data.tsv'),
    verifyChecksum(10, 'data.tsv')
  ]);

  expect(result1).toBe(true);
  expect(result2).toBe(false);
});
