const {
  Room,
  Booking,
  totalOccupancyPercentage,
  availableRooms,
} = require("./index");

const room = new Room({ name: "duplex", rate: 500, discount: 50 });
const room2 = new Room({ name: "premium", rate: 600, discount: 20 });
const room3 = new Room({ name: "single", rate: 100, discount: 30 });

const booking1 = new Booking({
  name: "pepe",
  email: "pepe@mail.com",
  checkIn: new Date("2022-6-5"),
  checkOut: new Date("2022-6-15"),
  discount: 5,
  room: room,
});
const booking2 = new Booking({
  name: "tim",
  email: "tim@mail.com",
  checkIn: new Date("2022-3-4"),
  checkOut: new Date("2022-3-7"),
  discount: 15,
  room: room,
});
const booking3 = new Booking({
  name: "sam",
  email: "sam@mail.com",
  checkIn: new Date("2022-7-17"),
  checkOut: new Date("2022-7-23"),
  discount: 25,
  room: room,
});
const booking4 = new Booking({
  name: "ron",
  email: "ron@mail.com",
  checkIn: new Date("2022-02-17"),
  checkOut: new Date("2022-11-23"),
  discount: 10,
  room: room,
});
room.bookings = [booking1, booking2, booking3];
room2.bookings = [booking1, booking3];
room3.bookings = [booking2, booking3, booking4];
const roomsTot = [room, room2, room3];

test("Given a new instance of the object", () => {
  expect(room.name).toBe("duplex");
  expect(room.bookings[0]).toBe(booking1);
  expect(booking3.name).toBe("sam");
});
test("given the isOccupied method when it return a true", () => {
  expect(room.isOccupied("2022-7-20")).toStrictEqual(["sam"]);
});
test("given the isOccupied method when it return a false", () => {
  expect(room.isOccupied("2022-2-12")).toBeFalsy();
});

test("given the method occupancyPercentage()", () => {
  expect(room.occupancyPercentage("2022-6-5", "2022-6-15")).toBe(100);
});
test("given the method occupancyPercentage()", () => {
  expect(room.occupancyPercentage("2022-1-5", "s")).toBe(NaN);
});

test("given the method getFee()", () => {
  expect(booking1.getFee()).toBe(275);
});
test("given the function totalOccupancyPercentage()", () => {
  expect(totalOccupancyPercentage(roomsTot, "2022-01-01", "2022-12-30")).toBe(
    29
  );
});
test("given the function totalOccupancyPercentage()", () => {
  expect(totalOccupancyPercentage(roomsTot, "2022-01-01", "s")).toBe(NaN);
});

test("given the function totalOccupancyPercentage()", () => {
  expect(totalOccupancyPercentage(roomsTot, "2022-01-01", "s")).toBe(NaN);
});
test("given the function availableRooms()", () => {
  expect(availableRooms(roomsTot, "2022-01-01", "2022-07-23")).toBe(
    "duplex, premium, single"
  );
});