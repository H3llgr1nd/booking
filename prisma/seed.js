import { PrismaClient } from '@prisma/client'
import amenitiesData from '../src/data/amenities.json' assert {type: 'json'}
import bookingsData from '../src/data/bookings.json' assert {type: 'json'}
import hostsData from '../src/data/hosts.json' assert {type: 'json'}
import propertiesData from '../src/data/properties.json' assert {type: 'json'}
import reviewsData from '../src/data/reviews.json' assert {type: 'json'}
import usersData from '../src/data/users.json' assert {type: 'json'}



const prisma = new PrismaClient({ log: ['query', 'info', 'warn', 'error'] })

async function seedUsers () {
  const { users } = usersData;

  for (const user of users) {
    const {
      id, 
      username,
      password,
      name,
      email,
      phoneNumber,
      pictureUrl
    } = user
    await prisma.user.upsert({
      where: {
        id, 
        username,
        password,
        name,
        email,
        phoneNumber,
        pictureUrl
      },
      update: {},
      create: user
    })
  }
}

async function seedReviews () {
  const { reviews } = reviewsData;

  for (const review of reviews) {
    const {
      id, 
      userId,
      propertyId,
      rating,
      comment
    } = review
    await prisma.review.upsert({
      where: {
        id, 
        userId,
        propertyId,
        rating,
        comment
      },
      update: {},
      create: review
    })
  }
}
async function seedHosts () {
  const { hosts } = hostsData;

  for (const host of hosts) {
    const {
      id, 
      username,
      password,
      name,
      email,
      phoneNumber,
      pictureUrl,
      aboutMe
    } = host
    await prisma.host.upsert({
      where: {
        id, 
        username,
        password,
        name,
        email,
        phoneNumber,
        pictureUrl,
        aboutMe
      },
      update: {},
      create: host
    })
  }
}
async function seedBookings () {
  const { bookings } = bookingsData;
  for (const booking of bookings) {
    const {
        id, 
        userId, 
        propertyId, 
        checkinDate, 
        checkoutDate, 
        numberOfGuests, 
        totalPrice, 
        bookingStatus 
    } = booking
    await prisma.booking.upsert({
      where: { 
        id, 
        userId, 
        propertyId, 
        numberOfGuests,
        totalPrice,
        bookingStatus,
        checkinDate, 
        checkoutDate,    
    },
      update: {},
      create: booking
    })
  }
}

async function seedAmenities () {
  const { amenities } = amenitiesData;
  
  for (const amenity of amenities) {
    const { id, name } = amenity;
  
    await prisma.amenity.upsert({
      where: { id },
      update: {},
      create: {
        id,
        name,
      }
    });
  }
}

async function seedPropertiesAndLinkToAmenities () {
  const { properties } = propertiesData;


  for (const property of properties) {
    const {
      id,
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathroomCount,
      maxGuestCount,
      hostId,
      rating,
      amenityIds
    } = property;
  
    await prisma.property.upsert({
      where: {
        id
      },
      update: {},
      create: {
        id,
        title,
        description,
        location,
        pricePerNight,
        bedroomCount,
        bathroomCount,
        maxGuestCount,
        hostId,
        rating,
        amenities: {
          connect:  amenityIds.map((amenityId) => ({ id: amenityId }))
        }
      }
    });
  }
}

async function main () {
  await seedUsers();
  await seedReviews();
  await seedHosts();
  await seedBookings();
  await seedAmenities();
  await seedPropertiesAndLinkToAmenities();
  
}


main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })