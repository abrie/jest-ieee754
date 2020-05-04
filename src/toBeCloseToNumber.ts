import { ulpDistance } from '@eirba/ieee754';

export default function toBeCloseToNumber(
  got: number,
  want: number,
  maxUlp: bigint = BigInt(4)
) {
  const diff = ulpDistance(want, got);
  const pass = diff <= maxUlp;

  if (pass) {
    return {
      message: () =>
        `received (${got}) and expected (${want}) have a ULP distance of ${diff} which does not exceed the maximum ULP distance of ${maxUlp}.`,
      pass: true,
    };
  }
  return {
    message: () =>
      `received (${got}) and expected (${want}) have a ULP distance of ${diff} ULP which exceeds maximum of ${maxUlp}.`,
    pass: false,
  };
}
