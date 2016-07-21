// Event Listeners
function addCheckInUIListener() {
  $('#add-check-in').on('click', function(e){
    addForm();
    addCheckInSubmitListener();
  });
}

function addCheckInSubmitListener() {
  $('form').submit(function(e){
    e.preventDefault();
    var route = $(this).attr("action") + ".json";
    var values = $(this).serialize();

    postCheckIn(route, values);
  });
}

function attachListeners() {
  addCheckInUIListener();
}

// UI Manipulation
function addForm() {
  $('#new-check-in-form').show("slow");
  $('#add-check-in').hide("slow");
}

// Requests
function postCheckIn(route, values) {
  var postRequest = $.post(route, values);

  postRequest.done(function(data) {
    // UI stuff uhhh, clear and remove form.
    $('#add-check-in').show("slow");
    $('#new-check-in-form').hide("slow");
  });
}


// R U READY??
$(function() {
  attachListeners();
});
