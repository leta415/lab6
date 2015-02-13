'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$('.project a').click(addProjectDetails);

	$('#colorBtn').click(randomizeColors);
}

/*
 * Make an AJAX call to retrieve project details and add it in
 */
function addProjectDetails(e) {
	// Prevent following the link
	e.preventDefault();

	// Get the div ID, e.g., "project3"
	var projectID = $(this).closest('.project').attr('id');
	// get rid of 'project' from the front of the id 'project3'
	var idNumber = projectID.substr('project'.length);


	var url = "/project/" + idNumber;
	$.get(url, addProjectCallback);

	console.log("User clicked on project " + idNumber);
	console.log("Calling URL: " + url);

	// $("#" + projectID + " .details").html("foo");
}

function addProjectCallback(result) {
	console.log(result);
	var projectHTML = '<div>' +
		'<img src="' + result['image'] + '" class="detailsImage">' +
		'<p>' + result['title'] + '</p>' +
		'<p><small>' + result['date'] + '</small></p>' + 
		result['summary'] + '</div>';

	console.log("HTML string to insert: " + projectHTML);

	$("#project" + result['id'] + " .details").html(projectHTML);
}

/*
 * Make an AJAX call to retrieve a color palette for the site
 * and apply it
 */
function randomizeColors(e) {
	console.log("User clicked on color button");
	$.get("/palette", colorCallback);
}

function colorCallback(result) {
	var colors = result.colors.hex;
	$('body').css('background-color', colors[0]);
	$('.thumbnail').css('background-color', colors[1]);
	$('h1, h2, h3, h4, h5, h5').css('color', colors[2]);
	$('p').css('color', colors[3]);
	$('.project img').css('opacity', .75);
}