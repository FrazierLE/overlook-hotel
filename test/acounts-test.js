import { expect } from 'chai'
import Accounts from '../src/classes/accounts'
import { sampleBookings, sampleRooms } from '../data/sample-data'

describe('Accounts', () => {
  sampleBookings
  sampleRooms
  let accounts

  beforeEach(() => {
    sampleBookings
    sampleRooms
    accounts = new Accounts(sampleBookings, sampleRooms)
  })
  it('should be a function', () => {
    expect(Accounts).to.be.a('function')
  })
  it('should have record of all the bookings', () => {
    expect(accounts.bookings).to.deep.equal([sampleBookings[0], sampleBookings[1], sampleBookings[2], sampleBookings[3], sampleBookings[4]])
  })
  it('should have inventory of all the rooms', () => {
    expect(accounts.rooms).to.deep.equal([sampleRooms[0], sampleRooms[1], sampleRooms[2], sampleRooms[3], sampleRooms[4], sampleRooms[5]])
  })
})