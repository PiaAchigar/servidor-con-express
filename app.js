const fs = require("fs");

class Contenedor {
  constructor(archivoName) {
    this.archivoName = archivoName;
  }

  async getAll() {
    //Devuelve un array con los objetos presentes en el archivo.

    try {
      //leo el archivo, ésa info es un array, la guardo en una vriable
      const data = await fs.promises.readFile("productos.txt", "utf-8");
      //lo parseo
      const arrayData = JSON.parse(data); //tiraba error porque yo guarde a mano las cosas en "productos.txt"
      //console.log({ arrayData });
      return arrayData;
    } catch (e) {
      //si da error x parsear "data" , entonces asigno el []
      const arrayData = [];
      console.error("Error de lectura-liena 28", e);
      return arrayData;
    }
  }

  async save(obj) {
    //Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
    try {
      const arrayData = await this.getAll();
      //console.log({ arrayData });
      //el id del obj va a ser igual a la longitud del array +1
      //obj.id = arrayData.length + 1;
      arrayData.length == 0
        ? (obj.id = 1)
        : (obj.id = arrayData[arrayData.length - 1].id + 1);
      arrayData.push(obj);
      fs.promises.writeFile("productos.txt", JSON.stringify(arrayData));

      return obj.id;
    } catch (e) {
      console.error("Error de lectura", e);
    }
  }
  async getById(num) {
    //Recibe un id y devuelve el objeto con ese id, o null si no está.
    //tengo que abrir el archivo 1ro , buscarlo, y luego devolver, eso creo..
    try {
      const arrayData = await this.getAll();
      //console.log({ arrayData : arrayData[0] });
      const objObtenido = arrayData.find((e) => e.id == num) || "null";
      return objObtenido;
    } catch (e) {
      console.error("Dio error-fn getById", e);
    }
  }
  async deleteById(num) {
    //Elimina del archivo el objeto con el id buscado.
    try {
      const arrayData = await this.getAll();
      //indexOf - findIndex()
      const index = arrayData.findIndex((e) => e.id == num);
      arrayData.splice(index, 1);
      fs.promises.writeFile("productos.txt", JSON.stringify(arrayData));
    } catch (e) {
      console.error("Dio error-fn deleteById", e);
    }
  }
  async deleteAll() {
    //Elimina todos los objetos presentes en el archivo.
    try {
      const arrayData = [];
      fs.promises.writeFile("productos.txt", JSON.stringify(arrayData));
    } catch (e) {
      console.log("Error al limpiar el archivo", e);
    }
  }
}
module.exports = Contenedor;
//hago el try catch cuando implemento cada metodo y todas las llamadas de fs acá

//let archivo = new Contenedor();
const objSemi = {
  title: "Semicirculo",
  price: 100,
  thumbnail:
    "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
};
const objCircle = {
  title: "Calculadora",
  price: 234.56,
  thumbnail:
    "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
  id: 2,
};
const objGlobo = {
  title: "Globo Terráqueo",
  price: 345.67,
  thumbnail:
    "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
  id: 3,
};

// console.log("--------------Save--------------");
// (async () => {
//   try {
//     //console.log(archivo.save(objSemi));
//     //console.log(archivo.save(objCircle));
//     //console.log(archivo.save(objGlobo));
//   } catch (e) {
//     console.log("Error de IIFE-save", e);
//   }
// })();
// console.log("-------------GetById-------------");
// (async () => {
//   //como llamo a una funcion asinc , tengo que usar una IIFE
//   try {
//     let obj = await archivo.getById(2);
//     console.log({ obj });
//   } catch (e) {
//     console.log("Error de IIFE", e);
//   }
// })();
// console.log("-------------deleteById-------------");
// (async () => {
//   try {
//     await archivo.deleteById(2);
//   } catch (e) {
//     console.log("Error de IIFE-delete", e);
//   }
// })();

// console.log("-------------deleteAll-------------");
// (async () => {
//   try {
//     await archivo.deleteAll();
//   } catch (e) {
//     console.log("Error de IIFE-delete", e);
//   }
// })();
