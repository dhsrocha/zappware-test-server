import { sum } from './main.js';

export default {};

describe('Sample suite', (): void => {
  it(`GIVEN operands 1 and 2
      WHEN summing them up
      THEN should return 3.`, (): void => {
    expect(sum(1, 2)).toBe(3);
  });
});
