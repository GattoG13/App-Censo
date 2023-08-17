window.addEventListener("load", inicio);

function inicio() {
  document.querySelector("#btnRegistro").addEventListener("click", registrarUsuario); 
  document.querySelector("#btnLogin").addEventListener("click", loginCensista); 
  document.querySelector("#btnIrAlLogin").addEventListener("click", irALogin); 
  document.querySelector("#btnIrAlRegistrar").addEventListener("click", irARegistro);  
  document.querySelector("#cerrarSesion").addEventListener("click", cerrarSesion); 
  document.querySelector("#btnSoyInvitado").addEventListener("click", abrirInvitado); 
  //----------------------------------------------FUNCIONALIDADES
  document.querySelector("#pCensoFinalizado").addEventListener("click", ingresoDatosParaCenso); 
  document.querySelector("#consultaCensoAValidar").addEventListener("click", consultaCensosPreCompletados);
  document.querySelector("#btnEditarCenso").addEventListener("click", editarDatosCenso); 
  document.querySelector("#btnEliminarDatos").addEventListener("click", eliminarDatos);
  document.querySelector("#btnValidarCenso").addEventListener("click", validarCenso);
  document.querySelector("#irARealizarCenso").addEventListener("click", irAlIngresarDatos);
  document.querySelector("#rAsignarCensista").addEventListener("click", reAsignarPersona);
  document.querySelector("#btnVerListaCensados").addEventListener("click", mostrarListaDeCensados);
  document.querySelector("#btnVisualizarInfoEstadistica").addEventListener("click", mostrarTabla)
  document.querySelector("#btnCensosPorDepto").addEventListener("click", mostrarTablaDepartamento);
//----------------------------------------------CARGA SELECTS
  document.querySelector("#btnReasignarPersonaParaValidar").addEventListener("click", cargarSelectsReasignar);
  cargarDeptos();
//-----------------------------ESTO ES PARA LA PARTE DE "CONSULTA CENSOS"
  deshabilitaDatos();
//----------------------------NAVEGACIÓN
  let botonesFuncionalidades = document.querySelectorAll(".btnFuncionalidades");

  for (let i = 0; i < botonesFuncionalidades.length; i++) {
    botonesFuncionalidades[i].addEventListener("click", mostrarSeccion);
  }
  
 ocultarSecciones();  // oculta todo lo que tiene class="seccion"

  document.querySelector("#navPrincipal").style.display = "none";
  irARegistro();
}
//----------------------------------------ACA TERMINA EL INICIO
let sistema = new Sistema(); 
let idCensista= 4;
let idInvitado= 31;
let perfilIniciadoSesion = false;
let usuarioLogueado= null;

function abrirInvitado(){
 mostrarFuncionalidades();
 mostrarBotones("invitado");
 mostrarBotonesConsultaPInvitado();
 document.querySelector("#consultaPreCompletados").style.display= "block";
}

function irALogin(){
  document.querySelector("#registro").style.display = "none";
  document.querySelector("#login").style.display = "block";
}

function irARegistro(){
  document.querySelector("#registro").style.display = "block";
  document.querySelector("#login").style.display = "none";
}

function irAlIngresarDatos(){
  document.querySelector("#agregarPersona").style.display = "block";
  document.querySelector("#consultaPreCompletados").style.display= "none";
}

function mostrarSeccion(){ 
  ocultarSecciones();
  
  let idBoton= this.getAttribute("id"); 
  let idSeccion= idBoton.charAt(3).toLowerCase() + idBoton.substring(4);
  document.querySelector("#" + idSeccion).style.display = "block";
}

function mostrarBotones(tipo){
  ocultarBotones();
  let botonesMostrar = document.querySelectorAll("."+ tipo);
  for (let i = 0; i < botonesMostrar.length; i++) {
      botonesMostrar[i].style.display = "block";
  }
}

function ocultarBotones() {
  let botonesOcultar = document.querySelectorAll(".btnFuncionalidades"); 
  for (let i = 0; i < botonesOcultar.length; i++) {
      botonesOcultar[i].style.display = "none";
  }
}

function ocultarSecciones(){ //oculta todo (funcionalidades)
  let secciones= document.querySelectorAll(".seccion");
  for (let i= 0; i < secciones.length; i++) {
      secciones[i].style.display= "none";
  }
}

function cargarDeptos() {//carga departamentos
  const deptos = document.querySelectorAll(".deptos");
  
  for (let i = 0; i < deptos.length; i++) {
    deptos[i].innerHTML = `<option value="-1">Seleccione una opción...</option>`;
  
    for (let j = 0; j < sistema.departamentos.length; j++) {
      const depto = sistema.departamentos[j];
      deptos[i].innerHTML += `<option value="${depto.idDepto}">${depto.depto}</option>`;
    }
  }
}

function cargarSelectsReasignar(){
  cargarCensistas();
  cargarPendientesAValidar();
}

function cargarPendientesAValidar(){
  let personas= document.querySelectorAll(".selectPersonas");
  
  for (let i = 0; i < personas.length; i++) {
    personas[i].innerHTML = `<option value="-1">Seleccione una persona...</option>`;
    
    for(let j= 0; j < sistema.censados.length; j++){
      const persona= sistema.censados[j];
      if(persona.censado === false && usuarioLogueado.id === persona.idCensista){
      personas[i].innerHTML += `<option value="${persona.id}">${persona.primerNombre} ${persona.apellido}</option>`;
      }  
    }
  } 
}

function cargarCensistas(){

  const cargaCensistas = document.querySelectorAll(".censistas");

  for (let i = 0; i < cargaCensistas.length; i++) {
    cargaCensistas[i].innerHTML = `<option value="-1">Seleccione un censista...</option>`;

    for (let j = 0; j < sistema.censistas.length; j++) {
      const censista = sistema.censistas[j];
      const personaLogueada= usuarioLogueado.id;

      if (personaLogueada !== censista.id) {
        cargaCensistas[i].innerHTML += `<option value="${censista.id}">${censista.nombre}</option>`;
      }
    }
  }
}

function cerrarSesion(){ 
  ocultarSecciones();
  irARegistro();
  usuarioLogueado = null;
  perfilIniciadoSesion = false;
  document.querySelector("#navPrincipal").style.display = "none";
  document.querySelector("#nombreUsuarioLogeado").innerHTML = "none";
  document.querySelector("#btnSoyInvitado").style.display = "block";
  limpiarInputsLogIn();
  limpiarInputsRegistro();
  limpiarInputsRealizarCenso();
  limpiarInputsConsultaCenso();
  document.querySelector("#tblInfoEstadisticaDepto").innerHTML = 
  `<tr></tr>`;
  document.querySelector("#rMensajeReasignado").innerHTML= "";
  document.querySelector("#slcDeptosInfoEstadistica").value= -1; 
  document.querySelector("#pMensajeTbl").innerHTML= "";
}

function mostrarFuncionalidades(){ 
  document.querySelector("#navPrincipal").style.display = "block";
  document.querySelector("#registro").style.display = "none";
  document.querySelector("#login").style.display = "none";
  if(perfilIniciadoSesion){
    document.querySelector("#nombreUsuarioLogeado").innerHTML = "Bienvenido " + usuarioLogueado.nombre + "!";
  }else{
    document.querySelector("#nombreUsuarioLogeado").innerHTML = "Bienvenido invitado :)";
  }
  
  document.querySelector("#btnSoyInvitado").style.display = "none";
}


//----------------------------------------REGISTRO E INICIO

function registrarUsuario() {
  let mensaje = "";
  let rNombre = document.querySelector("#registroNombre").value;
  let rNUsuario = document.querySelector("#registroUsuario").value;
  let rContrasena = document.querySelector("#registroContraseña").value;

  rNombreUsuario= rNUsuario.toLowerCase();

  rNombreCampoLleno = sistema.validarCampoVacio(rNombre);
  rNUsuarioCampoLleno = sistema.validarCampoVacio(rNombreUsuario);
  rContraCampoLleno = sistema.validarCampoVacio(rContrasena);

  
  if (rNombreCampoLleno === true && rNUsuarioCampoLleno === true && rContraCampoLleno === true) {

    let rContrasenaValidada = sistema.validarContrasena(rContrasena);

    if (rContrasenaValidada === true ) {

      let rUsuarioExiste = sistema.buscarElemento(sistema.censistas,"nombreDeUsuario",rNombreUsuario);

      if (!rUsuarioExiste) {
        let rUsuarioNuevo = new Censista(idCensista, rNombre, rNombreUsuario, rContrasena);

        sistema.agregaCensista(rUsuarioNuevo);
        idCensista++;
        usuarioLogueado= rUsuarioNuevo.id;
        irALogin();
      }else{
        mensaje = "EL NOMBRE DE USUARIO YA EXISTE";
      }
    }else{
      mensaje = "SU CONTRASEÑA DEBE TENER 5 CARACTERES MINIMO Y CONTAR CON UNA MAYUSCULA, UNA MINUSCULA Y UN NUMERO";
    }
  }else{
    mensaje = "LOS CAMPOS NO PUEDEN ESTAR VACIOS";
  }
  document.querySelector("#pRegistro").innerHTML = mensaje;
}

function loginCensista() {
  let lNombre = document.querySelector("#loginNUsuario").value;
  let lContrasena = document.querySelector("#loginContraseña").value;
  let mensaje= "";

  let lNombreCI= lNombre.toLowerCase()

  let lNombreCampoLleno = sistema.validarCampoVacio(lNombreCI);
  let lContrasenaCampoLleno = sistema.validarCampoVacio(lContrasena);

  if(lNombreCampoLleno=== true && lContrasenaCampoLleno=== true){

  let verificarDatos= sistema.verificarLogin(lNombreCI, lContrasena);

  if(verificarDatos === true){
    usuarioLogueado= sistema.obtenerObjeto(sistema.censistas, "nombreDeUsuario", lNombre); 
    perfilIniciadoSesion= true; 
    mostrarBotonesConsultaPCensista();
    mostrarFuncionalidades();
    mostrarBotones("censista");
    document.querySelector("#agregarPersona").style.display= "block";
  }else{
    mensaje= "EL NOMBRE DE USUARIO O CONTRASEÑA NO COINCIDEN. <br> VERIFIQUE SUS DATOS O CREÉSE UNA CUENTA";
  }
  }else{
    mensaje= "LOS CAMPOS NO PUEDEN ESTAR VACIOS";
  }  
document.querySelector("#pLogIn").innerHTML = mensaje;
}

//----------------------------------------------FUNCIONALIDADES 
function generarIDCensista(){
  let arrayCensista = sistema.censistas;
  let idAleatorio = Math.floor(Math.random() * arrayCensista.length);
  return idAleatorio;
}

function ingresoDatosParaCenso(){
  let iPrimerNombre= document.querySelector("#pNombre").value;
  let iApellido = document.querySelector("#pApellido").value;
  let iEdad= Number(document.querySelector("#pEdad").value); 
  let iCedula= document.querySelector("#pCedula").value;
  let iDepto= Number (document.querySelector(".deptos").value); 
  let iOcupacion = Number(document.querySelector("#slcOcupacion").value);
  let mensaje= "";
  let iCensado = false; //propiedad censado
  
  if(perfilIniciadoSesion) { //si el usuario es censista, guarda el censo con la propiedad censado en true
    iCensado = true;
  }

// validaciones
  let iPrimerNombreCompCampoLLeno= sistema.validarCampoVacio(iPrimerNombre);
  let iApellidoCompCampoLleno = sistema.validarCampoVacio(iApellido);
  let iEdadCompCampoLleno = sistema.validarCampoVacio(iEdad);
  let iCedulaCompCampoLleno = sistema.validarCampoVacio(iCedula);
  let iDeptoCompCampoLleno = sistema.validarSelects(iDepto);
  let iOcupacionCompCampoLleno = sistema.validarSelects(iOcupacion);

  
if(iPrimerNombreCompCampoLLeno=== true &&
  iApellidoCompCampoLleno=== true &&
  iEdadCompCampoLleno=== true &&
  iCedulaCompCampoLleno=== true && 
  iDeptoCompCampoLleno === true &&
  iOcupacionCompCampoLleno === true){

    let iEdadValida= sistema.verificaEdad(iEdad);
    
  if(iEdadValida===true){

    let validaCedula= sistema.verificaCedula(iCedula);
    
  if(validaCedula=== true){
        
      let buscaSiCedulaExiste= sistema.buscarElemento(sistema.censados, "cedula", iCedula); 

    if(buscaSiCedulaExiste=== false){
        let idCensistaAsignado;
          if(usuarioLogueado !== null){
            idCensistaAsignado= usuarioLogueado.id;
          }else{
            idCensistaAsignado= generarIDCensista();
          }
      let censistaAsignado = sistema.obtenerObjeto(sistema.censistas, "id", idCensistaAsignado);

      let nuevaPCensada= new Censado(idInvitado, iPrimerNombre, iApellido, iEdad, iCedula, iDepto, iOcupacion, idCensistaAsignado, iCensado);

      sistema.agregaCensado(nuevaPCensada);
      idInvitado++;
      mostrarTabla();             //para que se actualice la información de las tablas
      mostrarListaDeCensados();
      mensaje= "PERSONA CENSADA CON EXITO <br><br> Se le asigno el censista: " + censistaAsignado.nombre;
  }else{
      mensaje = "LA PERSONA YA ESTÁ CENSADA";
  }
  }else{
    mensaje= "CEDULA INCORRECTA, VERIFIQUE DATOS";
  }
  }else{
    mensaje= "EDAD INVALIDA"; 
  }
}else{
    mensaje = "LOS CAMPOS NO PUEDEN ESTAR VACIOS";
  }
  document.querySelector("#pDatosCenso").innerHTML = mensaje;
}

function consultaCensosPreCompletados(){ 
  deshabilitaDatos();
  let preCargaCedula = document.querySelector("#consultaCedula").value; 
  let preCargaCedulaValidada = sistema.verificaCedula(preCargaCedula);
  
  let mensaje = "";
  
  let preCargaCedulaCampoLleno = sistema.validarCampoVacio(preCargaCedula);

  if(preCargaCedulaCampoLleno === true){
  let busquedaAValidar = sistema.buscarElemento(sistema.censados, "cedula", preCargaCedula); 
      
    if(busquedaAValidar === true && 
      preCargaCedulaValidada === true){
      let persona = sistema.obtenerObjeto(sistema.censados, "cedula", preCargaCedula);

       if(persona.censado === true){
        mensaje = "EL CENSO YA FUE VALIDADO";
       }else{
        recuperaDatosInput(preCargaCedula);
       }  
    }else {
      if(!perfilIniciadoSesion){
                let btnIrARealizarCenso= document.querySelector("#irARealizarCenso");
        btnIrARealizarCenso.removeAttribute("disabled");
        mensaje= `DATOS NO ENCONTRADOS O CEDULA INVÁLIDA <br> 
        SI ANTERIORMENTE NO INGRESÓ SUS DATOS, PUEDE IR A REALIZAR CENSO`;
      }else{
        mensaje = "DATOS NO ENCONTRADOS O CEDULA INVÁLIDA";
      }
      
    }
  } else {
    mensaje = "EL CAMPO NO PUEDE ESTAR VACIO";
  }
  document.querySelector("#pMensaje").innerHTML = mensaje;
}

//------------------------------------------------------INTERFAZ FUNCIONALIDAD CONSULTA CENSO
// deshabilitamos los inputs precompletados
function deshabilitaDatos(){
  let cNombreInput = document.querySelector("#cNombre");
  let cApellidoInput = document.querySelector("#cApellido");
  let cEdadInput = document.querySelector("#cEdad");
  let slcDeptoSelect = document.querySelector("#slcDeptoC");
  let slcOcupacionSelect = document.querySelector("#slcOcupacionC");
  let btnEliminarDatos = document.querySelector("#btnEliminarDatos");
  let btnEditarCenso = document.querySelector("#btnEditarCenso");
  let btnValidarCenso = document.querySelector("#btnValidarCenso");
  let btnIrARealizarCenso= document.querySelector("#irARealizarCenso");

  cNombreInput.setAttribute("disabled", "disabled");
  cApellidoInput.setAttribute("disabled", "disabled");
  cEdadInput.setAttribute("disabled", "disabled");
  slcDeptoSelect.setAttribute("disabled", "disabled");
  slcOcupacionSelect.setAttribute("disabled", "disabled");
  btnEliminarDatos.setAttribute("disabled", "disabled");
  btnEditarCenso.setAttribute("disabled", "disabled");
  btnValidarCenso.setAttribute("disabled", "disabled");
  btnIrARealizarCenso.setAttribute("disabled", "disabled");
}

// habilitamos los inputs precompletados
function habilitaDatos(){
  let cNombreInput = document.querySelector("#cNombre");
  let cApellidoInput = document.querySelector("#cApellido");
  let cEdadInput = document.querySelector("#cEdad");
  let slcDeptoSelect = document.querySelector("#slcDeptoC");
  let slcOcupacionSelect = document.querySelector("#slcOcupacionC");
  let btnEliminarDatos = document.querySelector("#btnEliminarDatos");
  let btnEditarCenso = document.querySelector("#btnEditarCenso");
  let btnValidarCenso = document.querySelector("#btnValidarCenso");

  cNombreInput.removeAttribute("disabled");
  cApellidoInput.removeAttribute("disabled");
  cEdadInput.removeAttribute("disabled");
  slcDeptoSelect.removeAttribute("disabled");
  slcOcupacionSelect.removeAttribute("disabled");
  btnEliminarDatos.removeAttribute("disabled");
  btnEditarCenso.removeAttribute("disabled");
  btnValidarCenso.removeAttribute("disabled");
}

function mostrarBotonesConsultaPCensista(){
  if(perfilIniciadoSesion === true){
    document.querySelector("#btnValidarCenso").style.display = "block";
    document.querySelector("#btnEditarCenso").style.display = "none";
    document.querySelector("#btnEliminarDatos").style.display = "none";
    document.querySelector("#irARealizarCenso").style.display = "none";
   }
  }

function mostrarBotonesConsultaPInvitado(){
  if(perfilIniciadoSesion === false){
    document.querySelector("#btnValidarCenso").style.display = "none";
    document.querySelector("#btnEditarCenso").style.display = "block";
    document.querySelector("#btnEliminarDatos").style.display = "block";
    document.querySelector("#irARealizarCenso").style.display = "block";
   }
}

function recuperaDatosInput(cedula){

  let personaCedula = sistema.obtenerObjeto(sistema.censados, "cedula", cedula);

  if(personaCedula !== null){
      habilitaDatos();
        document.querySelector("#cNombre").value = personaCedula.primerNombre;
  
        document.querySelector("#cApellido").value = personaCedula.apellido;
  
        document.querySelector("#cEdad").value = personaCedula.edad;
  
        document.querySelector("#slcDeptoC").value = personaCedula.depto;
       
        document.querySelector("#slcOcupacionC").value = personaCedula.ocupacion;
        
        alert("Datos recuperados");
    }
}

//------------------------------------------------------FIN INTERFAZ FUNCIONALIDAD CONSULTA CENSO

function editarDatosCenso(){ 

  let preCargaCedula = document.querySelector("#consultaCedula").value; 
  let primerNombre = document.querySelector("#cNombre").value;
  let apellido = document.querySelector("#cApellido").value;
  let edad = Number(document.querySelector("#cEdad").value);
  let depto = Number(document.querySelector("#slcDeptoC").value);
  let ocupacion = Number(document.querySelector("#slcOcupacionC").value); 
  let mensaje = "";

  let primerNombreCampoLleno = sistema.validarCampoVacio(primerNombre);

  let apellidoCampoLleno = sistema.validarCampoVacio(apellido);

  let edadCampoLleno = sistema.validarCampoVacio(edad);
  let edadValidada = sistema.verificaEdad(edad);
  let deptoCampoLleno = sistema.validarSelects(depto);
  let ocupacionCampoLleno = sistema.validarSelects(ocupacion);

  if(primerNombreCampoLleno && apellidoCampoLleno && edadCampoLleno && edadValidada&& deptoCampoLleno && ocupacionCampoLleno){ 
        let persona = sistema.obtenerObjeto(sistema.censados, "cedula", preCargaCedula);

   if(persona !== null){
        sistema.sobreEscribirDatosPersona(preCargaCedula, primerNombre, apellido, edad, depto, ocupacion);
        mensaje = `SE HA EDITADO LOS DATOS CON EXITO`;
        } 
        } else {
            mensaje = `LOS CAMPOS NO PUEDEN ESTAR VACIOS`;
        }       
 document.querySelector("#pMensaje").innerHTML = mensaje;
} 

function eliminarDatos() {
  let preCargaCedula = document.querySelector("#consultaCedula").value;
  let persona= sistema.obtenerObjeto(sistema.censados, "cedula", preCargaCedula);
  let propiedadCensado= persona.censado;
  let personasCensadas = sistema.censados;
  let index = -1;
  let mensaje= "";

  for (let i = 0; i < personasCensadas.length; i++) {
    if (personasCensadas[i].cedula === preCargaCedula) {
      index = i;
      break;
    }
  }

  if (index !== -1) {
    if(propiedadCensado !== true){
      if (confirm("¿Estás seguro de eliminar todos los datos?")) {
      personasCensadas.splice(index, 1);
      alert("DATOS ELIMINADOS CORRECTAMENTE.");
      document.querySelector("#cNombre").value = "";
      document.querySelector("#cApellido").value = "";
      document.querySelector("#cEdad").value = "";
      document.querySelector("#slcDeptoC").value = "";
      document.querySelector("#slcOcupacionC").value = "";
    }
    }else{
      mensaje= "EL CENSO YA HA SIDO VALIDADO";
    }
  } else {
    mensaje = "PERSONA NO ENCONTRADA"
  }
  document.querySelector("#pMensaje").innerHTML = mensaje;
}


function validarCenso(){
  editarDatosCenso();
  let cedulaObtenida = document.querySelector("#consultaCedula").value;
  let primerNombre = document.querySelector("#cNombre").value;
  let apellido = document.querySelector("#cApellido").value;
  let edad = Number(document.querySelector("#cEdad").value);
  let depto = Number(document.querySelector("#slcDeptoC").value);
  let ocupacion = Number(document.querySelector("#slcOcupacionC").value); 

  let primerNombreCampoLleno = sistema.validarCampoVacio(primerNombre);
  let apellidoCampoLleno = sistema.validarCampoVacio(apellido);

  let edadCampoLleno = sistema.validarCampoVacio(edad);
  let edadValidada = sistema.verificaEdad(edad);
  let deptoCampoLleno = sistema.validarSelects(depto);
  let ocupacionCampoLleno = sistema.validarSelects(ocupacion);
  let mensaje = "";

  if(primerNombreCampoLleno && apellidoCampoLleno && edadCampoLleno && edadValidada && deptoCampoLleno && ocupacionCampoLleno){

  let persona = sistema.obtenerObjeto(sistema.censados, "cedula", cedulaObtenida);

    if(!persona.censado){
    persona.censado = true;
      mensaje = "PERSONA VALIDADA CON EXITO";

    } else{
      mensaje = "LA PERSONA YA HA SIDO VALIDADA";
    }

  }else{
    mensaje = "LOS CAMPOS NO PUEDEN ESTAR VACIOS";
  }
  
  document.querySelector("#pMensaje").innerHTML = mensaje
}


function reAsignarPersona(){
  let idPersonaAReasignar= Number (document.querySelector("#slcPersonasPendientesValidar").value);
  let idNuevoCensistaSlc= Number (document.querySelector("#slcCensistas").value);
  let mensaje= "";
 
  let idPersonaCampoLLeno= sistema.validarSelects(idPersonaAReasignar);
  let idCensistaCampoLLeno= sistema.validarSelects(idNuevoCensistaSlc);
  
  if(idPersonaCampoLLeno && idCensistaCampoLLeno){
    sistema.sobreEscribirPropiedadCensado(idPersonaAReasignar, idNuevoCensistaSlc);
    cargarSelectsReasignar();
    mensaje="PERSONA REASIGNADA CON ÉXITO";
  }else{
    mensaje= "LOS CAMPOS NO PUEDEN ESTAR VACIOS";
  }
 document.querySelector("#rMensajeReasignado").innerHTML= mensaje;
}


function mostrarTabla(){
  document.querySelector("#tblInfoEstadistica").innerHTML= "";

  let censosValidados = 0;
  let censosNoValidados = 0;
 
  for (let i = 0; i < sistema.censados.length; i++) {
      const unCensado = sistema.censados[i];

      if(unCensado.censado == true){
        censosValidados++;
      }else{
        censosNoValidados++;
      }
      let total =  censosValidados + censosNoValidados;
      let porcentaje  = (censosNoValidados / total)* 100;

      
      if(total > 0){
          document.querySelector("#tblInfoEstadistica").innerHTML = 
        `<tr>
          <td>${censosValidados}</td>
          <td>${porcentaje.toFixed(0)}%</td>
          </tr>`
      }  
  }
}


function mostrarTablaDepartamento(){
  
document.querySelector("#tblInfoEstadisticaDepto").innerHTML = "";
let deptoSlc = Number(document.querySelector("#slcDeptosInfoEstadistica").value); 
let validarDepto= sistema.validarSelects(deptoSlc);
let mensaje= "";
let contadorDeptos = 0;
 let contadorMayores=0;
 let contadorMenores=0;
  for (let i = 0; i < sistema.censados.length; i++) {
      const unCensado = sistema.censados[i];
      if(deptoSlc == unCensado.depto){
        contadorDeptos++;
      }
      if(unCensado.edad >= 18 && deptoSlc == unCensado.depto){
        contadorMayores++;
      }
      if(unCensado.edad < 18 && deptoSlc == unCensado.depto){
        contadorMenores++;
      }       
  }    

  let total = contadorMayores + contadorMenores;

  let porcentajeMenores = 0;
  let porcentajeMenoresFinal = 0;
  
  let porcentajeMayores = 0;
  let porcentajeMayoresFinal = 0;
  
  if (total !== 0) {
    porcentajeMenores = contadorMenores / total;
    porcentajeMenoresFinal = porcentajeMenores * 100;
  
    porcentajeMayores = contadorMayores / total;
    porcentajeMayoresFinal = porcentajeMayores * 100;
  }
  
  if (validarDepto) {
    let departamentos = sistema.obtenerObjeto(sistema.departamentos, "idDepto", deptoSlc);
    let nombreDelDepto = departamentos.depto;
    document.querySelector("#tblInfoEstadisticaDepto").innerHTML = 
      `<tr>
        <td>${nombreDelDepto.toUpperCase()}: ${contadorDeptos}</td>
        <td>${porcentajeMayoresFinal.toFixed(1)}% / ${porcentajeMenoresFinal.toFixed(1)}%</td>
      </tr>`;
  }else{
    mensaje= "SELECCIONE UN DEPARTAMENTO";
  }
  document.querySelector("#pMensajeTbl").innerHTML= mensaje;
}

function mostrarListaDeCensados() {
  let censados = sistema.censados;
  let departamentos = sistema.departamentos;

  for (let i = 0; i < departamentos.length; i++) {
    let nombreDeptos = departamentos[i].depto;
    let censosRealizados = 0;
    let censosPorDepto = 0;
    let estudiantes = 0;
    let noTrabajan = 0;
    let trabajan = 0;

    for (let j = 0; j < censados.length; j++) {
      const unCensado = censados[j];
      censosRealizados++;

      if (departamentos[i].idDepto === unCensado.depto) {
        censosPorDepto++;

        if (unCensado.ocupacion === 4) {
          estudiantes++;
        }
        if (unCensado.ocupacion === 3) {
          noTrabajan++;
        }
        if (unCensado.ocupacion === 1 || unCensado.ocupacion === 2) {
          trabajan++;
        }
      }
    }

    let porcentaje = (censosPorDepto / censosRealizados) * 100;

    document.querySelector("#tblListaCensados").innerHTML +=
      `<tr>
        <td>${nombreDeptos}</td>
        <td>${estudiantes}</td>
        <td>${noTrabajan}</td>
        <td>${trabajan}</td>
        <td>${porcentaje.toFixed(0)}%</td>
      </tr>`;
  }
}

//---------------------LIMPIAR INPUTS

function limpiarInputsRealizarCenso(){
  document.querySelector("#pNombre").value= "";
  document.querySelector("#pApellido").value= "";
  document.querySelector("#pEdad").value= "";
  document.querySelector("#pCedula").value= "";
  document.querySelector(".deptos").value= "-1";
  document.querySelector("#slcOcupacion").value= "-1";
  document.querySelector("#pDatosCenso").innerHTML = "";
  document.querySelector("#pMensaje").innerHTML= "";
}

function limpiarInputsConsultaCenso(){
  document.querySelector("#consultaCedula").value= ""; 
  document.querySelector("#cNombre").value= "";
  document.querySelector("#cApellido").value= "";
  document.querySelector("#cEdad").value= "";
  document.querySelector("#slcDeptoC").value= "-1";
  document.querySelector("#slcOcupacionC").value= "-1";
  document.querySelector("#consultaCedula").value= "";

}

function limpiarInputsLogIn(){
  document.querySelector("#loginNUsuario").value= "";
  document.querySelector("#loginContraseña").value="";
}

function limpiarInputsRegistro(){
  document.querySelector("#registroNombre").value= "";
  document.querySelector("#registroUsuario").value= "";
  document.querySelector("#registroContraseña").value= "";
}
let nombre = "hola"
 

console.log(nombre.substr(1).toLowerCase);

