class Room {
  constructor({ name, rate, discount, bookings }) {
    this.name = name;
    this.rate = rate;
    this.discount = discount;
    this.bookings = bookings;
  }
  isOccupied(date) {
    const dateOccupied = new Date(date);

    const occupiedArray = this.bookings.filter(
      (item) => item.checkIn <= dateOccupied && item.checkOut >= dateOccupied
    );
    const name = occupiedArray.map((item) => item.name);
    if (occupiedArray.length > 0) {
      return name;
    } else {
      return false;
    }
  }

  occupancyPercentage(startDate, endDate) {
    const oneDay = 24 * 60 * 60 * 1000;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffDays = Math.round(Math.abs((end - start) / oneDay));

    const occupiedDays = this.bookings
      .filter((item) => start <= item.checkIn && end >= item.checkOut)
      .map((item) => (item.checkOut - item.checkIn) / oneDay);

    const totalDaysOccupied = occupiedDays.reduce((a, b) => a + b, 0);

    const result = Math.round((totalDaysOccupied / diffDays) * 100);
    // console.log(totalDaysOccupied);
    // console.log(diffDays);

    return result;
  }
}

class Booking {
  constructor({ name, email, checkIn, checkOut, discount, room }) {
    this.name = name;
    this.email = email;
    this.checkIn = checkIn;
    this.checkOut = checkOut;
    this.discount = discount;
    this.room = room;
  }
  getFee() {
    // prezzo finale del booking del stanza room.rate, sconto stanza room.discount, sconto user booking1.discount
    //tot sconto =  (room.discount + booking1.discount)
    // prezzo finale = room.rate/100 * tot sconto
    const totDiscount = this.discount + this.room.discount;
    const finalFee = (this.room.rate / 100) * totDiscount;
    return finalFee;
  }
}

function totalOccupancyPercentage(rooms, startDate, endDate) {
  // percentuale tot di occupazione di tutte le stanze nell'array
  // somma occupazione di ogni stanza  / arrayRooms.length

  const totalArrayOccupancy = [];
  for (let i = 0; i < rooms.length; i++) {
    totalArrayOccupancy.push(rooms[i].occupancyPercentage(startDate, endDate));
  }
  const totalOccupancy = totalArrayOccupancy.reduce((a, b) => a + b, 0);
  const totalPercentage = Math.round(totalOccupancy / rooms.length);
  return totalPercentage;
}
function availableRooms(rooms, startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const totalRooms = rooms.filter((room) =>
    room.bookings.find((item) => start <= item.checkIn && end >= item.checkOut)
  );
  let availableRooms = 0;
  if (totalRooms.length > 0) {
    availableRooms = totalRooms.map((item) => item.name).join(", ");
  } else {
    ("No rooms available");
  }

  return availableRooms;
}

module.exports = { Room, Booking, totalOccupancyPercentage, availableRooms };
