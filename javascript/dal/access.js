var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jsonfile from 'jsonfile';
import dotenv from "dotenv";
dotenv.config();
const DB_FILE_PATH = process.env.DB_FILE_PATH || './data/beepers.json';
export const writeToJsonFile = (beeper) => __awaiter(void 0, void 0, void 0, function* () {
    const beepers = yield jsonfile.readFile(DB_FILE_PATH);
    beepers.push(beeper);
    yield jsonfile.writeFile(DB_FILE_PATH, beepers);
});
export const readFromJsonFile = () => __awaiter(void 0, void 0, void 0, function* () {
    const beepers = yield jsonfile.readFile(DB_FILE_PATH);
    return beepers;
});
export const deleteFromJsonFile = (beeper) => __awaiter(void 0, void 0, void 0, function* () {
    const beepers = yield readFromJsonFile();
    const beeperFind = beepers.find((b) => b.id === beeper.id);
    if (beeperFind) {
        const index = beepers.findIndex((i) => i.id === beeperFind.id);
        beepers.splice(index, 1);
        yield jsonfile.writeFile(DB_FILE_PATH, beepers);
    }
});
export const updateJsonFile = (beeper) => __awaiter(void 0, void 0, void 0, function* () {
    const beepers = yield readFromJsonFile();
    const beeperFind = beepers.find((b) => b.id === beeper.id);
    if (beeperFind) {
        const index = beepers.findIndex((i) => i.id === beeperFind.id);
        beepers.splice(index, 1, beeper);
        yield jsonfile.writeFile(DB_FILE_PATH, beepers);
    }
});
