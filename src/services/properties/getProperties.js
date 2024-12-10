import { PrismaClient } from "@prisma/client";

const getProperties = async (query) => {
  const prisma = new PrismaClient();
  const {location, pricePerNight, amenities } = query || {}

  const amenitiesArray = typeof amenities === "string" ? [amenities] : amenities
  const properties = await prisma.property.findMany({
    where: {
      hostId: {not: null},
      location: location || undefined,
      pricePerNight: pricePerNight ? { equals: parseFloat(pricePerNight) } : undefined,
      amenities: amenities ? { 
        some: {
          name: {
            in: amenitiesArray
          }
        }
      } : undefined
    }
  });
  return properties;
};

export default getProperties;