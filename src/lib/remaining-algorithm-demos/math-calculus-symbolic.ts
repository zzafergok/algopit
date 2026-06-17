export function integrateSymbolic(expr: string): { result: string; trace: string[] } {
  const trace: string[] = [];
  const cleanExpr = expr.replace(/\s+/g, '');
  trace.push(`İfade temizlendi: ${cleanExpr}`);
  
  const terms = cleanExpr.match(/[+-]?[^+-]+/g) || [];
  const integratedTerms: string[] = [];
  
  for (let term of terms) {
    if (!term) continue;
    let sign = '+';
    if (term.startsWith('-')) {
      sign = '-';
      term = term.slice(1);
    } else if (term.startsWith('+')) {
      term = term.slice(1);
    }
    
    trace.push(`Terim işleniyor: ${sign}${term}`);
    
    if (term === 'sin(x)') {
      const newSign = sign === '+' ? '-' : '+';
      integratedTerms.push(`${newSign}cos(x)`);
      trace.push(`  İntegral: ${newSign}cos(x)`);
    } else if (term === 'cos(x)') {
      integratedTerms.push(`${sign}sin(x)`);
      trace.push(`  İntegral: ${sign}sin(x)`);
    } else if (term === 'exp(x)' || term === 'e^x') {
      integratedTerms.push(`${sign}exp(x)`);
      trace.push(`  İntegral: ${sign}exp(x)`);
    } else if (term.includes('x')) {
      const xIndex = term.indexOf('x');
      let coefStr = term.substring(0, xIndex);
      if (coefStr.endsWith('*')) {
        coefStr = coefStr.slice(0, -1);
      }
      
      const rest = term.substring(xIndex + 1);
      let powerStr = '';
      if (rest.startsWith('^')) {
        powerStr = rest.substring(1);
      } else {
        powerStr = rest ? '1' : '';
      }
      
      const coef = coefStr === '' ? 1 : Number(coefStr);
      const power = powerStr === '' ? 1 : Number(powerStr);
      
      if (isNaN(coef) || isNaN(power)) {
        throw new Error(`Geçersiz terim formatı: ${sign}${term}`);
      }
      
      if (power === -1) {
        integratedTerms.push(`${sign}${coef === 1 ? '' : coef + '*'}ln|x|`);
        trace.push(`  İntegral: ${sign}${coef === 1 ? '' : coef + '*'}ln|x|`);
      } else {
        const newPower = power + 1;
        const newCoef = coef / newPower;
        const newCoefStr = Number.isInteger(newCoef) ? `${newCoef}` : `${newCoef.toFixed(3)}`;
        const formattedTerm = newCoefStr === '1' ? `x^${newPower}` : `${newCoefStr}*x^${newPower}`;
        integratedTerms.push(`${sign}${formattedTerm}`);
        trace.push(`  İntegral: ${sign}${formattedTerm}`);
      }
    } else {
      const val = Number(term);
      if (isNaN(val)) {
        throw new Error(`Geçersiz sabit terim: ${sign}${term}`);
      }
      integratedTerms.push(`${sign}${val}*x`);
      trace.push(`  İntegral: ${sign}${val}*x`);
    }
  }
  
  let result = integratedTerms.join(' ');
  if (result.startsWith('+')) {
    result = result.substring(1).trim();
  }
  result = result + ' + C';
  
  return { result, trace };
}
