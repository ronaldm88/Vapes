function CheckIn(data) {
  this.data = data;
}

CheckIn.prototype.datetime = function() {
  return jQuery.timeago(this.data.created_at);
}

CheckIn.prototype.to_bootstrap_index_link = function() {
  var link = '<a class="list-group-item" id=' + this.data.id;
  link += '" href="/users/' + this.data.user.id;
  link += '/check_ins/' + this.data.id + '">';
  link += this.data.rating + '/10 - ' + this.data.beer.name;
  link += ' by ' + this.data.user.username;
  link += '<span class="pull-right">' + this.datetime() +'!</span></a>';

  return link
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
    return checkIn.to_bootstrap_index_link();
  });
}

function processCheckIns(data) {
  var checkIns = [];

  data.forEach(function(d){
    var checkIn = new CheckIn(d);
    checkIns.push(checkIn)
  });

  var newItems = buildCheckInsList(checkIns);

  $('.check-ins-list').text('');
  $('.check-ins-list').prepend(newItems);
  // debugger;
  // var prevLastCheckIn = parseInt($('.check-ins-list a').first().attr("id"));
  // var dataLastCheckIn = data[0].id;
  //
  // if (prevLastCheckIn < dataLastCheckIn) {
  //   var newCheckIns = filterCheckIn(data, prevLastCheckIn);
  //   debugger;
  //   var newItems = buildCheckInsList(newCheckIns);
  //
  //   $('.check-ins-list').prepend(newItems);
  //   resetForm();
  // }
}

//
// R U READY??
//

$(function() {
  getCheckIns();
  attachListeners();
  jQuery("time.timeago").timeago();

  if (window.location.pathname === "/check_ins") {
    setInterval(function() {
      getCheckIns();
    }, 15000 );
  }
});
