import { prisma } from "../prisma/client.js";

export class Pad {
  #nameHash() {
    const nameHashed = new Date().getTime().toLocaleString() 
    return nameHashed;
  }

  async create(req) {
    const name = req.body.name;
    const key = req.body.key || "";
    const isPrivate = req.body.isPrivate || false;
    const id = req.baseUrl;

    const nameHashed = this.#nameHash();
    console.log(nameHashed);

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
  }

  async getById(req) {
    const id = req.baseUrl;

    const data = await prisma.pad.findMany({
      where: {
        creatorUser: id,
      },
    });

    return data;
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

    if (!match.creatorPad[0]) throw new Error("pad id not found in this user");

    await prisma.pad.delete({
      where: {
        id: padId,
      },
    });
  }
}
