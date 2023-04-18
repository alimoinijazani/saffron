export function enToper(num) {
  let str = String(num);
  var persianDigits = '۰۱۲۳۴۵۶۷۸۹';
  return str
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    .replace(/[0-9]/g, function (w) {
      return persianDigits[+w];
    });
}
