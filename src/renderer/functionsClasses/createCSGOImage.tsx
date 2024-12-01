export function createCSGOImage ( urlEndpath : string ) : string {
  if (urlEndpath) {
    urlEndpath = urlEndpath.replace('_large', '')
  }
  return `https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/${urlEndpath}_png.png`
}
