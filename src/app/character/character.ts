import { Weapon } from "../weapon";

export interface Character{
    characterId: number;
    name: string;
    currentLevel: number;
    vision: string;
    affiliation: string;
    weapon: Weapon | null;
}

export class CharacterValidation{
    static validate(chara : Character) : string {
        if(chara.name.trim().length <= 0)
            return "Please give a name";
        if(chara.affiliation.trim().length <= 0)
            return "Please give an affiliation";
        if(chara.vision.trim().length <= 0)
            return "Please choose a vision";
        if(!/^[0-9]*$/.test(chara.currentLevel.toString()) || Number(chara.currentLevel) > 90 || chara.currentLevel.toString().length <= 0)
            return "Please give a valid number";
        return ""
    }
}