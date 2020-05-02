/* eslint-disable import/no-extraneous-dependencies */
/* tslint:disable:no-implicit-dependencies */
/* Because this is Jest extension, and Jest is present. */

import { MatcherState } from 'expect';
import { Context } from 'jest-snapshot';

/* SnapshotState interface is made to match https://github.com/facebook/jest/blob/4a59daa8715bde6a1b085ff7f4140f3a337045aa/packages/jest-snapshot/src/State.ts#L54
 */
export interface SnapshotState {
  _counters: Map<string, number>;
  _updateSnapshot: 'new' | 'all' | 'none';
  _snapshotData: Record<string, string>;
  _snapshotPath: string;
  markSnapshotsAsCheckedForTest: (testName: string) => void;
  _addSnapshot: (
    key: string,
    receivedSerialized: string,
    options: { isInline: boolean; error?: Error }
  ) => void;
  updated: number;
  added: number;
  unmatched: number;
  matched: number;
}

export SnapshotContext = Context

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeCloseToNumber(a: Number): CustomMatcherResult;
      toBeCloseToArraySnapshot(): CustomMatcherResult;
    }
  }
}
