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
      res.status(201).json({ bookId: book.id, book:book } );
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
      const userId: string = req.params.userId;
  
      if (!userId) {
        res.status(400).json({ error: "Username and password are required." });
        return;
      }
  
      const books = await getBooks(userId);
      res.status(200).json(books);
    } catch (error: any) {
      // you can also check for unkown if it instance of Error.
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
      const { userName, password } = req.body;
  
      if (!userName || !password) {
        res.status(400).json({ error: "Username and password are required." });
        return;
      }
  
      const userId = await authenticateUser(userName, password);
      res.status(200).json({ userid: userId });
    } catch (error: any) {
      // you can also check for unkown if it instance of Error.
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
      const userId : string =  req.body.userId;
      const updatedData : string =  req.body.updatedData;
      const bookId: string = req.params.bookId;
  
      if (!userId || !updatedData) {
        res.status(400).json({ error: "Username and password are required." });
        return;
      }
  
      const book = await edit(userId, bookId ,updatedData );
      res.status(201).json({ book} );
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
      const userId : string =  req.body.userId;
      const bookId: string = req.params.bookId;
  
      if (!userId) {
        res.status(400).json({ error: "Username and password are required." });
        return;
      }
      await deleteBookFromDB(userId, bookId);
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

    const userId = await registerUser(userName, password);
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


