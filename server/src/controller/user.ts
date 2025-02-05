//Model & bdd
import User from "../models/user";
import Module from "../models/module";
import { Op } from "sequelize";

//Tools
import Crypt from "../tools/hash";
import UUID from "../tools/uuid";
import fs from "fs";
import path from "path";
import Image from "../tools/multer";
import config from "config";

//Middleware
import auth from "../middleware/auth/auth";
import role from "../middleware/role";

const image: number = config.get("storage.nombreImageBanque");
