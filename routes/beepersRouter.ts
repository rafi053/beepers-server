import express, { Router } from 'express';
import { createNewBeeper, geAllBeepers, getDetailsOfSpecificBeeperByID, updateTheStatusOfSpecificBeeper, deleteSpecificBeeperByID, getBeepersByStatus } from '../controllers/beepersController.js';


const router: Router = express.Router();

router.route('/').post(createNewBeeper);
router.route('/').get(geAllBeepers);
router.route('/:id').get(getDetailsOfSpecificBeeperByID);
router.route('/:id/status').put(updateTheStatusOfSpecificBeeper);
router.route('/:id').delete(deleteSpecificBeeperByID);
router.route('/status/:status').get(getBeepersByStatus);


export default router;