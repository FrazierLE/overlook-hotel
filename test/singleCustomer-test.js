import { expect } from 'chai'
import singleCustomer from '../src/classes/singleCustomer'
import { sampleCustomers, sampleBookings, sampleRooms } from '../data/sample-data'


describe('Single Customer', () => {
  sampleCustomers
  sampleBookings
  sampleRooms
  let customer1, customer2

  beforeEach(() => {
    sampleCustomers
    sampleBookings
    sampleRooms
    customer1 = new singleCustomer(sampleCustomers[0])
    customer2 = new singleCustomer(sampleCustomers[1])
  })
  
  it('should be a function', () => {
    expect(singleCustomer).to.be.a('function')
  })
  it('should have an id', () => {
    expect(customer1.id).to.equal(1)
    expect(customer2.id).to.equal(2)
  })
  it('should have an name', () => {
    expect(customer1.name).to.equal("Leatha Ullrich")
    expect(customer2.name).to.equal("Rocio Schuster")
  })
 it('should hold the current date', () => {
    expect(customer1.date).to.equal('2022/11/12')
  })
  it('should have a record of all bookings', () => {
    expect(customer1.allBookings).to.equal(undefined)
  })
  it('should have a record of previous bookings', () => {
    expect(customer1.previousBookings).to.deep.equal([])
    expect(customer2.previousBookings).to.deep.equal([])
  })
  it('should have a list of upcoming bookings', () => {
    expect(customer1.upcomingBookings).to.deep.equal([])
    expect(customer2.upcomingBookings).to.deep.equal([])
  })
  it('should keep track of total dollars spent at hotel', () => {
    expect(customer1.totalDollarsSpent).to.equal(undefined)
  })
  it('should show which rooms are available to book', () => {
    expect(customer2.roomsAvailableToBook).to.deep.equal(undefined)
  })
  it('should set current date based on the current day', () => {
    expect(customer1.setCurrentDate()).to.equal('2022/11/12')
  })
  it('should create lists of upcoming and previous bookings', () => {
    customer1.filterBookings(sampleBookings)
    customer1.determineBookings()
    expect(customer1.previousBookings).to.deep.equal([sampleBookings[3]])
    expect(customer1.upcomingBookings).to.deep.equal([sampleBookings[4]])
  })
  it('should show lists of upcoming and previous bookings for a different customer', () => {
    customer2.filterBookings(sampleBookings)
    customer2.determineBookings()
    expect(customer2.previousBookings).to.deep.equal([])
    expect(customer2.upcomingBookings).to.deep.equal([])
  })
  it('should calculate the total amount of money spent for all previous bookings', () => {
    customer1.filterBookings(sampleBookings)
    customer1.determineBookings()
    customer1.calculateTotal(sampleRooms)
    expect(customer1.totalDollarsSpent).to.equal(172.09)
  })
  it('should calculate the total amount of money spent for all previous bookings', () => {
    customer2.filterBookings(sampleBookings)
    customer2.determineBookings()
    customer2.calculateTotal(sampleRooms)
    expect(customer2.totalDollarsSpent).to.equal(0.00)
  })
  it('should show lists of available rooms', () => {
    customer1.filterBookings(sampleBookings)
    customer1.determineAvailableRooms(sampleRooms, sampleBookings)
    expect(customer1.roomsAvailableToBook).to.deep.equal([sampleRooms[0], sampleRooms[1], sampleRooms[2], sampleRooms[3], sampleRooms[4]])
  })
})