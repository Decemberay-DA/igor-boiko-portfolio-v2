import "server-only"
import { db } from "./db"

export const getAllDoodesFromDB = async () => await db.query.posts.findMany()
