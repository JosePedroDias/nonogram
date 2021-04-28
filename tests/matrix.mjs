import tap from 'tap';

import { times, zip, Matrix } from '../matrix.mjs';

tap.test('times', (t) => {
    tap.same(times(2), [0, 1]);

    t.end();
});

tap.test('zip', (t) => {
    tap.same(zip(['a', 'b'], [1, 2, 3]).map(arr => arr.join('')), ['a1', 'a2', 'a3', 'b1', 'b2', 'b3']);

    t.end();
});

tap.test('matrix constructor', (t) => {
    const m = new Matrix(3, 2, (y, x) => `${y},${x}`);

    tap.equal(m.rows, 3, 'same rows');
    tap.equal(m.cols, 2, 'same cols');

    tap.same(m.data, [
        ['0,0', '0,1'],
        ['1,0', '1,1'],
        ['2,0', '2,1']
    ], 'same data');

    t.end();
});

tap.test('matrix rowIndices', (t) => {
    const m = new Matrix(3, 2);

    tap.same(m.rowIndices(), [0, 1, 2]);

    t.end();
});

tap.test('matrix colIndices', (t) => {
    const m = new Matrix(3, 2);

    tap.same(m.colIndices(), [0, 1]);

    t.end();
});

tap.test('matrix positions', (t) => {
    const m = new Matrix(3, 2);

    tap.same(m.positions(), [
        [0, 0], [0, 1],
        [1, 0], [1, 1],
        [2, 0], [2, 1],
    ]);

    t.end();
});

tap.test('matrix getCell', (t) => {
    const m = new Matrix(3, 2, (y, x) => `${y},${x}`);

    tap.equal(m.getCell(0, 0), `0,0`);
    tap.equal(m.getCell(1, 0), `1,0`);
    tap.equal(m.getCell(0, 1), `0,1`);
    tap.equal(m.getCell(2, 1), `2,1`);
    tap.equal(m.getCell(1, 3), undefined, 'out of bounds');

    t.end()
});

tap.test('matrix setCell', (t) => {
    const m = new Matrix(3, 2, (y, x) => `${y},${x}`);

    m.setCell(0, 0, `A`);
    m.setCell(1, 0, `B`);
    m.setCell(0, 1, `C`);
    m.setCell(2, 1, `D`);
    tap.throws(() => m.setCell(1, 3, 'X'), 'out of bounds');

    tap.equal(m.data[0][0], 'A');
    tap.equal(m.data[1][0], 'B');
    tap.equal(m.data[0][1], 'C');
    tap.equal(m.data[2][1], 'D');

    t.end()
});

tap.test('matrix getRow', (t) => {
    const rows = [1, 2, 3];
    const cols = ['a', 'b'];
    const m = new Matrix(3, 2, (y, x) => `${rows[y]}${cols[x]}`);

    tap.same(m.getRow(0), ['1a', '1b']);
    tap.same(m.getRow(2), ['3a', '3b']);

    t.end();
});

tap.test('matrix getCol', (t) => {
    const rows = [1, 2, 3];
    const cols = ['a', 'b'];
    const m = new Matrix(3, 2, (y, x) => `${rows[y]}${cols[x]}`);

    tap.same(m.getCol(0), ['1a', '2a', '3a']);
    tap.same(m.getCol(1), ['1b', '2b', '3b']);

    t.end();
});

tap.test('matrix toString', (t) => {
    const m = new Matrix(3, 2, (y, x) => `${y},${x}`);

    tap.equal(m.toString(), `0,00,1
1,01,1
2,02,1`);

    t.end()
});