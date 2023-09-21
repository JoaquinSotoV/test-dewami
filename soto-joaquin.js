import Jimp from "jimp"

/**
 * 1. Obtener el número más pequeño de una lista, utilizando todos los elementos del
      array, sin duplicados. El tamaño de la lista es variable. Por ejemplo:
      minValue([1,3,1]) ==> return (13)
      minValue([5,7,5,9,7]) ==> return (579)
      minValue([1,9,3,1,7,4,6,6,7]) ==> return (134679)
 */

/**
 * Obtener el número más pequeño de una lista, utilizando todos los elementos del array, sin duplicados.
 * @param {Array<number>} numbersArray - Arreglo de numeros.
 * @returns {number} - Número generado.
 */ 

export const minValue = (numbersArray) => {
  // Se eliminan los duplicados creando un nuevo array con los valores únicos utilizando el operador spread y el constructor de Set
  const uniqueNumbersArray = [...new Set(numbersArray)]
  // Se ordena el array de menor a mayor y se convierte a string para luego convertirlo a número
  return parseInt(uniqueNumbersArray.sort().join(""))
  // Se asume que numbersArray es un array de números enteros positivos
  // Se asume que el numero 0 no tiene que estar presente en el numero retornado ej: [0, 3, 1, 4] ==> return (134)
}

/**
 * 2. Obtener una matriz a partir de una imagen máximo de 100 x 100 píxeles que
      contengan las letras: W, B, O según el color del pixel W = White, B = Black, O = Otro
      color. Puedes hacer uso de librerías externas.
 */

/**
 * Obtiene una matriz a partir de una imagen con letras 'W' (blanco), 'B' (negro) y 'O' (otro color) según el color de los píxeles.
 * @param {string} imagePath Ruta de la imagen.
 * @returns {Promise<Array<Array<string>>>} Promesa que resuelve en una matriz de letras.
 */   
export const getMatrixFromImage = async (imagePath) => {
  try {
    // Se lee la imagen utilizando la librería Jimp
    const image = await Jimp.read(imagePath)
    // Se obtienen las dimensiones de la imagen
    const { width, height } = image.bitmap

    if (width > 100 || height > 100) {
      console.error(`Image ${imagePath} exceeds maximum size of 100x100 pixels.`)
      return []
    }
    // Se crea una matriz vacía
    const matrix = []
    // Se recorre la imagen pixel por pixel y se obtiene el color en formato RGBA
    for (let i=0; i<height; i++) {
      const row = []
      for (let j=0; j<width; j++) {
        const { r, g, b, a } = Jimp.intToRGBA(image.getPixelColor(j, i))

        // Se valida el color del pixel y se agrega a la matriz
        if (r === 255 && g === 255 && b === 255 && a === 255) {
          row.push("W")
        } else if (r === 0 && g === 0 && b === 0 && a === 255) {
          row.push("B")
        } else {
          row.push("O")
        }
      }

      matrix.push(row)
    }
    // Se retorna la matriz
    return matrix
  } catch (error) {
    console.error("An unexpected error ocurred: ", error.message)
  }
  // Se asume que la imagen es de tipo PNG o JPG
  // Se asume que la imagen tiene un tamaño máximo de 100 x 100 píxeles
  // No he trabajado anteriormente leyendo pixeles de una imagen, por lo que no estoy
  // seguro si la librería Jimp es la mejor opción para este caso, pero me parecio interesante y fácil de utilizar.
}
