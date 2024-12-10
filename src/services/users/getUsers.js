import { PrismaClient } from "@prisma/client";

const getUsers = async (query) => {
  const prisma = new PrismaClient();

  const { username, email } = query || {}

  const users = await prisma.user.findMany({
    where: {
      username: username || undefined,
      email: email || undefined
    }
  });

  const sanitizedUsers = users.map(({ password, ...rest }) => rest);
  return sanitizedUsers;
};

export default getUsers;