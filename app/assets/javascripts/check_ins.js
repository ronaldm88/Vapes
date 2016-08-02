function CheckIn(data) {
  this.data = data;
}

CheckIn.prototype.datetime = function() {
  return jQuery.timeago(this.data.created_at);
}

CheckIn.prototype.to_bootstrap_index_link = function() {
  var link = '<a class="list-group-item" id="' + this.data.id;
  link += '" href="/users/' + this.data.user.id + '/check_ins/' + this.data.id+'">';
  link += this.data.rating + '/10 - ' + this.data.beer.name;
  link += ' by ' + this.data.user.username;
  link += '<span class="badge pull-right">' + this.datetime() +'</span></a>';

  return link
}

CheckIn.prototype.to_bootstrap_show_page = function() {
  var html = '<div class="index-check-in text-center"><h3><a href="/users/'+ this.data.user.id + '/check_ins/'+ this.data.id + '">' + this.data.beer.name + '</a></h3><br>';
  html += '<p>brewed by ' + this.data.beer.brewery +'</p><br>';
  html += '<p><strong>Rating: ' + this.data.rating + '/10</strong></p><br>';
  html += '<p><strong>Comment: </strong><br>' + this.data.comment + '</p><br>';
  html += '<p><a href="/users/' + this.data.user.id + '">' + this.data.user.username + '\'s</a> check in</p>'

  return html;
}

// Event Listeners
function addBeerListener() {
  $('#click-here').on('click', function() {
    debugger;
  });
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
    e.stopImmediatePropagation();
    var route = $(this).attr("action") + ".json";
    var values = $(this).serialize();

    postCheckIn(route, values);
  });
}

function indexListListener() {
  $('.check-ins-list').on('click', function(e) {
    e.preventDefault();
    var path = e.target.href.split(":3000")[1];
    getCheckIn(path);
  });
}

function attachListeners() {
  addCheckInUIListener();
  indexListListener();
}

// UI Manipulation
function showCheckIn(data) {
  var checkIn = new CheckIn(data);
  $('#add-check-in').show("slow");
  $('.index-form').hide("fast");
  $('.check-in-show').text("");
  $('.check-in-show').append(checkIn.to_bootstrap_show_page());
}

function addForm() {
  $('.check-in-show').text("");
  $('.index-form').show("slow");
  $('#add-check-in').hide("slow");
}

function formSubmitClean() {
  $('#add-check-in').show("slow");
  $('.index-form').hide("slow");
  resetForm();
}

function resetForm(){
  $('form').trigger("reset");
}

// Requests
function getCheckIn(path) {
  $.get(path + ".json", function(data) {
    showCheckIn(data);
  });
}

function postCheckIn(route, values) {
  var postRequest = $.post(route, values);

  postRequest.done(function(data) {
    formSubmitClean();
    getCheckIns();
  });
}

function getCheckIns() {
  $.get('/check_ins.json', function(data) {
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
}

//
// R U READY??
//

$(document).ready(function() {
  getCheckIns();
  attachListeners();
  jQuery("time.timeago").timeago();

  // if (window.location.pathname === "/check_ins") {
  //   setInterval(function() {
  //     getCheckIns();
  //   }, 15000 );
  // }
});
