var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { v4 as uuidv4 } from "uuid";
import { readFromJsonFile, writeToJsonFile, deleteFromJsonFile, updateJsonFile } from "../dal/access.js";
import { Status } from "../statuses/status.js";
import { Latitude, Longitude } from '../coordinates/coordinates.js';
export const createBeeper = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const beeperId = uuidv4();
    const newBeeper = {
        id: beeperId,
        name: name,
        status: Status.manufactured,
        created_at: new Date(),
        detonated_at: undefined,
        latitude: undefined,
        longitude: undefined,
    };
    yield writeToJsonFile(newBeeper);
    return newBeeper;
});
export const getBeepers = () => __awaiter(void 0, void 0, void 0, function* () {
    const beepers = yield readFromJsonFile();
    return beepers;
});
export const getDetailsByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const beepers = yield readFromJsonFile();
    const beeperFind = beepers.find((beeper) => beeper.id === id);
    if (!beeperFind) {
        throw new Error("Invalid  ID of beeper.");
    }
    return beeperFind;
});
export const updateTheStatusOfBeeper = (id, lat, lon) => __awaiter(void 0, void 0, void 0, function* () {
    const beeper = yield getDetailsByID(id);
    const oldStatus = beeper.status;
    const newStatus = getNextEnum(oldStatus);
    if (lat && lon) {
        if (oldStatus === 'shipped' && checkValidCords(lat, lon)) {
            const newBeeper = Object.assign({}, beeper);
            newBeeper.status = newStatus;
            newBeeper.latitude = lat;
            newBeeper.longitude = lon;
            yield updateJsonFile(newBeeper);
            return newStatus;
        }
    }
    else {
        if (newStatus === 'Incorrect status') {
            return oldStatus;
        }
        else if (newStatus === 'It is not possible to change status after detonated') {
            return oldStatus;
        }
        else {
            const newBeeper = Object.assign({}, beeper);
            newBeeper.status = newStatus;
            yield updateJsonFile(newBeeper);
            return newStatus;
        }
    }
    ;
});
export const deleteBeeperByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteBeeper = yield getDetailsByID(id);
    yield deleteFromJsonFile(deleteBeeper);
});
export const getAllBeepersByStatus = (status) => __awaiter(void 0, void 0, void 0, function* () {
    const beepers = yield getBeepers();
    if (beepers) {
        const beepersFind = beepers.filter((beeper) => beeper.status === status);
        return beepersFind;
    }
});
function getNextEnum(status) {
    let newStatus = '';
    switch (status) {
        case 'manufactured':
            newStatus = 'assembled';
            break;
        case 'assembled':
            newStatus = 'shipped';
            break;
        case 'shipped':
            newStatus = 'deployed';
            break;
        case 'deployed':
            newStatus = 'detonated';
            break;
        case 'detonated':
            newStatus = 'It is not possible to change status after detonated';
            break;
        default:
            newStatus = 'Incorrect status';
    }
    return newStatus;
}
function checkValidCords(lat, lon) {
    let result = false;
    const lati = Latitude;
    const long = Longitude;
    const isLat = lati.indexOf(lat);
    const isLon = long.indexOf(lon);
    if (isLat && isLon === -1) {
        return result;
    }
    return true;
}


