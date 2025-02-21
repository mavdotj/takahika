export const START_GUESSES = 3;

export type GridNum = {
	value: number;
	sort?: number;
};

export class Game {
	guessesLeft = $state<number>(0);
	answer = $state<number>(0);
	grid = $state<GridNum[]>([]);
	state = $state<'pass' | 'fail' | 'play'>('play');

	constructor() {
		this.reset();
	}

	reset() {
		this.answer = random(75, 25);
		this.guessesLeft = START_GUESSES;
		this.grid = shuffle(fillGrid(this.answer));
		this.state = 'play';
	}

	shuffle() {
		this.grid = shuffle(this.grid);
	}

	guess(guess: number) {
		if (this.guessesLeft > 0) {
			if (this.answer === guess) {
				this.state = 'pass';
			} else {
				this.guessesLeft--;
				if (this.guessesLeft === 0) this.state = 'fail';
			}
		} else {
			this.state = 'fail';
		}
	}
}

function random(max: number, min: number): number {
	return Math.floor(Math.random() * (max - min)) + min;
}

function shuffle(arr: GridNum[]): GridNum[] {
	return arr
		.map((value) => ({ ...value, sort: Math.random() }))
		.sort((a, b) => a.sort - b.sort)
		.map((value) => ({ value: value.value }));
}

function fillGrid(answer: number) {
	let base: GridNum[] = [{ value: answer - 1 }, { value: answer + 1 }];
	for (const _ of new Array(100 - base.length).map((_, i) => i)) {
		const index = base.length;
		let value;
		value = { value: random(100, 1) };
		do {
			value = { value: random(100, 1) };
		} while (value.value === answer);
		base[index] = value;
	}
	return base;
}
