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
