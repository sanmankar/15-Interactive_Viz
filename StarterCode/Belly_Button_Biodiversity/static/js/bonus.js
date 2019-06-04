function buildCharts2(sample) {

var v_value = d3.select("#selDataset").node().value;
console.log(`Selected Value : ${v_value}`);
var guage_loc = d3.select("#gauge");
var defaultURL = `/wfreq/${v_value}`;

  
d3.json(defaultURL).then(function(results) {
  
      var data = results["WFREQ"];
      //var label = results["otu_ids"].slice(0,9);

      var level = data;

      // Trig to calc meter point
      var degrees = 9 - level,
          radius = .5;
      var radians = degrees * Math.PI / 9;
      var x = radius * Math.cos(radians);
      var y = radius * Math.sin(radians);

      // Path: may have to change to create a better triangle
      var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
          pathX = String(x),
          space = ' ',
          pathY = String(y),
          pathEnd = ' Z';
      var path = mainPath.concat(pathX,space,pathY,pathEnd);

      var data = [{ type: 'scatter',
        x: [0], y:[0],
          marker: {size: 28, color:'850000'},
          showlegend: false,
          name: 'speed',
          text: level,
          hoverinfo: 'text+name'},
        { values: [50/9,50/9,50/9,50/9,50/9,50/9,50/9,50/9,50/9,50],
        rotation: 90,
        text: ['8-9', '7-8', '6-7', '5-6',
        '4-5', '3-4', '2-3', '1-2','0-1'],
        textinfo: 'text',
        textposition:'inside',
        marker: {colors:['rgba(14, 127, 0, .5)', 'rgba(110, 154, 22, .5)',
                              'rgba(170, 202, 42, .5)', 'rgba(202, 209, 95, .5)',
                              'rgba(210, 206, 145, .5)', 'rgba(232, 226, 202, .5)',
                              'rgba(255, 255, 255, 0)',
                              'rgba(14, 127, 0, .5)', 'rgba(110, 154, 22, .5)'
                            ]},
        //labels: label,
        hoverinfo: 'label',
        hole: .5,
        type: 'pie',
        showlegend: false
      }];

      var layout = {
        shapes:[{
            type: 'path',
            path: path,
            fillcolor: '850000',
            line: {
              color: '850000'
            }
          }],
        title: '<b>Gauge</b> <br> Wash Frequency',
        height: 500,
        width: 500,
        xaxis: {zeroline:false, showticklabels:false,
                  showgrid: false, range: [-1, 1]},
        yaxis: {zeroline:false, showticklabels:false,
                  showgrid: false, range: [-1, 1]}
      };

      Plotly.newPlot('gauge', data, layout);

          });

//   // Enter a speed between 0 and 180
// var level = 175;

// // Trig to calc meter point
// var degrees = 180 - level,
//      radius = .5;
// var radians = degrees * Math.PI / 180;
// var x = radius * Math.cos(radians);
// var y = radius * Math.sin(radians);

// // Path: may have to change to create a better triangle
// var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
//      pathX = String(x),
//      space = ' ',
//      pathY = String(y),
//      pathEnd = ' Z';
// var path = mainPath.concat(pathX,space,pathY,pathEnd);

// var data = [{ type: 'scatter',
//    x: [0], y:[0],
//     marker: {size: 28, color:'850000'},
//     showlegend: false,
//     name: 'speed',
//     text: level,
//     hoverinfo: 'text+name'},
//   { values: [50/6, 50/6, 50/6, 50/6, 50/6, 50/6, 50],
//   rotation: 90,
//   text: ['TOO FAST!', 'Pretty Fast', 'Fast', 'Average',
//             'Slow', 'Super Slow', ''],
//   textinfo: 'text',
//   textposition:'inside',
//   marker: {colors:['rgba(14, 127, 0, .5)', 'rgba(110, 154, 22, .5)',
//                          'rgba(170, 202, 42, .5)', 'rgba(202, 209, 95, .5)',
//                          'rgba(210, 206, 145, .5)', 'rgba(232, 226, 202, .5)',
//                          'rgba(255, 255, 255, 0)']},
//   labels: ['151-180', '121-150', '91-120', '61-90', '31-60', '0-30', ''],
//   hoverinfo: 'label',
//   hole: .5,
//   type: 'pie',
//   showlegend: false
// }];

// var layout = {
//   shapes:[{
//       type: 'path',
//       path: path,
//       fillcolor: '850000',
//       line: {
//         color: '850000'
//       }
//     }],
//   title: '<b>Gauge</b> <br> Speed 0-100',
//   height: 500,
//   width: 500,
//   xaxis: {zeroline:false, showticklabels:false,
//              showgrid: false, range: [-1, 1]},
//   yaxis: {zeroline:false, showticklabels:false,
//              showgrid: false, range: [-1, 1]}
// };

// Plotly.newPlot('gauge', data, layout);
  
  }


function optionChanged2(newSample) {
    // Fetch new data each time a new sample is selected
    console.log("I am in bonus.js");
    buildCharts2(newSample);
  }
