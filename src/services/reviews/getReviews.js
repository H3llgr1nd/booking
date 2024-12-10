import { PrismaClient } from "@prisma/client";

const getReviews = async () => {
  const prisma = new PrismaClient();
  const reviews = await prisma.review.findMany({
    where: { userId: { not: null } }
  });

  return reviews;
};

export default getReviews;