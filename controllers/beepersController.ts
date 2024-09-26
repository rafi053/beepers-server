import { Request, Response } from 'express';
import { Beeper } from '../models/Beeper.js';
import { createBeeper, getBeepers, getDetailsByID, updateTheStatusOfBeeper, deleteBeeperByID, getAllBeepersByStatus } from "../services/beepersService.js";
 


export const createNewBeeper = async (req: Request, res: Response): Promise<void> => {
    try {
      const  name: string = req.body;
  
      if (!name) {
        res.status(400).json({ error: "Name is required." });
        return;
      }
  
      const beeper: Beeper = await createBeeper(name);
      res.status(201).json({ beeper } );
    } catch (error: any) {
      if (error.message === "Username already exists.") {
        res.status(409).json({ error: error.message });
      } else {
        console.error("Error registering user:", error);
        res.status(500).json({ error: "Internal server error." });
      }
    }
  };

  
  export const geAllBeepers = async (req: Request, res: Response): Promise<void> => {
    try {
      
      const beepers = await getBeepers();
      res.status(200).json(beepers);
    } catch (error: any) {
      if (error.message === "Invalid username or password.") {
        res.status(401).json({ error: error.message });
      } else {
        console.error("Error during login:", error);
        res.status(500).json({ error: "Internal server error." });
      }
    }
  };

  export const getDetailsOfSpecificBeeperByID = async (req: Request, res: Response): Promise<void> => {
    try {
      const id: string = req.params.id;
  
      const beeperFind = await getDetailsByID(id);
      res.status(200).json({ beeperFind: beeperFind });
    } catch (error: any) {
      if (error.message === "Invalid username or password.") {
        res.status(401).json({ error: error.message });
      } else {
        console.error("Error during login:", error);
        res.status(500).json({ error: "Internal server error." });
      }
    }
  };


  export const updateTheStatusOfSpecificBeeper = async (req: Request, res: Response): Promise<void> => {
    try {
      const id: string = req.params.id;
      const lat = req.body.lat;
      const lon = req.body.lon;

      const updatedBeeper = await updateTheStatusOfBeeper(id, lat, lon);
      res.status(201).json({ updatedBeeper} );
    } catch (error: any) {
      if (error.message === "Username already exists.") {
        res.status(409).json({ error: error.message });
      } else {
        console.error("Error registering user:", error);
        res.status(500).json({ error: "Internal server error." });
      }
    }
  };


  export const deleteSpecificBeeperByID = async (req: Request, res: Response): Promise<void> => {
    try {
      const id: string = req.params.id;

      await deleteBeeperByID(id);
      res.status(200).json({ success: "Internal server success." });
    } catch (error: any) {
      if (error.message === "Username already exists.") {
        res.status(409).json({ error: error.message });
      } else {
        console.error("Error registering user:", error);
        res.status(500).json({ error: "Internal server error." });
      }
    }
  };



export const getBeepersByStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userName, password }: userNamePassword = req.body;

    if (!userName || !password) {
      res.status(400).json({ error: "Username and password are required." });
      return;
    }

    const userId = await getAllBeepersByStatus(userName, password);
    res.status(201).json({ userid: userId });
  } catch (error: any) {
    if (error.message === "Username already exists.") {
      res.status(409).json({ error: error.message });
    } else {
      console.error("Error registering user:", error);
      res.status(500).json({ error: "Internal server error." });
    }
  }
};


