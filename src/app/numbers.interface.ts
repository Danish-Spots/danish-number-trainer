export interface DanishNumber {
  name: string;
  number: number;
  state?: string;
  gender?: string;
}

export interface DanishNumberDict {
  [key: number]: DanishNumber;
}
