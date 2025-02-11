export interface DiscordEvent {
    name: string,
    once?: boolean,
    execute(...args: unknown[]): void,
}