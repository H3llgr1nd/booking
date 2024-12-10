import { PrismaClient } from "@prisma/client";

const updateAmenityById = async (id, amenity) => {
  const prisma = new PrismaClient();
  const updatedAmenity = await prisma.amenity.updateMany({
    where: { id },
    data: amenity,
  });

  return updatedAmenity.count > 0 ? id : null;
};

export default updateAmenityById;