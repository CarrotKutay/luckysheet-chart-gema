/**
 * 图表的样式结构: 为chartOptions.defaultOption下的所有属性,应该是所有图表类型的并集
 * DOM的结构与此对应: DOM操作后修改此处参数,直接存储后台, 渲染图表时候经过一层引擎转换才能使用各个图表插件渲染; 后台拿到此参数,可对应绑定到DOM上
 *
 * 设计细节:
 * 1. 各个图表类型之间的设置项不同,有交集和并集,此处设置统一存储并集参数
 * 2. 切换图表类型时,亦应保留所具有的设置参数,为切换回上一个图表类型保留设置
 */
import { deepCopy } from '../utils/util';
import i18n from "@/i18n";
const baseComponent = {
    label: {
        fontSize: 12, //字体大小 //fontSize为'custom'时,取cusFontSize的值
        color: '#333', //颜色
        fontFamily: 'sans-serif', //字体
        fontGroup: [], //字体, 加粗:选中:'bold',无:'normal'; 斜体: 选中:'italic',无:'normal';方向:选中:'vertical',无:'horizen'
        cusFontSize: 12, //自定义文字大小
    },
    formatter: {
        prefix: '', //前缀
        suffix: '', //后缀
        ratio: 1, //数值比例
        digit: 'auto', //小数位数
    },
    item: {
        color: null,
        borderColor: '#000',
        borderType: 'solid',
        borderWidth: 1
    },
    lineStyle: {
        color: null,
        width: 1,
        type: 'solid'
    }
};
const chartComponent = {
    //标题设置
    title: {
        show: false, //是否显示
        text: i18n.t('components.defaultTitle'), //标题内容
        label: deepCopy(baseComponent.label),
        position: {
            value: 'left-top', //custom:自定义 //left-top  为custom的时候,取offsetX, offsetY
            offsetX: 40, //自定义的X位置,单位百分比
            offsetY: 50, //自定义的Y位置,单位百分比
        },
    },
    //副标题
    subtitle: {
        show: false, //是否显示
        text: '', //标题内容
        label: deepCopy(baseComponent.label),
        distance: {
            value: 'auto', //'auto': 默认, 'far': 远 // 'normal': 一般 'close':近 custom :取cusGap作为距离
            cusGap: 40, //自定义距离
        },
    },
    // 图表设置
    config: {
        color: 'transparent', //默认颜色//'#333'
        fontFamily: 'Sans-serif',
        grid: {
            value: 'normal', //''normal':正常 'wide':宽 // 'narrow':窄 // 'slender':瘦长 'flat':扁平
            top: 5,
            left: 10,
            right: 20,
            bottom: 10,
        },
    },
    //图例设置
    legend: {
        show: true,
        selectMode: 'multiple', //'single':单选 //'多选':multiple //'禁用':'disable'
        selected: [
            //图例显示选择 //动态数据渲染 //分:初始化图表+后台加载使用数据结构中数据 /编辑时根据系列实时变化
            {
                seriesName: '衣服', //
                isShow: true,
            },
            {
                seriesName: '食材', //
                isShow: true,
            },
            {
                seriesName: '图书', //
                isShow: true,
            },
        ],
        label: deepCopy(baseComponent.label), //图例文字样式
        position: {
            value: 'left-top', //custom:自定义 //left-top  为custom的时候,取offsetX, offsetY
            offsetX: 40, //自定义的X位置,单位百分比
            offsetY: 50, //自定义的Y位置,单位百分比
            direction: 'horizontal', //图例位置水平或者垂直 horizontal(水平)/vertical(垂直)
        },
        width: {
            //图例图标大小
            value: 'auto', //'auto':默认/ 'big':大/'medium':中/'small':小/'custom':自定义
            cusSize: 25, //图例自定义宽度 ,单位px
        },
        height: {
            //图例图标大小
            value: 'auto', //'auto':默认/ 'big':大/'medium':中/'small':小/'custom':自定义
            cusSize: 14, //图例自定义宽度 ,单位px
        },
        distance: {
            value: 'auto', //'auto':默认 /far':远 / 'general':一般 / 'near':近 /'custom':自定义
            cusGap: 10, //自定义距离
        },
        itemGap: 10,
    },
    //提示设置
    tooltip: {
        show: true, //鼠标提示显示
        label: deepCopy(baseComponent.label), //文字样式
        backgroundColor: 'rgba(50,50,50,0.7)', // 鼠标提示框背景色
        triggerOn: 'mousemove', // 'mousemove':鼠标滑过 click':单击 触发条件
        triggerType: 'item', //触发类型 //'axis':坐标轴触发 'item':数据项图形触发
        axisPointer: {
            // 指示器配置
            type: 'line', // 'line':默认直线指示器 //'cross': 十字指示器配置 //'shadow': 阴影指示器配置
            style: {
                // 指示器样式
                color: '#555',
                width: 'normal', //宽度:'normal':正常 'bold': 粗 'bolder':加粗
                type: 'solid', //'solid': 实线 'dash': 虚线 'dot':点线
            },
        },
        format: [
            //鼠标提示后缀
            {
                seriesName: '衣服',
                prefix: '', //前缀
                suffix: '', //后缀 (自定义单位)
                ratio: 1, //除以的数 // 1为默认, 0.1 /0.001 /...
                digit: 'auto', //小数位数 'auto' :不处理 // 数值:0 , 1 ,2 ...
            },
            {
                seriesName: '食材',
                prefix: '', //前缀
                suffix: '', //后缀
                ratio: 1,
                digit: 'auto',
            },
            {
                seriesName: '图书',
                prefix: '', //前缀
                suffix: '', //后缀
                ratio: 1,
                digit: 'auto',
            },
        ],
        position: 'auto', // 鼠标提示位置 //'inside':中心位置 //'left'/'top'/'right'/'top'
    },
    // XY轴
    axis: {
        axisType: 'xAxisDown', //要显示的坐标轴类型
        xAxisUp: {
            show: false, //显示X轴
            title: {
                showTitle: false, //显示X轴
                text: '', //标题内容
                nameGap: 15, //标题与轴线距离
                rotate: 0, //标题倾斜角度
                label: deepCopy(baseComponent.label),
                fzPosition: 'end', //标题对齐方式,end: 尾部, middle: 中间
            },
            name: '显示X轴',
            inverse: false, //反向坐标轴 (echarts有)
            //刻度线
            tickLine: {
                show: true, //显示刻度线
                width: 1, //刻度线宽度
                color: 'auto', //刻度线颜色
            },
            //刻度
            tick: {
                show: true, //显示刻度
                position: 'outside', //刻度位置,默认: outside朝外 / inside: 朝内
                length: 5, //刻度长度
                width: 1, //刻度宽度
                color: 'auto', //刻度颜色
            },
            //标签
            tickLabel: {
                show: true, //显示刻度标签
                label: deepCopy(baseComponent.label),
                rotate: 0, //倾斜标签角度
                prefix: '', //标签前缀
                suffix: '', //标签后缀
                optimize: 0,
                distance: 0, //标签与轴线距离
                min: 'auto', //最小值
                max: 'auto', //最大值
                ratio: 1,
                digit: 'auto',
            },
            //网格线
            netLine: {
                show: false, //显示网格线
                width: 1, //网格线宽度
                type: 'solid', //网格线类型
                color: 'auto', //网格线颜色
                interval: {
                    //网格分割间隔数
                    value: 'auto',
                    cusNumber: 0,
                },
            },
            //网格区域
            netArea: {
                show: false, //显示网格区域
                interval: {
                    //网格分割间隔数
                    value: 'auto',
                    cusNumber: 0,
                },
                colorOne: 'auto', //网格第一颜色
                colorTwo: 'auto', //网格第二颜色
            },
            axisLine: {
                //第二根X轴必需
                onZero: false,
            },
        },
        xAxisDown: {
            show: true, //显示X轴
            title: {
                showTitle: false, //显示X轴
                text: '', //标题内容
                nameGap: 15, //标题与轴线距离
                rotate: 0, //标题倾斜角度
                label: deepCopy(baseComponent.label),
                fzPosition: 'end', //标题对齐方式,end: 尾部, middle: 中间
            },
            name: '显示X轴',
            inverse: false, //反向坐标轴 (echarts有)
            //刻度线
            tickLine: {
                show: true, //显示刻度线
                width: 1, //刻度线宽度
                color: 'auto', //刻度线颜色
            },
            //刻度
            tick: {
                show: true, //显示刻度
                position: 'outside', //刻度位置,默认: outside朝外 / inside: 朝内
                length: 5, //刻度长度
                width: 1, //刻度宽度
                color: 'auto', //刻度颜色
            },
            //标签
            tickLabel: {
                show: true, //显示刻度标签
                label: deepCopy(baseComponent.label),
                rotate: 0, //倾斜标签角度
                prefix: '', //标签前缀
                suffix: '', //标签后缀
                optimize: 0, //标签间隔个数
                distance: 0, //标签与轴线距离
                min: null, //最小值
                max: null, //最大值
                ratio: 1,
                digit: 'auto',
            },
            //网格线
            netLine: {
                show: false, //显示网格线
                width: 1, //网格线宽度
                type: 'solid', //网格线类型
                color: 'auto', //网格线颜色
                interval: {
                    //网格分割间隔数
                    value: 'auto',
                    cusNumber: 0,
                },
            },
            //网格区域
            netArea: {
                show: false, //显示网格区域
                interval: {
                    //网格分割间隔数
                    value: 'auto',
                    cusNumber: 0,
                },
                colorOne: 'auto', //网格第一颜色
                colorTwo: 'auto', //网格第二颜色
            },
        },
        yAxisLeft: {
            show: true, //显示X轴
            title: {
                showTitle: false, //显示X轴
                text: '', //标题内容
                nameGap: 15, //标题与轴线距离
                rotate: 0, //标题倾斜角度
                label: deepCopy(baseComponent.label),
                fzPosition: 'end', //标题对齐方式,end: 尾部, middle: 中间
            },
            name: '显示Y轴',
            inverse: false, //反向坐标轴 (echarts有)
            //刻度线
            tickLine: {
                show: true, //显示刻度线
                width: 1, //刻度线宽度
                color: 'auto', //刻度线颜色
            },
            //刻度
            tick: {
                show: true, //显示刻度
                position: 'outside', //刻度位置,默认: outside朝外 / inside: 朝内
                length: 5, //刻度长度
                width: 1, //刻度宽度
                color: 'auto', //刻度颜色
            },
            //标签
            tickLabel: {
                show: true, //显示刻度标签
                label: deepCopy(baseComponent.label),
                rotate: 0, //倾斜标签角度
                formatter: deepCopy(baseComponent.formatter),
                split: 5, //分割段数
                min: null, //最小值
                max: null, //最大值
                prefix: '', //标签前缀
                suffix: '', //标签后缀
                ratio: 1,
                digit: 'auto',
                distance: 0, //标签与轴线距离
            },
            //网格线
            netLine: {
                show: false, //显示网格线
                width: 1, //网格线宽度
                type: 'solid', //网格线类型
                color: 'auto', //网格线颜色
                interval: {
                    //网格分割间隔数
                    value: 'auto',
                    cusNumber: 0,
                },
            },
            //网格区域
            netArea: {
                show: false, //显示网格区域
                interval: {
                    //网格分割间隔数
                    value: 'auto',
                    cusNumber: 0,
                },
                colorOne: 'auto', //网格第一颜色
                colorTwo: 'auto', //网格第二颜色
            },
        },
        yAxisRight: {
            show: false, //显示X轴
            title: {
                showTitle: false, //显示X轴
                text: '', //标题内容
                nameGap: 15, //标题与轴线距离
                rotate: 0, //标题倾斜角度
                label: deepCopy(baseComponent.label),
                fzPosition: 'end', //标题对齐方式,end: 尾部, middle: 中间
            },
            name: '显示Y轴',
            inverse: false, //反向坐标轴 (echarts有)
            //刻度线
            tickLine: {
                show: true, //显示刻度线
                width: 1, //刻度线宽度
                color: 'auto', //刻度线颜色
            },
            //刻度
            tick: {
                show: true, //显示刻度
                position: 'outside', //刻度位置,默认: outside朝外 / inside: 朝内
                length: 5, //刻度长度
                width: 1, //刻度宽度
                color: 'auto', //刻度颜色
            },
            //标签
            tickLabel: {
                show: true, //显示刻度标签
                label: deepCopy(baseComponent.label),
                rotate: 0, //倾斜标签角度
                formatter: deepCopy(baseComponent.formatter),
                split: 5, //分割段数
                min: null, //最小值
                max: null, //最大值
                prefix: '', //标签前缀
                suffix: '', //标签后缀
                ratio: 1,
                digit: 'auto',
                distance: 0, //标签与轴线距离
            },
            //网格线
            netLine: {
                show: false, //显示网格线
                width: 1, //网格线宽度
                type: 'solid', //网格线类型
                color: 'auto', //网格线颜色
                interval: {
                    //网格分割间隔数
                    value: 'auto',
                    cusNumber: 0,
                },
            },
            //网格区域
            netArea: {
                show: false, //显示网格区域
                interval: {
                    //网格分割间隔数
                    value: 'auto',
                    cusNumber: 0,
                },
                colorOne: 'auto', //网格第一颜色
                colorTwo: 'auto', //网格第二颜色
            },
        },
    },
};

//此类数据抽出来作为模板数据,每次使用deepCopy一份即可
//注: 若页面展示的是语义化的参数,则此处也只定义语义化的参数,具体数值在引擎里做转换
//若界面选择的直接是用户期望的数值,则直接采用数值即可
/**
 *  位置信息
 *
 */

// model data
const chartModelData = [["地区", "衣服", "食材", "图书"], ["上海", 134, 345, 51], ["北京", 345, 421, 234], ["广州", 453, 224, 156], ["杭州", 321, 634, 213], ["南京", 654, 542, 231]];

// base chart option
const chartOptions = {
    //图表类型设置集合
    chartAllType: 'echarts|line|default',

    //图表配置
    defaultOption: deepCopy(chartComponent),

    //图表数据
    chartData: deepCopy(chartModelData),
} //图表设置项

export {
    baseComponent,
    chartComponent,
    chartOptions
};
