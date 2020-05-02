import { ulpDistance } from '@eirba/ieee754';

export default function toBeCloseToNumber(got: number, want: number) {
  const diff = ulpDistance(want, got);
  const maxUlp = BigInt(4);
  const pass = diff <= maxUlp;

  if (pass) {
    return {
      message: () =>
        `received (${got}) and expected (${want}) differ by ${diff} ULP`,
      pass: true,
    };
  }
  return {
    message: () =>
      `received (${got}) and expected (${want}) differ by ${diff} ULP`,
    pass: false,
  };
}
