import { getCountryByAbbreviation, getCurrencyAbbreviation } from "country-currency-map";

function obtenerMoneda(codigoPais) {
  try {
    const nombrePais = getCountryByAbbreviation(codigoPais);

    if (!nombrePais) return null;

    const moneda = getCurrencyAbbreviation(nombrePais);

    return moneda || null;
  } catch {
    return null;
  }
}

let codigoPais, monedaDelPais;

codigoPais = 'AR';
monedaDelPais = obtenerMoneda(codigoPais);
console.log(`La moneda del país ${codigoPais} es: ${monedaDelPais}`);

codigoPais = 'UZA';
monedaDelPais = obtenerMoneda(codigoPais);
console.log(`La moneda del país ${codigoPais} es: ${monedaDelPais}`);