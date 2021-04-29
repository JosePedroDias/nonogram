import tap from 'tap';

import { Nonogram, isSet, toHint, nonogramFromString } from '../nonogram.mjs';

tap.test('Nonogram', (t) => {
    t.end();
});

tap.test('isSet', (t) => {
    tap.equal(isSet(' '), false);
    tap.equal(isSet('O'), true);

    t.end();
});

tap.test('toHint', (t) => {
    tap.same(toHint([false, true, true]), [2]);
    tap.same(toHint([true, true]), [2]);
    tap.same(toHint([true, true, false, true, false]), [2, 1]);

    t.end();
});

// https://www.nonograms.org/nonograms/i/42855
tap.test('nonogramFromString', (t) => {
    const str = `   OOOO   
 OOO    O 
 OO    OOO
OO      O 
OO        
OO        
OOO      O
 OOO    O 
 OOOOOOOO 
   OOOO   `;
    const nng = nonogramFromString(str);

    tap.same(nng.hintsY, [
        [4],
        [3, 1],
        [2, 3],
        [2, 1],
        [2],
        [2],
        [3, 1],
        [3, 1],
        [8],
        [4]
    ], 'same hintsY');

    tap.same(nng.hintsX, [
        [4],
        [8],
        [2, 3],
        [2, 3],
        [1, 2],
        [1, 2],
        [1, 1],
        [3, 2],
        [1, 1]
    ], 'same hintsX');

    tap.equal(nng.toString(), `??????????
??????????
??????????
??????????
??????????
??????????
??????????
??????????
??????????
??????????`, 'same data');

    t.end();
});
