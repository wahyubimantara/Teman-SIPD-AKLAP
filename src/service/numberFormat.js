if(global.localDecimalFormatter === undefined) {
  global.localDecimalFormatter = new Intl.NumberFormat('id-ID', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
    signDisplay: "never"
  })
}

const formatter = {
  format: v => {
    if(v===null || !isFinite(v)) return ""
    return v < 0 ?
      `(${global.localDecimalFormatter.format(v)})`:
      global.localDecimalFormatter.format(v)
  }
}
//export default global.localDecimalFormatter;
export default formatter;