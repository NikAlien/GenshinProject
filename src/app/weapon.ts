import { Character } from "./character/character";

export interface Weapon{
    id: number;
    name: string;
    baseAttack: number;
    additionalCharacteristic: string;
    characteristicNumbers: number;
    characterList: Character[];
}
