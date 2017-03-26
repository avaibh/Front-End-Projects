var accounts = ['freecodecamp', 'storbeck', 'terakilobyte', 'habathcx', 'RobotCaleb', 'thomasballinger', 'noobs2ninjas', 'beohoff', 'MedryBW', 'brunofin', 'comster404', 'quill18'];
var firstPassPos = 1;
var secondPassPos = 1;
var logo = 'http://i.imgur.com/vPEp5RQ.png';
var streams = 'https://api.twitch.tv/kraken/streams/';
var users = 'https://api.twitch.tv/kraken/users/';
var AccInfo = {};
function Account(name, logo, status, url, viewers, data) {
  this.name = name;
  this.logo = logo;
  this.status = status;
  this.url = url;
  this.viewers = viewers;
  this.data = data;
}
function render(RegEx) {
  var CAccInfo;
  CAccInfo = AccInfo;
  if (typeof RegEx !== 'undefined') {
    var CAccInfo = AccInfo.filter(function(val) {
      return (val.match(RegEx));
    });
  }

  for (var stream in CAccInfo) {
    if (CAccInfo[stream].status === undefined) {
      CAccInfo[stream].data = '<div class= "user ' + CAccInfo[stream].name + '"><img class= \'logo\' src = "' + CAccInfo[stream].logo + '">' + CAccInfo[stream].name + '  <span class="glyphicon glyphicon-info-sign"></span><p class= \'stat\'>Offline</p></div>';
      $('.list3').append(CAccInfo[stream].data);
    } else if (CAccInfo[stream].status === 'Account Closed') {
      CAccInfo[stream].data = '<div class= "user ' + CAccInfo[stream].name + '"><img class= \'logo\' src = "' + CAccInfo[stream].logo + '">' + CAccInfo[stream].name + '  <span class="glyphicon glyphicon-warning-sign"></span><p class= \'stat\'>Account Closed</p></div>';

    } else {
      CAccInfo[stream].data = '<div class= "user ' + CAccInfo[stream].name + '"><img class= \'logo\' src = "' + CAccInfo[stream].logo + '">' + CAccInfo[stream].name + '  <span class="glyphicon glyphicon-ok-sign"></span> <a href="' + CAccInfo[stream].url + '" target="_blank"><p class= \'stat\'>' + CAccInfo[stream].status + '</p></a>' + '<p class= \'stat\'> <span class="glyphicon glyphicon-eye-open"></span> ' + CAccInfo[stream].viewers + '</p></div>';
      $('.list2').append(CAccInfo[stream].data);

    }

    $('.list').append(CAccInfo[stream].data);

  }
}
function getUserInfo(CurrentName) {
  $.getJSON(users + CurrentName + '?callback=?', function(response) {
    if (response.logo === null) {
      CurrentName = new Account(response.display_name, logo);
    } else {
      CurrentName = new Account(response.display_name, response.logo);
    };

    firstPassPos++;
    AccInfo[CurrentName.name] = CurrentName;
    if (firstPassPos === accounts.length) {
      for (var key in AccInfo) {
        getStreamInfo(AccInfo[key]);
      }
    }
  });
}
