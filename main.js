export const DEG = Math.PI / 180;
export const PI2 = Math.PI * 2;
export const EPS = 1e-12;
export const CHAR64 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_";


/** Does nothing, returns nothing. */
export const noop = () => {};

export const identity = (x) => x;

/** Calls `f` a total of `n` times. */
export const repeat = (n, f) => {
	for (let i = 0; i < n; i++) f(i);
};

export const rotl = (x, s) => (x << s | x >>> 32 - s) >>> 0;
export const rotr = (x, s) => (x >>> s | x << 32 - s) >>> 0;

/** Population count. Returns the number of `1`s in the binary representation of `x`. */
export const popcnt = x => (
	x -= ((x >> 1) & 0x55555555),
	x = (x & 0x33333333) + ((x >> 2) & 0x33333333),
	((x + (x >> 4) & 0xF0F0F0F) * 0x1010101) >> 24
);

/** Approximately equal. */
export const aeq = (a, b) => typeof a === "number" && typeof b === "number" && Math.abs(a - b) <= EPS;

export const inRange = (x, min, max) => x >= min && x < max;
export const clamp = (x, min, max) => x < min ? min : x > max ? max : x;

export const fsdma = (f, x, m = 1, a = 0) => f((x - a) / m) * m + a;

/** Maps `x` from [0, 1] to [a, b]. */
export const lerp = (a, b, x) => x * (b - a) + a;

/** Maps `x` from [a, b] to [0, 1]. */
export const unlerp = (a, b, x) => (x - a) / (b - a);

/** Maps `x` from [a, b] to [c, d]. */
export const nmap = (a, b, c, d, x) => (x - a) * ((d - c) / (b - a)) + c;

/** The modulo operator. */
export const mod = (x, m) => (x % m + m) % m;
export const fract = (x) => x - Math.floor(x);
export const smoothstep = (x) => x * x * (3 - 2 * x);
export const smootherstep = (x) => x * x * x * (x * (x * 6 - 15) + 10);
export const bias = (x, a) => (a * x) / (2 * a * x - a - x + 1);
export const gain = (x, a) => x < 0.5 ? bias(1 - a, 2 * x) / 2 : 1 - bias(1 - a, 2 - 2 * x) / 2;
export const tri = (x) => 1 - Math.abs(2 * fract(0.5 * x) - 1);

export const floor = fsdma.bind(null, Math.floor);
export const round = fsdma.bind(null, Math.round);
export const ceil = fsdma.bind(null, Math.ceil);

/** Maps `x` from [-1, 1] to [0, 1]. */
export const b2u = (x) => x * 0.5 + 0.5;

/** Maps `x` from [0, 1] to [-1, 1]. */
export const u2b = (x) => x * 2 - 1;

export const cot = (x) => 1 / Math.tan(x);
export const sec = (x) => 1 / Math.cos(x);
export const csc = (x) => 1 / Math.sin(x);

export const isNil = v => v == null;
export const isObject = v => v && typeof v === "object";

/** True if `v` is a number and isn't `NaN`. */
export const isNumber = v => typeof v === "number" && !Number.isNaN(v);

export const hash = (str) => {
	let hash = 0;
	for (let i = 0; i < str.length; i++) hash = ((hash << 5) - hash) + str.charCodeAt(i) >>> 0;
	return hash;
};

export const gcd = (a, b) => {
	while (b !== 0) [a, b] = [b, a % b];
	return b;
};


// Random ================================================================

export const chance = (p = 0.5) => Math.random() < p;
export const rand = (a = 1, b = 0) => Math.random() * (b - a) + a;
export const randi = (a = 1, b = 0) => Math.floor(Math.random() * (b - a) + a);
export const randof = (a) => a[Math.floor(Math.random() * a.length)];
export const randn = () => Math.sqrt(-2 * Math.log(1 - Math.random())) * Math.cos(PI2 * Math.random());
export const id = () => {
	let str = "";
	while (str.length < 8) str += randof(CHAR64);
	return str;
};


// Array ================================================================

export const fill = (n, f, c = Array) => {
	const a = new c(n);
	for (let i = 0; i < n; i++) a[i] = f(i, n);
	return a;
};

export const swap = (a, i, j) => {
	const v = a[i];
	a[i] = a[j];
	a[j] = v;
};

/** The Fisher-Yates shuffle. */
export const shuffle = (a) => {
	for (let i = a.length - 1; i > 0; i--) swap(a, i, Math.floor(Math.random() * (i + 1)));
	return a;
};

/** Removes and returns the value at `a[i]`. Faster than `Array.prototype.splice`, but messes up the order of the elements. */
export const pull = (a, i) => {
	const v = a[i];
	a[i] = a[a.length - 1];
	a.pop();
	return v;
};

export const mapTo = (a, b, f) => {
	const len = Math.min(a.length, b.length);
	for (let i = 0; i < len; i++) b[i] = f(a[i], i);
	return b;
};


// Iterable ================================================================

export const selectBy = (iter, map, sel) => {
	iter = iter[Symbol.iterator]();
	let a = iter.next().value;
	let x = map(a);
	for (const b of iter) {
		const y = map(b);
		if (sel(y, x)) a = b, x = y;
	}
	return a;
};

export function* count(...args) {
	let i = 0, end, step = 1, incl = false;
	switch (args.length) {
		case 1:
			[end] = args; break;
		case 2: typeof args[1] === "number"
			? [i, end] = args
			: [end, incl] = args; break;
		case 3: typeof args[2] === "number"
			? [i, end, step] = args
			: [i, end, incl] = args; break;
		case 4:
			[i, end, step, incl] = args; break;
		default:
			throw new Error("bad args");
	}
	step = Math.abs(step) * Math.sign(end - i);
	if (i < end) {
		if (incl) do yield i; while ((i += step) <= end);
		else      do yield i; while ((i += step) < end);
	} else {
		if (incl) do yield i; while ((i += step) >= end);
		else      do yield i; while ((i += step) > end);
	}
}

export function* chunk(a, n) {
	let chunk = [];
	for (const v of a) if (chunk.push(v) >= n) {
		yield chunk;
		chunk = [];
	}
	if (chunk.length) yield chunk;
}

export const timeout = (t, ...args) => new Promise(r => setTimeout(r, t, ...args));

/** Throws an error with `msg`. For use where a throw statement can't be used. */
export const err = (msg) => {
	throw new Error(msg);
};
export const assert = (t, msg) => {
	if (!t) throw new Error(msg);
};
export const xor = (a, b) => a ? !b : !!b;

export function interp(a, x, f = identity) {
	let i = Math.floor(x);
	const t = x - i;
	i = mod(i, a.length);
	const j = (i + 1) % a.length;

	return lerp(a[i], a[j], f(t));
}
