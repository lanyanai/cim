/**
 * Created by zd on 2014/8/20.
 */
$(function()
{
  $("#calendar").fullCalendar();
  //血压
  //低压数据
  var d21 = [
    [new Date(2014, 6, 6).getTime(), 56.2],
    [new Date(2014, 6, 8).getTime(), 57.7],
    [new Date(2014, 6, 10).getTime(), 60.9],
    [new Date(2014, 6, 12).getTime(), 58.0],
    [new Date(2014, 6, 14).getTime(), 58.5],
    [new Date(2014, 6, 16).getTime(), 57.0],
    [new Date(2014, 6, 18).getTime(), 61.2],
    [new Date(2014, 6, 20).getTime(), 62.2],
    [new Date(2014, 6, 21).getTime(), 60.4],
    [new Date(2014, 6, 22).getTime(), 59.8]
  ];
  //高压数据
  var d22 = [
    [new Date(2014, 6, 6).getTime(), 99.2],
    [new Date(2014, 6, 8).getTime(), 100.7],
    [new Date(2014, 6, 10).getTime(), 98.9],
    [new Date(2014, 6, 12).getTime(), 97.0],
    [new Date(2014, 6, 14).getTime(), 99.5],
    [new Date(2014, 6, 16).getTime(), 101.0],
    [new Date(2014, 6, 18).getTime(), 102.2],
    [new Date(2014, 6, 20).getTime(), 100.2],
    [new Date(2014, 6, 21).getTime(), 96.4],
    [new Date(2014, 6, 22).getTime(), 95.8]
  ];
  function generateBlood(axes) {

    var markings = [],
        min = axes.yaxis.min,
        max = axes.yaxis.max;

    var step = 4;

    for(var i = min; i < max; i += step)
    {
      if(i%20 != 0)
      {
        markings.push({yaxis: {from: i, to: i}, color:"#eef4f8"});
      }
    }

    return markings;
  }

  $.plot("#member1BloodGraph", [{
    data: d21,
    points: { show: true, fill: true, fillColor:"#37b0e9", lineWidth:0, radius:5, shadowSize:0},
    lines:{show:true, lineWidth:2},
    label:"低压",
    shadowSize:0,
    color:"#37b0e9"
  },{
    data: d22,
    points: { show: true, fill: true, fillColor:"#f57574", lineWidth:0, radius:5, shadowSize:0},
    lines:{show:true, lineWidth:2},
    label:"高压",
    shadowSize:0,
    color:"#f57574"
  }],{
    legend:{
      show:false
    },
    xaxis:{
      min:new Date(2014, 6, 5).getTime(),
      max:new Date(2014, 6, 23).getTime(),
      mode:"time",
      tickSize: [7, "day"],
      tickLength: 5,
      timeformat: "%m-%d"
    },
    yaxis:{
      min:40,
      max:120,
      tickSize:20
    },
    grid:{
      borderWidth: 0,
      hoverable: true,
      clickable: true,
      tickColor: "#a6adb5",
      markings: generateBlood
    }
  });

  $("<div id='tooltipBlood'></div>").css({
    position: "absolute",
    display: "none",
    padding: "2px",
    opacity: 0.80,
    color:"#fff"
  }).appendTo("body");

  $("#member1BloodGraph").on("plothover", function (event, pos, item) {
    if (item) {
      var y = item.datapoint[1].toFixed(1);

      if(item.seriesIndex == 0){
        $("#tooltipBlood").html("低压" + y + "mmHg").css({top: item.pageY+5, left: item.pageX+5, "background-color": $.color.parse(item.series.points.fillColor).scale('rgb', 0.5).toString()}).fadeIn(200);
      }
      else if(item.seriesIndex == 1){
        $("#tooltipBlood").html("高压" + y + "mmHg").css({top: item.pageY+5, left: item.pageX-100, "background-color": $.color.parse(item.series.points.fillColor).scale('rgb', 0.5).toString()}).fadeIn(200);
      }

    } else {
      $("#tooltipBlood").hide();
    }
  });

  //sport pie data
  var perData = [
    { label: "Series1",  data: 75, color:"#283e56"},
    { label: "Series2",  data: 25, color:"#eef4f8"}
  ];
  $.plot("#member1SportPie", perData, {
    legend:{
      show:false
    },
    series:{
      pie:{
        innerRadius:0.8,
        startAngle:0.5,
        show:true,
        label:{
          show:false
        }
      }
    },
    grid: {
      hoverable: true,
      clickable: true
    }
  });

  //sport data show
  //运动分析
  var d41 = [];

  for (var i = 0; i <= 10; i += 1) {
    d41.push([i, parseInt(Math.random() * 30)]);
  }

  var d42 = [];
  for (var i = 0; i <= 10; i += 1) {
    d42.push([i, parseInt(Math.random() * 30)]);
  }

  var d43 = [];
  for (var i = 0; i <= 10; i += 1) {
    d43.push([i, parseInt(Math.random() * 30)]);
  }

  var d4 = [];
  d4[0] = [0, 0];
  for (var i = 0.1; i <= 10; i += 0.1) {
    d4.push([i, parseInt(Math.random()*5) + d4[parseInt(i*10) - 1][1]]);
  }

  $.plot("#member1SportGraph", [{
    data:d4,
    label:"累计运动量",
    lines:{
      lineWidth:0,
      fill:true,
      fillColor:"#eef4f8",
      show:true
    },
    hoverable:false
  },{
    data:d41,
    label:"轻微运动",
    bars:{
      show:true,
      barWidth:0.8,
      lineWidth:0,
      align:"center",
      fill:true,
      fillColor:"#28c44d"
    },
    stack:"sports"
  },{
    data:d42,
    label:"中等运动",
    bars:{
      show:true,
      barWidth:0.8,
      lineWidth:0,
      align:"center",
      fill:true,
      fillColor:"#ffcc00"
    },
    stack:"sports"
  },{
    data:d43,
    label:"剧烈运动",
    bars:{
      show:true,
      barWidth:0.8,
      lineWidth:0,
      align:"center",
      fill:true,
      fillColor:"#f57574"
    },
    stack:"sports"
  }],{
    legend:{
      show:false
    },
    xaxis:{
      tickLength: 5,
      position:"top"
    },
    yaxis:{
      max:300,
      min:0,
      tickSize:300,
      tickFormatter:function(){
        return "";
      }

    },
    grid:{
      tickColor: "#a6adb5",
      borderWidth:0,
      hoverable: true,
      clickable: true
    }
  });

  //体温
  //体温数据
  var d1 = [
    [new Date(2014, 6, 6).getTime(), 37.2],
    [new Date(2014, 6, 8).getTime(), 36.7],
    [new Date(2014, 6, 10).getTime(), 36.9],
    [new Date(2014, 6, 12).getTime(), 37.0],
    [new Date(2014, 6, 14).getTime(), 37.5],
    [new Date(2014, 6, 16).getTime(), 38.0],
    [new Date(2014, 6, 18).getTime(), 37.2],
    [new Date(2014, 6, 20).getTime(), 36.2],
    [new Date(2014, 6, 21).getTime(), 37.4],
    [new Date(2014, 6, 22).getTime(), 37.8]
  ];

  $.plot("#member1TemGraph", [{
    data: d1,
    points: { show: true, fill: true, fillColor:"#37b0e9", lineWidth:0, radius:5, shadowSize:0},
    label:"体温",
    shadowSize:0,
    color:"#37b0e9"
  }], {
    legend:{
      show:false
    },
    xaxis:{
      mode:"time",
      tickSize: [7, "day"],
      tickLength: 5,
      timeformat: "%m-%d"
    },
    yaxis:{
      min:32,
      max:42,
      tickSize:2,
      tickFormatter: function(val, axis){
        return val + "℃"
      }
    },
    grid:{
      borderWidth: 0,
      markings:[
        {yaxis: { from: 36, to: 38 }, color: "#f9fbfc"}
      ],
      hoverable: true,
      clickable: true,
      tickColor: "#a6adb5"
    }
  });

  $("<div id='tooltipTem'></div>").css({
    position: "absolute",
    display: "none",
    padding: "2px",
    "background-color": "#283e56",
    opacity: 0.80,
    color:"#fff"
  }).appendTo("body");

  $("#member1TemGraph").bind("plothover", function (event, pos, item) {
    if (item) {
      var y = item.datapoint[1].toFixed(1);

      $("#tooltipTem").html(y + "℃")
          .css({top: item.pageY+5, left: item.pageX+5})
          .fadeIn(200);
    } else {
      $("#tooltipTem").hide();
    }
  });

  //心率
  var d3 = [
    [new Date(2014, 6, 6, 7, 0, 0).getTime(), 56.2],
    [new Date(2014, 6, 6, 9, 0, 0).getTime(), 57.7],
    [new Date(2014, 6, 6, 11, 0, 0).getTime(), 60.9],
    [new Date(2014, 6, 6, 13, 0, 0).getTime(), 58.0],
    [new Date(2014, 6, 6, 15, 0, 0).getTime(), 58.5],
    [new Date(2014, 6, 6, 17, 0, 0).getTime(), 67.0],
    [new Date(2014, 6, 6, 19, 0, 0).getTime(), 61.2],
    [new Date(2014, 6, 6, 21, 0, 0).getTime(), 62.2],
    [new Date(2014, 6, 6, 23, 0, 0).getTime(), 60.4],
    [new Date(2014, 6, 7, 1, 0, 0).getTime(), 59.8],
    [new Date(2014, 6, 7, 3, 0, 0).getTime(), 63.2]
  ];
  function generateHeart(axes){
    var markings = [],
        min = axes.yaxis.min,
        max = axes.yaxis.max;

    var step = 0.5;

    for(var i = min; i < max; i += step)
    {
      if(i%2.5 != 0)
      {
        markings.push({yaxis: {from: i, to: i}, color:"#eef4f8"});
      }
    }

    return markings;
  }
  $.plot("#member1HeartGraph", [{
    data: d3,
    points: { show: true, fill: true, fillColor:"#37b0e9", lineWidth:0, radius:5, shadowSize:0},
    label:"心率",
    shadowSize:0,
    color:"#37b0e9"
  }], {
    legend:{
      show:false
    },
    xaxis:{
      mode:"time",
      min:new Date(2014, 6, 6, 0, 0, 0).getTime(),
      max:new Date(2014, 6, 8, 0, 0, 0).getTime(),
      tickLength: 5,
      ticks:function(axis){
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var ticks = [];
        var step = 3600*1000;
        for(var i = axis.min; i <= axis.max; i += step){
          var date = new Date(i);
          if(date.getHours() === 0){
            ticks.push([i, date.getDate() + "." + monthNames[date.getMonth()]]);
          }
          else if(date.getHours()%12 === 0){
            ticks.push([i, date.getHours() + ":00"]);
          }
        }
        return ticks;
      }
    },
    yaxis:{
      min:57.5,
      max:70,
      tickSize:2.5,
      tickFormatter:function(val, axis){
        return val.toFixed(1);
      }
    },
    grid:{
      tickColor: "#a6adb5",
      borderWidth: 0,
      markings:generateHeart,
      hoverable: true,
      clickable: true
    }
  });

  $("<div id='tooltipHeart'></div>").css({
    position: "absolute",
    display: "none",
    padding: "2px",
    "background-color": "#283e56",
    opacity: 0.80,
    color:"#fff"
  }).appendTo("body");

  $("#member1HeartGraph").bind("plothover", function (event, pos, item) {
    if (item) {
      var y = item.datapoint[1].toFixed(1);

      $("#tooltipHeart").html(y + "bpm")
          .css({top: item.pageY+5, left: item.pageX+5})
          .fadeIn(200);
    } else {
      $("#tooltipHeart").hide();
    }
  });

  //sleep pie data
  var perData2 = [
    { label: "Series1",  data: 83, color:"#283e56"},
    { label: "Series2",  data: 17, color:"#eef4f8"}
  ];
  $.plot("#member1SleepPie", perData2, {
    legend:{
      show:false
    },
    series:{
      pie:{
        innerRadius:0.8,
        startAngle:0.5,
        show:true,
        label:{
          show:false
        }
      }
    },
    grid: {
      hoverable: true,
      clickable: true
    }
  });

  //睡眠分析
  var d5 = [];

  $.plot("#member1SleepGraph", [{
    data:d5,
    label:"睡眠分析",
    points:{
      show:false
    },
    hoverable:false
  }],{
    legend:{
      show:false
    },
    xaxis:{
      tickLength: 5,
      position:"top",
      min:0,
      max:20,
      tickSize:4
    },
    yaxis:{
      max:400,
      min:0,
      tickSize:400,
      tickFormatter:function(){
        return "";
      }
    },
    grid:{
      tickColor: "#a6adb5",
      borderWidth:0,
      markings:[
        {yaxis: {from: 0, to: 300}, xaxis: {from: 0, to: 2}, color:"#86e6fa"},
        {yaxis: {from: 0, to: 100}, xaxis: {from: 2, to: 8}, color:"#0a62a0"},
        {yaxis: {from: 0, to: 200}, xaxis: {from: 8, to: 9}, color:"#37b0e9"},
        {yaxis: {from: 0, to: 300}, xaxis: {from: 9, to: 12}, color:"#86e6fa"},
        {yaxis: {from: 0, to: 200}, xaxis: {from: 12, to: 16}, color:"#37b0e9"},
        {yaxis: {from: 0, to: 100}, xaxis: {from: 16, to: 20}, color:"#0a62a0"}
      ],
      hoverable: true,
      clickable: true
    }
  });
});