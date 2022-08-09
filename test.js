import test from "ava";
import * as _ from "./main.js";

const ZERO_TO_NINE = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

test("simplify", t => {
	t.is(
		_.simplify("ça va être compliqué"), // it's going to be complicated
		"ca va etre complique",
	);
	t.is(
		_.simplify("½"),
		"1/2",
	);
});

test("chunk", t => {
	t.deepEqual(
		[..._.chunk([], Infinity)],
		[],
	);
	t.deepEqual(
		[..._.chunk(ZERO_TO_NINE, 3)],
		[[0, 1, 2], [3, 4, 5], [6, 7, 8], [9]],
	);
	t.deepEqual(
		[..._.chunk(ZERO_TO_NINE, 10)],
		[ZERO_TO_NINE],
	);
});
