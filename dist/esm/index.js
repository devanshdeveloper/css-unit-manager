export class CSSUnitManager {
    value;
    unit;
    initialValue;
    static customConversionRates = {}; // Store dynamically added units
    constructor(value, unit) {
        if (typeof value !== "number" || !CSSUnitManager.isValidUnit(unit)) {
            throw new Error("Invalid value or unit");
        }
        this.value = value;
        this.unit = unit;
        this.initialValue = value; // Store original value for reset
    }
    // Static method to validate units
    static isValidUnit(unit) {
        return Object.keys(CSSUnitManager.getConversionRates()).includes(unit);
    }
    // Dynamic conversion rates that calculate at runtime and include custom units
    static getConversionRates() {
        const isBrowser = typeof window !== "undefined";
        const pxToVw = isBrowser ? 100 / window.innerWidth : 0;
        const pxToVh = isBrowser ? 100 / window.innerHeight : 0;
        const pxToVmin = isBrowser
            ? 100 / Math.min(window.innerWidth, window.innerHeight)
            : 0;
        const pxToVmax = isBrowser
            ? 100 / Math.max(window.innerWidth, window.innerHeight)
            : 0;
        const defaultRates = {
            // Base pixel conversion
            px: {
                em: 0.0625, // 16px = 1em
                rem: 0.0625, // 16px = 1rem
                vw: pxToVw,
                vh: pxToVh,
                vmin: pxToVmin,
                vmax: pxToVmax,
                percent: 6.25, // Assuming 100% = 16px (default browser font-size)
                in: 1 / 96, // 1 inch = 96px
                cm: 1 / 37.795275591, // 1cm = 37.795275591px
                mm: 1 / 3.7795275591, // 1mm = 3.7795275591px
                pt: 1 / 1.333333, // 1pt = 1.333333px (1pt = 1/72in, 1in = 96px)
                pc: 1 / 16, // 1pc = 16px (1pc = 12pt)
                ex: 0.5, // 1ex ≈ 0.5em (varies based on font)
                ch: 0.5, // 1ch ≈ width of the "0" character in the font
                Q: 1 / 106.299212598, // 1Q = 1/40th of 1cm
                twip: 0.0666667, // 1 twip = 1/1440 inch = 0.0666667px
            },
            // em units conversion
            em: {
                px: 16,
                rem: 1,
                vw: 16 * pxToVw,
                vh: 16 * pxToVh,
                vmin: 16 * pxToVmin,
                vmax: 16 * pxToVmax,
                percent: 100, // 1em = 100%
                in: 16 / 96, // Convert em to inches
                cm: 16 / 37.795275591,
                mm: 16 / 3.7795275591,
                pt: 16 / 1.333333,
                pc: 16 / 16,
                ex: 0.5,
                ch: 0.5,
                Q: 16 / 106.299212598,
                twip: 16 * 0.0666667,
            },
            // rem units conversion (same as em but relative to root)
            rem: {
                px: 16,
                em: 1,
                vw: 16 * pxToVw,
                vh: 16 * pxToVh,
                vmin: 16 * pxToVmin,
                vmax: 16 * pxToVmax,
                percent: 100,
                in: 16 / 96,
                cm: 16 / 37.795275591,
                mm: 16 / 3.7795275591,
                pt: 16 / 1.333333,
                pc: 16 / 16,
                ex: 0.5,
                ch: 0.5,
                Q: 16 / 106.299212598,
                twip: 16 * 0.0666667,
            },
            cm: {
                px: 37.795275591, // 1cm = 37.795275591px
                em: 37.795275591 / 16, // 1em = 37.795275591/16cm (assuming 16px = 1em)
                rem: 37.795275591 / 16, // 1rem = 37.795275591/16cm
                percent: 37.795275591 / 9600, // Percent to cm conversion (1% = 1px)
                vw: 37.795275591 / (window.innerWidth / 100), // Calculate based on viewport width
                vh: 37.795275591 / (window.innerHeight / 100), // Calculate based on viewport height
                vmin: 37.795275591 /
                    (Math.min(window.innerWidth, window.innerHeight) / 100), // Minimum of vw and vh
                vmax: 37.795275591 /
                    (Math.max(window.innerWidth, window.innerHeight) / 100), // Maximum of vw and vh
                in: 1 / 2.54, // 1 inch = 2.54 cm
                mm: 10, // 1cm = 10mm
                pt: 1 / (1.0 / 2.54) / 72, // 1pt = 1/72 inch = 1/72*2.54cm
                pc: 1 / (1.0 / 2.54) / 12, // 1pc = 12pt
                ex: (37.795275591 / 16) * 0.5, // Assuming 1ex ≈ 0.5em
                ch: (37.795275591 / 16) * 0.5, // Assuming 1ch ≈ 0.5em
                Q: 40, // 1Q = 1/40th of a cm
                twip: 1440 / (2.54 * 96), // 1 twip = 1/1440 inch
            },
            // percentage units conversion
            percent: {
                px: 0.16, // 1% = 1px
                em: 0.01,
                rem: 0.01,
                vw: 1,
                vh: 1,
                vmin: 1,
                vmax: 1,
                in: 1 / 9600, // Percent to inch conversion
                cm: 1 / 3779.5275591,
                mm: 1 / 377.95275591,
                pt: 1 / 133.3333,
                pc: 1 / 1600,
                ex: 0.005,
                ch: 0.005,
                Q: 1 / 10629.9212598,
                twip: 0.0010667,
            },
            // viewport width units conversion
            vw: {
                px: isBrowser ? window.innerWidth / 100 : 0,
                em: (isBrowser ? window.innerWidth / 100 : 0) / 16,
                rem: (isBrowser ? window.innerWidth / 100 : 0) / 16,
                percent: 1,
                vh: isBrowser ? window.innerHeight / window.innerWidth : 0,
                vmin: 1,
                vmax: 1,
                in: isBrowser ? window.innerWidth / 9600 : 0,
                cm: isBrowser ? window.innerWidth / 3779.5275591 : 0,
                mm: isBrowser ? window.innerWidth / 377.95275591 : 0,
                pt: isBrowser ? window.innerWidth / 133.3333 : 0,
                pc: isBrowser ? window.innerWidth / 1600 : 0,
                ex: 0.0625,
                ch: 0.0625,
                Q: isBrowser ? window.innerWidth / 10629.9212598 : 0,
                twip: (isBrowser ? window.innerWidth / 9600 : 0) * 0.0666667,
            },
            // viewport height units conversion
            vh: {
                px: isBrowser ? window.innerHeight / 100 : 0,
                em: (isBrowser ? window.innerHeight / 100 : 0) / 16,
                rem: (isBrowser ? window.innerHeight / 100 : 0) / 16,
                percent: 1,
                vw: isBrowser ? window.innerWidth / window.innerHeight : 0,
                vmin: 1,
                vmax: 1,
                in: isBrowser ? window.innerHeight / 9600 : 0,
                cm: isBrowser ? window.innerHeight / 3779.5275591 : 0,
                mm: isBrowser ? window.innerHeight / 377.95275591 : 0,
                pt: isBrowser ? window.innerHeight / 133.3333 : 0,
                pc: isBrowser ? window.innerHeight / 1600 : 0,
                ex: 0.0625,
                ch: 0.0625,
                Q: isBrowser ? window.innerHeight / 10629.9212598 : 0,
                twip: (isBrowser ? window.innerHeight / 9600 : 0) * 0.0666667,
            },
            // vmin conversion (minimum of vw and vh)
            vmin: {
                px: isBrowser
                    ? Math.min(window.innerWidth, window.innerHeight) / 100
                    : 0,
                em: (isBrowser
                    ? Math.min(window.innerWidth, window.innerHeight) / 100
                    : 0) / 16,
                rem: (isBrowser
                    ? Math.min(window.innerWidth, window.innerHeight) / 100
                    : 0) / 16,
                percent: 1,
                vw: 1,
                vh: 1,
                vmax: 1,
                in: isBrowser
                    ? Math.min(window.innerWidth, window.innerHeight) / 9600
                    : 0,
                cm: isBrowser
                    ? Math.min(window.innerWidth, window.innerHeight) / 3779.5275591
                    : 0,
                mm: isBrowser
                    ? Math.min(window.innerWidth, window.innerHeight) / 377.95275591
                    : 0,
                pt: isBrowser
                    ? Math.min(window.innerWidth, window.innerHeight) / 133.3333
                    : 0,
                pc: isBrowser
                    ? Math.min(window.innerWidth, window.innerHeight) / 1600
                    : 0,
                ex: 0.0625,
                ch: 0.0625,
                Q: isBrowser
                    ? Math.min(window.innerWidth, window.innerHeight) / 10629.9212598
                    : 0,
                twip: (isBrowser
                    ? Math.min(window.innerWidth, window.innerHeight) / 9600
                    : 0) * 0.0666667,
            },
            // vmax conversion (maximum of vw and vh)
            vmax: {
                px: isBrowser
                    ? Math.max(window.innerWidth, window.innerHeight) / 100
                    : 0,
                em: (isBrowser
                    ? Math.max(window.innerWidth, window.innerHeight) / 100
                    : 0) / 16,
                rem: (isBrowser
                    ? Math.max(window.innerWidth, window.innerHeight) / 100
                    : 0) / 16,
                percent: 1,
                vw: 1,
                vh: 1,
                vmin: 1,
                in: isBrowser
                    ? Math.max(window.innerWidth, window.innerHeight) / 9600
                    : 0,
                cm: isBrowser
                    ? Math.max(window.innerWidth, window.innerHeight) / 3779.5275591
                    : 0,
                mm: isBrowser
                    ? Math.max(window.innerWidth, window.innerHeight) / 377.95275591
                    : 0,
                pt: isBrowser
                    ? Math.max(window.innerWidth, window.innerHeight) / 133.3333
                    : 0,
                pc: isBrowser
                    ? Math.max(window.innerWidth, window.innerHeight) / 1600
                    : 0,
                ex: 0.0625,
                ch: 0.0625,
                Q: isBrowser
                    ? Math.max(window.innerWidth, window.innerHeight) / 10629.9212598
                    : 0,
                twip: (isBrowser
                    ? Math.max(window.innerWidth, window.innerHeight) / 9600
                    : 0) * 0.0666667,
            },
        };
        return { ...defaultRates, ...CSSUnitManager.customConversionRates };
    }
    // Add new unit with conversion rates
    static addUnit(unit, conversionRates) {
        // Ensure real-time updates for custom units
        Object.entries(conversionRates).forEach(([targetUnit, rate]) => {
            CSSUnitManager.customConversionRates[unit] =
                CSSUnitManager.customConversionRates[unit] || {};
            // Allow real-time calculation for dynamic values like vw and vh
            CSSUnitManager.customConversionRates[unit][targetUnit] =
                typeof rate === "function" ? rate() : rate;
        });
    }
    // Parse a CSS string like '20px' into an instance of CSSUnitManager
    static fromString(cssString) {
        const regex = /^([\d.]+)(px|em|rem|percent|vw|vh|cm)$/; // Add 'cm' here
        const match = cssString.match(regex);
        if (!match)
            throw new Error("Invalid CSS string");
        return new CSSUnitManager(parseFloat(match[1]), match[2]);
    }
    // Convert current unit to another unit
    toUnit(targetUnit) {
        const conversionRates = CSSUnitManager.getConversionRates();
        if (!CSSUnitManager.isValidUnit(targetUnit)) {
            throw new Error(`Conversion to ${targetUnit} is not supported.`);
        }
        if (this.unit === targetUnit)
            return new CSSUnitManager(this.value, targetUnit);
        const conversionRate = conversionRates[this.unit][targetUnit];
        if (!conversionRate) {
            throw new Error(`No conversion available from ${this.unit} to ${targetUnit}`);
        }
        const newValue = this.value * conversionRate;
        return new CSSUnitManager(newValue, targetUnit);
    }
    toFixed(digits) {
        this.value = +this.value.toFixed(digits);
    }
    add(value, unit = this.unit) {
        const otherValue = new CSSUnitManager(value, unit).toUnit(this.unit).value;
        this.value += otherValue;
        return this;
    }
    subtract(value, unit = this.unit) {
        const otherValue = new CSSUnitManager(value, unit).toUnit(this.unit).value;
        this.value -= otherValue;
        return this;
    }
    multiply(factor) {
        if (typeof factor !== "number")
            throw new Error("Factor must be a number");
        this.value *= factor;
        return this;
    }
    divide(factor) {
        if (typeof factor !== "number")
            throw new Error("Factor must be a number");
        this.value /= factor;
        return this;
    }
    clamp(min, max) {
        if (min > max)
            throw new Error("Min cannot be greater than Max");
        this.value = Math.max(min, Math.min(this.value, max));
        return this;
    }
    min(value, unit = this.unit) {
        const otherValue = new CSSUnitManager(value, unit).toUnit(this.unit).value;
        this.value = Math.min(this.value, otherValue);
        return this;
    }
    max(value, unit = this.unit) {
        const otherValue = new CSSUnitManager(value, unit).toUnit(this.unit).value;
        this.value = Math.max(this.value, otherValue);
        return this;
    }
    normalize(min = 0, max = 100) {
        if (min > max)
            throw new Error("Min cannot be greater than Max");
        this.value = (this.value - min) / (max - min);
        return this;
    }
    toAuto() {
        return "auto";
    }
    reset() {
        this.value = this.initialValue;
        return this;
    }
    toString() {
        return `${this.value}${this.unit}`;
    }
    toNumber() {
        return this.value;
    }
    isEqual(other) {
        const convertedOther = other.toUnit(this.unit);
        return this.value === convertedOther.value;
    }
}
export default function unit(string) {
    return CSSUnitManager.fromString(string);
}
//# sourceMappingURL=index.js.map