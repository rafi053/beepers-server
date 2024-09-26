var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createBeeper, getBeepers, getDetailsByID, updateTheStatusOfBeeper, deleteBeeperByID, getAllBeepersByStatus } from "../services/beepersService.js";
export const createNewBeeper = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.body.name;
        if (!name) {
            res.status(400).json({ error: "Name is required." });
            return;
        }
        const beeper = yield createBeeper(name);
        res.status(201).json({ beeper });
    }
    catch (error) {
        if (error.message === "Username already exists.") {
            res.status(409).json({ error: error.message });
        }
        else {
            console.error("Error registering user:", error);
            res.status(500).json({ error: "Internal server error." });
        }
    }
});
export const geAllBeepers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const beepers = yield getBeepers();
        res.status(200).json(beepers);
    }
    catch (error) {
        if (error.message === "Invalid username or password.") {
            res.status(401).json({ error: error.message });
        }
        else {
            console.error("Error during login:", error);
            res.status(500).json({ error: "Internal server error." });
        }
    }
});
export const getDetailsOfSpecificBeeperByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const beeperFind = yield getDetailsByID(id);
        res.status(200).json({ beeperFind: beeperFind });
    }
    catch (error) {
        if (error.message === "Invalid username or password.") {
            res.status(401).json({ error: error.message });
        }
        else {
            console.error("Error during login:", error);
            res.status(500).json({ error: "Internal server error." });
        }
    }
});
export const updateTheStatusOfSpecificBeeper = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const lat = req.body.lat;
        const lon = req.body.lon;
        const updatedBeeper = yield updateTheStatusOfBeeper(id, lat, lon);
        res.status(201).json({ updatedBeeper });
    }
    catch (error) {
        if (error.message === "Username already exists.") {
            res.status(409).json({ error: error.message });
        }
        else {
            console.error("Error registering user:", error);
            res.status(500).json({ error: "Internal server error." });
        }
    }
});
export const deleteSpecificBeeperByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield deleteBeeperByID(id);
        res.status(200).json({ success: "Internal server success." });
    }
    catch (error) {
        if (error.message === "Username already exists.") {
            res.status(409).json({ error: error.message });
        }
        else {
            console.error("Error registering user:", error);
            res.status(500).json({ error: "Internal server error." });
        }
    }
});
export const getBeepersByStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const status = req.params.status;
        const beepers = yield getAllBeepersByStatus(status);
        res.status(201).json({ beepers });
    }
    catch (error) {
        if (error.message === "Username already exists.") {
            res.status(409).json({ error: error.message });
        }
        else {
            console.error("Error registering user:", error);
            res.status(500).json({ error: "Internal server error." });
        }
    }
});
