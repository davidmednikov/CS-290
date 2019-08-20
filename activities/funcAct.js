callMe("(123) 456-7890"); // function called before declaration

function callMe (phoneNum) {
	console.log("Yo! Hit me up. Here's my number: " + phoneNum);
}

textMe("1-800-739-4968"); // function called before assignment

var textMe = function (phoneNum) {
	console.log("txt me k. " + phoneNum);
}
