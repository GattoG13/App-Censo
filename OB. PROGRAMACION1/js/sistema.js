class Sistema {
    constructor() {
     this.censistas = [
        new Censista(1, "Juan", "juan123", "A1aaaa"),
        new Censista(2, "Maria", "maria123", "B2bbbb"),
        new Censista(3, "Carlos", "carlos123", "C3ccc"),   
     ];

     this.censados = [ 
      new Censado(1, "Ben", "Diez", 10, "6.342.754-2", 4, 4, 1, false),
      new Censado(2, "Goku", "Goku", 30, "5.132.213-6", 2, 2, 1, false),
      new Censado(3,"Dora","la Exploradora",7,"4.765.339-3",3,1 ,2, true),
      new Censado(4, "Bob", "Esponja", 8, "4.189.432-5", 7 , 4,1, false),
      new Censado(5, "Pikachu", "Pikachu", 30, "7.010.924-2", 16 , 1 ,1, false),
      new Censado(6, "Mickey", "Mouse", 5, "8.032.312-7", 1, 4 ,3, true),
      new Censado(7, "Pluto", "Fernandez", 4, "5.192.995-4", 7 , 1 ,2, false),
      new Censado(8, "Masha", "Martinez", 6, "3.858.201-0", 11, 4 ,3, false),
      new Censado(9,"Nobita","Nobi",9,"3.180.659-4",19 ,4 ,1, false),
      new Censado(10, "Elmo", "", 3, "5.989.149-8", 7 , 1 , 2, false),
      new Censado(11, "Scooby", "Doo", 6, "6.286.290-5", 4 , 4 ,3, true),
      new Censado(12,"Diego","Marquez",8,"8.666.859-1",4 ,1 , 3, true),
      new Censado(13, "Bugs", "Bunny", 7, "3.787-440-2", 9 , 3 , 1, false),
      new Censado(14, "Timmy", "Turner", 10, "7.113.583-2", 19 , 4 ,2 , true),
      new Censado(15, "Heidi", "Martinez", 7, "7.233.151-8", 16 , 1 , 1, false),
      new Censado(16, "Naruto", "Shipuden", 11, "7.614.592-1", 1, 1 ,3, false),
      new Censado(17, "Tweety", "Fernandez", 5, "5.013.139-0", 2 , 3 , 2, false),
      new Censado(18, "Pucca", "Pucci", 18, "6.664.842-0", 10 , 1 ,2, true),
      new Censado(19, "Oliver", "Atom", 13, "7.672.799-7", 14 , 3 ,1, false), 
      new Censado(20,"Lilo","Pelekai", 42,"2.389.888-8",2 ,1 ,3, false),
      new Censado(21, "Dumbo", "Perez", 4,  "4.467.144-5" , 16 , 4 , 3, true),
      new Censado(22,"Pinky","Dinky Doo",6, "3.426.777-9" ,9 ,3 ,2, true),
      new Censado(23,"Beyblade","Rodriguez",11, "8.457.734-2" , 19 ,2 , 2, false),
      new Censado(24,"Kim","Possible",14,"9.891.450-2", 10 ,2 , 1, true),
      new Censado(25,"Pato","Aventuras",50,"7.318.850-2",2 ,1 , 2, false),
      new Censado(26, "Popeye", "Martinez", 45, "6.901.814-3", 14 , 3 , 1, false),
      new Censado(27,"George","Pájaro",7,"4.842.763-2",9 ,2 , 2, false),
      new Censado(28, "Dino", "Fernanez", 4, "4.576.260-9", 16 , 4 , 2, false),
      new Censado(29,"Donatello","Tortuga",59,"3.409.788-7",14 ,2 , 2, true),
      new Censado(30,"Ryder","Paw Patrol",6,"7.695.216-6",2 ,2 , 1, false),
     ];

     this.departamentos= [
    new Departamento(1, "Artigas", ", , ,"),
    new Departamento(2, "Canelones"),
    new Departamento(3, "Cerro Largo"),
    new Departamento(4, "Colonia"),
    new Departamento(5, "Durazno"),
    new Departamento(6, "Flores"),
    new Departamento(7, "Florida"),
    new Departamento(8, "Lavalleja"),
    new Departamento(9, "Maldonado"),
    new Departamento(10, "Montevideo"),
    new Departamento(11, "Paysandú"),
    new Departamento(12, "Río Negro"),
    new Departamento(13, "Rivera"),
    new Departamento(14, "Rocha"),
    new Departamento(15, "Salto"),
    new Departamento(16, "San José"),
    new Departamento(17, "Soriano"),
    new Departamento(18, "Tacuarembó"),
    new Departamento(19, "Treinta y Tres")
  ]
  }
  agregaCensista(censista) {
  this.censistas.push(censista);
  }

  agregaCensado(personaCensada) {
  this.censados.push(personaCensada);
  }

  obtenerObjeto(arrElementos, propiedad, busqueda) {
      let objeto = null;
      for (let i = 0; i < arrElementos.length; i++) {
          const unElemento = arrElementos[i];
          if(unElemento[propiedad] === busqueda){
              objeto = unElemento;
              break;
          }
      }
      return objeto;
}
  buscarElemento(array, propiedad, busqueda) {
  let existe = false;
    for (let i = 0; i < array.length; i++) {
      const elementoEncontrado = array[i];
      if (elementoEncontrado[propiedad] === busqueda) {
       existe = true;
        break;
      }
    }
     return existe;
    }

  validarCampoVacio(valor) {
  let campoValido = false;
    if(valor !== ""){ 
      campoValido= true;
    }
      return campoValido;
    }
      
  validarContrasena(clave) {
  let contadorMinusculas = 0;
  let contadorMayusculas = 0;
  let contadorNumeros = 0;
  let contrasenaValida = false;
   
  for (let i = 0; i < clave.length; i++) {
  let codigoDeLetraActual = clave.charCodeAt(i);
    if (codigoDeLetraActual >= 48 && codigoDeLetraActual <= 57) {
      contadorNumeros++;
    }
    if (codigoDeLetraActual >= 65 && codigoDeLetraActual <= 90) {
      contadorMayusculas++;
    }
    if (codigoDeLetraActual >= 97 && codigoDeLetraActual <= 122) {
      contadorMinusculas++; 
    }
  }
   
  if (clave.length >= 5 && contadorNumeros >= 1 && contadorMayusculas >= 1 && contadorMinusculas >= 1) {
    contrasenaValida = true;
  }
    return contrasenaValida;
  }
   
  verificarLogin(nombreUsuario, clave) {
     let resultado = false;
     let unUsuario = this.obtenerObjeto(this.censistas, "nombreDeUsuario", nombreUsuario);
   
     if (unUsuario !== null) {
      if (unUsuario.contrasena === clave) {
      
        resultado = true;
      }
     }
     return resultado;
    }

  verificaEdad(edad){
  let resultado= false; 
    if(!isNaN(edad)){
      if(edad > 0 && edad <= 130){
        resultado = true;
      }
    }
      return resultado
    }
      
//esta la usamos para eliminar guiones y puntos de la cedula
  eliminarCaracter(txt, caracter){
  let textoSustituido = "";

    for (let i = 0; i < txt.length; i++) {
      if (txt.charAt(i) !== caracter) {
        textoSustituido += txt.charAt(i);
      }
    }
      return textoSustituido;
    }
    
  verificaCedula(cedula){
  let valida = false;
  let CIgion = this.eliminarCaracter(cedula, "-");
  let CI  = this.eliminarCaracter(CIgion, ".");
  
    if(!isNaN(CI)){
      if (CI.length === 7) {
      CI = "0" + CI;
      }

    let multiplicador= "2987634";
    let digitoAVerificar= CI.charAt(CI.length -1); 
    let acumulador= 0;

    for(let i= 0; i < CI.length -1; i++){
      acumulador+= Number(CI.charAt(i) * Number(multiplicador.charAt(i))); 
    }

    let digitoVerificador = (10 - (acumulador % 10)) % 10;

    if(digitoVerificador === Number(digitoAVerificar)){
      valida= true;
    }
      return valida;
    }   
  }

  validarSelects(value){
  let existe = false;
    if(value !== -1){
      existe = true
    }
      return existe
    }

    
  sobreEscribirDatosPersona(cedula, primerNombre, apellido, edad, depto, ocupacion){
  let persona = this.obtenerObjeto(this.censados, "cedula", cedula);
    persona.primerNombre = primerNombre;
    persona.apellido = apellido;
    persona.edad = edad;
    persona.depto = depto;
    persona.ocupacion = ocupacion;
  }


  sobreEscribirPropiedadCensado(idPersona, idCensistaNuevo){
  let personaAValidar= this.obtenerObjeto(this.censados, "id", idPersona);
    personaAValidar.idCensista= idCensistaNuevo;
  }
}

  