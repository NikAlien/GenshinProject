export interface Character{
    id: number;
    name: string;
    currentLevel: number;
    vision: string;
    affiliation: string;
}

export class CharacterValidation{
    static validate(chara : Character) : string {
        if(chara.name.trim().length <= 0)
            return "Please give a name";
        if(chara.affiliation.trim().length <= 0)
            return "Please give an affiliation";
        if(chara.vision.trim().length <= 0)
            return "Please choose a vision";
        if(Number.isInteger(chara.currentLevel) || Number(chara.currentLevel) <= -1)
            return "Please give a valid number";
        return ""
    }
}