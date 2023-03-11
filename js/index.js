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
        boundaryGap: true // x坐标轴上第一列数据是否与y轴有间隙
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
