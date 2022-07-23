import { Request, Response } from "express";
import testService from "../services/testService.js";

async function insert(req: Request, res: Response) {
  await testService.insert(req.body);
  res.sendStatus(201);
}

export default {
  insert,
};
