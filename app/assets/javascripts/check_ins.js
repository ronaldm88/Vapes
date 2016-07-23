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

function resetForm(){
  $('form').trigger("reset");
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
function filterCheckIn(data, id) {
  return data.map(function(checkIn) {
    if (checkIn.id > id) {
      return checkIn;
    }
  }).filter(function(n) { return n != undefined });
}

function buildCheckInsList(checkIns) {
  return checkIns.map(function(checkIn) {
    var listItem = '<a class="list-group-item" id="' + checkIn.id;
    listItem += '" href="/users/' + checkIn.user.id;
    listItem += '/check_ins/' + checkIn.id
    listItem += '">' + checkIn.rating + '/10 - ' + checkIn.beer.name;
    listItem += ' by ' + checkIn.user.username + ', just now!';
    listItem += '</a></li>';

    return listItem;
  });
}

function processCheckIns(data) {
  var prevLastCheckIn = parseInt($('.check-ins-list a').first().attr("id"));
  var dataLastCheckIn = data[0].id;

  if (prevLastCheckIn < dataLastCheckIn) {
    var newCheckIns = filterCheckIn(data, prevLastCheckIn);

    var newItems = buildCheckInsList(newCheckIns);

    $('.check-ins-list').prepend(newItems);
    resetForm();
  }
}

//
// R U READY??
//

$(function() {
  attachListeners();
  var test = 0;

  setInterval(function() {
    getCheckIns();
    console.log(test);
    test += 15;
  }, 15000 );
});
