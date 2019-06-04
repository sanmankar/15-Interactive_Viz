function unpack(rows, index) {
  return rows.map(function(row) {
    return row[index];
  });
}

function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`

    // Use `.html("") to clear any existing metadata

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);

  /* data route */

  var v_value = d3.select("#selDataset").node().value;
  console.log(`Selected Value : ${v_value}`);

  var tbody = d3.select("#sample-metadata");

  var defaultURL = `/metadata/${v_value}`;
 // @app.route("/metadata/<sample>")

  d3.json(defaultURL).then(function(results) {
  
    var result = [results];

  
    console.log(`Results : ${result}`);

    rows = tbody.selectAll("tr");
    rows.remove();

    result.forEach((v_row) => {
      var row = tbody.append("tr");
      Object.entries(v_row).forEach(([key, value]) => {
        var row = tbody.append("tr");
        var cell = row.append("td");
        var x = key + ": " + value;
        cell.text(x);
      });
    });

});


}

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots

    // @TODO: Build a Bubble Chart using the sample data

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).

    var v_value = d3.select("#selDataset").node().value;
    console.log(`Selected Value : ${v_value}`);

    var pie_loc = d3.select("#pie");
    var defaultURL = `/samples/${v_value}`;

    console.log(`Sample URL :  ${defaultURL}`);

    d3.json(defaultURL).then(function(results) {

      var data = results["sample_values"].slice(0,10);
      var label = results["otu_ids"].slice(0,10);
      //var val = unpack(result.sample_values, 0);

      console.log(`Results : ${data}`);

      var trace1 = {
      values: data,
      labels: label,
      type: 'pie'
      };

    
     var data1 = [trace1];
     var layout1={ title: '<b>Pie Chart</b> <br> Sample Values'};
     Plotly.newPlot('pie', data1, layout1);

     // Creating trace and plotting a bubble chart

     var trace2 = {
      x: results["otu_ids"],
      y: results["sample_values"],
      mode: 'markers',
      marker: {
        size: results["sample_values"],
        color: results["otu_ids"],
        text: results["otu_labels"]
      }
    };
    
    var data2 = [trace2];
    var layout2={ title: '<b>Bubble Chart</b> <br> Sample Values'};
    
    Plotly.newPlot('bubble', data2, layout2);
  });

}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
 
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
