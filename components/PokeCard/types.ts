import { IPokemonKind } from "../../models/types";

export interface IPokeCardProps {
  name: string;
  level: number;
  id: string;
  handleEdit?: (id?: string | number) => void;
  types: IPokemonKind[];
}
