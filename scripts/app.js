function init() {
  $( document ).ready(function() {
    $('#close-btn').click(function() {
      $('.sidebar-wrapper').toggleClass('open');
    });

    $('#hamburger').click(function() {
      $('.sidebar-wrapper').toggleClass('open');
    });
  });
}

function getWeather() {
  $.ajax({
    url : "http://api.wunderground.com/api/<API Key>/geolookup/conditions/q/<ZIP code>.json",
    dataType : "jsnp",
    success : function(response) {
      var conditions = response.current_observation.weather;
      loadImage(conditions);
    }
  });
}

function getTimeOfDay() {
  var time = new Date();
  var hours = time.getHours();
  var timeOfDay;

  if(hours > 17) {
    timeOfDay = 'night';
  } else if (hours > 12) {
    timeOfDay = 'afternoon';
  } else {
    timeOfDay = 'morning';
  }
  return timeOfDay;
}

function loadImage(conditions) {
  var imageSRC = 'img/weather/hero-'
  var validConditions = ["clear", "cloud", "rain", "snow"];
  var timeOfDay = getTimeOfDay();
  conditions = conditions.toLowerCase();

  for (var i = 0; i<validConditions.length; i++) {
    if (conditions === validConditions[i]) {
      break;
    } else {
      conditions = 'cloudy';
    }
  }
  imageSRC = imageSRC + conditions + '-' + timeOfDay + '.jpg';
  $('#intro').css('background-image', 'url('+ imageSRC + ')');
}
