export default interface IPokemon {
  name: string;
  id?: string;
  level: string;
  userAddress: string | undefined;
  kinds: IPokemonKind[];
}
export interface IPokemonKind {
  id?: string;
  type: string;
}
