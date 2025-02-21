import type { InjectionKey } from 'svelte-typed-context';
import type { Game } from './state.svelte';

export const key: InjectionKey<{ game: Game; sidebar: { open: boolean } }> = Symbol('game');
