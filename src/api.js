/* global fetch */

const { REACT_APP_API_URI } = process.env

const request = endpoint =>
  fetch(`${REACT_APP_API_URI}${endpoint}`)
    .then(res => res.json())
    .then((data) => {
      if (data.status !== 'success') throw new Error(data.message)
      return data
    })

const formatTrip = data => ({
  carbonOutput: data.carbon_generated,
  destinationName: data.to.name,
  distance: data.distance,
  pictureUrl: data.picture_url,
  tripDate: data.to.time_unix
})

const formatProfile = profile => ({
  carbonOutput: profile.estimated_carbon,
  fullName: profile.instagram_name,
  friends: profile.friends,
  friendsFetched: profile.friends_complete,
  instagramId: profile.instagramId,
  profilePictureUrl: profile.picture_url,
  private: profile.private,
  username: profile.instagram_username,
  zipcode: profile.address_zip
})

const fetchProfile = username => request(`/users/v1/ig/${username}`).then(data => formatProfile(data.user))

const fetchTopProducers = () =>
  request('/feeds/v1/top-offenders')
    .then(data => data.entities.map(formatProfile))

const fetchProfileFriends = username =>
  fetchProfile(username)
    .then(profile => ({
      friends: profile.friends.map(formatProfile),
      friendsFetched: profile.friendsFetched
    }))

const fetchProfileTrips = (username, zipcode) =>
  request(`/trips/v1/ABA/${username}/${zipcode}`)
    .then(data => ({
      ...data,
      trips: data.trips.map(formatTrip)
    }))

export default {
  fetchProfile,
  fetchProfileFriends,
  fetchProfileTrips,
  fetchTopProducers
}
