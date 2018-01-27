/* ValidateVerb
 *
 * expected - the 'correct' string
 * actual - the string we are checking against expected
 */
export const ValidateVerb = (expected, actual) => {
	if (!expected || !actual) {
		return false;
	}

	expected = expected.trim().toLowerCase();
	actual = actual.trim().toLowerCase();

	expected = _replaceAccents(expected);
	actual = _replaceAccents(actual);

	if (expected == actual) {
		return true;
	}
	else {
		return false;
	}
}

function _replaceAccents(s) {
	var replaced = s.replace(/[^A-Za-z\s]/g, function(c) {
		return accentMap[c] || c;
	});

	return replaced;
}

const accentMap = {
	"á": "a",
	"é": "e",
	"í": "i",
	"ó": "o",
	"ú": "u",
	"ü": "u",
	"ñ": "n",
}
