// 左上角柱状图
(function () {
  // 1. 实例化对象
  let myChart = echarts.init(document.querySelector(".bar .chart"));
  // 2. 指定配置项和数据
  let option = {
    color: ["#2f89cf"], // 柱子的颜色（第一组series数据的颜色）
    // 提示框，当触发时提示数据的x轴与y轴信息，只要是有tooltip就有效果（可以省略trigger）
    tooltip: {
      trigger: "axis",
      // 增加触发时的特效，除了给出x轴与y轴的信息外，axisPointer选项让触发时增加背景效果（但axisPointer应该与trigger: "axis"是配套的）
      axisPointer: {
        type: "shadow", // 鼠标悬浮的柱子后面出现阴影，默认为直线，可选为：'line' | 'shadow'
      },
    },
    // grid配置图表的大小
    /**
     * left、top、right、bottom就是指图表距离dom容器边界的距离
     * containLabel是指计算left、top等距离时是否包含坐标轴上的标签，类似于box-sizing属性的意思
     * 这里具体来说就是，left: "0%" 即算上y轴上的标签，距离容器左侧百分之零，也就是y轴上的标签会被展示出来，不会被挤掉
     */
    grid: {
      left: "0%",
      top: "10px",
      right: "0%",
      bottom: "4%",
      containLabel: true,
    },

    // x轴相关配置
    xAxis: [
      {
        // 设置x轴为目录轴（非数据轴）
        type: "category",
        data: [
          "旅游行业",
          "教育培训",
          "游戏行业",
          "医疗行业",
          "电商行业",
          "社交行业",
          "金融行业",
        ],
        /**
         * 坐标轴相关配置项辨析
         *  1、axisTick: 坐标轴上的刻度 —— 坐标轴上的点（线头）（tick: 刻度）
         *  2、axisLabel: 刻度标签 —— 对应data配置项里的数据
         *  3、axisLine: 坐标轴线 —— 坐标轴本身那条线
         */
        axisTick: {
          alignWithLabel: true, // 保证坐标轴上的刻度线与标签对齐（boundaryGap: true时生效）
        },
        // 坐标轴上标签的相关样式
        axisLabel: {
          color: "rgba(255,255,255,.6) ",
          fontSize: "12",
        },
        // x坐标轴的样式
        axisLine: {
          show: false,
        },
        boundaryGap: true, // x坐标轴上第一列数据是否与y轴有间隙
      },
    ],
    yAxis: [
      {
        type: "value",
        // 坐标轴上标签的相关样式
        axisLabel: {
          color: "rgba(255,255,255,.6) ",
          fontSize: 12,
        },
        // y轴坐标轴的样式
        axisLine: {
          lineStyle: {
            color: "rgba(255,255,255,0.1)",
            width: 2,
          },
        },
        // y轴分割线（垂直于y轴的切割线）的样式
        splitLine: {
          lineStyle: {
            color: "rgba(255,255,255,0.1)",
          },
        },
      },
    ],
    series: [
      {
        name: "直接访问", // 这组数据的值（y轴的取值）是什么含义，也就是说y轴（value轴）数值的单位
        type: "bar", // 这组数据为bar形状（长条/柱形）展示
        barWidth: "35%", // bar的宽度
        data: [200, 300, 300, 900, 1500, 1200, 600], // data数组里的每一项都代表一个数据项
        // 每个数据项都是一个item，itemStyle用来调整其样式
        itemStyle: {
          // 修改柱子圆角
          barBorderRadius: 5,
        },
      },
    ],
  };
  // 3. 把配置项给实例对象
  myChart.setOption(option);
  // 4. 让图表跟随屏幕自动的去适应：屏幕大小变化调用myChart.resize()方法让图标重绘
  window.addEventListener("resize", function () {
    myChart.resize();
  });
})();

// 右上角横向柱状图
/**
 *  实现思路：
 *  1. yAxis数组里两个对象对应两个y轴，第一个为左侧y轴，第二个就是右侧的y轴；xAxis设置show: false，即不需要x轴
 *  2. series数组里两个对象对应两套数据信息，第一套对应里面的实心条；第二套对应外面的边框
 *  3. series对象设置yAxisIndex属性控制两套数据的覆盖性，有点类似于z-index
 *      1）: 两套数据的yAxisIndex相同，或者不设置，那么每个标签出现并列的两个柱子
 *      2）: 其中一个series对象的yAxisIndex大，那么就会压住另一个
 *     所以我们设置边框series的yAxisIndex大，并且itemStyle.color设置为"none"，即透明，这样就能看到下面的实心条
 *  4. 让实心条上显示一些数据信息，即设置实心条series对象的label
 */
(function () {
  // 一个series对象中，其itemStyle的color属性为函数，可遍历series的data数组，函数接收到一个params对象，通过myColor[params.dataIndex]来使用我们的myColor颜色数据
  let myColor = ["#1089E7", "#F57474", "#56D0E3", "#F8B448", "#8B78F6"];
  // 1. 实例化对象
  let myChart = echarts.init(document.querySelector(".bar2 .chart"));
  // 2. 指定配置和数据
  let option = {
    grid: {
      top: "10%",
      left: "22%",
      bottom: "10%",
    },
    // 不显示x轴的相关信息
    xAxis: {
      show: false,
    },
    yAxis: [
      {
        type: "category",
        inverse: true,
        data: ["HTML5", "CSS3", "javascript", "VUE", "NODE"],
        // 不显示y轴的线
        axisLine: {
          show: false,
        },
        // 不显示刻度
        axisTick: {
          show: false,
        },
        // 把刻度标签里面的文字颜色设置为白色
        axisLabel: {
          color: "#fff",
        },
      },
      {
        data: [702, 350, 610, 793, 664],
        inverse: true,
        // 不显示y轴的线
        axisLine: {
          show: false,
        },
        // 不显示刻度
        axisTick: {
          show: false,
        },
        // 把刻度标签里面的文字颜色设置为白色
        axisLabel: {
          color: "#fff",
        },
      },
    ],
    series: [
      {
        name: "条",
        type: "bar",
        data: [70, 34, 60, 78, 69],
        yAxisIndex: 0,
        // 修改第一组柱子的圆角
        itemStyle: {
          barBorderRadius: 20,
          // 此时的color 可以修改柱子的颜色
          color: function (params) {
            // params 传进来的是柱子对象
            // console.log(params);
            // dataIndex 是当前柱子的索引号
            return myColor[params.dataIndex];
          },
        },
        // 柱子之间的距离
        barCategoryGap: 50,
        //柱子的宽度
        barWidth: 10,
        // 显示柱子内的文字
        label: {
          show: true,
          position: "inside",
          // {c} 会自动的解析为 数据  data里面的数据
          formatter: "{c}%",
        },
      },
      {
        name: "框",
        type: "bar",
        barCategoryGap: 50,
        barWidth: 15,
        yAxisIndex: 1,
        data: [100, 100, 100, 100, 100],
        itemStyle: {
          color: "none",
          borderColor: "#00c1de",
          borderWidth: 3,
          barBorderRadius: 15,
        },
      },
    ],
  };

  myChart.setOption(option);

  window.addEventListener("resize", function () {
    myChart.resize();
  });
})();

// 折线图1模块制作
(function () {
  // 折线图所依赖的数据
  const yearData = [
    {
      year: "2020", // 年份
      data: [
        // 两个数组是因为有两条线
        [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
        [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79],
      ],
    },
    {
      year: "2021", // 年份
      data: [
        // 两个数组是因为有两条线
        [123, 175, 112, 197, 121, 67, 98, 21, 43, 64, 76, 38],
        [143, 131, 165, 123, 178, 21, 82, 64, 43, 60, 19, 34],
      ],
    },
  ];

  // 1. 实例化对象
  const myChart = echarts.init(document.querySelector(".line .chart"));
  // 2.指定配置
  const option = {
    // 对应series中两个对象，即两条线的颜色
    color: ["#00f2f1", "#ed3f35"],
    tooltip: {
      trigger: "axis",
    },

    // 图例组件相关配置
    legend: {
      // 如果series 对象有 name 值，即series自动分类了，所以这里可以省略data属性
      // 修改图例组件 文字颜色
      textStyle: {
        color: "#4c9bfd",
      },
      // 对图例组件进行定位
      right: "10%",
    },

    grid: {
      top: "20%",
      left: "3%",
      right: "4%",
      bottom: "3%",

      // 网格边框相关配置
      show: true, // 显示边框
      borderColor: "#012f4a", // 边框颜色

      containLabel: true, // 计算大小时包含标签文字在内
    },

    xAxis: {
      type: "category",
      boundaryGap: false,
      data: [
        "1月",
        "2月",
        "3月",
        "4月",
        "5月",
        "6月",
        "7月",
        "8月",
        "9月",
        "10月",
        "11月",
        "12月",
      ],
      axisTick: {
        show: false, // 去除刻度线
      },
      axisLabel: {
        // show: false, // 不显示坐标轴上的文字标签
        color: "#4c9bfd", // 文本颜色
      },
      axisLine: {
        show: false, // 去除轴线
      },
    },
    yAxis: {
      type: "value",
      axisTick: {
        show: false, // 去除刻度线
      },
      axisLabel: {
        color: "#4c9bfd", // 文本颜色
      },
      axisLine: {
        show: false, // 去除轴线
      },
      // 设置y轴分割线
      splitLine: {
        lineStyle: {
          color: "#012f4a", // 分割线颜色
        },
      },
    },
    series: [
      {
        name: "新增粉丝",
        // line类型的series对象，即在图标上以线条的形式呈现
        type: "line",
        // true 可以让我们的折线显示带有弧度
        smooth: true,
        data: yearData[0].data[0],
      },
      {
        name: "新增游客",
        type: "line",
        smooth: true,
        data: yearData[0].data[1],
      },
    ],
  };

  // 3. 把配置给实例对象
  myChart.setOption(option);
  // 4. 让图表跟随屏幕自动的去适应
  window.addEventListener("resize", function () {
    myChart.resize();
  });

  // 5. 点击 2020/2021 切换echarts数据

  const aTags = document.querySelectorAll(".line a");
  aTags.forEach((aTag, index) => {
    aTag.addEventListener("click", () => {
      option.series.forEach((seriesItem, seriesIndex) => {
        seriesItem.data = yearData[index].data[seriesIndex];
      });
      myChart.setOption(option); // 调用setOption方法重新渲染
    });
  });
})();

// 右侧折线图模块
/**
 *  新的学习点：
 *  1. 关于顶层配置项color、series.itemStyle.color、series.lineStyle.color
 *      如果只存在顶层color，series中其它任何可以设置color的配置都没有指定具体的color，那么series.itemStyle和series.lineStyle等可指定具体color的地方都使用顶层color
 *      如果存在顶层color，series.itemStyle设置了color，但是series.lineStyle没有设置color，那么series.lineStyle使用series.itemStyle的color
 *  2. 新学习配置项
 *      1）: series.areaStyle：线条与x轴之间区域的相关配置
 *      2）: series.symbol...：拐点相关设置
 */
(function () {
  const myChart = echarts.init(document.querySelector(".line2 .chart"));
  const option = {
    tooltip: {
      trigger: "axis",
    },
    color: ["red", "black"],
    legend: {
      top: "0%",
      data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"],
      textStyle: {
        color: "rgba(255,255,255,.5)",
        fontSize: "12",
      },
    },

    grid: {
      left: "10",
      top: "30",
      right: "10",
      bottom: "10",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: [
          "01",
          "02",
          "03",
          "04",
          "05",
          "06",
          "07",
          "08",
          "09",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
          "24",
          "25",
          "26",
          "26",
          "28",
          "29",
          "30",
        ],
        axisLabel: {
          textStyle: {
            color: "rgba(255,255,255,.6)",
            fontSize: 12,
          },
        },
        axisLine: {
          lineStyle: {
            color: "rgba(255,255,255,.2)",
          },
        },
      },
    ],
    yAxis: [
      {
        type: "value",
        axisTick: { show: false },
        axisLine: {
          lineStyle: {
            color: "rgba(255,255,255,.1)",
          },
        },
        axisLabel: {
          textStyle: {
            color: "rgba(255,255,255,.6)",
            fontSize: 12,
          },
        },
        splitLine: {
          lineStyle: {
            color: "rgba(255,255,255,.1)",
          },
        },
      },
    ],
    series: [
      {
        name: "邮件营销",
        type: "line",
        smooth: true,
        // 单独修改当前线条的样式
        lineStyle: {
          color: "#0184d5",
          width: "2",
        },
        // 填充颜色设置
        areaStyle: {
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: "rgba(1, 132, 213, 0.4)", // 渐变色的起始颜色
              },
              {
                offset: 0.8,
                color: "rgba(1, 132, 213, 0.1)", // 渐变线的结束颜色
              },
            ],
            false
          ),
          shadowColor: "rgba(0, 0, 0, 0.1)",
        },

        /**
         * 拐点相关配置
         */
        // 设置拐点
        symbol: "circle",
        // 拐点大小
        symbolSize: 8,
        // 默认不显示拐点，鼠标经过时显示
        showSymbol: false,
        // 设置拐点颜色以及边框
        itemStyle: {
          color: "#0184d5",
          borderColor: "rgba(221, 220, 107, .1)",
          borderWidth: 12,
        },
        data: [
          30, 40, 30, 40, 30, 40, 30, 60, 20, 40, 30, 40, 30, 40, 30, 40, 30,
          60, 20, 40, 30, 40, 30, 40, 30, 40, 20, 60, 50, 40,
        ],
      },
      {
        name: "联盟广告",
        type: "line",
        smooth: true,
        lineStyle: {
          normal: {
            color: "#00d887",
            width: 2,
          },
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: "rgba(0, 216, 135, 0.4)",
                },
                {
                  offset: 0.8,
                  color: "rgba(0, 216, 135, 0.1)",
                },
              ],
              false
            ),
            shadowColor: "rgba(0, 0, 0, 0.1)",
          },
        },
        symbol: "circle",
        symbolSize: 5,
        itemStyle: {
          color: "#00d887",
          borderColor: "rgba(221, 220, 107, .1)",
          borderWidth: 12,
        },
        // 开始不显示拐点， 鼠标经过显示
        showSymbol: false,
        data: [
          130, 10, 20, 40, 30, 40, 80, 60, 20, 40, 90, 40, 20, 140, 30, 40, 130,
          20, 20, 40, 80, 70, 30, 40, 30, 120, 20, 99, 50, 20,
        ],
      },
    ],
  };
  myChart.setOption(option);
  window.addEventListener("resize", function () {
    myChart.resize();
  });
})();

// 饼形图
/**
 *  1. 对于饼图来说，series数组里一般只有一个series对象，这个series.data数组里的对象格式为：
 *      {
 *          value: xxx,
 *          name: xxx
 *      }
 *  2. 曾经折线图与柱形图的legend的data可以省略，根据series对象的name自动生成
 *     但是饼图只有一个series对象，其图例根据这个series对象的data数组里的name生成
 */
(function () {
  const myChart = echarts.init(document.querySelector(".pie .chart"));
  const option = {
    color: ["#065aab", "#066eab", "#0682ab", "#0696ab", "#06a0ab"],
    tooltip: {
      trigger: "item", // 对于饼图来说，tooltip的触发方式即为item，而非axis
      formatter: "{a} <br/>{b}: {c} ({d}%)", // 设置提示框的提示内容
    },

    // 图例相关配置
    legend: {
      bottom: "0%", // 图例位置相关
      // 图例小图标的大小
      itemWidth: 10,
      itemHeight: 10,
      // 图例文字的样式 —— 图例文字对应series.data对象的name属性值
      textStyle: {
        color: "rgba(255,255,255,.5)",
        fontSize: "12",
      },
    },
    series: [
      {
        name: "年龄分布",
        type: "pie",
        // 这个radius可以修改饼图的大小
        // radius 第一个值是内圆的半径 第二个值是外圆的半径（当内圆半径设置为"0%"时，就不是环形了，而是一个实心圆）
        radius: ["40%", "60%"],
        // center调整饼图位置
        center: ["50%", "45%"],
        avoidLabelOverlap: true, // 避免label重叠在一起
        // 图形上的文字
        label: {
          show: false,
          position: "inline", // inline、center等取值控制label的位置
        },
        // 链接文字和图形的线是否显示
        labelLine: {
          show: false,
        },
        data: [
          { value: 1, name: "0岁以下" },
          { value: 4, name: "20-29岁" },
          { value: 2, name: "30-39岁" },
          { value: 2, name: "40-49岁" },
          { value: 1, name: "50岁以上" },
        ],
      },
    ],
  };

  myChart.setOption(option);

  window.addEventListener("resize", function () {
    myChart.resize();
  });
})();

// 饼形图 地区分布模块
/**
 *  南丁格尔饼图
 *  1. 与普通饼图的区别就是series对象里增加配置项roseType
 */
(function () {
  const myChart = echarts.init(document.querySelector(".pie2 .chart"));
  const option = {
    color: [
      "#006cff",
      "#60cda0",
      "#ed8884",
      "#ff9f7f",
      "#0096ff",
      "#9fe6b8",
      "#32c5e9",
      "#1d9dff",
    ],
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)",
    },
    legend: {
      bottom: "0%",
      itemWidth: 10,
      itemHeight: 10,
      textStyle: {
        color: "rgba(255,255,255,.5)",
        fontSize: "12",
      },
    },
    series: [
      {
        name: "地区分布",
        type: "pie",
        radius: ["10%", "70%"],
        center: ["50%", "50%"],
        roseType: "radius", // 设置 "radius" 模式的南丁格尔饼图
        // 图形的文字标签
        label: {
          fontSize: 10,
        },
        // 链接图形和文字的线条
        labelLine: {
          // length 链接图形的线条
          length: 6,
          // length2 链接文字的线条
          length2: 8,
        },
        data: [
          { value: 20, name: "云南" },
          { value: 26, name: "北京" },
          { value: 24, name: "山东" },
          { value: 25, name: "河北" },
          { value: 20, name: "江苏" },
          { value: 25, name: "浙江" },
          { value: 30, name: "四川" },
          { value: 42, name: "湖北" },
        ],
      },
    ],
  };

  myChart.setOption(option);

  window.addEventListener("resize", function () {
    myChart.resize();
  });
})();

// 模拟飞行路线模块地图模块
(function () {
  var myChart = echarts.init(document.querySelector(".map .chart"));
  var geoCoordMap = {
    上海: [121.4648, 31.2891],
    东莞: [113.8953, 22.901],
    东营: [118.7073, 37.5513],
    中山: [113.4229, 22.478],
    临汾: [111.4783, 36.1615],
    临沂: [118.3118, 35.2936],
    丹东: [124.541, 40.4242],
    丽水: [119.5642, 28.1854],
    乌鲁木齐: [87.9236, 43.5883],
    佛山: [112.8955, 23.1097],
    保定: [115.0488, 39.0948],
    兰州: [103.5901, 36.3043],
    包头: [110.3467, 41.4899],
    北京: [116.4551, 40.2539],
    北海: [109.314, 21.6211],
    南京: [118.8062, 31.9208],
    南宁: [108.479, 23.1152],
    南昌: [116.0046, 28.6633],
    南通: [121.1023, 32.1625],
    厦门: [118.1689, 24.6478],
    台州: [121.1353, 28.6688],
    合肥: [117.29, 32.0581],
    呼和浩特: [111.4124, 40.4901],
    咸阳: [108.4131, 34.8706],
    哈尔滨: [127.9688, 45.368],
    唐山: [118.4766, 39.6826],
    嘉兴: [120.9155, 30.6354],
    大同: [113.7854, 39.8035],
    大连: [122.2229, 39.4409],
    天津: [117.4219, 39.4189],
    太原: [112.3352, 37.9413],
    威海: [121.9482, 37.1393],
    宁波: [121.5967, 29.6466],
    宝鸡: [107.1826, 34.3433],
    宿迁: [118.5535, 33.7775],
    常州: [119.4543, 31.5582],
    广州: [113.5107, 23.2196],
    廊坊: [116.521, 39.0509],
    延安: [109.1052, 36.4252],
    张家口: [115.1477, 40.8527],
    徐州: [117.5208, 34.3268],
    德州: [116.6858, 37.2107],
    惠州: [114.6204, 23.1647],
    成都: [103.9526, 30.7617],
    扬州: [119.4653, 32.8162],
    承德: [117.5757, 41.4075],
    拉萨: [91.1865, 30.1465],
    无锡: [120.3442, 31.5527],
    日照: [119.2786, 35.5023],
    昆明: [102.9199, 25.4663],
    杭州: [119.5313, 29.8773],
    枣庄: [117.323, 34.8926],
    柳州: [109.3799, 24.9774],
    株洲: [113.5327, 27.0319],
    武汉: [114.3896, 30.6628],
    汕头: [117.1692, 23.3405],
    江门: [112.6318, 22.1484],
    沈阳: [123.1238, 42.1216],
    沧州: [116.8286, 38.2104],
    河源: [114.917, 23.9722],
    泉州: [118.3228, 25.1147],
    泰安: [117.0264, 36.0516],
    泰州: [120.0586, 32.5525],
    济南: [117.1582, 36.8701],
    济宁: [116.8286, 35.3375],
    海口: [110.3893, 19.8516],
    淄博: [118.0371, 36.6064],
    淮安: [118.927, 33.4039],
    深圳: [114.5435, 22.5439],
    清远: [112.9175, 24.3292],
    温州: [120.498, 27.8119],
    渭南: [109.7864, 35.0299],
    湖州: [119.8608, 30.7782],
    湘潭: [112.5439, 27.7075],
    滨州: [117.8174, 37.4963],
    潍坊: [119.0918, 36.524],
    烟台: [120.7397, 37.5128],
    玉溪: [101.9312, 23.8898],
    珠海: [113.7305, 22.1155],
    盐城: [120.2234, 33.5577],
    盘锦: [121.9482, 41.0449],
    石家庄: [114.4995, 38.1006],
    福州: [119.4543, 25.9222],
    秦皇岛: [119.2126, 40.0232],
    绍兴: [120.564, 29.7565],
    聊城: [115.9167, 36.4032],
    肇庆: [112.1265, 23.5822],
    舟山: [122.2559, 30.2234],
    苏州: [120.6519, 31.3989],
    莱芜: [117.6526, 36.2714],
    菏泽: [115.6201, 35.2057],
    营口: [122.4316, 40.4297],
    葫芦岛: [120.1575, 40.578],
    衡水: [115.8838, 37.7161],
    衢州: [118.6853, 28.8666],
    西宁: [101.4038, 36.8207],
    西安: [109.1162, 34.2004],
    贵阳: [106.6992, 26.7682],
    连云港: [119.1248, 34.552],
    邢台: [114.8071, 37.2821],
    邯郸: [114.4775, 36.535],
    郑州: [113.4668, 34.6234],
    鄂尔多斯: [108.9734, 39.2487],
    重庆: [107.7539, 30.1904],
    金华: [120.0037, 29.1028],
    铜川: [109.0393, 35.1947],
    银川: [106.3586, 38.1775],
    镇江: [119.4763, 31.9702],
    长春: [125.8154, 44.2584],
    长沙: [113.0823, 28.2568],
    长治: [112.8625, 36.4746],
    阳泉: [113.4778, 38.0951],
    青岛: [120.4651, 36.3373],
    韶关: [113.7964, 24.7028],
  };

  var XAData = [
    [{ name: "西安" }, { name: "拉萨", value: 100 }],
    [{ name: "西安" }, { name: "上海", value: 100 }],
    [{ name: "西安" }, { name: "广州", value: 100 }],
    [{ name: "西安" }, { name: "西宁", value: 100 }],
    [{ name: "西安" }, { name: "银川", value: 100 }],
  ];

  var XNData = [
    [{ name: "西宁" }, { name: "北京", value: 100 }],
    [{ name: "西宁" }, { name: "上海", value: 100 }],
    [{ name: "西宁" }, { name: "广州", value: 100 }],
    [{ name: "西宁" }, { name: "西安", value: 100 }],
    [{ name: "西宁" }, { name: "银川", value: 100 }],
  ];

  var YCData = [
    [{ name: "拉萨" }, { name: "潍坊", value: 100 }],
    [{ name: "拉萨" }, { name: "哈尔滨", value: 100 }],
    [{ name: "银川" }, { name: "上海", value: 100 }],
    [{ name: "银川" }, { name: "西安", value: 100 }],
    [{ name: "银川" }, { name: "西宁", value: 100 }],
  ];

  var planePath =
    "path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z";
  //var planePath = 'arrow';
  var convertData = function (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
      var dataItem = data[i];

      var fromCoord = geoCoordMap[dataItem[0].name];
      var toCoord = geoCoordMap[dataItem[1].name];
      if (fromCoord && toCoord) {
        res.push({
          fromName: dataItem[0].name,
          toName: dataItem[1].name,
          coords: [fromCoord, toCoord],
          value: dataItem[1].value,
        });
      }
    }
    return res;
  };

  var color = ["#a6c84c", "#ffa022", "#46bee9"]; //航线的颜色
  var series = [];
  [
    ["西安", XAData],
    ["西宁", XNData],
    ["银川", YCData],
  ].forEach(function (item, i) {
    series.push(
      {
        name: item[0] + " Top3",
        type: "lines",
        zlevel: 1,
        effect: {
          show: true,
          period: 6,
          trailLength: 0.7,
          color: "red", //arrow箭头的颜色
          symbolSize: 3,
        },
        lineStyle: {
          normal: {
            color: color[i],
            width: 0,
            curveness: 0.2,
          },
        },
        data: convertData(item[1]),
      },
      {
        name: item[0] + " Top3",
        type: "lines",
        zlevel: 2,
        symbol: ["none", "arrow"],
        symbolSize: 10,
        effect: {
          show: true,
          period: 6,
          trailLength: 0,
          symbol: planePath,
          symbolSize: 15,
        },
        lineStyle: {
          normal: {
            color: color[i],
            width: 1,
            opacity: 0.6,
            curveness: 0.2,
          },
        },
        data: convertData(item[1]),
      },
      {
        name: item[0] + " Top3",
        type: "effectScatter",
        coordinateSystem: "geo",
        zlevel: 2,
        rippleEffect: {
          brushType: "stroke",
        },
        label: {
          normal: {
            show: true,
            position: "right",
            formatter: "{b}",
          },
        },
        symbolSize: function (val) {
          return val[2] / 8;
        },
        itemStyle: {
          normal: {
            color: color[i],
          },
          emphasis: {
            areaColor: "#2B91B7",
          },
        },
        data: item[1].map(function (dataItem) {
          return {
            name: dataItem[1].name,
            value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value]),
          };
        }),
      }
    );
  });
  var option = {
    tooltip: {
      trigger: "item",
      formatter: function (params, ticket, callback) {
        if (params.seriesType == "effectScatter") {
          return "线路：" + params.data.name + "" + params.data.value[2];
        } else if (params.seriesType == "lines") {
          return (
            params.data.fromName +
            ">" +
            params.data.toName +
            "<br />" +
            params.data.value
          );
        } else {
          return params.name;
        }
      },
    },
    legend: {
      orient: "vertical",
      top: "bottom",
      left: "right",
      data: ["西安 Top3", "西宁 Top3", "银川 Top3"],
      textStyle: {
        color: "#fff",
      },
      selectedMode: "multiple",
    },
    geo: {
      map: "china",
      label: {
        emphasis: {
          show: true,
          color: "#fff",
        },
      },
      // 把中国地图放大了1.2倍
      zoom: 1.2,
      roam: true,
      itemStyle: {
        normal: {
          // 地图省份的背景颜色
          areaColor: "rgba(20, 41, 87,0.6)",
          borderColor: "#195BB9",
          borderWidth: 1,
        },
        emphasis: {
          areaColor: "#2B91B7",
        },
      },
    },
    series: series,
  };
  myChart.setOption(option);
  // 监听浏览器缩放，图表对象调用缩放resize函数
  window.addEventListener("resize", function () {
    myChart.resize();
  });
})();
