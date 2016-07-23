function CheckIn(beer, rating, comment="") {
  this.beer = beer;
  this.rating = rating;
  this.comment = comment;
}

CheckIn.prototype.to_bootstrap_index_link = function() {
  console.log("beer: " + this.beer );
}

CheckIn.prototype.to_bootstrap_show_page = function() {
  debugger;
  // <h3><%= link_to @check_in.beer.name, beer_path(@check_in.beer) %></h3>
  // <p>brewed by <%= @check_in.beer.brewery %></p><br>
  // <p><strong>Rating: <%= @check_in.rating %>/10</strong></p><br>
  // <p><strong>Comment:</strong><br><%= @check_in.comment %></p><br>
  // <p><%= @check_in.user.username %>'s Check In</p>'
  // <%= link_to "Back", check_ins_path %>
}

// Event Listeners
function addBeerListener() {
  $('#click-here').on('click', function() {
    debugger;
  });
  // $.get('/check_ins' + ".json", function(data) {
  //   processCheckIns(data);
  // });
}

function addCheckInUIListener() {
  $('#add-check-in').on('click', function(e){
    addForm();
    addCheckInSubmitListener();
    addCancelListener();
    addBeerListener();
  });
}

function addCancelListener() {
  $('#cancel').on('click', function(e){
    e.preventDefault();
    resetForm();
    formSubmitClean();
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

function indexListListener() {
  $('.list-group-item').on('click', function() {

    showCheckIn($(this));
  });
}

function attachListeners() {
  addCheckInUIListener();
  indexListListener();
}

// UI Manipulation
function showCheckIn(checkIn) {
  debugger;
}

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
    debugger;
    var listItem = '<a class="list-group-item" id="' + checkIn.id;
    listItem += '" href="/users/' + checkIn.user.id;
    listItem += '/check_ins/' + checkIn.id
    listItem += '">' + checkIn.rating + '/10 - ' + checkIn.beer.name;
    listItem += ' by ' + checkIn.user.username + ', just now!';
    listItem += '</a>';

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

  if (window.location.pathname === "/check_ins") {
    setInterval(function() {
      getCheckIns();
    }, 15000 );
  }
});
