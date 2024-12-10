import { PrismaClient } from "@prisma/client";

const createProperty = async (  
  title,
  description,
  location,
  pricePerNight,
  bedroomCount,
  bathroomCount,
  maxGuestCount,
  hostId,
  rating
) => {

  const prisma = new PrismaClient();
  const property = await prisma.property.create({
    data: {  
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathroomCount,
      maxGuestCount,
      hostId,
      rating
    },
  });

  return property;
};

export default createProperty;