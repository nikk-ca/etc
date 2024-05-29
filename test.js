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

test("rotl", t => {
	t.is(_.rotl(0xFFFFFFFF, 0), 0xFFFFFFFF);
	t.is(_.rotl(0x12345678, 12), 0x45678123);
	t.is(_.rotl(0b00010001000100010001000100010001, 1), 0b00100010001000100010001000100010);
});
test("rotr", t => {
	t.is(_.rotr(0xFFFFFFFF, 0), 0xFFFFFFFF);
	t.is(_.rotr(0x12345678, 12), 0x67812345);
	t.is(_.rotr(0b00010001000100010001000100010001, 1), 0b10001000100010001000100010001000);
});
test("popcnt", t => {
	t.is(_.popcnt(0), 0);
	t.is(_.popcnt(1), 1);
	t.is(_.popcnt(0xFFFFFFFF), 32);
	t.is(_.popcnt(0x12345678), 13);
});

test("xor", t => {
	t.is(_.xor(0, 0), false);
	t.is(_.xor(1, 0), true);
	t.is(_.xor(0, 1), true);
	t.is(_.xor(1, 1), false);
	t.is(_.xor("1", "0"), false);
});

test("fsdma", t => {
	t.is(_.fsdma(x => x, 7), 7);
	t.is(_.fsdma(x => x, 123, 234, 456), 123);
});

test("floor", t => {
	t.is(_.floor(2.7183), 2);
	t.is(_.floor(3.1416), 3);
	t.is(_.floor(3.1416, 0.25), 3);
	t.is(_.floor(8.2, 8, 2), 2);
});
test("round", t => {
	t.is(_.round(2.7183), 3);
	t.is(_.round(3.1416), 3);
	t.is(_.round(3.1416, 0.25), 3.25);
	t.is(_.round(8.2, 8, 2), 10);
});
test("ceil", t => {
	t.is(_.ceil(2.7183), 3);
	t.is(_.ceil(3.1416), 4);
	t.is(_.ceil(3.1416, 0.25), 3.25);
	t.is(_.ceil(8.2, 8, 2), 10);
});

test("b2u", t => {
	t.is(_.b2u(0), 0.5);
	t.is(_.b2u(0.5), 0.75);
	t.is(_.b2u(1), 1);
});
test("u2b", t => {
	t.is(_.u2b(0), -1);
	t.is(_.u2b(0.5), 0);
	t.is(_.u2b(1), 1);
});

test("selectBy", t => {
	t.is(_.selectBy([1, 2, 3, 4, 5, 6, 7, 8], x => x % 6, (a, b) => a > b), 5);
});

test("count", t => {
	t.deepEqual([..._.count(5)], [0, 1, 2, 3, 4]);
	t.deepEqual([..._.count(5, true)], [0, 1, 2, 3, 4, 5]);
	t.deepEqual([..._.count(-2)], [0, -1]);
	t.deepEqual([..._.count(-4, -2, true)], [-4, -3, -2]);
	t.deepEqual([..._.count(0, 4, -0.5, true)], [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4]);
});
