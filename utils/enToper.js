export function enToper(num) {
  num = String(num);
  let persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  let englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

  let result = '';

  for (let i = 0; i < num.length; i++) {
    let index = englishNumbers.indexOf(num[i]);
    if (index !== -1) {
      result += persianNumbers[index];
    } else {
      result += num[i];
    }
  }

  return result;
}
