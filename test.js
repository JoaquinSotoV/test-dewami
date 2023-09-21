import { minValue, getMatrixFromImage } from './soto-joaquin.js'

const minValueTestData = [
  [0, 3, 1, 4],
  [5, 7, 5, 9, 7],
  [1, 9, 3, 1, 7, 4, 6, 6, 7]
]

const getMatrixFromImageTestData = [
  './images/3x3.png',
  './images/4x4.png',
  './images/10x10.png',
]

const testMinValue = (numbersArrays) => {
  console.log(" - minValue test: ")

  numbersArrays.forEach( numbersArray => {
    console.log(`minValue([${numbersArray}]) ==> return (${minValue(numbersArray)})`)
  })
}

const testGetMatrixFromImage = async (imagePaths) => {
  console.log("\n - getMatrixFromImage test: ")

  for (const imagePath of imagePaths) {
    const matrix = await getMatrixFromImage(imagePath)
    console.log(`getMatrixFromImage(${imagePath}) ==> return (${JSON.stringify(matrix)})`)
  }
}

testMinValue(minValueTestData)

await testGetMatrixFromImage(getMatrixFromImageTestData)