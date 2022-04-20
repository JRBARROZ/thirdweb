export default interface INfts {
  name: string;
  id?: string;
  // image: string;
  level: string;
  userAddress: string | undefined;
  kinds?: IKinds;
}
export interface IKinds {
  id?: string;
  type: string;
}
