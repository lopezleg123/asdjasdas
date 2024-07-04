const Paciente = require("../Models/Paciente");

const validarRut = (rut) => {
  // Validar longitud mínima
  if (rut.length < 2) {
    return false;
  }

  const cuerpo = rut.slice(0, -1);
  const dv = rut.slice(-1).toUpperCase();

  let suma = 0;
  let multiplo = 2;

  // Calcular dígito verificador
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += multiplo * cuerpo.charAt(i);
    multiplo = multiplo < 7 ? multiplo + 1 : 2;
  }

  const dvEsperado = 11 - (suma % 11);
  let dvCalculado;
  if (dvEsperado === 11) {
    dvCalculado = '0';
  } else if (dvEsperado === 10) {
    dvCalculado = 'K';
  } else {
    dvCalculado = dvEsperado.toString();
  }

  return dvCalculado === dv;
};

exports.registrarPaciente = async (req, res) => {
  try {
    const rut = req.body.rut;

    // Verificar si el RUT contiene guiones o puntos
    if (/[.-]/.test(rut)) {
      return res.status(400).json({ mensaje: "RUT inválido" });
    }

    // Validar el RUT
    const rutSinFormato = rut.replace(/[^0-9kK]/g, '');

    if (!validarRut(rutSinFormato)) {
      return res.status(400).json({ mensaje: "RUT inválido" });
    }

    // Actualizar el RUT normalizado en el cuerpo de la solicitud
    req.body.rut = rutSinFormato;

    const nuevoPaciente = new Paciente(req.body);
    const pacienteGuardado = await nuevoPaciente.save();
    res.status(201).json({ paciente: pacienteGuardado, mensaje: "Paciente Guardado" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al registrar el paciente" });
  }
};
