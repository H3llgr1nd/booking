import { PrismaClient } from "@prisma/client";

const getAmenities = async () => {
  const prisma = new PrismaClient();
  const amenities = await prisma.user.findMany();

  return amenities;
};

export default getAmenities;