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
        if(!/^[0-9]*$/.test(chara.currentLevel.toString()))
            return "Please give a valid numberr";
        if(Number(chara.currentLevel) <= -1)
            return "Please give a valid number";
        return ""
    }
}