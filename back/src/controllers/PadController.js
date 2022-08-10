import bcrypt from "bcrypt";
import { prisma } from "../prisma/client.js";

export class Pad {
  async #nameHash(name) {
    const nameHashed = await bcrypt.hash(name, 6);
    return nameHashed;
  }

  async create(name, key, isPrivate, id) {
    const nameHashed = await this.#nameHash(name);

    try {
      const pad = await prisma.pad.create({
        data: {
          name,
          nameHash: nameHashed,
          key,
          isPrivate,
          user: {
            connect: {
              id,
            },
          },
        },
      });

      return pad;
    } catch (err) {
      return err;
    }
  }

  async getById(id) {
    try {
      const data = await prisma.pad.findMany({
        where: {
          creatorUser: id,
        },
      });

      return data;
    } catch (err) {
      return err;
    }
  }

  async deleteById(req) {
    const userId = req.baseUrl;
    const padId = Number(req.params.id);

    const match = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        creatorPad: {
          where: {
            id: padId,
          },
        },
      },
    });

    if(!match.creatorPad[0]) throw new Error("pad id not found in this user")

    await prisma.pad.delete({
      where: {
        id: padId
      }
    })
  }
}
