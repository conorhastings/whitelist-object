const whitelist = require('./whitelist');

test('numeric scalar', () => {
	expect(
		whitelist({ numeric_int: 1, numeric_float: 1.01, other_int: 1, other_float: 1.01 }, [
			'numeric_int',
			'numeric_float'
		])
	).toEqual({ numeric_int: 1, numeric_float: 1.01 });
});

test('string scalar', () => {
	expect(whitelist({ string: 'foo bar', other_string: 'fubar' }, ['string'])).toEqual({
		string: 'foo bar'
	});
});

test('boolean scalar', () => {
	expect(whitelist({ bool: false, also_bool: true }, ['bool'])).toEqual({ bool: false });
});

test('null scalar', () => {
	expect(whitelist({ nullable: null, other: true }, ['nullable'])).toEqual({ nullable: null });
});

test('array of scalars', () => {
	expect(whitelist({ arr: [true, 10, 'hello world'], other_arr: [1] }, ['arr'])).toEqual({
		arr: [true, 10, 'hello world']
	});
});

test('array of arrays', () => {
	expect(whitelist({ arr: [[true]], other_arr: [1] }, ['arr'])).toEqual({
		arr: [[true]]
	});
});

test('array of objects', () => {
	expect(
		whitelist({ arr: [{ child: 'foo', other: 'bar' }], other_arr: [1] }, ['arr', 'child'])
	).toEqual({
		arr: [{ child: 'foo' }]
	});
});

test('nested objects with deep key comparison', () => {
	expect(
		whitelist({ obj: { child: true, child_arr: [1], banned: 7 } }, ['obj', 'child', 'child_arr'])
	).toEqual({
		obj: { child: true, child_arr: [1] }
	});
});

test('nested objects with shallow key comparison', () => {
	expect(whitelist({ obj: { child: true }, other: false }, ['obj'], true)).toEqual({
		obj: { child: true }
	});
});
