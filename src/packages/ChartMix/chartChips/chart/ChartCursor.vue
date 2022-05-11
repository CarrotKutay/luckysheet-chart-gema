<template>
  <el-collapse-item name="4">
    <template slot="title">
      {{setItem.modalName}}
    </template>
    <!-- 显示提示框 -->
    <chart-base-switch :switchValue.sync="cursor.show">
      <div slot="title">{{setItem.show}}</div>
    </chart-base-switch>

    <!-- 提示框样式 -->
    <chart-base-label :router="router + '/label'" :baseLabelOption="cursor.label">
      <div slot="title">{{setItem.label}}</div>
    </chart-base-label>

    <!-- 背景颜色 -->
    <el-row style="margin-top: 10px;">
      <el-col :span="6">{{setItem.background}}</el-col>
      <el-col :span="3">
        <el-color-picker size="mini" v-model="cursor.backgroundColor"></el-color-picker>
      </el-col>
    </el-row>

    <!-- 提示触发条件 -->
    <chart-base-select :selectOption="triggerMethodArr" :selectValue.sync="cursor.triggerOn">
      <div slot="select">{{setItem.trigger}}</div>
    </chart-base-select>

    <!-- 提示触发类型 -->
    <chart-base-select :selectOption="triggerTypeArr" :selectValue.sync="cursor.triggerType">
      <div slot="select">{{setItem.type}}</div>
    </chart-base-select>

    <!-- 指示器配置 -->
    <div v-if="cursor.triggerType != 'item'">
      <chart-base-select
        :selectOption="lineStyleOption"
        :selectValue.sync="cursor.axisPointer.style.type"
      >
        <div slot="select">{{setItem.lineType}}</div>
      </chart-base-select>
      <chart-base-select
        :selectOption="lineWeightOption"
        :selectValue.sync="cursor.axisPointer.style.width"
      >
        <div slot="select">{{setItem.lineWidth}}</div>
      </chart-base-select>
      <el-row style="margin-top: 15px;">
        <el-col :span="6">{{setItem.color}}</el-col>
        <el-col :span="3">
          <el-color-picker size="mini" v-model="cursor.axisPointer.style.color"></el-color-picker>
        </el-col>
      </el-row>
      <chart-base-select :selectOption="axisPointerArr" :selectValue.sync="cursor.axisPointer.type">
        <div slot="select">{{setItem.axisType}}</div>
      </chart-base-select>
    </div>

    <!-- 提示框浮层位置 -->
    <chart-base-select
      v-if="cursor.triggerType == 'item'"
      :selectOption="posOption"
      :selectValue.sync="cursor.position"
    >
      <div slot="select">{{setItem.position}}</div>
    </chart-base-select>

<!--     鼠标提示format
    <el-row style="margin-top: 15px;">
      <el-col :span="2">
        <i class="el-icon-menu"></i>
      </el-col>
      <el-col :span="8">{{setItem.suffix}}</el-col>
    </el-row>

   <el-row :key="i" style="margin-top: 15px;" v-for="(item , i) in seriesOption">
      <el-col :span="6">{{item}}</el-col>
      <el-col :span="4">
        &lt;!&ndash; 鼠标提示后缀 &ndash;&gt;
        <chart-base-input :hideCol="true" :placeholder="setItem.placeholder"></chart-base-input>
      </el-col>
      <el-col :span="6">
        &lt;!&ndash; 数值比例 &ndash;&gt;
        <chart-base-select
          :tooltip="setItem.ratio"
          :selectOption="ratioOption"
          :selectValue.sync="cursor.format[i].ratio"
          :hideCol="true"
        ></chart-base-select>
      </el-col>
      <el-col :span="6">
        &lt;!&ndash; 小数位数 &ndash;&gt;
        <chart-base-select
          :tooltip="setItem.digit"
          :selectOption="digitOption"
          :selectValue.sync="cursor.format[i].digit"
          :hideCol="true"
        ></chart-base-select>
      </el-col>
    </el-row>&ndash;&gt;-->
  </el-collapse-item>
</template>

<script>
import * as t from "@/utils/importUtil";
import i18n from "@/i18n";

export default {
  components: {
    ...t.importComp(t),
  },
  props: {
    router: String,
    chartAllType: String,
    cursorOption: Object,
    lang: {
      type: String,
      default: "cn",
    },
  },
  data() {
    return {
      cursor: {}, //courser settings
      fontSizeOption: i18n.t('fontSIzeOption'),
      lineStyleOption: i18n.t('lineStyleOption'),
      lineWeightOption: i18n.t('lineWeightOption'),
      posOption: i18n.t('posOption'),
      ratioOption: i18n.t('ratioOption'),
      digitOption: i18n.t('digitOption'),
      triggerTypeArr: i18n.t('chartCursor.triggerTypeArr'),
      axisPointerArr: i18n.t('chartCursor.axisPointerArr'),
      triggerMethodArr: i18n.t('chartCursor.triggerMethodArr'),
      setItem: {},
    };
  },
  mounted() {
    this.setItem = i18n.t('chartCursor');
  },
  watch: {
    cursorOption: {
      handler(newVal) {
        if (t.isEqual(this.cursor, newVal)) {
          return;
        }
        this.cursor = t.deepCopy(newVal);
      },
      immediate: true,
      deep: true,
    },
    cursor: {
      handler: function (newVal, oldVal) {
        // 改变值就重新渲染
        if (oldVal) {
          this.changeCursor();
        }
      },
      deep: true,
      immediate: true,
    },
    lang() {
      this.setItem = i18n.t('chartCursor');
    },
  },
  computed: {
    /*seriesOption() {
      var arr = [];
      for (var i = 0; i < this.cursor.format.length; i++) {
        arr.push(this.cursor.format[i].seriesName);
      }
      return arr;
    },*/
  },
  methods: {
    ...t.mapActions("chartSetting", ["updateChartItem"]),
    changeCursor() {
      const updateObj = {
        updateObj: t.deepCopy(this.cursor),
        router: this.router,
      };
      this.updateChartItem(updateObj);
    },
  },
};
</script>

<style>
</style>
