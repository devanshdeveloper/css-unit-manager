# CSSUnitManager

A TypeScript utility for converting between CSS units dynamically.

## Installation

```bash
npm install css-unit-manager
```

## Usage

```js
import unit, { CSSUnitManager } from "css-unit-manager";

// Create a new instance
const unitManager = new CSSUnitManager(16, "px");

// Convert to another unit
const remValue = unitManager.toUnit("rem").toString(); // "1rem"

// Add a custom unit
CSSUnitManager.addUnit("myUnit", {
  px: 2, // 1 myUnit = 2px
  em: 0.125, // 1 myUnit = 0.125em
});

// Parse from string
const parsedUnit = unit("20px");

// Perform arithmetic operations
const result = unitManager.add(10).multiply(2).toString(); // "52px"

// Reset to initial value
unitManager.reset();

// Convert to a fixed number of decimals
unitManager.toFixed(2);

// Clamp value between a range
unitManager.clamp(10, 50);

// Output as string
console.log(unitManager.toString()); // "16px"
```

## API

### Constructor

```ts
new CSSUnitManager(value: number, unit: string);
```

- value: The numeric value.
- unit: The CSS unit (e.g., px, em, rem, vw, vh, etc.).

### Static Methods

- CSSUnitManager.isValidUnit(unit: string): boolean: Check if the unit is valid.
- CSSUnitManager.addUnit(unit: string, conversionRates: { [key: string]: number | (() => number) }): void: Add a custom unit with conversion rates.
- CSSUnitManager.fromString(cssString: string): CSSUnitManager: Parse a CSS string (e.g., "20px") into an instance of CSSUnitManager.

### Instance Methods

- .toUnit(targetUnit: string): CSSUnitManager: Convert the current value to another unit.
- .toFixed(digits: number): void: Round the value to a fixed number of decimal places.
- .add(value: number, unit?: string): this: Add another value (optionally with a different unit).
- .subtract(value: number, unit?: string): this: Subtract another value (optionally with a different unit).
- .multiply(factor: number): this: Multiply the value by a factor.
- .divide(factor: number): this: Divide the value by a factor.
- .clamp(min: number, max: number): this: Clamp the value between min and max.
- .min(value: number, unit?: string): this: Set the value to the minimum of the current and the provided value.
- .max(value: number, unit?: string): this: Set the value to the maximum of the current and the provided value.
- .normalize(min?: number, max?: number): this: Normalize the value between min and max (default: 0 to 100).
- .toAuto(): string: Set the value to "auto".
- .reset(): this: Reset the value to the initial one.
- .toString(): string: Return the value as a string with the unit.
- .toNumber(): number: Return the value as a number.
- .isEqual(other: CSSUnitManager): boolean: Check if two instances are equal (after unit conversion).
