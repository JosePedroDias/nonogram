export function identity(i) {
    return i;
}

export function times(n, getterFn = identity) {
    return Array.from(new Array(n), (_, i) => getterFn(i));
}

export function zip(a, b) {
    const out = [];
    for (let y of a) {
        for (let x of b) {
            out.push([y, x]);
        }
    }
    return out;
}

export class Matrix {
    constructor(rows, cols, getterFn = () => 0) {
        this.rows = rows;
        this.cols = cols;
        this.data = times(rows).map((y) => times(cols, (x) => getterFn(y, x)));
    }

    rowIndices() {
        return times(this.rows);
    }

    colIndices() {
        return times(this.cols);
    }

    positions() {
        return zip(this.rowIndices(), this.colIndices());
    }

    getCell(y, x) {
        const row = this.data[y];
        return row && row[x];
    }

    setCell(y, x, val) {
        const row = this.data[y];
        if (x >= row.length) { throw new Error('out of bounds'); }
        row[x] = val;
    }

    getRow(y) {
        return Array.from(this.data[y]);
    }

    getCol(x) {
        return this.data.map(row => row[x]);
    }

    toString() {
        return this.data.map(row => row.join('')).join('\n');
    }
}
