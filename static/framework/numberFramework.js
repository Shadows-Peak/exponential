
/*export default class LargeNumber {
    constructor(value) {
        this.value = BigInt(value);
    }

    add(other) {
        return new LargeNumber(this.value + other.value);
    }

    subtract(other) {
        return new LargeNumber(this.value - other.value);
    }

    multiply(other) {
        return new LargeNumber(this.value * other.value);
    }

    divide(other) {
        return new LargeNumber(this.value / other.value);
    }

    toString() {
        return this.value.toString();
    }
}

// Example usage:
{}
const num1 = new LargeNumber('1' + '0'.repeat(603));
const num2 = new LargeNumber('2');
const result = num1.add(num2);
console.log(result.toString()); // Outputs a number with 603 zeros followed by 2
*/