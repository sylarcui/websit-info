import Fingerprintjs2 from 'fingerprintjs2'

function getDeviceId () {
  return new Promise(function (resolve, reject) {
    new Fingerprintjs2().get(function (result, components) {
      resolve(result)
    })
  })
}

export { getDeviceId }
