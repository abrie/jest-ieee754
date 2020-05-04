import { toBeCloseToNumber } from '../src';

expect.extend({ toBeCloseToNumber });

describe('toBeCloseToNumber', () => {
  it('works as expected with default maxULP', () => {
    expect(1.2).toBeCloseToNumber(1.2 + Number.EPSILON * 2);
    expect(1.2).toBeCloseToNumber(1.2 + Number.EPSILON * 4);
    expect(1.2).not.toBeCloseToNumber(1.2 + Number.EPSILON * 5);
  });

  it('correctly uses user-defined maxULP', () => {
    expect(22 / 7).toBeCloseToNumber(Math.PI, BigInt(2847376696626));
  });
});
