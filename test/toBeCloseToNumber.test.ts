import { toBeCloseToNumber } from '../src';

expect.extend({ toBeCloseToNumber });

  it('toBeCloseToNumber works as expected', () => {
describe('toBeCloseToNumber', () => {
    expect(1.2).toBeCloseToNumber(1.2 + Number.EPSILON * 2);
    expect(1.2).not.toBeCloseToNumber(1.2 + Number.EPSILON * 5);
  });
});
