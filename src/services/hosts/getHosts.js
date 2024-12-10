import { PrismaClient } from "@prisma/client";

const getHosts = async (query) => {
  const prisma = new PrismaClient();
  const { name } = query || {}
  const hosts = await prisma.host.findMany({
    where: {
      name: name || undefined
    }
  });

  return hosts;
};

export default getHosts;