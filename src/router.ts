import { Router } from "express";
import { body, check, oneOf } from "express-validator";
import { handleInputErrors } from "./modules/middleware";
import {
  createProduct,
  deleteProduct,
  getOneProduct,
  getProducts,
} from "./handlers/product";
import {
  createUpdate,
  deleteUpdate,
  getOneUpdate,
  getUpdates,
  updateUpdate,
} from "./handlers/update";

const router = Router();

/**
 * Product
 */
router.get("/product", getProducts);
router.get("/product/:id", getOneProduct);
router.put(
  "/product/:id",
  body("name").isString(),
  handleInputErrors,
  (req, res) => {}
);
router.post(
  "/product",
  body("name").isString(),
  handleInputErrors,
  createProduct
);
router.delete("/product/:id", deleteProduct);

/**
 * Update
 */
router.get("/update", getUpdates);
router.get("/update/:id", getOneUpdate);
router.put(
  "/update/:id",
  body("title").optional(),
  body("body").optional(),
  // body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']).optional(),
  oneOf([
    check("status").equals("IN_PROGRESS").optional(),
    check("status").equals("SHIPPED").optional(),
    check("status").equals("DEPRECATED").optional(),
  ]),
  body("version").optional(),
  body("productId").isString(),
  updateUpdate
);
router.post(
  "/update",
  body("title").isString(),
  body("body").isString(),
  body("productId").exists().isString(),
  createUpdate
);
router.delete("/update/:id", deleteUpdate);

/**
 * Update Point
 */
router.get("/updatepoint", () => {});
router.get("/updatepoint/:id", () => {});
router.put(
  "/updatepoint/:id",
  body("name").optional().isString(),
  body("description").optional().isString(),
  () => {}
);
router.post(
  "/updatepoint",
  body("name").isString(),
  body("description").isString(),
  body("updateId").exists().isString(),
  () => {}
);
router.delete("/updatepoint/:id", () => {});

// Error handling
router.use((err, req, res, next) => {
  if (err.type === "auth") {
    res.status(401);
    res.json({ message: "Unathorized" });
  } else if (err.type === "input") {
    res.status(400);
    res.json({ message: "Invalid input" });
  } else {
    res.status(500);
    res.json({ message: "Ooops, thats on us" });
  }
});

export default router;

// uncaught error
process.on("uncaughtException", () => {});

// async error
process.on("unhandledRejection", () => {});
