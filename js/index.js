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
