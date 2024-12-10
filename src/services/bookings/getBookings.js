import { PrismaClient } from "@prisma/client";

const getBookings = async (query) => {
  const prisma = new PrismaClient();
  const { userId } = query || {}

  const bookings = await prisma.booking.findMany({
    where: userId ? { userId } : { userId: { not: null } }
  });

  return bookings;
};

export default getBookings;