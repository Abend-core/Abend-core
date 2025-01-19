import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import key from "./key";

const auth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
    res
      .status(401)
      .json({ message: "Vous n'avez pas fourni de jeton d'authentification." });
    return;
  }

  const token: string = authorizationHeader.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, key) as JwtPayload;

    const userId: string = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      res
        .status(401)
        .json({ message: "L'identifiant de l'utilisateur est invalide." });
      return;
    }

    next();
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(401).json({
        message:
          "L'utilisateur n'est pas autorisé à accéder à cette ressource.",
        date: error.message,
      });
      return;
    }
  }
};

export default auth;
