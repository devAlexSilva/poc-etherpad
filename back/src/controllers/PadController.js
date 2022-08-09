import bcrypt from "bcrypt";
import { response as res } from "express";
import { prisma } from "../prisma/client.js";

export class Pad {
  async #nameHash(name) {
    const nameHashed = await bcrypt.hash(name, 6);
    return nameHashed;
  }

  async create(name, key, isPrivate, id ) {
    const nameHashed = await this.#nameHash(name);
    
    try {
      const pad = await prisma.pad.create({
        data: {
          name,
          name_hash: nameHashed,
          key,
          private: isPrivate,
          user: {
            connect: {
              id
            }
          }
        },
      });

      return pad;
    } catch (err) {
      return err;
    }

  }
}
