import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import session from "express-session";
import connectMongoDBsession from "connect-mongodb-session";
import * as AdminJSMongoose from "@adminjs/mongoose";
import { dark, light, noSidebar } from "@adminjs/themes";

import Product from "../models/product.js";
import Category from "../models/category.js";
import Order from "../models/order.js";
import User from "../models/user.js";
import Transaction from "../models/transcation.js";
import { COOKIE_PASSWORD } from "./config.js";

AdminJS.registerAdapter(AdminJSMongoose);

const DEFAULT_ADMIN = {
  email: "Ayush0754@gmail.com",
  password: "Ayush@0754",
};

const authenticate = async (email, password) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve(DEFAULT_ADMIN);
  }
  return null;
};

export const buildAdminJS = async (app) => {
  const admin = new AdminJS({
    resources: [
      { resource: Product },
      { resource: Category },
      { resource: Order },
      { resource: User },
      { resource: Transaction },
    ],
    branding: {
      companyName: "JEEVRAk",
      withMadeWithLove: false,
      favicon: "https://cdn-icons-png.flaticon.com/512/1077/1077114.png",
      logo: "https://cdn-icons-png.flaticon.com/512/1077/1077114.png",
    },
    defaultTheme: dark.id, // ✅ correct
    availableThemes: [light, dark, noSidebar], // ✅ array of themes
    rootPath: "/admin",
  });

  const MongoDBStore = connectMongoDBsession(session);
  const sessionStore = new MongoDBStore({
    uri: process.env.MONGODB_URL,
    collection: "Sessions",
  });

  const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
    admin,
    {
      authenticate,
      cookieName: "adminjs",
      cookiePassword: COOKIE_PASSWORD,
    },
    null,
    {
      store: sessionStore,
      resave: true,
      saveUninitialized: true,
      secret: COOKIE_PASSWORD,
      cookie: {
        httpOnly: process.env.NODE_ENV === "production",
        secure: process.env.NODE_ENV === "production",
      },
      name: "adminjs",
    }
  );

  app.use(admin.options.rootPath, adminRouter);
};
