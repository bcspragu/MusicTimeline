var canvases = [];
var sizes = [];
var circles = [];
var percentages = [0.6, 0.4, 0.465, 0.34, 0.35];

$(function() {
  $(window).resize(function() {
    clearEverything();
    render();
  });
  render();
});

function render() {
  var index = 0;
  $('.section').each(function() {
    var elem = $(this);
    var width = elem.width();
    var height = elem.height();
    canvases[index] = Raphael(this, width, height);
    sizes[index] = {width: width, height: height};
    index++;
  });

  $('.section').hover(function() {
    $(this).stop();
    $(this).animate({'background-position-x': '0%'}, 10000, "linear");
  }, function() {
    $(this).stop();
    $(this).animate({'background-position-x': '50%'}, 1000, "linear");
  });

  for (var i = 0; i < canvases.length; i++) {
    circles[i] = makeCircle(i);
    if (i > 0) {
      makeLine(i);
    }
  }
}

function clearEverything() {
  for (var i = 0; i < canvases.length; i++) {
    canvases[i].remove();
  }
  canvases = [];
  circles = [];
  sizes = [];
}

function makeCircle(i) {
  var r = sizes[i].width*0.15;
  var x = sizes[i].width/2;
  var y = sizes[i].height * percentages[i];
  return canvases[i].circle(x, y, r)
    .attr({fill: 'black',
      opacity: 0.3,
      stroke: 'white',
      'stroke-width': 5})
    .mouseover(function() {
      this.animate({opacity: 0.7}, 500);
    })
    .mouseout(function() {
      this.animate({opacity: 0.3}, 500);
    })
    .click(function() {
      $('#m' + (i+1)).foundation('reveal', 'open');
    });
}

function makeLine(i) {
  var c1 = circles[i-1];
  var c2 = circles[i];
  var x1 = c1.attr('cx');
  var y1 = c1.attr('cy');
  var x2 = c2.attr('cx');
  var y2 = c2.attr('cy');
  var w1 = sizes[i-1].width;
  var w2 = sizes[i].width;

  canvases[i-1].path("M" + x1 + " " + y1 + "L" + (x2 + w1/2 + w2/2) + " " + y2)
    .attr({stroke: 'black', 'stroke-width': 5, 'stroke-linecap': 'round', opacity: 0.4});

  canvases[i].path("M" + x2 + " " + y2 + "L" + (x1 - w1/2 - w2/2) + " " + y1)
    .attr({stroke: 'black', 'stroke-width': 5, 'stroke-linecap': 'round', opacity: 0.4});
}
