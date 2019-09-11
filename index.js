mapboxgl.accessToken =
  "pk.eyJ1IjoieWFucG9ndXRzYSIsImEiOiJjajBhMzJydzIwZmtmMndvY3ozejFicTdqIn0.T6DCFk1BSoEkdG-2agIoQQ";
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/yanpogutsa/cjzbf944b07bh1dqwjgbdjp8u",
  attributionControl: false,
  center: [37.618, 55.751],
  minZoom: 2,
  zoom: 10,
  bearingSnap: 30,
  doubleClickZoom: false,
  antialias: true,
  maxBounds: [
    [36.540169324143605, 55.020305819627616], // Southwest coordinates
    [38.3135420226066969, 56.1505434064830737] // Northeast coordinates
  ]
});
let dataNull = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [36.73828124999999, 50.680797145321655],
            [38.14453125, 48.86471476180277],
            [38.232421875, 50.90303283111257]
          ]
        ]
      }
    }
  ]
};
// Load an image to use as the pattern
map.loadImage("./data/pattern.png", function(err, image) {
  // Throw an error if something went wrong
  if (err) throw err;

  // Declare the image
  map.addImage("pattern", image);
});
///////////////////////LOAD
map.on("load", function() {
  map.addLayer(
    {
      id: "3d-buildings",
      source: "composite",
      "source-layer": "building",
      filter: ["==", "extrude", "true"],
      type: "fill-extrusion",
      minzoom: 15,
      paint: {
        "fill-extrusion-color": "#cac7d1",

        // use an 'interpolate' expression to add a smooth transition effect to the
        // buildings as the user zooms in
        "fill-extrusion-height": ["get", "height"],
        "fill-extrusion-base": ["get", "min_height"],
        "fill-extrusion-opacity": 0.6
      },
      layout: {
        visibility: "none"
      }
    },
    "housenum-label"
  );

  map.addLayer(
    {
      id: "ДКР",
      type: "line",
      source: {
        type: "vector",
        url: "mapbox://yanpogutsa.0p9ye6kw"
      },
      "source-layer": "l_blag-a9ug8y",
      filter: ["all", ["match", ["get", "Year"], [9999], false, true]],
      layout: {
        visibility: "none",
        "line-cap": "butt",
        "line-join": "round"
      },
      paint: {
        "line-opacity": 0.5,
        "line-color": [
          "case",
          [">=", ["get", "Year"], 2019],
          "#3cbe66",
          "hsl(324, 16%, 34%)"
        ],
        "line-width": ["interpolate", ["linear"], ["zoom"], 11, 2, 22, 30]
      }
    },
    "admin-2-boundary"
  ); // Place polygon under these labels.

  map.addLayer(
    {
      id: "🛠 ППТ",
      type: "fill",
      source: {
        type: "vector",
        url: "mapbox://yanpogutsa.67zh48hu"
      },
      "source-layer": "PPT-WIP-1movuq",
      layout: {
        visibility: "none"
      },
      paint: {
        "fill-color": "hsla(224, 32%, 51%, 0.2)",
        "fill-outline-color": "hsla(224, 32%, 51%, 0.5)"
      }
    },
    "admin-2-boundary"
  ); // Place polygon under these labels.
  map.addLayer(
    {
      id: "ППТ",
      type: "fill",
      source: {
        type: "vector",
        url: "mapbox://yanpogutsa.56ogmwov"
      },
      "source-layer": "PPT-122uv6",
      layout: {
        visibility: "none"
      },
      paint: {
        "fill-color": "hsla(0, 100%, 33%, 0.2)",
        "fill-outline-color": "hsla(0, 100%, 33%, 0.5)"
      }
    },
    "admin-2-boundary"
  ); // Place polygon under these labels.
  ///////////////////////////////////////////////
  map.addLayer(
    {
      id: "🗺",
      source: {
        type: "raster",
        tiles: ["https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"],
        tileSize: 128,
        scheme: "xyz"
      },
      type: "raster",
      layout: { visibility: "none" }
    },
    "moscow-boundary-aghg2c"
  );
  //////////////////ISO
  map.addSource("isoSource", {
    type: "geojson",
    data: dataNull
  });
  map.addLayer(
    {
      id: "iso",
      type: "fill",
      source: "isoSource",
      paint: {
        "fill-pattern": "pattern",
        "fill-opacity": 0.4
      }
    },
    "buildings-13ut9s"
  );
  map.addLayer({
    id: "isoText",
    type: "symbol",
    source: "isoSource",
    paint: {
      "text-color": "#ef4c89",
      "text-halo-color": "hsla(0, 0%, 100%, 0.5)",
      "text-halo-width": 1.5
    },
    layout: {
      "text-field": ["concat", ["get", "population_rs"], " чел."],
      "text-font": ["Ubuntu Mono Regular"],
      "text-size": 8
    }
  });
  map.addLayer({
    id: "isoLine",
    type: "line",
    source: "isoSource",
    paint: {
      "line-color": "#ef4c89",
      "line-opacity": 0.7,
      "line-width": 1,
      "line-dasharray": [2, 1]
    }
  });

  ///////////////////////////////////////ROUTE
  map.addLayer(
    {
      id: "ngpt-highlighted",
      type: "line",
      source: {
        type: "vector",
        url: "mapbox://yanpogutsa.dna92ft5"
      },
      "source-layer": "NGPT-routes-spt-dhbz68",
      filter: ["in", "route", ""],
      layout: {
        "line-join": "round",
        "line-cap": "round"
      },
      paint: {
        "line-color": [
          "interpolate",
          ["linear"],
          ["get", "fid"],
          1,
          "#006ff7",
          743,
          "#484848",
          1486,
          "#ffc33c",
          2229,
          "#ff5575"
        ],
        "line-width": 2,
        "line-dasharray": [2, 1],
        "line-offset": [
          "interpolate",
          ["linear"],
          ["get", "fid"],
          1,
          0,
          2229,
          6
        ]
      },
      minZoom: 10
    },
    "places-5y0blc"
  );

  map.addLayer(
    {
      id: "text-highlighted",
      type: "symbol",
      source: {
        type: "vector",
        url: "mapbox://yanpogutsa.dna92ft5"
      },
      "source-layer": "NGPT-routes-spt-dhbz68",
      filter: ["in", "route", ""],
      layout: {
        "text-field": ["to-string", ["get", "route"]],
        "text-size": 8,
        "symbol-placement": "line",
        "text-offset": [0, 1],
        "text-font": ["Ubuntu Mono Regular"]
      },
      paint: {
        "text-color": [
          "interpolate",
          ["linear"],
          ["get", "fid"],
          1,
          "#006ff7",
          743,
          "#484848",
          1486,
          "#ffc33c",
          2229,
          "#ff5575"
        ]
      },
      minZoom: 10
    },
    "places-5y0blc"
  );

  map.addLayer(
    {
      id: "ngpt-pass-text",
      type: "symbol",
      source: {
        type: "vector",
        url: "mapbox://yanpogutsa.1ltace6u"
      },
      "source-layer": "NGPT-stops-spt-beta-81ib3b",
      layout: {
        visibility: "none",
        "text-field": ["to-string", ["get", "Пассажиропоток по входу за день"]],
        "text-size": 8,
        "symbol-placement": "point",
        "text-offset": [
          "interpolate",
          ["cubic-bezier", 0.3, 1, 1, 1],
          ["get", "Пассажиропоток по входу за день"],
          1,
          ["literal", [0, 2]],
          11832,
          ["literal", [0, 8]]
        ],
        "text-font": ["Ubuntu Mono Regular"],
        "icon-allow-overlap": true,
        "icon-ignore-placement": true
      },
      paint: {
        "text-color": "#006ef5",
        "text-halo-color": "hsla(0, 0%, 100%, 0.5)",
        "text-halo-width": 1.5
      },
      minzoom: 13
    },
    "places-5y0blc"
  );

  map.addLayer(
    {
      id: "ngpt-pass",
      type: "circle",
      source: {
        type: "vector",
        url: "mapbox://yanpogutsa.1ltace6u"
      },
      "source-layer": "NGPT-stops-spt-beta-81ib3b",
      layout: {
        visibility: "none"
      },
      paint: {
        "circle-color": "hsla(213, 100%, 48%, 0.2)",
        "circle-radius": [
          "interpolate",
          ["cubic-bezier", 0.3, 1, 1, 1],
          ["get", "Пассажиропоток по входу за день"],
          0,
          20,
          11832,
          100
        ]
      },
      minzoom: 13
    },
    "places-5y0blc"
  );

  map.addLayer({
    id: "metro-pass",
    type: "circle",
    source: {
      type: "geojson",
      data: "./data/Metro-load-lite.json"
    },
    layout: {
      visibility: "none"
    },
    paint: {
      "circle-color": "hsla(4, 86%, 53%, 0.2)",
      "circle-radius": [
        "interpolate",
        ["cubic-bezier", 0.3, 1, 1, 1],
        ["get", "Average"],
        0,
        15,
        90000,
        80
      ]
    },
    minzoom: 13
  });

  map.addLayer({
    id: "metro-pass-text",
    type: "symbol",
    source: {
      type: "geojson",
      data: "./data/Metro-load-lite.json"
    },
    layout: {
      visibility: "none",
      "text-field": ["to-string", ["get", "Average"]],
      "text-size": 8,
      "symbol-placement": "point",
      "text-offset": [
        "interpolate",
        ["cubic-bezier", 0.3, 1, 1, 1],
        ["get", "Average"],
        1,
        ["literal", [0, 1]],
        90000,
        ["literal", [2, 8]]
      ],
      "text-font": ["Ubuntu Mono Regular"],
      "icon-allow-overlap": true,
      "icon-ignore-placement": true
    },
    paint: {
      "text-color": "hsla(4, 86%, 53%, 1)",
      "text-halo-color": "hsla(0, 0%, 100%, 0.5)",
      "text-halo-width": 1
    },
    minzoom: 13
  });
});

var toggleableLayerIds = ["🛠 ППТ", "ППТ", "ДКР", "🗺"];

for (var i = 0; i < toggleableLayerIds.length; i++) {
  var id = toggleableLayerIds[i];

  var link = document.createElement("a");
  link.href = "#";
  link.className = "active";
  link.textContent = id;

  link.onclick = function(e) {
    var clickedLayer = this.textContent;
    e.preventDefault();
    e.stopPropagation();

    var visibility = map.getLayoutProperty(clickedLayer, "visibility");

    if (visibility === "none") {
      map.setLayoutProperty(clickedLayer, "visibility", "visible");
      this.className = "";
    } else {
      this.className = "active";
      map.setLayoutProperty(clickedLayer, "visibility", "none");
    }
  };

  var layers = document.getElementById("menu");
  layers.appendChild(link);
}

map.on("click", "metro-stations-close", function(e) {
  let data =
    "https://gis01.rumap.ru/4898/serviceAreaStatistics?guid=DDC7AEA3-1BDA-4729-A30D-1CD15F74BEED&type=pedestrianZone&x=" +
    e.lngLat.lng +
    "&y=" +
    e.lngLat.lat +
    "&maxdist=400&geometry=1";
  map.getSource("isoSource").setData(data);
  popup
    .setLngLat(e.lngLat)
    .setHTML(
      "<h3>" +
        e.features[0].properties.NameOfStation +
        " Вход №" +
        e.features[0].properties.ref +
        "</h3>" +
        "<p>" +
        e.features[0].properties.line +
        "</p>"
    )
    .addTo(map);
  map.setLayoutProperty("metro-pass", "visibility", "visible");
  map.setLayoutProperty("metro-pass-text", "visibility", "visible");
});

// Change the cursor to a pointer when the mouse is over the places layer.
map.on("mouseenter", "metro-stations-close", function() {
  map.getCanvas().style.cursor = "pointer";
});

// Change it back to a pointer when it leaves.
map.on("mouseleave", "metro-stations-close", function() {
  map.getCanvas().style.cursor = "";
});

map.on("click", "MCD_stations", function(e) {
  let data =
    "https://gis01.rumap.ru/4898/serviceAreaStatistics?guid=DDC7AEA3-1BDA-4729-A30D-1CD15F74BEED&type=pedestrianZone&x=" +
    e.lngLat.lng +
    "&y=" +
    e.lngLat.lat +
    "&maxdist=400&geometry=1";
  map.getSource("isoSource").setData(data);
  popup
    .setLngLat(e.lngLat)
    .setHTML(
      "<h3>" +
        e.features[0].properties.name +
        "</h3>" +
        "<p>Пасспоток 2018: " +
        e.features[0].properties.Pass2018 +
        "</p>Пасспоток 2020: " +
        e.features[0].properties.Pass2020 +
        "</p>" +
        "</p>Пасспоток 2025: " +
        e.features[0].properties.Pass2025 +
        "</p>"
    )
    .addTo(map);
});
// Change the cursor to a pointer when the mouse is over the places layer.
map.on("mouseenter", "MCD_stations", function() {
  map.getCanvas().style.cursor = "pointer";
});

// Change it back to a pointer when it leaves.
map.on("mouseleave", "MCD_stations", function() {
  map.getCanvas().style.cursor = "";
});

var popup = new mapboxgl.Popup();

map.on("click", "places-5y0blc", function(e) {
  popup
    .setLngLat(e.lngLat)
    .setHTML(
      "<h3>" +
        e.features[0].properties.Name +
        "</h3>" +
        "<p>Маршруты: " +
        e.features[0].properties.route +
        "</p>"
    )
    .addTo(map);

  /////////////////ISO
  let data =
    "https://gis01.rumap.ru/4898/serviceAreaStatistics?guid=DDC7AEA3-1BDA-4729-A30D-1CD15F74BEED&type=pedestrianZone&x=" +
    e.lngLat.lng +
    "&y=" +
    e.lngLat.lat +
    "&maxdist=400&geometry=1";
  map.getSource("isoSource").setData(data);

  /////////////////////////ROUTES
  let features = map.queryRenderedFeatures(e.point, {
    layers: ["places-5y0blc"]
  });
  let filter = features.reduce(
    function(memo, feature) {
      memo.push(feature.properties.route);
      return memo;
    },
    ["in", "route"]
  );

  let routeFix = filter
    .join("'")
    .replace(/, /g, "'")
    .split("'");

  let filter2 = features.reduce(
    function(memo, feature) {
      memo.push(feature.properties.fid);
      return memo;
    },
    ["in", "fid"]
  );

  map.setFilter("ngpt-highlighted", routeFix);
  map.setFilter("text-highlighted", routeFix);
  map.setPaintProperty("metro-lines", "line-color", "#444");
  map.setPaintProperty("metro-lines-constructing", "line-color", "#444");
  map.setPaintProperty("MCC", "line-color", "#444");
  map.setPaintProperty("MCD-lines", "line-color", "#444");
  map.setLayoutProperty("ngpt-pass", "visibility", "visible");
  map.setLayoutProperty("ngpt-pass-text", "visibility", "visible");
});
// Change the cursor to a pointer when the mouse is over the places layer.
map.on("mouseenter", "places-5y0blc", function() {
  map.getCanvas().style.cursor = "pointer";
});
// Change it back to a pointer when it leaves.
map.on("mouseleave", "places-5y0blc", function() {
  map.getCanvas().style.cursor = "";
});

//map.on('click', 'ngpt-highlighted', function(e) {
// set bbox as 5px reactangle area around clicked point
popup.on("close", function(e) {
  map.setFilter("ngpt-highlighted", ["in", "route", ""]);
  map.setFilter("text-highlighted", ["in", "route", ""]);
  map.setPaintProperty("metro-lines", "line-color", ["get", "colour"]);
  map.setPaintProperty("metro-lines-constructing", "line-color", [
    "get",
    "colour"
  ]);
  map.setPaintProperty("MCC", "line-color", "#ef1f26");
  map.setPaintProperty("MCD-lines", "line-color", [
    "interpolate",
    ["linear"],
    ["get", "MCD"],
    1,
    "hsl(37, 97%, 55%)",
    2,
    "hsl(338, 84%, 62%)",
    3,
    "hsl(19, 88%, 54%)",
    4,
    "hsl(158, 53%, 48%)",
    5,
    "hsl(98, 49%, 51%)"
  ]);
  map.setLayoutProperty("ngpt-pass", "visibility", "none");
  map.setLayoutProperty("ngpt-pass-text", "visibility", "none");
  map.setLayoutProperty("metro-pass", "visibility", "none");
  map.setLayoutProperty("metro-pass-text", "visibility", "none");
  map.setPaintProperty("🛠 ППТ", "fill-color", "hsla(224, 32%, 51%, 0.2)");
  map.setPaintProperty("ППТ", "fill-color", "hsla(0, 100%, 33%, 0.2)");
  map.setFilter("🛠 ППТ", undefined); //["in", "REG_NUM", ""]);
  map.setFilter("ППТ", undefined); //["in", "REG_NUM", ""]);
  map.getSource("isoSource").setData(dataNull);
});
///////////////////////////
map.on("click", "🛠 ППТ", function(e) {
  popup
    .setLngLat(e.lngLat)
    .setHTML(
      "<h3>" +
        e.features[0].properties.NAME +
        "</h3>" +
        "<p>Вид ППТ: " +
        e.features[0].properties.VID_PPT +
        "</p>" +
        "<p>Дата начала разработки: " +
        e.features[0].properties.DATA_DOC_RAZR +
        "</p>" +
        "<p>Исполнитель: " +
        e.features[0].properties.ISPOLNITEL +
        "</p>"
    )
    .addTo(map);
  var feature = e.features[0];
  map.setFilter("🛠 ППТ", ["in", "REG_NUM", feature.properties.REG_NUM]);
  map.setPaintProperty("🛠 ППТ", "fill-color", "hsla(224, 32%, 51%, 0.7)");
});
// Change the cursor to a pointer when the mouse is over the places layer.
map.on("mouseenter", "🛠 ППТ", function() {
  map.getCanvas().style.cursor = "pointer";
});
// Change it back to a pointer when it leaves.
map.on("mouseleave", "🛠 ППТ", function() {
  map.getCanvas().style.cursor = "";
});
map.on("click", "ППТ", function(e) {
  popup
    .setLngLat(e.lngLat)
    .setHTML(
      "<h3>" +
        e.features[0].properties.NAME +
        "</h3>" +
        "<p>Вид ППТ: " +
        e.features[0].properties.VID_PPT +
        "</p>" +
        "<p>Дата утверждения: " +
        e.features[0].properties.DATA_DOC_UTV +
        "</p>" +
        "<p>Исполнитель: " +
        e.features[0].properties.ISPOLNITEL +
        "</p>"
    )
    .addTo(map);
  var feature = e.features[0];
  map.setFilter("ППТ", ["in", "REG_NUM", feature.properties.REG_NUM]);
  map.setPaintProperty("ППТ", "fill-color", "hsla(0, 100%, 33%, 0.7)");
});
// Change the cursor to a pointer when the mouse is over the places layer.
map.on("mouseenter", "ППТ", function() {
  map.getCanvas().style.cursor = "pointer";
});
// Change it back to a pointer when it leaves.
map.on("mouseleave", "ППТ", function() {
  map.getCanvas().style.cursor = "";
});

map.on("click", "ДКР", function(e) {
  popup
    .setLngLat(e.lngLat)
    .setHTML(
      "<h3>" +
        e.features[0].properties.Year +
        " | " +
        e.features[0].properties.Name +
        "</h3>"
    )
    .addTo(map);
});

map.on("click", "bridges-1aqn6e", function(e) {
  popup
    .setLngLat(e.lngLat)
    .setHTML("<h3>" + e.features[0].properties.status + "</h3>")
    .addTo(map);
});

// Change the cursor to a pointer when the mouse is over the places layer.
map.on("mouseenter", "ДКР", function() {
  map.getCanvas().style.cursor = "pointer";
});
// Change it back to a pointer when it leaves.
map.on("mouseleave", "ДКР", function() {
  map.getCanvas().style.cursor = "";
});

var geocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  mapboxgl: mapboxgl,
  placeholder: "Поиск",

  bbox: [
    36.540169324143605,
    55.020305819627616,
    38.3135420226066969,
    56.1505434064830737
  ]
});

document.getElementById("geocoder").appendChild(geocoder.onAdd(map));

map.on("dblclick", function windowOpen(e) {
  var url1 =
    "https://www.google.com/maps/@?api=1&map_action=pano&pano=tu510ie_z4ptBZYo2BGEJg&viewpoint=" +
    e.lngLat.lat +
    "," +
    e.lngLat.lng +
    "&heading=0&pitch=10&fov=250";
  Window = window.open(url1, "_blank");
});

map.on("mousemove", function(e) {
  if (map.getPitch() > 0)
    map.setLayoutProperty("3d-buildings", "visibility", "visible"),
      map.setLayoutProperty("buildings-13ut9s", "visibility", "none");
  else
    map.setLayoutProperty("3d-buildings", "visibility", "none"),
      map.setLayoutProperty("buildings-13ut9s", "visibility", "visible");
});

map.on("touchstart", function(data) {
  if (data.points.length === 2) {
    var diff = Math.abs(data.points[0].y - data.points[1].y);
    if (diff <= 50) {
      data.originalEvent.preventDefault(); //prevent browser refresh on pull down
      self.map.touchZoomRotate.disable(); //disable native touch controls
      self.map.dragPan.disable();
      self.dpPoint = data.point;
      self.dpPitch = self.map.getPitch();
    }
  }
});

map.on("touchmove", function(e) {
  if (map.getPitch() > 0)
    map.setLayoutProperty("3d-buildings", "visibility", "visible"),
      map.setLayoutProperty("buildings-13ut9s", "visibility", "none");
  else
    map.setLayoutProperty("3d-buildings", "visibility", "none"),
      map.setLayoutProperty("buildings-13ut9s", "visibility", "visible");
});

map.on("touchmove", function(data) {
  if (self.dpPoint) {
    data.preventDefault();
    data.originalEvent.preventDefault();
    var diff = (self.dpPoint.y - data.point.y) * 0.5;
    self.map.setPitch(self.dpPitch + diff);
  }
});

map.on("touchend", function(data) {
  if (self.dpPoint) {
    self.map.touchZoomRotate.enable();
    self.map.dragPan.enable();
  }
  self.dpPoint = null;
});

map.on("touchcancel", function(data) {
  if (self.dpPoint) {
    self.map.touchZoomRotate.enable();
    self.map.dragPan.enable();
  }
  self.dpPoint = null;
});
