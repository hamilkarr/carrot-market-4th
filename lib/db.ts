import { PrismaClient } from "./generated/prisma";

const db = new PrismaClient();

async function test() {
  const smsToken = await db.sMSToken.create({
    data: {
      token: "1234567890",
      user: {
        connect: {
          id: 1,
        },
      },
    },
  });
  console.log(smsToken);
}

test();
export default db;
