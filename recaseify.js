/* each of the three characters at the end of an 18-character ID implies a mask
 *  5 out of the 15 digits of the 15 digit ID.
 *
 * The mask is the reverse of the binary representation of the # of letters
 * after A, so we start with:
 * A=00000, B=00010, C=00011, etc.
 *
 * and after the reverse, you get:
 * A=00000, B=01000, C=11000, etc.
 * No clue why they felt the need to reverse them...
 *
 * then you put that whole mask together, giving you a 15-digit mask,
 * and "zip" it up with your 15-digit ID as follows:
 *   if 1, uppercase, if 0, lowercase
 */

/* 5-character string representing the mask implied by the checksum char */
function getBinary(character) {
  /* ASCII codes weren't arranged with this in mind, so we have to treat
   * [0-5] separately. Add the distance of the whole alphabet plus our int.
   */
  var integer = parseInt(character);
  var decimal;
  if (!isNaN(integer)) {
    decimal =  26 + integer;
  } else {
    decimal = character.toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0);
  }

  var binary = (decimal >>> 0).toString(2); // note this is a string
  var reverseMe = Array(6 - binary.length).join('0') + binary;
  return reverseMe.split('').reverse().join('');
}

/* build the whole mask */
function getMask(checksum) {
  var mask = "";
  for (var i = 0; i<3; i++) {
    mask += getBinary(checksum[i]);
  }
  return mask;
}

/* Give it an 18 digit ID of any case and it gives you back a 15 in
 * the correct case, which can be pased directly into a URL.
 */
function recaseify(id) {
  var mask = getMask(id.slice(-3));
  var ret = '';
  for (var i = 0; i < 15; i++) {
    var upper = mask[i] == "1";
    if (upper) {
      ret += id[i].toUpperCase();
    } else {
      ret += id[i].toLowerCase();
    }
  }
  return ret + id.slice(-3);
}
