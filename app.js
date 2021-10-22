console.log("This is working!");

(function () {
  var myConnector = tableau.makeConnector();

  myConnector.getSchema = function (schemaCallback) {
    const cctv_data = [
      {
        id: "timeuuid_id",
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: "lgu_code",
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: "sensor_id",
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: "date_saved",
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: "time_saved",
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: "count_total",
        dataType: tableau.dataTypeEnum.int,
      },
      {
        id: "in_total",
        dataType: tableau.dataTypeEnum.int,
      },
      {
        id: "out_total",
        dataType: tableau.dataTypeEnum.int,
      },
      {
        id: "in_car",
        dataType: tableau.dataTypeEnum.int,
      },
      {
        id: "in_bus",
        dataType: tableau.dataTypeEnum.int,
      },
      {
        id: "in_med_truck",
        dataType: tableau.dataTypeEnum.int,
      },
      {
        id: "in_large_truck",
        dataType: tableau.dataTypeEnum.int,
      },
      {
        id: "in_jeepney",
        dataType: tableau.dataTypeEnum.int,
      },
      {
        id: "in_bike",
        dataType: tableau.dataTypeEnum.int,
      },
      {
        id: "in_tryke",
        dataType: tableau.dataTypeEnum.int,
      },
      {
        id: "in_others",
        dataType: tableau.dataTypeEnum.int,
      },
      {
        id: "out_car",
        dataType: tableau.dataTypeEnum.int,
      },
      {
        id: "out_bus",
        dataType: tableau.dataTypeEnum.int,
      },
      {
        id: "out_med_truck",
        dataType: tableau.dataTypeEnum.int,
      },
      {
        id: "out_large_truck",
        dataType: tableau.dataTypeEnum.int,
      },
      {
        id: "out_jeepney",
        dataType: tableau.dataTypeEnum.int,
      },
      {
        id: "out_bike",
        dataType: tableau.dataTypeEnum.int,
      },
      {
        id: "out_tryke",
        dataType: tableau.dataTypeEnum.int,
      },
      {
        id: "out_others",
        dataType: tableau.dataTypeEnum.int,
      },
    ];

    let cctvTableSchema = {
      id: "CCTVMAPUA",
      alias: "CCTV Mapua from start",
      columns: cctv_data,
    };

    schemaCallback([cctvTableSchema]);
  };

  myConnector.getData = function (table, doneCallback) {
    let tableData = [];
    var i = 0;

    $.getJSON(
      "http://103.29.250.173:8080/genapi1/gsc/api/data/cctv_counts",
      function (resp) {
        // Iterate over the JSON object
        for (i = 0, len = resp.length; i < len; i++) {
          tableData.push({
            timeuuid_id: resp[i].timeuuid_id,
            lgu_code: resp[i].lgu_code,
            sensor_id: resp[i].sensor_id,
            date_saved: resp[i].date_saved,
            time_saved: resp[i].time_saved,
            count_total: resp[i].count_total,
            in_total: resp[i].in_total,
            out_total: resp[i].out_total,
            in_car: resp[i].in_car,
            in_bus: resp[i].in_bus,
            in_med_truck: resp[i].in_med_truck,
            in_large_truck: resp[i].in_large_truck,
            in_jeepney: resp[i].in_jeepney,
            in_bike: resp[i].in_bike,
            in_tryke: resp[i].in_tryke,
            in_others: resp[i].in_others,
            out_car: resp[i].out_car,
            out_bus: resp[i].out_bus,
            out_med_truck: resp[i].out_med_truck,
            out_large_truck: resp[i].out_large_truck,
            out_jeepney: resp[i].out_jeepney,
            out_bike: resp[i].out_bike,
            out_tryke: resp[i].out_tryke,
            out_others: resp[i].out_others,
          });
        }
        table.appendRows(tableData);
        doneCallback();
      }
    );
  };

  tableau.registerConnector(myConnector);
})();

document.querySelector("#getData").addEventListener("click", getData);

function getData() {
  tableau.connectionName = "CCTV CONNECTION";
  tableau.submit();
}