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

var activities = d3.set(["fashion","eatdrink","social","publicact","pretend","newplace","media"]);

console.log(activities);
var scaleColor = d3.scaleOrdinal()
    .range(['#fa4c68','#f69f62','#c57679','#aac0d8','#fd4f9d','#89414c','#2d9290','#3e6a96']);
var mx = 30;

// CIRCLE A
plot.append('circle')
    .attr('cx',w/2 - 100)
    .attr('cy',50)
    .attr('r',1)
    .style('fill','black')
    ;
plot.append('circle')
    .attr('cx',w/2 - 100)
    .attr('cy',50)
    .attr('r',15)
    .style('stroke','black')
    .style('stroke-width','1px')
    .style('fill','none')
    ;

// CIRCLE B
plot.append('circle')
    .attr('cx',w/2 + 100)
    .attr('cy',50)
    .attr('r',1)
    .style('fill','black')
    ;
plot.append('circle')
    .attr('cx',w/2 + 100)
    .attr('cy',50)
    .attr('r',15)
    .style('stroke','black')
    .style('stroke-width','1px')
    .style('fill','none')
    ;


d3.csv('../43data2.csv',parse,dataLoaded);

function dataLoaded(err,rows){
    // console.table(rows);

rows.forEach(function(d) {

// LINE TO LETTER A
plot.append('line')
    .attr('x1',d.id * mx)
    .attr('x2',w/2 - 100)
    .attr('y1',h/2 + 100 - 65)
    .attr('y2',50)
    .style('stroke',
        function(e) { 
            if(d.lettera == 'a') return "#cccccc"
            else if (d.lettera == '') return "none"
        }
        )
    .style('stroke-with', (
        function(e) { 
            if(d.lettera == 'a') return ".5px"
            else if (d.lettera == '') return "0px"
        })
    )
    ;

// LINE TO LETTER B
plot.append('line')
    .attr('x1',d.id * mx)
    .attr('x2',w/2 + 100)
    .attr('y1',h/2 + 100 - 65)
    .attr('y2',50)
    .style('stroke',
        function(e) { 
            if(d.letterb == 'b') return "#cccccc"
            else if (d.letterb == '') return "none"
        }
        )
    .style('stroke-with', (
        function(e) { 
            if(d.letterb == 'b') return ".5px"
            else if (d.letterb == '') return "0px"
        })
    )
    ;


// CIRCLE
plot.append('circle')
    .attr('cx',d.id * mx)
    .attr('cy',h/2 + 100 - 65)
    .attr('r',4)
    .style('fill','black')
    ;

// LINE FOR FUN/NOTFUN
plot.append('line')
    .attr('x1',d.id * mx)
    .attr('x2',d.id * mx)
    .attr('y1',h/2 + 100 - 55)
    .attr('y2',h/2 + 100 - 20)
    .style('stroke','black')
    .style('stroke-width','2px')
    .style('stroke-dasharray', (
        function(e) { 
            if(d.feeling == 'ok') return "2,2"
            else if (d.feeling == 'fun') return "6,3"
        })
    )
    // .style("stroke-dasharray", ("3, 3"));
    ;

// COLORED RECT
plot.append('line')
    .attr('x1',d.id * mx)
    .attr('x2',d.id * mx)
    .attr('y1',h/2 + 100 - 18)
    .attr('y2',h/2 + 100 - 5)
    // .style('stroke','green')
    .style('stroke',function(e){return scaleColor(d.activity)})
    .style('stroke-width','6px');

        //Tooltip
        plot.on('mouseenter',function(e){
                var tooltip = d3.select('.custom-tooltip');

                tooltip.select('.title').html(d.activity);
                tooltip.select('.value').html(d.height);

                tooltip
                    .style('visibility','visible')
                    .transition()
                    .style('opacity',1);

            d3.select(this).transition().style('opacity',1);
            }).on('mousemove',function(d){
                var xy = d3.mouse(d3.select('.container').node());

                var tooltip = d3.select('.custom-tooltip')
                    .style('left',xy[0]+'px')
                    .style('top',xy[1]+'px');

            }).on('mouseleave',function(d){
                var tooltip = d3.select('.custom-tooltip');

                tooltip
                    .style('visibility','hidden')
                    .style('opacity',0);

                d3.select(this).transition().style('opacity',.3);
            });



// BOTTOM LINES
plot.append('line')
    .attr('x1',d.id * mx)
    .attr('x2',d.id * mx)
    .attr('y1',h/2 + 100)
    .attr('y2',h/2 + 100 + d.height)
    .style('stroke','black')
    .style('stroke-width','2px');

plot.append('line')
    .attr('x1',d.id * mx + 4)
    .attr('x2',d.id * mx + 4)
    .attr('y1',h/2 + 100)
    .attr('y2',h/2 + 100 + d.height)
    .style('stroke', (
        function(e) { 
            if(d.onpurpose == 'y') return "#e2dbcb"
            else if (d.onpurpose == 'n') return "black"
        })
    )
    .style('stroke-width','2px')
    .style('stroke-dasharray', (
        function(e) { 
            if(d.onpurpose == 'n') return "2,2"
        })
    );

plot.append('text')
    .attr('x',d.id * mx)
    .attr('y',h/2 + 100 + d.height + 20)
    .text('X')
    .text(
        function(e) { 
            if(d.finished == 'n') return "X"
        })
    .attr('text-anchor','middle');

});
};


//parse
function parse(d){

    // if( !activities.has(d.activity) ){
    //     activities.add(d.activity);
    // }

    return {
        id: +d.id,
        group: +d.group,
        lettera: d.lettera,
        letterb: d.letterb,
        feeling: d.feeling,
        activity: d.activity,
        onpurpose: d.onpurpose,
        height: +d.height,
        finished: d.finished
    }
};
