const whitelist = require('./whitelist');

test('supports numeric scalar', () => {
	expect(
		whitelist({ numeric_int: 1, numeric_float: 1.01 }, ['numeric_int', 'numeric_float'])
	).toEqual({ numeric_int: 1, numeric_float: 1.01 });
});

