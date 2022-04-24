// import the data from data.js
const tableData = data;

var tbody = d3.select("tbody");

function buildTable(data) {
    // First, clear out any existing data
    tbody.html("");
  
    // Next, loop through each object in the data
    // and append a row and cells for each value in the row
    data.forEach((dataRow) => {
      // Append a row to the table body
        let row = tbody.append("tr");
  
      // Loop through each field in the dataRow and add
      // each value as a table cell (td)
        Object.values(dataRow).forEach((val) => {
            let cell = row.append("td");
            cell.text(val);
            }
        );
    });
}

function handleClick() {
    // Grab the datetime value from the filter
    let date = d3.select("#datetime").property("value");
    let state = d3.select("#state").property("value");
    let country = d3.select("#country").property("value");
    let shape = d3.select("#shape").property("value");

    state =  state.toLowerCase();
    country = country.toLowerCase();
    shape = shape.toLowerCase();

    let filteredData = tableData;
  
//      // Check to see if a date was entered and filter the
//     // data using that date.
//     if (date) {
//       // Apply `filter` to the table data to only keep the
//       // rows where the `datetime` value matches the filter value
//       filteredData = filteredData.filter(row => row.datetime === date);
//     }
//     if (state) {
//         // Apply `filter` to the table data to only keep the
//         // rows where the `datetime` value matches the filter value
//         filteredData = filteredData.filter(row => row.state === state);
//     }
//     if (country) {
//     // Apply `filter` to the table data to only keep the
//     // rows where the `datetime` value matches the filter value
//     filteredData = filteredData.filter(row => row.country === country);
//     }
//     if (shape) {
//     // Apply `filter` to the table data to only keep the
//     // rows where the `datetime` value matches the filter value
//     filteredData = filteredData.filter(row => row.shape === shape);
//     }
//      // Rebuild the table using the filtered data
//     // @NOTE: If no date was entered, then filteredData will
//     // just be the original tableData.
//     buildTable(filteredData);
// }
    var filters = {};
    filters["datetime"] = date;
    filters["state"] = state;
    filters["country"] = country;
    filters["shape"] = shape;
    console.log(filters);

    var request_filters = []

    for (var key in filters){
        if (filters[key] != ""){
            request_filters.push([key, filters[key]])
        };
    }
    console.log(filteredData[0][request_filters[0][0]]);

    if (request_filters.length==1) {
        search_results = filteredData.filter(i => i[request_filters[0][0]]==request_filters[0][1]);
        console.log(search_results)
    } else if (request_filters.length==2) {
        search_results = filteredData.filter(i => (i[request_filters[0][0]]==request_filters[0][1] && i[request_filters[1][0]]===request_filters[1][1]))
        console.log(search_results)
    } else if (request_filters.length==3) {
        search_results = filteredData.filter(i => (i[request_filters[0][0]]==request_filters[0][1] && i[request_filters[1][0]]===request_filters[1][1] && i[request_filters[2][0]]===request_filters[2][1]))
        console.log(search_results)
    } else {
        search_results = filteredData.filter(i => (i[request_filters[0][0]]==request_filters[0][1] && i[request_filters[1][0]]===request_filters[1][1] && i[request_filters[2][0]]===request_filters[2][1] && i[request_filters[3][0]]===request_filters[3][1]))
        console.log(search_results)
    }

    buildTable(search_results);
};

  // Attach an event to listen for the form button
d3.selectAll("#filter-btn").on("click", handleClick);
  
  // Build the table when the page loads
buildTable(tableData);