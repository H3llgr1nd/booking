import { PrismaClient } from "@prisma/client";

const createHost = async (    
  username,
  password,
  name,
  email,
  phoneNumber,
  pictureUrl,
  aboutMe
) => {

  const prisma = new PrismaClient();
  const host = await prisma.host.create({
    data: {
      username,
      password,
      name,
      email,
      phoneNumber,
      pictureUrl,
      aboutMe,
    },
  });

  return host;
};

export default createHost;