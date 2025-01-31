import convert from 'color-convert'

export const formatDate = (dayType, day, month, year) => {
    let dayFormatted
    let monthFormatted
    const formatter = {
        day: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        month: ['Jan', 'Feb', 'March', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
       }
    for (let i = 0; i < 7; i++) {
      if (dayType === i) {
        dayFormatted = formatter.day[i]
      } 
    }
    for (let i = 1; i <= 12; i++) {
      if (month === i) {
        monthFormatted = formatter.month[i - 1]      
      }
    }
      return {
        dayNum: day,
        dayName: dayFormatted,
        monthNum: month,
        monthName: monthFormatted,
        year: year,
      }
  }

  export const checkIfImgExists = (setter, img, basicImg) => {
    fetch(`http://localhost:3000/${img}`, { method: 'HEAD' })
    .then(res => {
        if (res.ok) {
            return setter(`http://localhost:3000/${img}`)
        } else {
            return setter(basicImg)
        }
    })
    // .catch(err => console.log('Error:', err));
}

export const getRGBValues = (rgb) => {
  // console.log(rgb)
  const split = rgb.substring(5, rgb.length-1).split(',')
  const parseArr = split.map(e => {
    return parseInt(e)
  })
  return parseArr
}

export const convertToHSL = (headlineColor, isLight ) => {
  let rgb = getRGBValues(headlineColor)
  // console.log(rgb);
  let value
  if (headlineColor.startsWith('#')) {
    value = convert.hex.hsl(headlineColor)
  } else {
    value = convert.rgb.hsl(rgb[0], rgb[1], rgb[2])
  }

  // console.log(value)
  let L = value[2]
  let shouldBeReplaced
  isLight ? shouldBeReplaced = L > 70 ? true : false : shouldBeReplaced = L < 30 ? true : false 
  if (!shouldBeReplaced) return headlineColor
  if (isLight) value = value = [value[0], value[1], 20]
  if (!isLight) value = value = [value[0], value[1], 100]
  const rgbBack = convert.hsl.rgb(value)
  return `rgba(${rgbBack[0]}, ${rgbBack[1]}, ${rgbBack[2]}, 1)`
  
}

export const convertDateAndGetMax = (from) => {
  const dateStr = from.map(el => {
    const updatedAt = el.updatedAt
    const withSlash = updatedAt.substring(0, 10)
    const split = withSlash.split('-')
    const newString = `${split[0]}${split[1]}${split[2]}`
    const toInt = parseInt(newString)
    return toInt
  })
  return Math.max(...dateStr)
}

export const formatFullDate = (day, month, year) => {
  if (day >= 10 && month >= 10){
      return `${year}${month}${day}`
    }
    if (day < 10 && month >= 10){
      return `${year}${month}0${day}`
    }
    if (day >= 10 && month < 10){
      return `${year}0${month}${day}`
    }
    if (day < 10 && month < 10) {
      return `${year}0${month}0${day}`
    }
}