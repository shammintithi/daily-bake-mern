import express from "express";
import { protect,
         admin,
} from "../middleware/authMiddleware.js";
import { 
    placeOrder,
    getMyOrders,
    getOrderById,
    getAllOrders,
    markOrderDelivered
} from "../controllers/orderController.js";

const router = express.Router();

router.get("/", protect, admin, getAllOrders);

router.post("/", protect, placeOrder);

router.get("/myorders", protect, getMyOrders);

router.get("/:id", protect, getOrderById);

router.put("/:id/deliver", protect, admin, markOrderDelivered);

export default router;