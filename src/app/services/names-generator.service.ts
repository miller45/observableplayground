/**
 * @author RKlein@rosen-group.com
 */
import construct = Reflect.construct;
import {Subject} from "rxjs/Subject";
import {DogEvent} from "../models";

function getRandInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export class NamesGenerator {
    constructor(private gender: "male" | "female" = "male") {

    }

    getRandomElement(source: any) {
        return source[getRandInt(0, source.length - 1)];
    }

    capitalize(source: any): any {
        return source.charAt(0).toUpperCase() + source.slice(1);
    }

    addGender(source: any): any {
        let lsource = source || "";
        let maleEndings = ["s", "n"];
        let femaleEndings = ["a", "e"];
        switch (this.gender) {
            case "male":
                lsource += this.getRandomElement(maleEndings);
                break;
            case "female":
                lsource += this.getRandomElement(femaleEndings);
                break;
            default:
                break;
        }
        return lsource;
    }

    simple(): string {
        let vowels = "aaaeeeiiouyy";
        let consonants = "bbbcdddffgghjkllmmmnnnppqrrssstttvwxz";
        let nameLength = getRandInt(1, 4);
        let startingLetter = getRandInt(0, 1);
        let res = "";

        for (let i = 0; i < nameLength; i++) {
            res += this.getRandomElement(consonants) + this.getRandomElement(vowels);
        }
        return this.capitalize(this.addGender(res));
    }

    fullSimple(): string {
        return this.simple() + " " + this.simple();
    }

}
