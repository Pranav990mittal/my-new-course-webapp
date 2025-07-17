import dotenv from "dotenv";
dotenv.config();

const JWT_USER_PASSWORD = process.env.JWT_USER_PASS;
const JWT_ADMIN_PASSWORD = process.env.JWT_ADMIN_PASS;
const STRIPE_SECRET_KEY = process.env.STRIPE_SEC_KEY
export default {
  JWT_USER_PASSWORD,
  JWT_ADMIN_PASSWORD,
  STRIPE_SECRET_KEY
};
