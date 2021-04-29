import { Matrix } from './matrix.mjs';

export const UNKNOWN = '?';
export const UNSET = ' ';
export const SET = 'O';

export class Nonogram {
    constructor(hintsY, hintsX) {
        this.hintsY = hintsY;
        this.hintsX = hintsX;
        const rows = hintsY.length;
        const cols = hintsX.length;
        this.data = new Matrix(rows, cols, () => UNKNOWN);
    }

    toString() {
        return this.data.toString();
    }
}

export function isSet(s) {
    return s && s !== UNSET;
}

export function toHint(bools) {
    return bools.reduce(
        ({ filled, inFilled }, b) => {
            if (!b) { return { filled, inFilled: false }; }
            if (inFilled) {
                const rest = [...filled];
                const last = rest.pop() + 1;
                return { filled: [...rest, last], inFilled: true };
            }
            return { filled: [...filled, 1], inFilled: true };
        },
        { filled: [], inFilled: false }
    ).filled;
}

export function nonogramFromString(str) {
    const rows = str.split('\n');
    const cols = rows[0].length;
    const m = new Matrix(rows.length, cols, (y, x) => isSet(rows[y][x]));

    const hintsY = m.rowIndices().map(y => toHint(m.getRow(y)));
    const hintsX = m.colIndices().map(x => toHint(m.getCol(x)));

    return new Nonogram(hintsY, hintsX);
}
