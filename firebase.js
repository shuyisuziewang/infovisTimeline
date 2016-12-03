var config = {
    apiKey: "AIzaSyCFKRUMRSkAF3iW1WriU_to7zbk5STXbQc",
    authDomain: "infovis-f356e.firebaseapp.com",
    databaseURL: "https://infovis-f356e.firebaseio.com",
    storageBucket: "infovis-f356e.appspot.com",
    messagingSenderId: "338990255095"
  };
  firebase.initializeApp(config);

  var ref = firebase.database().ref("cases");

var margin = {top: 20, right: 20, bottom: 30, left: 20},
      width = 1024 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;


  var x = d3.scaleLinear()
      .range([0, width]);

  var y = d3.scaleLinear()
      .range([height, 0]);

  var svg = d3.select("body").append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate("+margin.left+","+margin.top+")")

  var line = d3.line()
      .curve(d3.curveBasis)
      .x(function(d) { return x(d.key); })
      .y(function(d) { return y(d.value); })


  ref.orderByKey().startAt("201102230007").on("value", function(error, csvdata){
      
      var casesSum = d3.nest()
      .key(function(d) { 

        console.log (d.iyear);
        return d.year; 
      })
      .rollup(function(t) { return t.length; })
      .entries(csvdata);

      console.log(casesSum)

      casesSum.forEach(function(d){
        d.key = +d.key;
        d.value = +d.value;
        console.log(d);
        return d;
        })

      x.domain(d3.extent(casesSum, function(d) { console.log(d.key); return d.key; }));
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
