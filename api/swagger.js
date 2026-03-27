import swaggerSpec from "../config/swagger.js";

export default function handler(req, res) {
  res.status(200).json(swaggerSpec);
}