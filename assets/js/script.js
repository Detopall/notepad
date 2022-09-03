"use strict";

let textareaTotalArray = [];
document.addEventListener("DOMContentLoaded", init);

function init(){
	checkLocalStorage();
	document.addEventListener("click", removeNote);
	document.addEventListener("click", addNewNote);
	document.addEventListener("click", saveNotes);
}

function checkLocalStorage(){
	Object.keys(localStorage).forEach((key) => {
		makeTextArea(localStorage.getItem(key));
	});
}

function makeTextArea(input){
	const main = document.querySelector("main");
	const html = `
	<div>
		<button type="button" id="remove-note">X</button>
		<textarea>${input}</textarea>
	</div>
	`;
	main.insertAdjacentHTML("beforeend", html);
}

function removeNote(e){
	if (e.target.getAttribute("id") !== "remove-note") return;
	e.target.closest("div").remove();
}

function addNewNote(e){
	if (e.target.getAttribute("id") !== "new-note") return;
	makeTextArea("");
}

function saveNotes(e){
	if (e.target.getAttribute("id") !== "save-notes") return;
	localStorage.clear();
	textareaTotalArray = [];
	const textareas = document.querySelectorAll("textarea");
	textareas.forEach(textarea => {
		const textArray = textarea.value.replace(/\s+/g, ' ').split(' ').filter((e) => e.length > 0);
		textareaTotalArray.push(textArray);
	});
	getAllWordsFromArray(textareaTotalArray);
}

function getAllWordsFromArray(textareaTotalArray){
	textareaTotalArray.forEach((noteOfWords, index) => {
		let note = "";
		noteOfWords.forEach(word => {
			note += word + " ";
		});
		if (note === "") return;
		localStorage.setItem(index, note);
	});
}
