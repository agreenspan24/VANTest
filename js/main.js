function getData() {
    var d = new Date();
    return [
        {id: 1892632, parent: "", name: "Source", comm: "People for Good", createdByFirst: "John",
            createdByLast: "Smith", dateCreated: new Date("2017-05-31"), descr: ""},
        {id: 1892637, parent: "Source", name: "AA01X27FY2016xx", comm: "People for Good", createdByFirst: "John",
            createdByLast: "Smith", dateCreated: new Date("2017-05-28"), descr: "Campaign to raise awareness"},
        {id: 1892635, parent: "Source", name: "Anti-Smoking Campaign", comm: "People for Good", createdByFirst: "John",
            createdByLast: "Smith", dateCreated: new Date("2017-05-23"), descr: "Campaign to raise awareness"},
        {id: 1892638, parent: "Source", name: "Rainforest Donation Page", comm: "People for Good", createdByFirst: "John",
            createdByLast: "Smith", dateCreated: new Date("2017-05-19"), descr: "Donation page created to raise money"},
        {id: 1892630, parent: "Source", name: "Equal Pay Donor", comm: "People for Good", createdByFirst: "John",
            createdByLast: "Smith", dateCreated: new Date("2017-05-12"), descr: "Page created to collect donations"},
        {id: 1892633, parent: "Source", name: "Children's Education Campaign", comm: "People for Good", createdByFirst: "John",
            createdByLast: "Smith", dateCreated: new Date("2017-05-11"), descr: "Children's Education Campaign"},
        {id: 1892635, parent: "Source", name: "Minimum Wage", comm: "People for Good", createdByFirst: "John",
            createdByLast: "Smith", dateCreated: new Date("2017-05-23"), descr: ""},
        {id: 1892638, parent: "Source", name: "Online Ad", comm: "People for Good", createdByFirst: "John",
            createdByLast: "Smith", dateCreated: new Date("2017-05-19"), descr: ""},
        {id: 1892630, parent: "", name: "Volunteer", comm: "People for Good", createdByFirst: "John",
            createdByLast: "Smith", dateCreated: new Date("2017-05-12"), descr: ""},
        {id: 1892633, parent: "Volunteer", name: "Meetup", comm: "People for Good", createdByFirst: "John",
            createdByLast: "Smith", dateCreated: new Date("2017-05-11"), descr: ""}
    ]
}

function formatName(first, last) {
    return last + ", " + first.charAt(0) + ".";
}

function formatDate(date) {
    return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear().toString().slice(2,4);
}

function formatLine(row) {
    var htmlString = "<tr>";

    for (var key in row) {
        if (key != "createdByLast") {
            htmlString += "<td>";
        }
        if (key == "name") {
            htmlString += "<a>" + row[key] + "</a>";
        } else if (key == "parent") {
            if (row[key]) {
                htmlString += row[key] + "/";
            }
            htmlString += row["name"];
        } else if (key == "createdByFirst") {
            htmlString += formatName(row["createdByFirst"], row["createdByLast"]);
        } else if (key == "createdByLast") {

        } else if (key == "dateCreated") {
            htmlString += formatDate(row[key]);
        } else {
            htmlString += row[key];
        }
        if (key != "createdByLast") {
            htmlString += "</td>";
        }
    }
    return htmlString += "</tr>";
}

function filterTags() {
    var tagToFilter = $("#input-1").val();

    var data = getData();

    if (tagToFilter) {
        var data = data.filter(function(row) {
            return row["name"] == tagToFilter;
        });
    }
    console.log(data);
    populateTable(data);
}

function populateTable(data) {
    if (data.length == 0) {
        showErrorMessage();
    } else {
        var tableString = "";

        data.forEach(function (row) {
            tableString += formatLine(row);
        });

        $(".tbody").html(tableString);
        $("#tagNumber").html(data.length);
    }
}

function initTable() {
    var data = getData();

    populateTable(data);
}
function showErrorMessage() {
    var errorMessage = '<tr><td colspan="100%"><div class="no-data-message">' +
        '<span class="glyphicons glyphicons-tags" aria-hidden="true"></span>' +
        '<p class="no-data-title wide">No Tags Found</p></div></td></tr>';

    $(".tbody").html(errorMessage);
    $("#tagNumber").html(0);
}
