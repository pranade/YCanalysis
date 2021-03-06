var margin = {top: 20, right: 100, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;
 
var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .05);

// THESE LINES DON'T WORK
// var x = d3.scale.ordinal()
//   .domain(["S05","W06","S06","W07","S07","W08","S08","W09","S09","W10","S10","W11","S11","W12","S12","W13","S13","W14","S14"]);
 
var y = d3.scale.linear()
    .rangeRound([height, 0]);
 
var color = d3.scale.ordinal()
 
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .tickSize(0, 0, 0)
    .tickPadding(6);
 
var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(d3.format(".0%"))
    .tickSize(0, 0, 0)
    .tickPadding(-1);
 
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
d3.csv(window.location.search.replace('?data=', ''), function(error, data) {
    // var categories = d3.keys(data[0]).filter(function(key) { return key !== "Sample"; });
    var categories = d3.keys(data[0]).filter(function(key) { return key !== "Date"; });
    var categories_shift = categories;
    console.log(categories);
    console.log("# of categories:" + categories.length);
    color.domain(categories);
    color.range(colorbrewer(categories.length));
 
    data.forEach(function(d) {
  var y0 = 0;
	d.genes = color.domain().map(function(name) { if(!d[name]){ console.log('name', name); } return {name: name, y0: y0, y1: y0 += parseInt(d[name])}; });// got rid of plus in front of d[name]
  // console.log("got here");
  // console.log(d.y0,d.y1);
	d.genes.forEach(function(d) { d.y0 /= y0; d.y1 /= y0; });
    });
    //data.sort(function(a, b) { return b.genes[0].y1 - a.genes[0].y1; });
    x.domain(data.map(function(d) { 
      return d.Date;
    }));
 
    svg.append("g")
	.attr("class", "x axis")
	.attr("transform", "translate(0," + height + ")")
	.call(xAxis);
 
    svg.append("g")
	.attr("class", "y axis")
	.call(yAxis);
  // console.log("got here");
    var rotate = function(arr){
	var temp = arr.shift();
	arr.push(temp);
    }
    
    var sample = svg.selectAll(".date") //sample
	.data(data)
	.enter().append("g")
	.attr("class", "date") //sample
	 .attr("transform", function(d) { return "translate(" + x(d.Date) + ",0)"; });
  // console.log("y(d.y0), y(d.y1): " + y(d.y0) + ", " + y(d.y1));
  console.log("x.rangeBand(): " + x.rangeBand());
  sample.selectAll("rect")
  	.data(function(d) { return d.genes; })
	  .enter().append("rect")
	  .attr("width", x.rangeBand())
	  .attr("y", function(d) { return y(d.y1); })
	  .attr("height", function(d) { return y(d.y0) - y(d.y1); })
	  .style("fill", function(d) { return color(d.name);})
	  .on("click", function(d) {
	      var gene_index = categories_shift.indexOf(d.name);
	      moveStuff(gene_index);
	   });
     // console.log("got here");
  var moveStuff = function(gene_index){
	categories_shift = categories;
	for (var i=0; i<gene_index; i++){
	    rotate(categories_shift);
	}
	data.forEach(function(d) {
	    var y0 = 0;
	    d.genes = categories_shift.map(function(name) { if(!d[name]){ console.log('name', name); } return {name: name, y0: y0, y1: y0 += parseInt(d[name])}; });
	    d.genes.forEach(function(d) { d.y0 /= y0; d.y1 /= y0; });
	})

  data.sort(function(a, b) { return b.genes[0].y1 - a.genes[0].y1; });
  x.domain(data.map(function(d) { return d.Date; }));

  // COMMENTED OUT - this code causes the x-axis to re-sort, which we don't want
  // svg.select(".x.axis")
  //     .transition()
  //     .duration(1000)
  //     .call(xAxis);
  // sample = svg.selectAll(".date")
  //     .data(data)
  //     .attr("transform", function(d) { return "translate(" + x(d.Date) + ",0)"; });
 
	sample.selectAll("rect")
	    .data(function(d) { return d.genes; })
	    .transition()
	    .delay(function(d, i) { return i * 50})
	    .attr("y", function(d) { console.log('y stuff', d.y1); return y(d.y1);})
	    .attr("height", function(d) { return y(d.y0) - y(d.y1); })
	    .style("fill", function(d) { return color(d.name);});
 
	last_sample = data[data.length - 1];
  };
  
  var last_sample = data[data.length - 1];
  svg.selectAll("text")
	.data(last_sample.genes)
	.enter()
	.append("text")
	.text(function(d) {
	    return d.name;
	})
	.attr("x", function(d) {
	    return x(last_sample.Date) + x.rangeBand() + 15;
	})
	.attr("y", function(d) {
	    return (y(d.y0) + y(d.y1)) / 2;
	})
	.attr("font-size", "11px")
	.attr("fill", "black");
	
});