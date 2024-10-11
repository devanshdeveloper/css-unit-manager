type ConversionRates = {
    [unit: string]: {
        [targetUnit: string]: number;
    };
};
export default class CSSUnitManager {
    private value;
    private unit;
    private initialValue;
    private static customConversionRates;
    constructor(value: number, unit: string);
    static isValidUnit(unit: string): boolean;
    static getConversionRates(): ConversionRates;
    static addUnit(unit: string, conversionRates: {
        [key: string]: number | (() => number);
    }): void;
    static fromString(cssString: string): CSSUnitManager;
    toUnit(targetUnit: string): CSSUnitManager;
    toFixed(digits: number): void;
    add(value: number, unit?: string): this;
    subtract(value: number, unit?: string): this;
    multiply(factor: number): this;
    divide(factor: number): this;
    clamp(min: number, max: number): this;
    min(value: number, unit?: string): this;
    max(value: number, unit?: string): this;
    normalize(min?: number, max?: number): this;
    toAuto(): string;
    reset(): this;
    toString(): string;
    toNumber(): number;
    isEqual(other: CSSUnitManager): boolean;
}
export {};
