class Censista {
    constructor(idCensista, nombre, nombreDeUsuario, contrasena) {
   
   this.id= idCensista;
   this.nombre = nombre;
   this.nombreDeUsuario = nombreDeUsuario;
   this.contrasena= contrasena;
    }
   }
 
class Censado {
    constructor(idCensado, primerNombre, apellido, edad, cedula, depto, ocupacion, idCensista, censado) {
     this.id = idCensado;
     this.primerNombre = primerNombre;
     this.apellido = apellido;
     this.edad = edad;
     this.cedula = cedula;
     this.depto = depto;
     this.ocupacion = ocupacion;
     this.idCensista= idCensista; //este es el censista asignado 
     this.censado = censado;
    }
   }

   class Departamento {
      constructor(idDepto, nombreDepto){
         this.idDepto = idDepto;
         this.depto = nombreDepto;
      }
   }

   

   