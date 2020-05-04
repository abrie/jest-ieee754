import { ulpDistance } from '@eirba/ieee754';
import { Context } from './types';
import State from './state';

function serialize(arr: number[]): string {
  return JSON.stringify(arr);
}

/* This function will throw an exception if param is not defined. */
function deserialize(str: string): number[] {
  return JSON.parse(str);
}

/* Catch failed deserialization and return an empty array to force a new snapshot */
function tryDeserialize(str: string): number[] {
  try {
    return deserialize(str);
  } catch {
    return [];
  }
}

function compare(want: number[], got: number[], maxUlp: bigint): boolean {
  if (want.length !== got.length) {
    return false;
  }

  return want.every((_, idx) => ulpDistance(want[idx], got[idx]) <= maxUlp);
}

export default function toBeCloseToArraySnapshot(
  this: Context,
  received: number[],
  maxUlp: bigint = BigInt(4)
) {
  const state = new State(this);

  const snapshot = state.getSnapshot();
  const expected = tryDeserialize(snapshot);

  const pass = compare(expected, received, maxUlp);

  state.markSnapshotsAsCheckedForTest();

  if (pass) {
    state.setSnapshot(serialize(received));
  }

  state.updateTally(pass);

  if (state.couldAddSnapshot()) {
    state.addSnapshot(serialize(received));

    return {
      message: () => '',
      pass: true,
    };
  }

  if (!pass) {
    return {
      message: () => `expected: ${expected}\n received: ${received}`,
      actual: serialize(received),
      count: state.count,
      expected: serialize(expected),
      key: state.key,
      pass: false,
    };
  }

  return {
    message: () => '',
    actual: serialize(received),
    count: state.count,
    expected: '',
    key: state.key,
    pass: true,
  };
}
