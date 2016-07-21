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

function formSubmitClean() {
  $('#add-check-in').show("slow");
  $('#new-check-in-form').hide("slow");
}

// Requests
function postCheckIn(route, values) {
  var postRequest = $.post(route, values);

  postRequest.done(function(data) {
    formSubmitClean();
  });
}

function getCheckIns() {
  $.get('/check_ins' + ".json", function(data) {
    processCheckIns(data);
  });
}

// Manual Labor
function processCheckIns(data) {
  var prevLastCheckIn = parseInt($('.check-ins-list li a').first().attr("id"));
  var dataLastCheckIn = data[0].id;

  if (prevLastCheckIn < dataLastCheckIn) {
    var newCheckIns = data.map(function(checkIn) {
      if (checkIn.id > prevLastCheckIn) {
        return checkIn;
      }
    }).filter(function(n) { return n != undefined });

    var newItems = newCheckIns.map(function(checkIn) {
      var listItem = '<li id="' + checkIn.id;
      listItem += '"><a href="/users/' + checkIn.user.id;
      listItem += '/check_ins/' + checkIn.id
      listItem += '">' + checkIn.rating + '/10 - ' + checkIn.beer.name;
      listItem += ' by ' + checkIn.user.username + ', just now!';
      listItem += '</a></li>';

      return listItem;
    });


    $('.check-ins-list ul').prepend(newItems);
  }


}

// R U READY??
$(function() {
  attachListeners();
  setInterval(function(){ getCheckIns(); }, 5000 );
});
