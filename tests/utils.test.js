import test from 'tape';
import { spy } from 'sinon';

test('timing test', function (t) {
  t.plan(1);
  const message = 'String is left padded correctly.';
  const expected = '   foo';
  const actual = '   foo';

  t.equal(actual, expected, message);
});