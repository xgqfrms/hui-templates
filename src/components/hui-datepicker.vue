<template>
    <section>
        <h1>{{title}}</h1>
        <div class="audit-common-header">
            <span class="audit-common-lable">发布日期</span>
            <h-date-picker
                type="datetimerange"
                format="yyyy-MM-dd"
                aria-placeholder="发布日期"
                :placeholder="placeholders.publishDateRange"
                style="width: 205px"
                :value="commonFilters.publishDateRange"
                @on-change="onChangeDateRangePicker">
            </h-date-picker>
        </div>
        <!-- col & row -->
    </section>
</template>

<script>
    /**
     *
     * @author xgqfrms
     * @copyright xgqfrms
     *
     * @created 2018.01.01
     * @modified 2019.05.27
     *
     * @description hui datepicker
     * @augments
     * @example
     *
     */
    import { TODAY } from "../utils";
    // import { TODAY } from "../utils/index";
    export default {
        name: "HuiDatepicker",
        props: {
            title: String,
        },
        data () {
            return {
                commonFilters: {
                    publishDate: TODAY,
                    publishDateEnd: TODAY,
                    publishDateRange: [TODAY, TODAY],
                },
                commonFiltersPagination: {
                    publishDate: TODAY,
                    publishDateEnd: TODAY,
                    publishDateRange: [TODAY, TODAY],
                },
                placeholders: {
                    publishDateRange: "开始日期    ~    结束日期",
                    publishDate: "请输入查询日期",
                },
            }
        },
        methods: {
            // filter methods
            onChangeDateRangePicker (values) {
                // eslint-disable-next-line
                console.log(`range values`, values);
                this.commonFilters.publishDateRange = values;
                this.commonFilters.publishDate = values[0];
                this.commonFilters.publishDateEnd = values[1];
            },
            init() {
                //
            },
        },
        mounted() {
            this.init();
        },
        activated() {
            // keep-alive 组件激活时调用
        },
    }
</script>

<style lang="css">
/* scss variables */
/* mixin */
.audit-common-lable {
  color: #000;
  display: inline-block;
  width: 100px;
  text-align: center;
}
.audit-common-lable::after {
  display: inline-block;
  content: ":";
}

.audit-common-lable-placeholder {
  color: #000;
  display: inline-block;
  width: 100px;
  text-align: center;
}

.audit-common-padding {
  display: block;
  padding-bottom: 5px;
  border: 0;
}

.audit-common-content {
  margin-top: 10px;
}

.audit-common-link,
.audit-common-link:hover {
  color: #298DFF !important;
  text-decoration: none;
  cursor: pointer;
}

.audit-common-row-padding {
  margin-bottom: 5px;
}
</style>
