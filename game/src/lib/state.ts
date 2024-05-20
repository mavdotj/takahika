import { writable } from "svelte/store"

export const START_GUESSES = 3

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
    const grid = shuffle(fillGrid(baseGrid(answer), answer))

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
        let value
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
    const store = writable<Game>(createGame())

    return {
        shuffle() {
            store.update(game => {
                game.grid = shuffle(game.grid)
                return game
            })
        },
        reset() {
            store.set(createGame())
        },
        guess(guess: number) {
            store.update(game => {
                if(game.guessesLeft > 0) {
                    if(game.answer === guess) {
                        game.modal = 'pass'
                    } else {
                        game.guessesLeft--
                        if(game.guessesLeft === 0) game.modal = 'fail'
                    }
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