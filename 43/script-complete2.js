console.log('4.3');

var margin = {t:50,r:50,b:50,l:50};
var w = document.getElementById('canvas').clientWidth - margin.l - margin.r,
    h = document.getElementById('canvas').clientHeight - margin.t - margin.b;

console.log(w,h);

var plot = d3.select('#canvas')
    .append('svg')
    .attr('width',w+margin.l+margin.r)
    .attr('height',h+margin.t+margin.b)
    .append('g')
    .attr('transform','translate('+ margin.l+','+margin.t+')');

//4.3.6 Draw axes
//Lines
// for(var x = 0; x <= width; x += 100){
//     plot.append('line').attr('class','axis')
//         .attr('x1',x)
//         .attr('x2',x)
//         .attr('y1',0)
//         .attr('y2',height);
// }
// for(var y = 0; y <= height; y += 100){
//     plot.append('line').attr('class','axis')
//         .attr('x1',0)
//         .attr('x2',width)
//         .attr('y1',y)
//         .attr('y2',y);
// }

//4.3.1 <circle>
// plot.append('circle')
//     .attr('cx',100)
//     .attr('cy',100)
//     .attr('r',50);

// plot.append('circle')
//     .attr('cx',300)
//     .attr('cy',100)
//     .attr('r',50)
//     .style('fill','none')
//     .style('stroke','black')
//     .style('stroke-width','2px');

// plot.append('circle')
//     .attr('cx',500)
//     .attr('cy',100)
//     .attr('r',50)
//     .style('fill','blue')
//     .style('fill-opacity',.5)
//     .style('stroke','black')
//     .style('stroke-width','2px');

//4.3.2 <rect>
// plot.append('rect')
//     .attr('x',100)
//     .attr('y',200)
//     .attr('width',300)
//     .attr('height',100);

// //4.3.3 <line> and <text>
// plot.append('line')
//     .attr('x1',500)
//     .attr('x2',700)
//     .attr('y1',200)
//     .attr('y2',300)
//     .style('stroke','blue')
//     .style('stroke-width','2px');

// plot.append('text')
//     .attr('x',500)
//     .attr('y',200)
//     .text('(500,200)')
//     .attr('text-anchor','middle');

// CIRCLE
plot.append('circle')
    .attr('cx',20)
    .attr('cy',h/2 - 65)
    .attr('r',4)
    .style('fill','black');


// LINE FOR FUN/NOTFUN
plot.append('line')
    .attr('x1',20)
    .attr('x2',20)
    .attr('y1',h/2 - 55)
    .attr('y2',h/2 - 20)
    .style('stroke','black')
    .style('stroke-width','2px')
    .style("stroke-dasharray", ("3, 3"));


// COLORED RECT
plot.append('line')
    .attr('x1',20)
    .attr('x2',20)
    .attr('y1',h/2 - 18)
    .attr('y2',h/2 - 5)
    .style('stroke','green')
    .style('stroke-width','6px');

// BOTTOM LINES
plot.append('line')
    .attr('x1',20)
    .attr('x2',20)
    .attr('y1',h/2)
    .attr('y2',h/2 + 56)
    .style('stroke','black')
    .style('stroke-width','2px');

plot.append('line')
    .attr('x1',20 + 4)
    .attr('x2',20 + 4)
    .attr('y1',h/2)
    .attr('y2',h/2 + 56)
    .style('stroke','gray')
    .style('stroke-width','2px')
    .style("stroke-dasharray", ("3, 3"));

plot.append('text')
    .attr('x',20)
    .attr('y',h/2 + 56 + 20)
    .text('X')
    .attr('text-anchor','middle');



//4.3.4 <g>
// var g1 = plot.append('g').attr('class','nested-circle');
// g1.append('circle').attr('r',50);
// g1.append('circle').attr('r',10);
// g1
//     .transition()
//     .duration(1000)
//     .attr('transform','translate(500,500)')


//4.3.5 <path>
//First, construct a path serializer
// var newPath = d3.path();
// newPath.moveTo(100,400);
// newPath.lineTo(200,500);
// newPath.lineTo(200,600);
// newPath.lineTo(100,500);
// newPath.closePath();

// plot.append('path').attr('d',newPath.toString())
//     .style('fill-opacity',.2)
//     .style('stroke-width','2px')
//     .style('stroke','black');







