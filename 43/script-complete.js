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

// var activities = d3.set(["fashion","eatdrink","social","publicact","pretend","newplace","media"]);
var activities = d3.set(["matching clothing","eating or drinking","social conversation","public act","tried on a fancy dress","new place","broke a habit","consumed media"]);

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
// LINE GROUP 1
plot.append('line').attr('class','lettera')
    .attr('x1',1 * mx)
    .attr('x2',11 * mx)
    .attr('y1',h/2 + 100)
    .attr('y2',h/2 + 100)
    .style('stroke','#000000')
    .style('stroke-with', '4px')
    ;
// LINE GROUP 2
plot.append('line')
    .attr('x1',12 * mx)
    .attr('x2',18 * mx)
    .attr('y1',h/2 + 100)
    .attr('y2',h/2 + 100)
    .style('stroke','#000000')
    .style('stroke-with', '4px')
    ;
// LINE GROUP 3
plot.append('line')
    .attr('x1',19 * mx)
    .attr('x2',33 * mx)
    .attr('y1',h/2 + 100)
    .attr('y2',h/2 + 100)
    .style('stroke','#000000')
    .style('stroke-with', '4px')
    ;


d3.csv('../43data2.csv',parse,dataLoaded);

function dataLoaded(err,rows){
    // console.table(rows);

rows.forEach(function(d) {

var newthing = plot.append('g');


        //Tooltip
        newthing.on('mouseenter',function(e){
                var tooltip = d3.select('.custom-tooltip');

                tooltip.select('.feeling').html(d.feeling)
                    .style('left',d.id * mx -10 +'px')
                    .style('top',h + 21 + 100 - 50+'px');
                ;


                tooltip.select('.activity').html(d.activity)
                    .style('left',d.id * mx -10 +'px')
                    .style('top',h + 21 + 100 - 18+'px');
                ;
                tooltip.select('.onpurpose').html(d.onpurpose)
                    .style('left',d.id * mx -10 +'px')
                    .style('top',h + 30 + 100 +'px');
                ;
                tooltip.select('.shame').html(
                    function(e) {            // <== Add these
                    if (d.height <= 58) {return "not too shameful"}
                    else if (d.height >= 116) {return "very shameful"}  // <== Add these
                    else    { return "sort of shameful" }          // <== Add these
                    ;}
                    )
                    // .style('left',d.id * mx -10 +'px')
                    // .style('top',h + 23 + 100 + d.height+'px');
                    .style('left',d.id * mx -10 +'px')
                    .style('top',h + 10 + 100 + d.height +'px');
                ;
                tooltip.select('.lettera').html(
                    function(e) {            // <== Add these
                    if (d.lettera == 'a') {return "did more than once"}
                    ;}
                    )
                    .style('left',175 +'px')
                    .style('top',310 +'px');
                ;
                tooltip.select('.letterb').html(
                    function(e) {            // <== Add these
                    if (d.letterb == 'b') {return "someone noticed"}
                    ;}
                    )
                    .style('left',615 +'px')
                    .style('top',310 +'px');
                ;



                tooltip
                    .style('visibility','visible')
                    .transition()
                    .style('opacity',1);

            d3.select(this).transition().style('opacity',1);

                var self = this;

            var others = d3.selectAll('g');
            // All other elements resize randomly.
            others.filter(function (x) { return self != this; })
                .transition().style('opacity',.3);

            }).on('mousemove',function(e){

                // var tooltip = d3.select('.custom-tooltip')
                //     // .style('left',d.id * mx+'px')
                //     // .style('top',110+'px')
                //     ;

            }).on('mouseleave',function(d){
                var tooltip = d3.select('.custom-tooltip');

                tooltip
                    .style('visibility','hidden')
                    .style('opacity',0);

                d3.selectAll("g").transition().style('opacity',1);
            });



// LINE TO LETTER A
newthing.append('line')
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
newthing.append('line')
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
newthing.append('circle')
    .attr('cx',d.id * mx)
    .attr('cy',h/2 + 100 - 65)
    .attr('r',4)
    .style('fill','black')
    ;

// LINE FOR FUN/NOTFUN
newthing.append('line')
    .attr('x1',d.id * mx)
    .attr('x2',d.id * mx)
    .attr('y1',h/2 + 100 - 55)
    .attr('y2',h/2 + 100 - 20)
    .style('stroke','black')
    .style('stroke-width','2px')
    .style('stroke-dasharray', (
        function(e) { 
            if(d.feeling == 'just ok') return "2,2"
            else if (d.feeling == 'fun') return "6,3"
        })
    )
    // .style("stroke-dasharray", ("3, 3"));
    ;

// COLORED RECT
newthing.append('line')
    .attr('x1',d.id * mx)
    .attr('x2',d.id * mx)
    .attr('y1',h/2 + 100 - 18)
    .attr('y2',h/2 + 100 - 5)
    // .style('stroke','green')
    .style('stroke',function(e){return scaleColor(d.activity)})
    .style('stroke-width','6px');




// BOTTOM LINES
newthing.append('line')
    .attr('x1',d.id * mx)
    .attr('x2',d.id * mx)
    .attr('y1',h/2 + 100)
    .attr('y2',h/2 + 100 + d.height)
    .style('stroke','black')
    .style('stroke-width','2px');

newthing.append('line')
    .attr('x1',d.id * mx + 4)
    .attr('x2',d.id * mx + 4)
    .attr('y1',h/2 + 100)
    .attr('y2',h/2 + 100 + d.height)
    .style('stroke', (
        function(e) { 
            if(d.onpurpose != 'not on purpose') return "#e2dbcb"
            else if (d.onpurpose == 'not on purpose') return "black"
        })
    )
    .style('stroke-width','2px')
    .style('stroke-dasharray', (
        function(e) { 
            if(d.onpurpose == 'not on purpose') return "2,2"
        })
    );

newthing.append('text')
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
