const CHAR64 = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_';

// const
export const DEG = Math.PI / 180;
export const PI2 = Math.PI * 2;
export const EPS = 1e-12;

// func
export const noop = () => {};
export const identity = (x) => x;
export const repeat = (n, f) => {
	for (let i = 0; i < n; i++) f(i);
}

// bit
export const rotl = (x, s) => (x << s) | (x >>> 32-s);
export const rotr = (x, s) => (x >>> s) | (x << 32-s);

// num
export const aeq = (a, b) => typeof a === 'number' && typeof b === 'number' && Math.abs(a-b) <= EPS;

export const clamp = (min, max, val) => val < min ? min : val > max ? max : val;
export const lerp = (a, b, x) => x * (b - a) + a;
export const unlerp = (a, b, x) => (x - a) / (b - a);
export const nmap = (a, b, c, d, x) => (x - a) * ((d - c) / (b - a)) + c;
export const mod = (x, m) => (x % m + m) % m;
export const fract = (x) => x - Math.floor(x);
export const smoothstep = (x) => (x = clamp(0, 1, x), x * x * (3 - 2 * x));
export const bias = (a, x) => (a * x) / (2 * a * x - a - x + 1);
export const gain = (a, x) => x < 0.5 ? bias(1 - a, 2 * x) / 2 : 1 - bias(1 - a, 2 - 2 * x) / 2;

// type
export const isNil = v => v == null;
export const isObject = v => v && typeof v === 'object';

// string
export const id = () => {
	let str = '';
	while (str.length < 8) str += CHAR64[Math.random()*64|0];
	return str;
}

// rand
export const chance = (p=0.5) => Math.random() < p;
export const rand = (a=1, b=0) => Math.random() * (b-a) + a;
export const randi = (a=1, b=0) => Math.floor(Math.random() * (b-a) + a);
export const randof = (a) => a[Math.floor(Math.random() * a.length)];

// array
export const last = (a) => a[a.length-1];
export const fill = (n, f) => {
	const a = new Array(n);
	for (let i=0; i<n; i++) a[i] = f(i,n);
	return a;
}
export const swap = (a, i, j) => {
	const v = a[i];
	a[i] = a[j];
	a[j] = v;
}
export const shuffle = (a) => {
	for (let i=a.length-1; i>0; i--) swap(a, i, Math.floor(Math.random() * (i + 1)));
	return a;
}
export const pull = (a, i) => {
	const v = a[i];
	a[i] = a[a.length-1];
	a.pop();
	return v;
}

// async
export const timeout = (t) => new Promise(r => setTimeout(r, t));
export const nextFrame = () => new Promise(requestAnimationFrame);
