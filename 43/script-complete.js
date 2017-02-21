console.log('7.1');

//First, append <svg> element and implement the margin convention
var m = {t:10,r:50,b:50,l:50};
var outerWidth = document.getElementById('canvas').clientWidth,
    outerHeight = document.getElementById('canvas').clientHeight;
var w = outerWidth - m.l - m.r,
    h = outerHeight - m.t - m.b;

var plot = d3.select('.canvas')
    .append('svg')
    .attr('width',outerWidth)
    .attr('height',outerHeight)
    .append('g')
    // .attr('transform','translate(' + m.l + ',' + m.t + ')');
    .attr('transform','translate(' + m.l + ',' + m.t + ')');
//d3.set to hold a unique array of activities
var activities = d3.set();

//Scale
var scaleX = d3.scaleLinear()
    .range([0,w]);//why doesn't it need a domain???
var scaleColor = d3.scaleOrdinal()
    .range(['#fa4c68','#f69f62','#c57679','#aac0d8','#fd4f9d','#89414c','#2d9290','#3e6a96']);
var scaleY = d3.scaleLinear()
    // .domain([0,v0])
    .range([h,0]);

//Multiplier
var mx = 30;
//Vertical padding
var v = 50;

//Axis
var axisX = d3.axisBottom()
    .scale(scaleX)
    .tickSize(-h);
var axisY = d3.axisLeft()
    .scale(scaleY)
    .tickSize(-w);



// CIRCLE A
plot.append('circle').attr('class','topcircle')
    .attr('cx',w/2 - 100)
    .attr('cy',50)
    .attr('r',1)
    .style('fill','black')
    // .attr('class','innercircle-a')
    ;
    
var circleA = plot.append('circle').attr('class','topcircle')
    .attr('cx',w/2 - 100)
    .attr('cy',50)
    .attr('r',15)
    .style('stroke','black')
    .style('stroke-width','1px')
    .style('fill','white')
    // .attr('class','outercircle')
    ;

// CIRCLE B
plot.append('circle').attr('class','topcircle')
    .attr('cx',w/2 + 100)
    .attr('cy',50)
    .attr('r',1)
    .style('fill','black')
    ;
var circleB = plot.append('circle').attr('class','topcircle')
    .attr('cx',w/2 + 100)
    .attr('cy',50)
    .attr('r',15)
    .style('stroke','black')
    .style('stroke-width','1px')
    .style('fill','white')
    ;



// LINE GROUP 1
plot.append('line').attr('class','group')
    .attr('x1',1 * mx)
    .attr('x2',11 * mx)
    .attr('y1',h/2 + v)
    .attr('y2',h/2 + v)
    .style('stroke','#000000')
    .style('stroke-with', '4px')
    ;
// LINE GROUP 2
plot.append('line').attr('class','group')
    .attr('x1',12 * mx)
    .attr('x2',18 * mx)
    .attr('y1',h/2 + v)
    .attr('y2',h/2 + v)
    .style('stroke','#000000')
    .style('stroke-with', '4px')
    ;
// LINE GROUP 3
plot.append('line').attr('class','group')
    .attr('x1',19 * mx)
    .attr('x2',33 * mx)
    .attr('y1',h/2 + v)
    .attr('y2',h/2 + v)
    .style('stroke','#000000')
    .style('stroke-with', '4px')
    ;

// NOT AGAIN
plot.append('rect').attr('class','bottomgroup g1')
    .attr('x',1 * mx)
    .attr('width',10 * mx)
    .attr('y',h)
    .attr('height',25)
    .style('fill','#ececea')
    ;
plot.append('text').attr('class','grouptext g1')
    .attr('x',6 * mx)
    .attr('y',h + 15)
    .text('would not do again')
    .attr('text-anchor','middle')
    .style('color','white')
    ;


// MAYBE
plot.append('rect').attr('class','bottomgroup g2')
    .attr('x',12 * mx)
    .attr('width',6 * mx)
    .attr('y',h)
    .attr('height',25)
    .style('fill','#ececea')
    ;
plot.append('text').attr('class','grouptext g2')
    .attr('x',15 * mx)
    .attr('y',h + 15)
    .text('might do again')
    .attr('text-anchor','middle')
    .style('color','white')
    ;
// PROBABLY AGAIN
plot.append('rect').attr('class','bottomgroup g3')
    .attr('x',19 * mx)
    .attr('width',14 * mx)
    .attr('y',h)
    .attr('height',25)
    .style('fill','#ececea')
    ;
plot.append('text').attr('class','grouptext g3')
    .attr('x',26 * mx)
    .attr('y',h + 15)
    .text('will probably do again')
    .attr('text-anchor','middle')
    .style('color','white')
    ;

// nodeEnter.append('text')
//     .attr('x',function(d){return d.id * mx})
//     .attr('y',function(d){return d.height + h/2 + v + 20})
//     .text('X')
//     .text(
//         function(d) { 
//             if(d.finished == 'n') return "X"
//         })
//     .attr('text-anchor','middle')



d3.queue()
    .defer(d3.csv, '43data2.csv',parse)
    .await(function(err, data){

        //Mine the data to set the scales
        scaleX.domain( d3.extent(data,function(d){return d.id}) );//sets domain for x scale - why here instead of above?? finds lowest and highest dates
        scaleColor.domain( activities.values() );//what is airlines.values()?? it must come from airlines variable set above.


        //FUN CLICK FILTER
        var funfun = d3.selectAll(".fun");
            funfun.on('click',function(d){
                // .style('font-weight','bold')
                // .style('color','black');
                var dataFiltered = data.filter(function(e){return e.feeling == 'fun'});
                    
                draw(dataFiltered)
            });

        //SHAME CLICK FILTER
        var shameshame = d3.selectAll(".shame");
            shameshame.on('click',function(d){
                var dataFiltered = data.filter(function(e){return e.height >= 116});

                draw(dataFiltered)
            });

        //SHAME CLICK FILTER
        var funshame = d3.selectAll(".both");
            funshame.on('click',function(d){
                var dataFiltered = data.filter(function(e){return e.height >= 116 && e.feeling == 'fun'});

                draw(dataFiltered)
            });

        //CIRCLE-A CLICK FILTER
        circleA.on('click',function(d){
                var tooltip2 = d3.select('.custom-tooltip');
                tooltip2.select('.lettera').html( "did more than once")
                    .style('left',175 +'px')
                    .style('top',300 +'px');
                tooltip2
                    .style('visibility','visible')
                    .transition()
                    .style('opacity',1);

                var dataFiltered = data.filter(function(e){return e.lettera == 'a'});

                draw(dataFiltered)

            })
            .on('mouseover', function(d){
                d3.select(this).style('stroke-width', '2px')
                })
            .on('mouseleave', function(d){
                d3.select(this).style('stroke-width', '1px')
                })
            ;

        //CIRCLE-B CLICK FILTER
        circleB.on('click',function(d){
                var tooltip3 = d3.select('.custom-tooltip');
                tooltip3.select('.lettera').html( "someone noticed")
                    .style('left',615 +'px')
                    .style('top',300 +'px');
                tooltip3
                    .style('visibility','visible')
                    .transition()
                    .style('opacity',1);

                var dataFiltered = data.filter(function(e){return e.letterb == 'b'});

                draw(dataFiltered)

            })
            .on('mouseover', function(d){
                d3.select(this).style('stroke-width', '2px')
                })
            .on('mouseleave', function(d){
                d3.select(this).style('stroke-width', '1px')
                })
            ;

        //Add buttons
        d3.select('.btn-group')
            .selectAll('.btn')
            .data( activities.values() )
            .enter()
            .append('a')
            .html(function(d){return d})
            .attr('href','#')
            .attr('class', function(d){return d + ' btn btn-default'})
            .style('color','white')
            .style('background',function(d){return scaleColor(d)})
            .style('border-color','white')
            .style('opacity', 1)

            // .on('mouseover',function(d){
            //     var button = d3.select('.btn')
            //     button.select(this)
            //     .style('background',function(d){return scaleColor(d)})
            // })

            .on('click',function(d){

                var thisButton = this;

                var otherbuttons = d3.selectAll('.btn-default')
                 .style('opacity',function(d){
                   if(this == thisButton){
                     return 1;
                   }
                   else{
                     return .3;
                   }
                 })
                 d3.selectAll('.group')
                 .style('opacity',0)

                var dataFiltered = data.filter(function(e){return(d) == e.activity});
                
                draw(dataFiltered)
                
                //How do we then update the dots?
            });


        //Draw axis
        // plot.append('g').attr('class','axis axis-x')
        //     .attr('transform','translate(0,'+h+')')
        //     .call(axisX);
        // plot.append('g').attr('class','axis axis-y')
        //     .call(axisY);
        
        //Append <path>; this should only happen once
        plot.append('path').attr('class','time-series');

        draw(data);

    });

function draw(rows){
    //IMPORTANT: data transformation
    
    // rows.sort(function(a,b){return a.travelDate - b.travelDate});
    
    // var flightsByTravelDate = d3.nest().key(function(d){return d.travelDate})
    //     .entries(rows);

    // flightsByTravelDate.forEach(function(day){
    //    day.averagePrice = d3.mean(day.values, function(d){return d.price});
    // });

    // console.log(flightsByTravelDate);

    //Draw dots
    
    //UPDATE
    var node = plot.selectAll('.instance')
        .data(rows,function(d){return d.id});

    var nodeEnter = node.enter()
        .append('g').attr('class','instance')
        .merge(node)
        // .attr('r',3)
        // .attr('cx',function(d){return scaleX(d.id * 35)})
        // .attr('cy',function(d){return scaleY(d.height)})
        // .style('fill',function(d){return scaleColor(d.activity)})
        // .style('fill-opacity',.75) 
    nodeEnter.on('mouseover',function(d){
            var tooltip = d3.select('.custom-tooltip');
                tooltip.select('.feeling').html(d.feeling)
                    .style('left',d.id * mx -10 +'px')
                    .style('top',h + 21 + 10 - 40+'px')

                tooltip.select('.onpurpose').html(d.onpurpose)
                    .style('left',d.id * mx -10 +'px')
                    .style('top',h + 30 + 15 +'px');
                ;
                tooltip.select('.shame').html(
                    function(e) {            // <== Add these
                    if (d.height <= 70) {return "not too shameful"}
                    else if (d.height >= 116) {return "very shameful"}  // <== Add these
                    else    { return "sort of shameful" }          // <== Add these
                    ;}
                    )
                    // .style('left',d.id * mx -10 +'px')
                    // .style('top',h + 23 + 100 + d.height+'px');
                    .style('left',d.id * mx -10 +'px')
                    .style('top',h + 10 + 15 + d.height +'px');
                ;
                tooltip.select('.finished').html(
                    function(e) { 
                        if(d.finished == 'n') return "didn't finish"
                    })
                    .style('left',d.id * mx -10 +'px')
                    .style('top',d.height + h/2 + v - 30 +'px');
                ;
                tooltip.select('.lettera').html(
                    function(e) {            // <== Add these
                    if (d.lettera == 'a') {return "did more than once"}
                    ;}
                    )
                    .style('left',175 +'px')
                    .style('top',300 +'px');
                ;

                tooltip.select('.letterb').html(
                    function(e) {            // <== Add these
                    if (d.letterb == 'b') {return "someone noticed"}
                    ;}
                    )
                    .style('left',615 +'px')
                    .style('top',300 +'px');
                ;


                tooltip
                    .style('visibility','visible')
                    .transition()
                    .style('opacity',1)

//                 var thisActivity = d.activity;
// console.log(thisActivity);
                // var otherActivities = d3.selectAll('.' + d.activity)
                //  .style('opacity',function(d){
                //    if(!d.activity){
                //      return 1;
                //    }
                //    else{
                //      return .8;
                //    }
                //  })

                d3.selectAll('*:not(.' + d.activity + ')' + '.btn')
                 .style('opacity', .1);

                d3.selectAll('*:not(.' + 'g' + d.group + ')' + '.grouptext')
                 .style('opacity', .1);
                d3.selectAll('.g' + d.group + '.grouptext')
                 .style('font-weight','bold');
                d3.selectAll('.bottomgroup')
                 .style('opacity', .4);

                var thisLine = this;

                var others = d3.selectAll('.instance')
                 .style('opacity',function(d){
                   if(this == thisLine){
                     return 1;
                   }
                   else{
                     return .1;
                   }
                 });

                 d3.selectAll('.topcircle')
                 .style('opacity',.1)

                 d3.selectAll('.group')
                 .style('opacity',.1)

        })
        .on('mousemove',function(d){
            // var tooltip = d3.select('.custom-tooltip');
            // var xy = d3.mouse( d3.select('.container').node() );
            // tooltip
            //     .style('left',xy[0]+40+'px')
            //     .style('top',xy[1]-135+'px');
        })
        .on('mouseleave',function(d){
            var tooltip = d3.select('.custom-tooltip');
                tooltip
                    .style('visibility','hidden')
                    .style('opacity',0);

                d3.selectAll('.group').style('opacity',1)
                d3.selectAll('.topcircle').style('opacity',1)
                d3.selectAll('.grouptext').style('opacity',1).style('font-weight','normal')
                d3.selectAll('.bottomgroup').style('opacity',1)
                d3.selectAll('.instance').transition().style('opacity',1);
                d3.selectAll('.btn').transition().style('opacity',1);
        });

// LINE TO LETTER A
nodeEnter.append('line')
    .attr('x1',function(d){return d.id * mx})
    .attr('x2',w/2 - 100)
    .attr('y1',h/2 + v - 65)
    .attr('y2',50)
    .style('stroke',
        function(d) { 
            if(d.lettera == 'a') return "#cccccc"
            else if (d.lettera == '') return "none"
        }
        )
    .style('stroke-with', (
        function(d) { 
            if(d.lettera == 'a') return ".5px"
            else if (d.lettera == '') return "0px"
        })
    )
// LINE TO LETTER B
nodeEnter.append('line')
    .attr('x1',function(d){return d.id * mx})
    .attr('x2',w/2 + 100)
    .attr('y1',h/2 + v - 65)
    .attr('y2',50)
    .style('stroke',
        function(d) { 
            if(d.letterb == 'b') return "#cccccc"
            else if (d.letterb == '') return "none"
        }
        )
    .style('stroke-with', (
        function(d) { 
            if(d.letterb == 'b') return ".5px"
            else if (d.letterb == '') return "0px"
        })
    )

// LINE FOR FUN/NOTFUN CIRCLE
nodeEnter.append('circle')
    .attr('cx',function(d){return d.id * mx})
    .attr('cy',h/2 + v - 65)
    .attr('r',4)
    .style('fill','black')

// LINE FOR FUN/NOTFUN
nodeEnter.append('line').attr('class','funline')
    .attr('x1',function(d){return d.id * mx})
    .attr('x2',function(d){return d.id * mx})
    .attr('y1',h/2 + v - 55)
    .attr('y2',h/2 + v - 20)
    .style('stroke','black')
    .style('stroke-width','2px')
    .style('stroke-dasharray', (
        function(d) { 
            if(d.feeling == 'just ok') return "2,2"
            else if (d.feeling == 'fun') return "6,3"
        })
    )
    // .style("stroke-dasharray", ("3, 3"));
    

// COLORED RECT
nodeEnter.append('line')
    .attr('x1',function(d){return d.id * mx})
    .attr('x2',function(d){return d.id * mx})
    .attr('y1',h/2 + v - 18)
    .attr('y2',h/2 + v - 5)
    // .style('stroke','green')
    .style('stroke',function(d){return scaleColor(d.activity)})
    .style('stroke-width','6px')

// BOTTOM LINES
nodeEnter.append('line')
    .attr('x1',function(d){return d.id * mx})
    .attr('x2',function(d){return d.id * mx})
    .attr('y1',h/2 + v)
    .attr('y2',function(d){return d.height + h/2 + v})
    .style('stroke','black')
    .style('stroke-width','2px')

nodeEnter.append('line')
    .attr('x1',function(d){return d.id * mx + 4})
    .attr('x2',function(d){return d.id * mx + 4})
    .attr('y1',h/2 + v)
    .attr('y2',function(d){return d.height + h/2 + v})
    .style('stroke', (
        function(d) { 
            if(d.onpurpose != 'not on purpose') return "#e2dbcb"
            else if (d.onpurpose == 'not on purpose') return "black"
        })
    )
    .style('stroke-width','2px')
    .style('stroke-dasharray', (
        function(d) { 
            if(d.onpurpose == 'not on purpose') return "2,2"
        })
    )

nodeEnter.append('text')
    .attr('x',function(d){return d.id * mx})
    .attr('y',function(d){return d.height + h/2 + v + 20})
    .text('X')
    .text(
        function(d) { 
            if(d.finished == 'n') return "X"
        })
    .attr('text-anchor','middle')


/*
    //UPDATE
    var node = plot.selectAll('.node')
        .data(rows,function(d){return d.price});
    //ENTER
    var nodeEnter = node.enter()
        .append('circle')
        .attr('class','node')
        .on('click',function(d,i){
            console.log(d);
            console.log(i);
            console.log(this);
        })
*/
;
    //UPDATE + ENTER
    nodeEnter
        .attr('cx',function(d){return scaleX(d.id)})
        .attr('cy',function(d){return scaleY(d.height)})
        .merge(node)
        .attr('r',4)
        .transition()
        .attr('cx',function(d){return scaleX(d.id)})
        .attr('cy',function(d){return scaleY(d.height)})
        .style('fill',function(d){return scaleColor(d.activity)});
    //EXIT
    node.exit().remove();


    // //Draw path
    // var pathLine = plot.select('.time-series')
    //     .datum(flightsByTravelDate)
    //     .transition()
    //     .attr('d',function(datum){
    //         return lineGenerator(datum);
    //     })
    //     .style('fill','none')
    //     .style('stroke-width','2px')
    //     .style('stroke',function(datum){
    //          return scaleColor(datum[0].values[0].airline);
    //     });

    //Draw <path>
}

function parse(d){

    if( !activities.has(d.activity) ){
        activities.add(d.activity);
    }


    return {
        id: +d.id,
        group: +d.group,
        lettera: d.lettera,
        letterb: d.letterb,
        feeling: d.feeling,
        activity: d.activity,
        activity_id: d.activity_id,
        onpurpose: d.onpurpose,
        height: +d.height,
        finished: d.finished
    }
}
