import { writable } from "svelte/store";

export const START_GUESSES = 3;

export type GridNum = {
    value: number,
    sort?: number,
}

export type Game = {
    guessesLeft: number,
    grid: GridNum[],
    answer: number,
    modal: 'fail' | 'pass' | false,
}

function baseGrid(answer: number): GridNum[] {
    return [
        { value: answer-1 },
        { value: answer+1 }
    ]
}

function shuffle(grid: GridNum[]): GridNum[] {
    return grid.map(value => ({ ...value, sort: Math.random() })).sort((a, b) => a.sort - b.sort).map(value => ({ ...value, sort:undefined }))
}

function createGame(): Game {
    const answer = random(75, 25)
    const grid = shuffle(fillGrid(baseGrid(answer), answer));

    return {
        guessesLeft: START_GUESSES,
        grid,
        answer,
        modal: false,
    }
}

function fillGrid(base: GridNum[], answer: number) {
    for(const _ of new Array(100 - base.length).map((_,i) => i)) {
        const index = base.length
        let value;
        value = { value: random(100, 1) }
        do {
            value = { value: random(100, 1) }
        } while(value.value === answer)
        base[index] = value
    }
    return base
}

function random(max: number, min: number): number {
    return Math.floor(Math.random() * (max - min) ) + min
}

function gameStore() {
    const store = writable<Game>(createGame());
    store.subscribe(console.log)
    return {
        shuffle() {
            store.update(v => {
                v.grid = shuffle(v.grid)
                return v
            })
        },
        reset() {
            store.set(createGame())
        },
        guess(guess: number) {
            store.update(game => {
                // if($game.guessesLeft > 0) {
                //     game.update(game => {
                //         game.guessesLeft = game.guessesLeft - 1;
                //         game.tolerance = 1/3 * game.guessesLeft || 0.1;
                //         if(game.guessesLeft === 0) game.modal = true;
                //         if(input.detail === game.answer) {
                //             game.isCorrect = true;
                //             game.modal = true;
                //         }
                //         return game;
                //     })
                // } else {
                //     $game.modal = true;
                // }
                if(game.guessesLeft > 0) {
                    game.guessesLeft--;
                    if(game.answer === guess) {
                        game.modal = 'pass'
                    } else if(game.guessesLeft === 0) game.modal = 'fail'
                } else {
                    game.modal = 'fail'
                }
                return game;
            })
        },
        ...store
    }
}

export const game = gameStore()