const degreesToRadians = degrees => degrees * (Math.PI / 180);
const radiansToDegrees = radians => radians * (180 / Math.PI);

const centralSubtendedAngle = (locationX, locationY) => {
  const locationXLatRadians = degreesToRadians(locationX.latitude);
  const locationYLatRadians = degreesToRadians(locationY.latitude);
return radiansToDegrees(
    Math.acos(
      Math.sin(locationXLatRadians) * Math.sin(locationYLatRadians) +
        Math.cos(locationXLatRadians) *
          Math.cos(locationYLatRadians) *
          Math.cos(
            degreesToRadians(
              Math.abs(locationX.longitude - locationY.longitude)
            )
       )
    )
  );
}

const earthRadius = 6371
const greatCircleDistance = angle => 2 * Math.PI * earthRadius * (angle / 360);
const distanceBetweenLocations = (locationX, locationY) =>
  greatCircleDistance(centralSubtendedAngle(locationX, locationY));

const Saransk = {latitude: 54.1884416, longitude: 45.1837952};
const Ruzaevka = {latitude: 54.1838700, longitude: 45.1809000};
// const Ruzaevka = {latitude: 54.0638700, longitude: 44.9509000};
console.log(distanceBetweenLocations(Saransk, Ruzaevka));