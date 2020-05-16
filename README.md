# Jest extension for matching numbers by ULP distance

This extension wraps [`@eirba/ieee754`](https://github.com/abrie/ieee754) for use in [Jest](https://github.com/facebook/jest) unit tests. The following matchers are provided:

- `toBeCloseToNumber(a:number, maxUlp?:bigint):boolean`
- `toBeCloseToArraySnapshot():boolean`

## Install

- `yarn add @eirba/jest-ieee754`

or

- `npm install @eirba/jest-ieee754`

## Examples

For usage examples, please see the [unit tests](https://github.com/abrie/jest-ieee754/tree/master/test).
