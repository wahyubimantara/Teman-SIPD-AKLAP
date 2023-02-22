if(global.localDecimalFormatter === undefined) {
  global.localDecimalFormatter = new Intl.NumberFormat('id-ID', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  })
}

export default global.localDecimalFormatter;