import { expect } from 'chai'
import Bookings from '../src/classes/bookings'
import { sampleBookings } from '../data/sample-data'

describe('Bookings', () => {
  sampleBookings
  let booking1, booking2

  beforeEach(() => {
    sampleBookings
    booking1 = new Bookings(sampleBookings[0])
    booking2 = new Bookings(sampleBookings[1])
  })

  it('should be a function', () => {
    expect(Bookings).to.be.a('function')
  })
  it('should have an id', () => {
    expect(booking1.id).to.equal('5fwrgu4i7k55hl6sz')
    expect(booking2.id).to.equal('5fwrgu4i7k55hl6t5')
  })
  it('should have a customer ID', () => {
    expect(booking1.userID).to.equal(9)
    expect(booking2.userID).to.equal(43)
  })
  it('should have a checkin date', () => {
    expect(booking1.date).to.equal('2022/04/22')
    expect(booking2.date).to.equal('2022/01/24')
  })
  it('should have a room number', () => {
    expect(booking1.roomNumber).to.equal(15)
    expect(booking2.roomNumber).to.equal(24)
  })
})