import { BankCardNumberSpaces } from './card-number';

describe('bankCardNumberSpaces', () => {
  let pipe: BankCardNumberSpaces;

  beforeEach(() => {
    pipe = new BankCardNumberSpaces();
  });

  it('should BankCard pipe created', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform card number with spaces', () => {
    const result = pipe.transform('1111222233334444');
    expect(result).toBe('1111 2222 3333 4444');
  });

  it('should transform card bank with null', () => {
    const result = pipe.transform(null);
    expect(result).toBe(' ');
  });

  it('should transform empty string in bank card pipe', () => {
    const result = pipe.transform('');
    expect(result).toBe(' ');
  });
});
