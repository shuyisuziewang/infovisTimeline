var svg = d3.select("body").append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate("+margin.left+","+margin.top+")")

  var line = d3.line()
      .curve(d3.curveBasis)
      .x(function(d) { return x(d.key); })
      .y(function(d) { return y(d.value); })


  d3.csv("./1970.csv", function(error,csvdata){
      
      var casesSum = d3.nest()
          .key(function(d) { 
            //var interval = d.imonth+d.iday
            //console.log (interval);
            return d.imonth; 
          })
          .rollup(function(t) { return t.length; })
          .entries(csvdata);

      console.log(casesSum)

      casesSum.forEach(function(d){
        
        
        if (d.key != "0") d.key = +d.key;
        d.value = +d.value;
        console.log(d);
        return d;
        })

      x.domain(d3.extent(casesSum, function(d) { if (d.key != 0) return d.key; }));
      y.domain(d3.extent(casesSum, function(d) { return d.value; }));

      // add line path
      svg.append("path")
         .datum(casesSum)
         .attr("class", "line")
         .attr("d", line);

      //add X axis
      svg.append("g")
         .attr("class", "axis axis--x")
         .attr("transform", "translate(0," + height + ")")
         .call(d3.axisBottom(x));

      //add Y axis
      svg.append("g")
         .attr("class", "axis axis--y")
         .call(d3.axisLeft(y))
        .append("text")
         .attr("fill", "#000")
         .attr("transform", "rotate(-90)")
         .attr("y", 6)
         .attr("dy", "0.71em")
         .style("text-anchor", "end")
         .text("Cases");
    });
