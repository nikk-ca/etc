import test from "ava";
import * as _ from "./main.js";

test("chunk", t => {
	t.deepEqual(
		[..._.chunk([], 1)],
		[],
	);

	t.deepEqual(
		[..._.chunk([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3)],
		[[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]],
	);
});
