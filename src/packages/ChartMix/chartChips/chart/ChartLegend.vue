<template>
  <el-collapse-item name="3">
        <template slot="title">
      {{setItem.modalName}}
    </template>

    <!-- 图例显示 -->
    <chart-base-switch :switchValue.sync="legend.show">
      <div slot="title">{{setItem.show}}</div>
    </chart-base-switch>

    <div v-show="legend.show">
      <!-- 图例样式  -->
      <chart-base-label :router="router + '/label'" :baseLabelOption.sync="legend.label">
        <div slot="title">{{ setItem.color }}</div>
      </chart-base-label>

      <!-- 图例位置/朝向-->
      <chart-base-select :selectOption="positionOption" :selectValue.sync="legend.position.value">
        <div slot="select">{{ setItem.position }}</div>
      </chart-base-select>

      <!-- 自定义图例位置 -->
      <el-row v-if="legend.position.value === 'custom'">
        <!-- 水平偏移量 -->
        <chart-base-slider
          :baseSliderOption.sync="legend.position.offsetX"
          :unit="'%'"
          :content="setItem.contentH"
        ></chart-base-slider>

        <!-- 垂直偏移量 -->
        <chart-base-slider
          :baseSliderOption.sync="legend.position.offsetY"
          :unit="'%'"
          :content="setItem.contentV"
        ></chart-base-slider>
      </el-row>

      <chart-base-select :selectOption="dirOptions" :selectValue.sync="legend.position.direction">
        <div slot="select">{{ setItem.direction }}</div>
      </chart-base-select>

      <!-- 图例大小 -->
      <chart-base-select :selectOption="sizeOption" :selectValue.sync="legend.width.value">
        <div slot="select">{{ setItem.width }}</div>
      </chart-base-select>
      <chart-base-select :selectOption="sizeOption" :selectValue.sync="legend.height.value">
        <div slot="select">{{ setItem.height }}</div>
      </chart-base-select>

      <!-- 自定义图例大小 -->
      <chart-base-slider
        v-if="legend.width.value == 'custom'"
        :baseSliderOption.sync="legend.width.cusSize"
        :unit="'px'"
        :content="setItem.contentHorizontal"
      ></chart-base-slider>
      <chart-base-slider
        v-if="legend.height.value == 'custom'"
        :baseSliderOption.sync="legend.height.cusSize"
        :unit="'px'"
        :content="setItem.contentVertical"
      ></chart-base-slider>

      <!-- 图例间距 -->
      <chart-base-select :selectOption="distanceOption" :selectValue.sync="legend.distance.value">
        <div slot="select">{{ setItem.spacing }}</div>
      </chart-base-select>

      <!-- 自定义图例间距 -->
      <chart-base-slider
        v-if="legend.distance.value == 'custom'"
        :baseSliderOption.sync="legend.distance.cusGap"
        :unit="'px'"
        :content="setItem.contentSpacing"
      >
        <div slot="title">{{ setItem.spacing }}</div>
      </chart-base-slider>
    </div>
  </el-collapse-item>
</template>

<script>
import * as t from "@/utils/importUtil";
import i18n from '@/i18n'

export default {
  props: {
    legendOption: Object,
    chartAllType: String,
    router: String,
    lang: {
      type: String,
      default: "en",
    },
  },
  data() {
    return {
      legend: {}, //图例设置
      positionOption: i18n.t('positionOption'),
      sizeOption: i18n.t('sizeOption'),
      distanceOption: i18n.t('distanceOption'),
      dirOptions: i18n.t('dirOptions'),
      setItem:{}
    };
  },
  components: {
    ...t.importComp(t),
  },
  mounted() {
    this.setItem = i18n.t('chartLegend');
  },
  watch: {
    legendOption: {
      handler(newVal) {
        if (t.isEqual(this.legend, newVal)) {
          return;
        }
        this.legend = t.deepCopy(newVal);
      },
      immediate: true,
      deep: true,
    },
    legend: {
      handler: function (newVal, oldVal) {
        // 改变值就重新渲染
        if (oldVal) {
          this.changeLegend();
        }
      },
      deep: true,
      immediate: true,
    },
    lang() {
      this.setItem = i18n.t('chartLegend');
    },
  },
  methods: {
    ...t.mapActions("chartSetting", ["updateChartItem"]),
    changeLegend() {
      const updateObj = {
        updateObj: t.deepCopy(this.legend),
        router: this.router,
      };
      this.updateChartItem(updateObj);
    },
  },
};
</script>

<style>
</style>

