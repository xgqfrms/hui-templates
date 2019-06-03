<template>
    <section>
        <div class="audit-common-header">
            <h-row class-name="common-handle-padding">
                <h-col span="10" push="1">
                    <h-row class-name="common-handle-padding">
                        <h-col span="4">
                            <h-button
                                :disabled="isEmptyNewsTitle"
                                ref="all-in-one_handle_save"
                                data-btn="all-in-one_handle_save"
                                @click="onClickButton(`save`)">
                                <h-icon name="android-checkbox" />保存
                            </h-button>
                        </h-col>
                        <h-col span="4" v-if="!commonHandle.openFlag">
                            <h-button
                                :disabled="isEmptyNewsTitle"
                                ref="all-in-one_handle_close"
                                data-btn="all-in-one_handle_close"
                                @click="clickShowResureModal(`close`)">
                                <h-icon name="lock" />屏蔽
                            </h-button>
                        </h-col>
                        <h-col span="6" v-if="commonHandle.openFlag">
                            <h-button
                                ref="all-in-one_handle_forever_shield"
                                data-btn="all-in-one_handle_forever_shield"
                                @click="clickShowResureModal(`forever_shield`)">
                                <h-icon name="success" />永久屏蔽
                            </h-button>
                        </h-col>
                        <h-col span="4" v-if="commonHandle.openFlag">
                            <h-button
                                :disabled="isEmptyNewsTitle"
                                ref="all-in-one_handle_open"
                                data-btn="all-in-one_handle_open"
                                @click="clickShowResureModal(`open`)">
                                <h-icon name="unlock" />公开
                            </h-button>
                        </h-col>
                        <h-col span="6" v-if="!commonHandle.openFlag">
                            <h-button
                                ref="all-in-one_handle_passed"
                                data-btn="all-in-one_handle_passed"
                                @click="clickShowResureModal(`passed`)">
                                <h-icon name="success" />处理通过
                            </h-button>
                        </h-col>
                        <h-col span="4" v-if="!isHashRouterNewsId">
                            <h-button
                                :disabled="isFirstNews"
                                ref="all-in-one_handle_prev"
                                data-btn="all-in-one_handle_prev"
                                @click="clickGetNewsInfos(`prev`)">
                                上一条
                            </h-button>
                        </h-col>
                        <h-col span="4" v-if="!isHashRouterNewsId">
                            <h-button
                                :disabled="isLastNews"
                                ref="all-in-one_handle_next"
                                data-btn="all-in-one_handle_next"
                                @click="clickGetNewsInfos(`next`)">
                                下一条
                            </h-button>
                        </h-col>
                    </h-row>
                </h-col>
                <h-col span="10" offset="2">
                    <h-row class-name="common-handle-padding">
                        <h-row class-name="common-handle-padding">
                            <h-col span="24">
                                <h-button @click="clickShowModal">
                                + 添加标签
                                <!-- + 新增标签 -->
                                </h-button>
                            </h-col>
                        </h-row>
                    </h-row>
                    <!-- <h-row class-name="common-handle-padding">
                        <h-row class-name="common-handle-padding">
                            <h-col span="24">
                                <span
                                    ref="alink-uid"
                                    data-alink="router"
                                    data-uid="202019022501012077714983">
                                    202019022501012077714983
                                </span>
                            </h-col>
                        </h-row>
                    </h-row> -->
                </h-col>
            </h-row>
            <h-row class-name="common-handle-padding">
                <h-col span="12"></h-col>
                <h-col span="12"></h-col>
            </h-row>
        </div>
        <div class="audit-common-content">
            <h-row class-name="common-handle-padding">
                <h-col span="12">
                    <h-row class-name="common-handle-padding" v-if="!showHighLightTitle">
                        <h-col span="24">
                            <span class="audit-common-lable common-handle-required">资讯标题</span>
                            <!-- @dbclick="onDoubleClick" -->
                            <!-- @on-dbclick="onDoubleClick" -->
                            <!-- @on-click="onDoubleClick" -->
                            <h-input
                                aria-placeholder="资讯标题"
                                placeholder="请输入资讯标题"
                                style="width: 80%"
                                v-model="commonHandle.newsTitle"
                                ref="newsTitle"
                                @on-change="onChangeInput(`newsTitle`)"
                                @on-enter="onChangeInput(`newsTitle`)">
                            </h-input>
                            <!-- <h-input
                                aria-placeholder="资讯标题"
                                placeholder="请输入资讯标题"
                                style="width: 70%"
                                v-model="commonHandle.newsTitle"
                                ref="newsTitle"
                                @on-change="onChangeInput(`newsTitle`)"
                                @on-enter="onChangeInput(`newsTitle`)">
                            </h-input>
                            <h-button
                                :disabled="isEmptyNewsTitle"
                                @on-click="onDoubleClick">
                                查看
                            </h-button> -->
                        </h-col>
                    </h-row>
                    <h-row class-name="common-handle-padding" v-else>
                        <h-col span="24">
                            <span class="audit-common-lable common-handle-required">资讯标题</span>
                            <div
                                data-dom="highlight-title-wrapper"
                                class="news-highlight-title-wrapper">
                                <span
                                    ref="highlight-title"
                                    class="news-highlight-title news-highlight-title-left news-highlight-title-disabled"
                                    data-dom="highlight-title">
                                </span>
                            </div>
                        </h-col>
                    </h-row>
                    <h-row class-name="common-handle-padding">
                        <h-col span="24">
                            <span class="audit-common-lable">链接地址</span>
                            <h-input
                                aria-placeholder="链接地址"
                                placeholder="链接地址"
                                style="width: 70%;"
                                ref="newsLink"
                                data-uid="newsLink"
                                title="点击复制, 资讯链接地址!"
                                v-model="commonHandle.newsLink"
                                @on-change="onChangeInput(`newsLink`)"
                                @on-enter="onChangeInput(`newsLink`)"
                                :readonly="true">
                            </h-input>
                            <a
                                :href="commonHandle.newsLink"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="common-handle-link"
                                style="width: 10%;"
                                icon="link">
                                打开链接
                            </a>
                        </h-col>
                    </h-row>
                    <h-row class-name="common-handle-padding">
                        <h-col span="24">
                            <span class="audit-common-lable">资讯摘要</span>
                            <h-input
                                aria-placeholder="请输入资讯摘要"
                                placeholder="请输入资讯摘要"
                                style="width: 80%"
                                type="textarea"
                                v-model="commonHandle.newsBrief"
                                @on-change="onChangeInput(`newsBrief`)"
                                @on-enter="onChangeInput(`newsBrief`)">
                            </h-input>
                        </h-col>
                    </h-row>
                    <h-row class-name="common-handle-padding">
                        <h-col span="12">
                            <span class="audit-common-lable">创建日期</span>
                            <h-input
                                aria-placeholder="创建日期"
                                placeholder="请输入创建日期"
                                style="width: 60%"
                                v-model="commonHandle.publishDate"
                                @on-change="onChangeInput(`publishDate`)"
                                @on-enter="onChangeInput(`publishDate`)"
                                disabled>
                            </h-input>
                            <!-- <h-date-picker
                                aria-placeholder="创建日期"
                                :placeholder="placeholders.publishDate"
                                style="width: 60%"
                                :value="commonHandle.publishDate"
                                disabled
                                @on-change="onChangeDatePicker">
                            </h-date-picker> -->
                        </h-col>
                        <h-col span="12">
                            <span class="audit-common-lable">发布时间</span>
                            <h-input
                                aria-placeholder="发布时间"
                                placeholder=""
                                style="width: 60%;"
                                v-model="commonHandle.newsPublishTime"
                                @on-change="onChangeInput(`newsPublishTime`)"
                                @on-enter="onChangeInput(`newsPublishTime`)"
                                disabled>
                            </h-input>
                        </h-col>
                    </h-row>
                    <h-row class-name="common-handle-padding">
                        <h-col span="12">
                            <span class="audit-common-lable">资讯 ID</span>
                            <!-- <h-input
                                aria-placeholder="资讯 ID"
                                placeholder="请输入资讯 ID"
                                style="width: 80%"
                                v-model="commonHandle.newsId"
                                @on-change="onChangeInput(`newsId`)"
                                @on-enter="onChangeInput(`newsId`)"
                                disabled>
                            </h-input> -->
                            <h-tooltip
                                style="width: 60%"
                                placement="top"
                                content="点击复制, 资讯 ID!">
                                <h-input
                                    aria-placeholder="资讯 ID"
                                    placeholder="请输入资讯 ID"
                                    style="width: 100%"
                                    ref="newsId"
                                    data-uid="newsId"
                                    v-model="commonHandle.newsId"
                                    @on-change="onChangeInput(`newsId`)"
                                    @on-enter="onChangeInput(`newsId`)"
                                    :readonly="true"
                                    :disabled="false">
                                </h-input>
                            </h-tooltip>
                        </h-col>
                        <h-col span="12">
                            <span class="audit-common-lable">处理状态</span>
                            <h-input
                                aria-placeholder="处理状态"
                                placeholder="处理状态"
                                style="width: 60%; color: #f00 !important;"
                                class="common-handle-status"
                                disabled
                                v-model="commonHandle.newsStatus"
                                @on-change="onChangeInput(`newsStatus`)"
                                @on-enter="onChangeInput(`newsStatus`)">
                            </h-input>
                        </h-col>
                    </h-row>
                    <h-row class-name="common-handle-padding">
                        <h-col span="12">
                            <span class="audit-common-lable">媒体出处</span>
                            <h-input
                                aria-placeholder="媒体出处"
                                placeholder="请输入媒体出处"
                                style="width: 60%"
                                v-model="commonHandle.mediaSource"
                                @on-change="onChangeInput(`mediaSource`)"
                                @on-enter="onChangeInput(`mediaSource`)">
                            </h-input>
                        </h-col>
                        <h-col span="12">
                            <span class="audit-common-lable">作者</span>
                            <h-input
                                aria-placeholder="作者"
                                placeholder="请输入作者"
                                style="width: 60%"
                                v-model="commonHandle.newsAuthor"
                                @on-change="onChangeInput(`newsAuthor`)"
                                @on-enter="onChangeInput(`newsAuthor`)">
                            </h-input>
                        </h-col>
                    </h-row>
                    <h-row class-name="common-handle-padding" v-if="isShowSensitiveWords">
                        <h-col span="24">
                            <span class="audit-common-lable">敏感词</span>
                            <h-input
                                aria-placeholder="请输入敏感词"
                                placeholder="请输入敏感词"
                                style="width: 80%; color: #f00 !important;"
                                class="common-handle-status"
                                type="textarea"
                                v-model="commonHandle.sensitiveWords"
                                @on-change="onChangeInput(`sensitiveWords`)"
                                @on-enter="onChangeInput(`sensitiveWords`)"
                                disabled>
                            </h-input>
                        </h-col>
                    </h-row>
                    <h-row class-name="common-handle-padding">
                        <h-col span="12">
                            <span class="audit-common-lable">公开标志</span>
                            <h-input
                                aria-placeholder="公开标志"
                                placeholder="请输入公开标志"
                                style="width: 60%"
                                v-model="commonHandle.publicFlag"
                                @on-change="onChangeInput(`publicFlag`)"
                                @on-enter="onChangeInput(`publicFlag`)"
                                disabled>
                            </h-input>
                        </h-col>
                        <h-col span="12" v-if="isShowMachineShield">
                            <span class="audit-common-lable-super-long">机器屏蔽原因: </span>
                            <h-input
                                aria-placeholder="机器屏蔽原因"
                                placeholder=""
                                style="width: 60%; transform: translateX(-22px);"
                                v-model="commonHandle.machineShield"
                                @on-change="onChangeInput(`machineShield`)"
                                @on-enter="onChangeInput(`machineShield`)"
                                disabled>
                            </h-input>
                        </h-col>
                    </h-row>
                    <h-row class-name="common-handle-padding">
                        <h-col span="24" v-if="!isEmptyCommonLogs">
                            <span class="audit-common-lable">处理记录</span>
                            <div
                                class="h-input-wrapper"
                                aria-placeholder="处理记录"
                                style="width: 80%;">
                                <div
                                    id="audit-common-handle-logs"
                                    >
                                    <!-- class="h-input"> -->
                                </div>
                            </div>
                        </h-col>
                        <!-- <h-col span="20">
                            <div
                                id="audit-common-handle-logs"
                                class="h-input">
                            </div>
                        </h-col> -->
                    </h-row>
                    <!-- <h-row class-name="common-handle-padding">
                        <h-col span="24">
                            <span class="audit-common-lable">处理记录</span>
                            <h-input
                                aria-placeholder="处理记录"
                                placeholder="处理记录"
                                style="width: 80%"
                                type="textarea"
                                v-model="commonHandle.newsHandleLogs"
                                @on-change="onChangeInput(`newsHandleLogs`)"
                                @on-enter="onChangeInput(`newsHandleLogs`)">
                            </h-input>
                        </h-col>
                    </h-row> -->
                </h-col>
                <h-col span="12">
                    <h-row class-name="common-handle-padding">
                        <h-col span="24">
                            <h-row class-name="common-handle-padding">
                                <h-col span="4">
                                    标签列表
                                </h-col>
                                <h-col span="4">
                                    <h-tooltip
                                        placement="right"
                                        :disabled="!isIndexesEmpty"
                                        content="请先选择要批量删除的行">
                                        <h-button
                                            type="error"
                                            icon="delete"
                                            data-ref="init-btn"
                                            @click="onClickBatchDelete(`delete`)"
                                            :disabled="isIndexesEmpty">
                                            批量删除
                                        </h-button>
                                    </h-tooltip>
                                </h-col>
                            </h-row>
                            <h-row class-name="common-handle-padding">
                                <h-col span="24">
                                    <h-table
                                        :columns="commonHandleTableCols"
                                        :data="commonHandleTableDatas"
                                        :maxHeight="tableFixedHeight"
                                        size="small"
                                        @on-selection-change="selectChange"
                                        border>
                                    </h-table>
                                    <!-- <h-table
                                        :columns="commonHandleTableCols"
                                        :data="commonHandleTableDatas"
                                        :loading="tableLoading"
                                        :height="tableFixedHeight"
                                        size="small"
                                        border>
                                    </h-table> -->
                                </h-col>
                            </h-row>
                            <!-- BID 列表 -->
                            <h-row class-name="common-handle-padding" v-if="!isBidTagsEmpty">
                                <h-col span="4">
                                    重名标签列表
                                </h-col>
                            </h-row>
                            <h-row class-name="common-handle-padding" v-if="!isBidTagsEmpty">
                                <h-col span="24">
                                    <section>
                                        <h-row class-name="bid-table-header">
                                            <h-col span="4" class-name="audit-bid-lable">
                                                <span class="audit-common-bid-lable">标签名称</span>
                                            </h-col>
                                            <h-col span="4" class-name="audit-bid-lable">
                                                <span class="audit-common-bid-lable">权重值</span>
                                            </h-col>
                                            <h-col span="4" class-name="audit-bid-lable">
                                                <span class="audit-common-bid-lable">标签分类</span>
                                            </h-col>
                                            <h-col span="6" class-name="audit-bid-lable">
                                                <span class="audit-common-bid-lable">BID</span>
                                            </h-col>
                                            <h-col span="6" class-name="audit-bid-lable">
                                                <span class="audit-common-bid-lable">操作</span>
                                            </h-col>
                                        </h-row>
                                        <h-row class-name="bid-table-content" v-if="!isBidTagsEmpty">
                                            <h-col span="24">
                                                <div v-for="(obj, index) in bidHandleTableDatas" :key="index">
                                                    <h-col span="4" class-name="bid-table-rows">
                                                        <span class="audit-common-bid-lable">{{obj.tagName}}</span>
                                                    </h-col>
                                                    <h-col span="4" class-name="bid-table-rows">
                                                        <span class="audit-common-bid-lable">{{obj.bidLabelWeight}}</span>
                                                    </h-col>
                                                    <h-col span="4" class-name="bid-table-row">
                                                        <span class="audit-common-bid-lable">{{obj.tagCategory}}</span>
                                                    </h-col>
                                                    <h-col span="6" class-name="bid-table-row">
                                                        <div
                                                            class="h-select-left h-select-selection"
                                                            style="width: 100%; display: inline-block;">
                                                            <select
                                                                aria-placeholder="请选择正确的 BID"
                                                                placeholder="请选择正确的 BID"
                                                                style="width: 100%"
                                                                v-model="obj.tagValue"
                                                                class="h-select-input select-overflow-ellipsis"
                                                                @change="e => onBidSelectChange(e, obj.tagIndex)"
                                                                :key="index">
                                                                <option
                                                                    class="h-checkbox-wrapper h-select-item"
                                                                    v-for="(item, i) in obj.tagOptions"
                                                                    :value="item.bid"
                                                                    :title="item.name"
                                                                    data-class="select-overflow-ellipsis"
                                                                    :key="i">
                                                                    {{item.name}}
                                                                </option>
                                                            </select>
                                                        </div>
                                                    </h-col>
                                                    <h-col span="6" class-name="bid-table-row">
                                                        <span class="audit-common-bid-lable">
                                                            <a
                                                                href="#"
                                                                class="audit-common-bid-table-delete"
                                                                @click="showDeleteBidModal(obj, index)">删除</a>
                                                        </span>
                                                    </h-col>
                                                </div>
                                            </h-col>
                                        </h-row>
                                        <h-row class-name="bid-table-content" v-else>
                                            <h-col span="24">
                                                <div>
                                                    <p data-none="no-data-p">
                                                        <span data-none="no-data-span">暂无数据</span>
                                                    </p>
                                                </div>
                                            </h-col>
                                        </h-row>
                                    </section>
                                </h-col>
                            </h-row>
                            <h-row class-name="common-handle-padding">
                                <!-- <h-col span="12">
                                    <span class="audit-common-lable">情感</span>
                                    <h-select
                                        aria-placeholder="情感"
                                        placeholder="请选择情感"
                                        style="width: 60%"
                                        v-model="commonHandle.newsEmotion"
                                        filterable
                                        clearable>
                                        <h-option
                                            v-for="(item, index) in newsEmotions"
                                            :value="item.value"
                                            :key="index">
                                            {{item.title}}
                                        </h-option>
                                    </h-select>
                                </h-col> -->
                            </h-row>
                        </h-col>
                    </h-row>
                </h-col>
            </h-row>
            <h-row class-name="common-handle-padding">
                <h-col span="24">
                    <span>原始文本:</span>
                    <hr class="audit-common-padding" />
                </h-col>
            </h-row>
            <h-row class-name="common-handle-padding">
                <h-col span="24">
                    <div
                        class="h-input-wrapper"
                        aria-placeholder="原始文本"
                        style="width: 100%;">
                        <div
                            id="audit-common-handle-text"
                            >
                            <!-- class="h-input"> -->
                        </div>
                    </div>
                </h-col>
                <!-- <h-col span="24">
                    <h-input
                        placeholder="请输入..."
                        type="textarea"
                        v-model="commonHandle.textArea"
                        data-input="textarea"
                        :canResize="canResize"
                        :autosize="textareaAutoSize"
                        :disabled="textAreaDisabled"
                        readonly>
                    </h-input>
                </h-col> -->
            </h-row>
        </div>
        <!-- modal -->
        <h-msgBox
            title="删除操作"
            @on-ok="reSureDeleteBid"
            v-model="deleteBidModal.showModal"
            :loading="deleteBidModal.modalLoading">
            <span class="audit-common-lable-long">确认删除 BID 标签: {{deleteBidLabelName}}</span>
            <!-- removeReasons -->
            <hr class="audit-common-padding" />
            <span class="audit-common-lable">删除原因</span>
            <h-select
                aria-placeholder="删除原因"
                placeholder="请选择删除原因"
                style="width:205px"
                v-model="removeBidTagReason"
                @on-change="onRemoveSelectChange(`removeBidTagReason`)"
                filterable
                :clearable="false">
                <h-option
                    v-for="(item, i) in removeBidTagReasons"
                    :value="item.value"
                    :key="i">
                    {{item.title}}
                </h-option>
            </h-select>
        </h-msgBox>
        <h-msgBox
            title="删除操作"
            @on-ok="reSureDeleteOK"
            v-model="deleteModal.showModal"
            :loading="deleteModal.modalLoading">
            <span class="audit-common-lable-long">确认删除标签: {{deleteLabelName}}</span>
            <!-- removeReasons -->
            <hr class="audit-common-padding" />
            <div>
                <span class="audit-common-lable">删除原因</span>
                <h-select
                    aria-placeholder="删除原因"
                    placeholder="请选择删除原因"
                    style="width: 205px;"
                    v-model="removeTagReason"
                    @on-change="onRemoveTagSelectChange(`removeTagReason`)"
                    ref="removeTagReasonSelect"
                    filterable
                    :clearable="false">
                    <h-option
                        v-for="(item, i) in removeTagReasons"
                        :value="item.value"
                        :key="i">
                        {{item.title}}
                    </h-option>
                </h-select>
            </div>
            <hr class="audit-common-padding" />
            <div v-if="isRemoveTagReasonOther">
                <span class="audit-common-lable">其他原因</span>
                <h-input
                    aria-placeholder="请输入删除的其他原因!"
                    placeholder="请输入删除的其他原因!"
                    style="width: 205px;"
                    ref="newsLink"
                    data-uid="removeTagReasonOther"
                    v-model="removeTagReasonOther"
                    @on-change="onRemoveTagReasonChangeInput(`removeTagReasonOther`)"
                    @on-enter="onRemoveTagReasonChangeInput(`removeTagReasonOther`)"
                    :readonly="false">
                </h-input>
            </div>
            <div slot="footer">
                <h-button
                    @click="reSureDeleteCancel">
                    取消
                </h-button>
                <h-tooltip
                    v-if="isRemoveTagReasonValid"
                    style="width: auto"
                    placement="top"
                    :content="removeTagReasonTooltips">
                    <h-button
                        type="primary"
                        :disabled="isRemoveTagReasonValid"
                        @click="reSureDeleteOK">
                        确认
                    </h-button>
                </h-tooltip>
                <h-button
                    v-else
                    type="primary"
                    :disabled="isRemoveTagReasonValid"
                    @click="reSureDeleteOK">
                    确认
                </h-button>
            </div>
        </h-msgBox>
        <h-msgBox
            title="操作"
            @on-ok="reSureOK"
            v-model="modalResure.showModal"
            :loading="modalResure.modalLoading">
            <!-- 二次确认: 公开/屏蔽/处理通过 -->
            <span class="audit-common-lable">确认</span>{{handleUpdateModalTitle}}
            <div v-if="isShieldType">
                <hr class="audit-common-padding" />
                <span class="audit-common-lable">屏蔽原因</span>
                <h-select
                    aria-placeholder="屏蔽原因"
                    placeholder="请选择屏蔽原因"
                    style="width:205px"
                    v-model="shieldTagReason"
                    @on-change="onShieldSelectChange(`shieldTagReason`)"
                    ref="shieldTagReasonSelect"
                    filterable
                    :clearable="false">
                    <h-option
                        v-for="(item, i) in shieldTagReasons"
                        :value="item.value"
                        :key="i">
                        {{item.title}}
                    </h-option>
                </h-select>
            </div>
            <div slot="footer">
                <h-button
                    @click="reSureCancel">
                    取消
                </h-button>
                <h-tooltip
                    v-if="isShieldValid"
                    style="width: auto"
                    placement="top"
                    content="请选择屏蔽原因!">
                    <h-button
                        type="primary"
                        :disabled="isShieldValid"
                        @click="reSureOK">
                        确认
                    </h-button>
                </h-tooltip>
                <h-button
                    v-else
                    type="primary"
                    :disabled="isShieldValid"
                    @click="reSureOK">
                    确认
                </h-button>
            </div>
        </h-msgBox>
        <h-msgBox
            title="添加标签"
            @on-ok="asyncOK"
            v-model="modalNew.showModal"
            :loading="modalNew.modalLoading"
            top="50"
            :width="autoMaxModalWidth"
            height="520"
            footerHide>
            <div class="audit-common-footer">
                <h-row class-name="common-handle-padding">
                    <h-col span="24">
                        <h-row class-name="common-handle-padding">
                            <h-col :span="autoSpanTreeSize">
                                <h-row class-name="common-handle-padding">
                                    <h-col span="24">
                                        <span style="padding-left: 10px;">标签分类: </span>
                                        <h-select-tree
                                            v-model="labelCategoryModal"
                                            aria-placeholder="标签分类"
                                            placeholder="标签分类(默认值: 文本标签)"
                                            style="width: 70%"
                                            :data="labelCategories"
                                            @on-select-change="onSelectTreeChange"
                                            :expanLevel="expandLevel"
                                            :clearable="false">
                                        </h-select-tree>
                                    </h-col>
                                </h-row>
                            </h-col>
                            <h-col span="12" v-if="isShowPersonTagRelationInfo">
                                <h-row>
                                    <h-col span="12">
                                        <h-input
                                            aria-placeholder="标签名称"
                                            placeholder="请输入标签名称"
                                            style="width: 80% min-width: 200px;"
                                            v-model="searchValue"
                                            @on-change="onInputChange(`searchValue`)"
                                            @on-enter="onChangeInputEnter(`searchValue`)"
                                            icon="android-close"
                                            ref="searchValue"
                                            @on-click="shitClearableClick(`searchValue`)"
                                            clearable>
                                        </h-input>
                                    </h-col>
                                    <h-col span="12">
                                        <h-input
                                            aria-placeholder="人物标签关联信息"
                                            placeholder="请输入人物标签关联信息"
                                            style="width: 80%; min-width: 200px;"
                                            v-model="personTagRelationInfo"
                                            @on-change="onInputChange(`personTagRelationInfo`)"
                                            @on-enter="onChangeInputEnter(`personTagRelationInfo`)"
                                            icon="android-close"
                                            ref="personTagRelationInfo"
                                            @on-click="shitClearableClick(`personTagRelationInfo`)"
                                            clearable>
                                        </h-input>
                                    </h-col>
                                </h-row>
                            </h-col>
                            <h-col span="8" v-else>
                                <h-row>
                                    <h-col span="24">
                                        <h-input
                                            aria-placeholder="标签名称"
                                            placeholder="请输入标签名称"
                                            style="width: 80%"
                                            v-model="searchValue"
                                            @on-change="onInputChange(`searchValue`)"
                                            @on-enter="onChangeInputEnter(`searchValue`)"
                                            icon="android-close"
                                            ref="searchValue"
                                            @on-click="shitClearableClick(`searchValue`)"
                                            clearable>
                                        </h-input>
                                    </h-col>
                                </h-row>
                            </h-col>
                            <h-col :span="autoSpanButtonSize">
                                <h-row>
                                    <h-col span="24">
                                        <h-tooltip
                                            placement="top"
                                            :disabled="!isEmptySearch"
                                            content="查询标签不可为空">
                                            <h-button
                                                :loading="modalLabelCheck.modalLoading"
                                                @click="onClickSearch"
                                                :disabled="isEmptySearch"
                                                type="primary">
                                                查询
                                            </h-button>
                                        </h-tooltip>
                                    </h-col>
                                </h-row>
                            </h-col>
                            <h-col :span="autoSpanButtonSize">
                                <h-row>
                                    <h-col span="24">
                                        <h-tooltip
                                            placement="top"
                                            :disabled="!isEmptySearch"
                                            content="请先查询标签才可以新增标签">
                                            <h-button
                                                @click="clickShowNewAddModal"
                                                :disabled="isEmptySearch">
                                                新增
                                            </h-button>
                                        </h-tooltip>
                                    </h-col>
                                </h-row>
                            </h-col>
                            <!-- <h-col span="3" v-else>
                                <h-row>
                                    <h-col span="24">
                                        <h-tooltip
                                            placement="top"
                                            :disabled="!isEmptySearch"
                                            content="请先查询标签才可以添加标签">
                                            <h-button
                                                @click="clickShowAddModal"
                                                :disabled="isEmptySearch">
                                                添加
                                            </h-button>
                                        </h-tooltip>
                                    </h-col>
                                </h-row>
                            </h-col> -->
                        </h-row>
                        <h-row class-name="common-handle-padding">
                            <h-col span="24" v-if="!isNewAddLabel">
                                <h-row class-name="common-handle-padding">
                                    <h-col span="4" offset="0" style="padding-left: 10px;">
                                        标签名称列表:
                                    </h-col>
                                </h-row>
                                <h-row class-name="common-handle-padding">
                                    <h-col span="24" offset="0" style="padding-left: 10px;">
                                        <h-table
                                            :disabled="!isEmptySearch"
                                            :columns="commonHandleModalTableCols"
                                            :data="commonHandleModalTableDatas"
                                            :loading="tableLoading"
                                            :maxHeight="modalTableFixedHeight"
                                            size="small"
                                            border>
                                        </h-table>
                                    </h-col>
                                </h-row>
                                <h-row class-name="audit-common-row-padding">
                                    <h-col span="24">
                                        <div style="float: right;">
                                            <h-page
                                                @on-change="onPageChange"
                                                @on-page-size-change="onPageSizeChange"
                                                :total="pagination.total"
                                                :page-size="pagination.size"
                                                :current="pagination.current"
                                                show-elevator
                                                size="small"
                                                show-total>
                                            </h-page>
                                        </div>
                                    </h-col>
                                </h-row>
                            </h-col>
                        </h-row>
                    </h-col>
                </h-row>
            </div>
        </h-msgBox>
        <h-msgBox
            title="新增标签"
            @on-ok="asyncNewAdd"
            v-model="modalNewAdd.showModal"
            :loading="modalNewAdd.modalLoading">
            <!-- 二次确认: 新增标签 -->
            <h-row>
                <h-col span="24">
                    <span>行业类别: <strong>{{labelAddType}}</strong></span>
                    <br/>
                    <span>标签名称: <strong>{{searchValue}}</strong></span>
                </h-col>
            </h-row>
        </h-msgBox>
        <h-msgBox
            title="添加标签"
            @on-ok="asyncAddTag"
            v-model="modalAdd.showModal"
            :loading="modalAdd.modalLoading">
            <h-row>
                <h-col span="24">
                    <span>行业类别: <strong>{{labelAddType}}</strong></span>
                    <br/>
                    <span>关联信息: <strong>{{labelCategoryAlias}}</strong></span>
                    <br/>
                    <span>标签名称: <strong>{{labelCategoryText}}</strong></span>
                </h-col>
            </h-row>
        </h-msgBox>
        <!-- <h-msgBox
            title="添加标签"
            @on-ok="asyncAdd"
            v-model="modalAdd.showModal"
            :loading="modalAdd.modalLoading">
            <h-row>
                <h-col span="12">
                    <span>行业类别: <strong>{{labelAddType}}</strong></span>
                    <br/>
                    <span>标签名称: <strong>{{labelCategoryText}}</strong></span>
                </h-col>
            </h-row>
        </h-msgBox> -->
        <h-msgBox
            title="添加热词"
            @on-ok="asyncAddHotWord"
            v-model="modalHotWord.showModal"
            :loading="modalHotWord.modalLoading">
            <h-row>
                <h-col span="24">
                    <span>热词名称: <strong>{{labelHotWord}}</strong></span>
                </h-col>
            </h-row>
        </h-msgBox>
        <h-msgBox
            title="添加歧义词"
            @on-ok="asyncAddAmbiguousWord"
            v-model="modalAmbiguousWord.showModal"
            :loading="modalAmbiguousWord.modalLoading">
            <h-row>
                <h-col span="24">
                    <span>歧义词名称: <strong>{{labelAmbiguousWord}}</strong></span>
                </h-col>
            </h-row>
        </h-msgBox>
        <section data-uid="menus" class="hidden-menus">
            <h-row>
                <h-col span="24">
                    <h-button
                        type="primary"
                        data-ref="init-btn"
                        class="hidden-menus-btn-primary"
                        @click="clickShowAdd">
                        + 添加标签
                    </h-button>
                    <!-- <h-button
                        type="primary"
                        icon="search"
                        data-ref="init-btn"
                        class="hidden-menus-btn-primary"
                        @click="clickShowNewAddModal"
                        :disabled="!isEmptySearch">
                        添加标签
                    </h-button> -->
                </h-col>
                <h-col span="24">
                    <span class="hidden-menus-space" />
                </h-col>
                <h-col span="24">
                    <h-button
                        type="primary"
                        data-ref="init-btn"
                        class="hidden-menus-btn-primary"
                        @click="clickShowHotWord">
                        + 添加热词
                    </h-button>
                </h-col>
                <h-col span="24">
                    <span class="hidden-menus-space" />
                </h-col>
                <h-col span="24">
                    <h-button
                        type="primary"
                        data-ref="init-btn"
                        class="hidden-menus-btn-primary"
                        @click="clickShowAmbiguousWord">
                        添加歧义词
                    </h-button>
                </h-col>
            </h-row>
        </section>
        <h-msgBox
            title="批量删除操作"
            @on-ok="reSureBatchDeleteOK"
            v-model="modalDelete.showModal"
            :loading="modalDelete.modalLoading">
            <span class="audit-common-lable-long">确认批量删除标签</span>
            <!-- removeReasons -->
            <hr class="audit-common-padding" />
            <div>
                <span class="audit-common-lable">删除原因</span>
                <h-select
                    aria-placeholder="批量删除原因"
                    placeholder="请选择批量删除原因"
                    style="width: 205px;"
                    v-model="removeBatchTagReason"
                    @on-change="onRemoveBatchTagSelectChange(`removeBatchTagReason`)"
                    ref="removeBatchTagReasonSelect"
                    filterable
                    :clearable="false">
                    <h-option
                        v-for="(item, i) in removeTagReasons"
                        :value="item.value"
                        :key="i">
                        {{item.title}}
                    </h-option>
                </h-select>
            </div>
            <hr class="audit-common-padding" />
            <div v-if="isRemoveBatchTagReasonOther">
                <span class="audit-common-lable">其他原因</span>
                <h-input
                    aria-placeholder="请输入批量删除的其他原因!"
                    placeholder="请输入批量删除的其他原因!"
                    style="width: 205px;"
                    ref="newsBatchLink"
                    data-uid="removeBatchTagReasonOther"
                    v-model="removeBatchTagReasonOther"
                    @on-change="onRemoveBatchTagReasonChangeInput(`removeBatchTagReasonOther`)"
                    @on-enter="onRemoveBatchTagReasonChangeInput(`removeBatchTagReasonOther`)"
                    :readonly="false">
                </h-input>
            </div>
            <div slot="footer">
                <h-button
                    @click="reSureBatchDeleteCancel">
                    取消
                </h-button>
                <h-tooltip
                    v-if="isRemoveBatchTagReasonValid"
                    style="width: auto"
                    placement="top"
                    :content="removeBatchTagReasonTooltips">
                    <h-button
                        type="primary"
                        :disabled="isRemoveBatchTagReasonValid"
                        @click="reSureBatchDeleteOK">
                        确认
                    </h-button>
                </h-tooltip>
                <h-button
                    v-else
                    type="primary"
                    :disabled="isRemoveBatchTagReasonValid"
                    @click="reSureBatchDeleteOK">
                    确认
                </h-button>
            </div>
        </h-msgBox>
    </section>
</template>

<script>
    /**
     *
     * @author xiagq
     * @copyright gildata
     *
     * @created 2019.02.18
     * @modified 2019.02.18
     *
     * @description 处理 operateHandle
     * @augments
     * @example
     *
     */
    // import Code from '../../code/selectTree';
    import {
        TODAY,
        UQSTO,
        getPosition,
        positionMenu,
    } from "../utils";
    export default {
        data () {
            return {
                newsHighLightTitleBackup: "",
                showHighLightTitle: false,
                newsHighLightTitle: "",// showXwbt
                isHashRouterNewsId: false,
                // remove
                shitBatchTags: [],
                removeBatchTags: [],
                removeBatchTagReason: "",
                // removeBatchTagReasons: [],
                isRemoveBatchTagReasonValid: true,
                isRemoveBatchTagReasonOther: false,
                removeBatchTagReasonOther: "",
                removeBatchTagReasonTooltips: "请选择批量删除原因!",
                // 批量删除
                isIndexesEmpty: true,
                isBatchDelete: false,
                batchDeleteUids: [],
                modalDelete: {
                    modalLoading: true,
                    showModal: false,
                    maximize: true,
                    scrollable: true,
                    transfer: false,
                    title: "",
                },
                expandLevel: 1,
                // autoSpanSize
                autoSpanTreeSize: 10,
                autoSpanButtonSize: 3,
                autoMaxModalWidth: 1000,
                // autoMaxModalWidth: 800,
                // 关联信息
                personTagRelationInfo: "",
                isShowPersonTagRelationInfo: false,
                isShowSensitiveWords: false,
                isShieldValid: true,
                // disabledResureButton: false,
                isShieldType: false,
                shieldTagReason: "",
                shieldTagReasons: [],
                // table & select
                isBidTagsEmpty: false,
                bidHandleTableDatas: [],
                initBidTags: [],
                bidTagsNames: [],
                // bidTags: [],
                // bidTagsIds: [],
                removeBidTagReasons: [
                    {
                        "value": 1,
                        "title": "与正文内容不符"
                    },
                    {
                        "value": 2,
                        "title": "标签重复"
                    },
                    {
                        "value": 3,
                        "title": "标签错误"
                    },
                    {
                        "value": 4,
                        "title": "其他",
                    },
                ],
                removeBidTagReason: 1,
                deleteBidLabelName: "",
                deleteBidModal: {
                    modalLoading: true,
                    showModal: false,
                    maximize: true,
                    scrollable: true,
                    transfer: false,
                    title: "",
                    obj: {},
                },
                // new add
                isFirstLoad: true,
                removeTagReason: "",
                removeTagReasons: [],
                // remove
                isRemoveTagReasonValid: true,
                isRemoveTagReasonOther: false,
                removeTagReasonOther: "",
                removeTagReasonTooltips: "请选择删除原因!",
                // disabledRemoveTagReasonButton: false,
                removeTags: [],
                // remove
                isNewsHandleFinsihed: true,// 处理状态
                isFirstNews: false,
                isLastNews: false,
                prevNewsId: "",
                nextNewsId: "",
                pageFlipObj: {},
                // activeRoutersButton: this.$store.state.activeRoutersButton,
                labelCategoryAlias: "",
                labelAddType: "文本标签",
                labelAddName: "",
                handleUpdateType: "",// open / close / passed
                handleUpdateModalTitle: "",
                handleUpdateModalMessage: "",
                textareaAutoSize: {
                    minRows: 12,
                    maxRows: 27,
                },
                textareaAutoSizeModal: {
                    minRows: 27,
                    maxRows: 37,
                },
                canResize: true,
                textAreaDisabled: false,
                labelCategories: [],
                newsEmotions: [],
                tableFixedHeight: 240,
                modalMenus: {
                    modalLoading: true,
                    showModal: false,
                    maximize: true,
                    scrollable: true,
                    transfer: false,
                },
                labelHotWord: "",
                modalHotWord: {
                    modalLoading: true,
                    showModal: false,
                    maximize: true,
                    scrollable: true,
                    transfer: false,
                },
                // modalAmbiguousWord
                labelAmbiguousWord: "",
                modalAmbiguousWord: {
                    modalLoading: true,
                    showModal: false,
                    maximize: true,
                    scrollable: true,
                    transfer: false,
                },
                modalNew: {
                    modalLoading: true,
                    showModal: false,
                    maximize: true,
                    scrollable: true,
                    transfer: false,
                },
                modalLabelCheck: {
                    modalLoading: false,
                    showModal: false,
                },
                modalAdd: {
                    modalLoading: true,
                    showModal: false,
                    maximize: true,
                    scrollable: true,
                    transfer: false,
                },
                modalNewAdd: {
                    modalLoading: true,
                    showModal: false,
                    maximize: true,
                    scrollable: true,
                    transfer: false,
                    // modalNewAdd.isNewAdd
                    isNewAdd: true,
                },
                modalResure: {
                    modalLoading: true,
                    showModal: false,
                    maximize: true,
                    scrollable: true,
                    transfer: false,
                    title: "",
                },
                deleteModal: {
                    modalLoading: true,
                    showModal: false,
                    maximize: true,
                    scrollable: true,
                    transfer: false,
                    title: "",
                    obj: {},
                },
                labelCategories: [],
                labelCategorySelects: [],
                labelCategoryModal: "",
                labelCategorySelect: "",
                labelCategoryName: "",
                labelCategoryText: "",
                // labelCategoryId: "",
                labelCategoryId: "101",
                isNewAddLabel: true,
                // searchValue: {},// 箱包
                searchValue: "",
                searchBackupValue: "",
                isEmptySearch: true,
                mediaSources: [],
                columnCategories: [],
                priorities: [],
                newsIds: [],
                commonHandle: {
                    newsStatus: "",
                    newsTitle: "",
                    newsLink: "",
                    newsBrief: "",
                    newsSource: "",
                    // publishDate: TODAY,
                    publishDate: "",
                    newsPublishTime: "",
                    // priority: "",
                    newsId: "",
                    mediaSource: "",
                    newsAuthor: "",
                    newsEmotion: "",
                    textArea: "",
                    textAreaModal: "",
                    openFlag: false,
                    newsLogs: [],
                    newsHandleLogs: "",
                    sensitiveWords: "",
                    publicFlag: "",
                    removeTags: [],
                    machineShield: "",
                },
                // isShowMachineShield: true,
                isShowMachineShield: false,
                placeholders: {
                    publishDate: "请输入查询日期",
                    // publishDate: "开始日期    ~    结束日期",
                },
                tableLoading: false,
                commonHandleTableCols: [
                    {
                        type: "selection",
                        width: 30,
                        align: "center",
                        fixed: "left",
                        className: "mini-cell-width",
                    },
                    // {
                    //     type: "selection",
                    //     width: 60,
                    //     align: "center",
                    // },
                    {
                        key: "index",
                        title: "序号",
                        width: 40,
                        align: "center",
                        className: "mini-cell-width",
                    },
                    {
                        key: "labelName",
                        title: "标签名称",
                        // sortable: true,
                        width: 120,
                        align: "center",
                        render: (h, params) => {
                            let {
                                labelName,
                            } = params.row;
                            return h("div", {
                                    attrs: {
                                        "title": `${labelName}`,
                                        "data-title": `${labelName}`,
                                    },
                                },
                                [
                                    h("span", {
                                        attrs: {
                                            disabled: true,
                                            "aria-placeholder": "标签名称",
                                            placeholder: "请输入标签名称",
                                        },
                                        on: {
                                            // click: this.clickHandler,
                                        },
                                    }, labelName),
                                    // h("h-input", {
                                    //     props: {
                                    //         value: labelName,
                                    //     },
                                    //     attrs: {
                                    //         disabled: true,
                                    //         "aria-placeholder": "标签名称",
                                    //         placeholder: "请输入标签名称",
                                    //     },
                                    //     on: {
                                    //         // click: this.clickHandler,
                                    //         // change: this.onChangeInput("labelName"),
                                    //         // enter: this.onChangeInput("labelName"),
                                    //     },
                                    // }),
                                ]
                            );
                        },
                    },
                    {
                        key: "labelWeight",
                        title: "权重值",
                        // sortable: true,
                        width: 80,
                        align: "center",
                        render: (h, params) => {
                            let {
                                labelWeight,
                            } = params.row;
                            return h("span",
                                {
                                    attrs: {
                                        disabled: true,
                                        "aria-placeholder": "标签权重值",
                                    },
                                    on: {
                                        // click: this.clickHandler,
                                    },
                                },
                                labelWeight
                            );
                        },
                    },
                    {
                        key: "labelAlias",
                        title: "标签关联信息",
                        // sortable: true,
                        width: 120,
                        align: "center",
                        render: (h, params) => {
                            let {
                                labelAlias,
                            } = params.row;
                            return h("div", {
                                    attrs: {
                                        "title": `${labelAlias}`,
                                        "data-title": `${labelAlias}`,
                                    },
                                },
                                [
                                    h("span", {
                                        attrs: {
                                            disabled: true,
                                            "aria-placeholder": "标签关联信息",
                                            placeholder: "请输入标签关联信息",
                                        },
                                        on: {
                                            // click: this.clickHandler,
                                        },
                                    }, labelAlias),
                                ]
                            );
                        },
                    },
                    {
                        key: "synonyms",
                        title: "标签近义词",
                        width: 120,
                        align: "center",
                    },
                    {
                        key: "labelCategory",
                        title: "标签分类",
                        // width: 120,
                        align: "center",
                        render: (h, params) => {
                            let {
                                tagCategory: labelCategory,
                            } = params.row;
                            return h("div", {
                                    attrs: {
                                        "title": `${labelCategory}`,
                                        "data-title": `${labelCategory}`,
                                    },
                                },
                                [
                                    h("span", {
                                        attrs: {
                                            disabled: true,
                                            "aria-placeholder": "标签名称",
                                            placeholder: "请输入标签名称",
                                        },
                                        on: {
                                            // click: this.clickHandler,
                                        },
                                    }, labelCategory),
                                    // h("h-input", {
                                    //     props: {
                                    //         value: labelCategory ? labelCategory : "",
                                    //     },
                                    //     attrs: {
                                    //         disabled: true,
                                    //         "aria-placeholder": "标签分类",
                                    //         placeholder: "请输入标签分类",
                                    //     },
                                    //     on: {
                                    //         // click: this.clickHandler,
                                    //         // change: this.onChangeInput("labelName"),
                                    //         // enter: this.onChangeInput("labelName"),
                                    //     },
                                    // }, labelCategory),
                                ]
                            );
                        },
                    },
                    {
                        key: "operation",
                        title: "操作",
                        width: 60,
                        align: "center",
                        fixed: "right",
                        render: (h, params) => {
                            let type = `common-handle-delete`;
                            let {
                                tag_id: uid,
                                // tagCategory: uid,
                                labelName,
                                index,
                            } = params.row;
                            // console.log(`params.row.tag_id = `, params.row.tag_id);
                            return h("div", [
                                h("a", {
                                    attrs: {
                                        "data-type": type,
                                    },
                                    class: [
                                        "audit-common-link",
                                    ],
                                    style: {
                                        color: "#298DFF !important",
                                        textDecoration: "none",
                                        cursor: "pointer",
                                        marginRight: "5px",
                                    },
                                    on: {
                                        click: () => {
                                            // 删除
                                            // this.remove(params.index);// ??? if success & delete
                                            // this.deleteTag(uid);
                                            this.deleteLabelName = labelName;
                                            this.showDeleteModal({
                                                uid,
                                                index,
                                            });
                                            // this.deleteTag({
                                            //     uid,
                                            //     index,
                                            // });
                                        },
                                    }
                                }, "删除"),
                            ]);
                        },
                    },
                ],
                initCommonHandleTableDatas: [],
                deleteLabelName: "",
                // new
                uniqueTagsIds: [],
                modalTableFixedHeight: 370,
                // modalTableFixedHeight: 450,
                commonHandleModalTableCols: [
                    // {
                    //     type: "selection",
                    //     width: 60,
                    //     align: "center",
                    // },
                    // {
                    //     key: "index",
                    //     title: "序号",
                    //     width: 60,
                    //     align: "center",
                    // },
                    {
                        key: "labelName",
                        title: "标签名称",
                        // sortable: true,
                        // width: 200,
                        align: "center",
                        render: (h, params) => {
                            let {
                                bqmc: labelName,
                            } = params.row;
                            return h("div", {
                                    attrs: {
                                        "title": `${labelName}`,
                                        "data-title": `${labelName}`,
                                    },
                                },
                                [
                                    h("span", {
                                        attrs: {
                                            disabled: true,
                                            "aria-placeholder": "标签名称",
                                            placeholder: "请输入标签名称",
                                        },
                                        on: {
                                            // click: this.clickHandler,
                                        },
                                    }, labelName),
                                ]
                            );
                        },
                    },
                    {
                        key: "labelCategory",
                        title: "标签分类",
                        // width: 80,
                        align: "center",
                        render: (h, params) => {
                            let {
                                // tagCategory: labelCategory,
                                // bqlb: labelCategory,
                                bqlb: labelCategories,
                            } = params.row;
                            let labelCategory = " ";
                            if (labelCategories) {
                                // labelCategory = labelCategories[1];
                                // if (labelCategories[1] === "机构") {
                                //     labelCategory = labelCategories[2] || "";
                                // }
                                labelCategory = labelCategories.slice(1).toString();
                            }
                            // labelCategory = labelCategory.toString();
                            return h("div", {
                                    attrs: {
                                        "title": `${labelCategory}`,
                                        "data-title": `${labelCategory}`,
                                    },
                                },
                                [
                                    h("span", {
                                        attrs: {
                                            disabled: true,
                                            "aria-placeholder": "标签名称",
                                            placeholder: "请输入标签名称",
                                        },
                                        on: {
                                            // click: this.clickHandler,
                                        },
                                    }, labelCategory),
                                ]
                            );
                        },
                    },
                    {
                        key: "operation",
                        title: "操作",
                        width: 80,
                        align: "center",
                        // fixed: "right",
                        render: (h, params) => {
                            let type = `common-handle-delete`;
                            let {
                                bqdm,
                                bqlb,
                                bqmc,
                                bqywdm,
                                dlid,
                                zxid,
                            } = params.row;
                            let uid = dlid;
                            let labelCategory = bqlb;
                            let labelName = bqmc;
                            let tagObj = {
                                bqdm,
                                bqlb,
                                bqmc,
                                bqywdm,
                                dlid,
                                zxid,
                            };
                            // console.log(`params.row.tag_id = `, params.row.tag_id);
                            return h("div", [
                                h("a", {
                                    attrs: {
                                        "data-type": type,
                                    },
                                    class: [
                                        "audit-common-link",
                                    ],
                                    style: {
                                        color: "#298DFF !important",
                                        textDecoration: "none",
                                        cursor: "pointer",
                                        marginRight: "5px",
                                    },
                                    on: {
                                        click: () => {
                                            // 删除
                                            // this.remove(params.index);// ??? if success & delete
                                            // this.deleteTag(uid);
                                            // this.showDeleteModal({
                                            //     uid,
                                            //     index,
                                            // });
                                            this.clickShowAddModal();
                                            // console.log(`labelCategory uid`, uid);
                                            // console.log(`labelCategorySelect`, JSON.stringify(params.row, null, 4));
                                            this.labelAddType = labelCategory.toString() || "";
                                            this.labelCategoryText = labelName || "";
                                            this.labelCategorySelect = JSON.stringify(tagObj) || "";
                                            // this.deleteTag({
                                            //     uid,
                                            //     index,
                                            // });
                                        },
                                    }
                                }, "添加"),
                            ]);
                        },
                    },
                ],
                commonHandleModalTableColsWithAlias: [
                    // {
                    //     type: "selection",
                    //     width: 60,
                    //     align: "center",
                    // },
                    // {
                    //     key: "index",
                    //     title: "序号",
                    //     width: 60,
                    //     align: "center",
                    // },
                    {
                        key: "labelName",
                        title: "标签名称",
                        // sortable: true,
                        // width: 200,
                        align: "center",
                        render: (h, params) => {
                            let {
                                bqmc: labelName,
                            } = params.row;
                            return h("div", {
                                    attrs: {
                                        "title": `${labelName}`,
                                        "data-title": `${labelName}`,
                                    },
                                },
                                [
                                    h("span", {
                                        attrs: {
                                            disabled: true,
                                            "aria-placeholder": "标签名称",
                                            placeholder: "请输入标签名称",
                                        },
                                        on: {
                                            // click: this.clickHandler,
                                        },
                                    }, labelName),
                                ]
                            );
                        },
                    },
                    {
                        key: "labelAlias",
                        title: "关联信息",
                        // sortable: true,
                        // width: 200,
                        align: "center",
                        render: (h, params) => {
                            let {
                                alias: labelAlias,
                            } = params.row;
                            // console.log(`alias `, JSON.stringify(params.row, null, 4));
                            return h("div", {
                                    attrs: {
                                        "title": `${labelAlias}`,
                                        "data-title": `${labelAlias}`,
                                    },
                                },
                                [
                                    h("span", {
                                        attrs: {
                                            disabled: true,
                                            "aria-placeholder": "标签名称",
                                            placeholder: "请输入标签名称",
                                        },
                                        on: {
                                            // click: this.clickHandler,
                                        },
                                    }, labelAlias),
                                ]
                            );
                        },
                    },
                    // {
                    //     key: "synonyms",
                    //     title: "标签近义词",
                    //     // width: 80,
                    //     align: "center",
                    // },
                    {
                        key: "labelCategory",
                        title: "标签分类",
                        // width: 80,
                        align: "center",
                        render: (h, params) => {
                            let {
                                // tagCategory: labelCategory,
                                // bqlb: labelCategory,
                                bqlb: labelCategories,
                            } = params.row;
                            let labelCategory = " ";
                            if (labelCategories) {
                                // labelCategory = labelCategories[1];
                                // if (labelCategories[1] === "机构") {
                                //     labelCategory = labelCategories[2] || "";
                                // }
                                labelCategory = labelCategories.slice(1).toString();
                            }
                            // labelCategory = labelCategory.toString();
                            return h("div", {
                                    attrs: {
                                        "title": `${labelCategory}`,
                                        "data-title": `${labelCategory}`,
                                    },
                                },
                                [
                                    h("span", {
                                        attrs: {
                                            disabled: true,
                                            "aria-placeholder": "标签名称",
                                            placeholder: "请输入标签名称",
                                        },
                                        on: {
                                            // click: this.clickHandler,
                                        },
                                    }, labelCategory),
                                ]
                            );
                        },
                    },
                    {
                        key: "operation",
                        title: "操作",
                        width: 80,
                        align: "center",
                        // fixed: "right",
                        render: (h, params) => {
                            let type = `common-handle-delete`;
                            let {
                                bqdm,
                                bqlb,
                                bqmc,
                                bqywdm,
                                dlid,
                                zxid,
                                alias: relationInfo,
                            } = params.row;
                            let uid = dlid;
                            // label
                            let labelCategory = bqlb;
                            let labelName = bqmc;
                            let labelCategoryAlias = relationInfo;
                            let tagObj = {
                                bqdm,
                                bqlb,
                                bqmc,
                                bqywdm,
                                dlid,
                                zxid,
                                relationInfo,
                            };
                            // console.log(`params.row.tag_id = `, params.row.tag_id);
                            return h("div", [
                                h("a", {
                                    attrs: {
                                        "data-type": type,
                                    },
                                    class: [
                                        "audit-common-link",
                                    ],
                                    style: {
                                        color: "#298DFF !important",
                                        textDecoration: "none",
                                        cursor: "pointer",
                                        marginRight: "5px",
                                    },
                                    on: {
                                        click: () => {
                                            // 删除
                                            // this.remove(params.index);// ??? if success & delete
                                            // this.deleteTag(uid);
                                            // this.showDeleteModal({
                                            //     uid,
                                            //     index,
                                            // });
                                            // console.log(`labelCategory uid`, uid);
                                            // console.log(`labelCategorySelect`, JSON.stringify(params.row, null, 4));
                                            this.labelAddType = labelCategory.toString() || "";
                                            this.labelCategoryAlias = labelCategoryAlias || "";
                                            this.labelCategoryText = labelName || "";
                                            this.labelCategorySelect = JSON.stringify(tagObj) || "";
                                            this.clickShowAddModal();
                                            // this.deleteTag({
                                            //     uid,
                                            //     index,
                                            // });
                                        },
                                    }
                                }, "添加"),
                            ]);
                        },
                    },
                ],
                commonHandleModalTableDatas: [],
                commonHandleTableDatas: [],
                commonHandleSearchLabels: [],
                isEmptyCommonLogs: true,
                isEmptyNewsTitle: false,
                pagination: {
                    current: 1,
                    size: 10,
                    total: 0,
                },
                commonFiltersPagination: {
                    id: "101",
                    value: "",
                },
                // flipPageCurrent: 1,
            }
        },
        methods: {
            onDoubleClick() {
                // console.log(`double clcik!`);
                this.showHighLightTitle = true;
                let that = this;
                let {
                    newsTitle,
                } = this.commonHandle;
                let newsHighLightTitle = this.newsHighLightTitle;
                let newsHighLightTitleBackup = this.newsHighLightTitleBackup;
                // console.log(`newsTitle =`, newsTitle);
                // console.log(`newsHighLightTitle =`, newsHighLightTitle);
                // console.log(`newsHighLightTitleBackup =`, newsHighLightTitleBackup);
                let newTitle = ``;
                setTimeout(() => {
                    let highLightTitle = document.querySelector(`[data-dom="highlight-title"]`);
                    highLightTitle.insertAdjacentHTML(`beforeend`, newsHighLightTitle);
                    let wrapper = document.querySelector(`[data-dom="highlight-title-wrapper"]`);
                    if (wrapper) {
                        let flag = wrapper.dataset.bindOnce || false;
                        if (!flag) {
                            wrapper.dataset.bindOnce = true;
                            wrapper.addEventListener(`click`, () => {
                                that.showHighLightTitle = false;
                            });
                        }
                    }
                }, 0);
            },
            // 批量删除
            clickShowResureDeleteModal(isBatch = false) {
                this.modalDelete.showModal = true;
                // if (isBatch) {
                //     this.isBatchDelete = true;
                // } else {
                //     this.isBatchDelete = false;
                // }
                // init
                this.removeBatchTagReason = "";
                this.removeBatchTagReasonOther = "";
                this.isRemoveBatchTagReasonValid = true;
                this.isRemoveBatchTagReasonOther = false;
            },
            onClickBatchDelete(type = `delete`) {
                this.clickShowResureDeleteModal(true);
                setTimeout(() => {
                    this.$refs["removeBatchTagReasonSelect"].focus();
                }, 500);
            },
            reSureBatchDeleteOK () {
                // let BatchTagReason = this.removeBatchTagReason;
                // let BatchTagReasonOther = this.removeBatchTagReasonOther;
                // console.log(`BatchTagReason =`, BatchTagReason);
                // console.log(`BatchTagReasonOther =`, BatchTagReasonOther);
                let isBatchLast = false;
                // setTimeout(() => {
                //     console.log(`this.removeBatchTags =`, JSON.stringify(this.removeBatchTags, null, 4));
                //     console.log(`shitBatchTags =`, JSON.stringify(this.shitBatchTags, null, 4));
                // }, 0);
                let removeBatchTags = this.removeBatchTags;
                // console.log(`removeBatchTags =`, JSON.stringify(removeBatchTags, null, 4));
                if (removeBatchTags.length) {
                    removeBatchTags.forEach((obj, i) => {
                        if (i === removeBatchTags.length - 1) {
                            isBatchLast = true;
                            // console.log(`isBatchLast =`, isBatchLast);
                        }
                        // console.log(`deleteBatchTag obj =`, obj);
                        this.deleteBatchTag(obj, isBatchLast);
                    });
                }
                setTimeout(() => {
                    this.modalDelete.showModal = false;
                    this.isIndexesEmpty = true;
                    this.shitBatchTags = [];
                }, 500);
                setTimeout(() => {
                    // empty bug ???
                    this.removeBatchTags = [];
                }, 1000);
            },
            tableSelectionChange(selection) {
                let removeBatchTags = [];
                if (selection.length) {
                    this.isIndexesEmpty = false;
                    for (let i = 0; i < selection.length; i++) {
                        selection[i];
                        let {
                            tag_id: uid,
                            index,
                        } = selection[i];
                        // console.log(`selection[i] =`, JSON.stringify(selection[i], null, 4));
                        let obj = {
                            uid,
                            index,
                        };
                        // console.log(`obj =`, JSON.stringify(obj, null, 4));
                        // console.log(`obj.index =`, obj.index);
                        // console.log(`obj.uid =`, obj.uid);
                        removeBatchTags.push(obj);
                    }
                } else {
                    this.isIndexesEmpty = true;
                }
                this.removeBatchTags = removeBatchTags || [];
                this.shitBatchTags = removeBatchTags || [];
                // console.log(`removeBatchTags =`, JSON.stringify(this.removeBatchTags, null, 4));
                // console.log(`this.shitBatchTags =`, JSON.stringify(this.shitBatchTags, null, 4));
            },
            selectChange(selection) {
                // console.log(`table selection =`, JSON.stringify(selection, null, 4));
                // console.log(`table selection =`, selection);
                this.tableSelectionChange(selection);
            },
            reSureBatchDeleteCancel() {
                this.modalDelete.showModal = false;
            },
            onRemoveBatchTagReasonChangeInput(type = `removeBatchTagReasonOther`){
                let value = this[type];
                this[type]= value.trim();
                if (value.trim() === "") {
                    this.isRemoveBatchTagReasonValid = true;
                    this.removeBatchTagReasonTooltips = "请输入删除的其他原因!";
                } else {
                    this.isRemoveBatchTagReasonValid = false;
                    this.removeBatchTagReasonTooltips = "请选择删除原因!";
                }
            },
            onRemoveBatchTagSelectChange(type = `removeBatchTagReason`) {
                let value = this[type];
                let removeBatchTagReasonOther = this.removeBatchTagReasonOther;
                if (value !== "") {
                    if (value === "5") {
                        // 其他 === 5.toString()
                        this.isRemoveBatchTagReasonOther = true;
                        if (removeBatchTagReasonOther === "") {
                            this.isRemoveBatchTagReasonValid = true;
                            this.removeBatchTagReasonTooltips = "请输入批量删除的其他原因!";
                        } else {
                            this.isRemoveBatchTagReasonValid = false;
                        }
                    } else {
                        this.isRemoveBatchTagReasonValid = false;
                        this.isRemoveBatchTagReasonOther = false;
                    }
                } else {
                    this.isRemoveBatchTagReasonValid = true;
                    this.removeBatchTagReasonTooltips = "请选择批量删除原因!";
                    this.isRemoveBatchTagReasonOther = false;
                }
                // this.$hMessage.info(value);
            },
            deleteBatchTag(obj = {}, isBatchLast = false) {
                let {
                    uid,
                    index,
                } = obj;
                let labels = this.commonHandleTableDatas;
                this.removeBatch(index, isBatchLast);
                this.removeBatchInitTag(uid);
            },
            removeBatch (index, isBatchLast = false) {
                this.commonHandleTableDatas.splice(index, 1);
                setTimeout(() => {
                    let labels = this.commonHandleTableDatas || [];
                }, 0);
                if (isBatchLast) {
                    setTimeout(() => {
                        // this.modalDelete.showModal = false;
                        this.$hMessage.success(`批量删除成功!`);
                    }, 0);
                }
            },
            removeBatchInitTag(uid) {
                let tags = this.initCommonHandleTableDatas;
                let newTags = [];
                tags.forEach(
                    (obj, i) => {
                        let {
                            bqdm: id,
                        } = obj;
                        if (id !== uid) {
                            newTags.push(obj);
                        } else {
                            let removeTag = obj;
                            // let BatchTagReason = this.removeBatchTagReason;
                            // let BatchTagReasonOther = this.removeBatchTagReasonOther;
                            removeTag.removeReasonType = this.removeBatchTagReason;
                            // 其他原因
                            removeTag.removeReason = this.removeBatchTagReasonOther;
                            this.commonHandle.removeTags.push(removeTag);
                            let uniqueTags = this.uniqueTagsIds;
                            let newUniqueTags = [];
                            uniqueTags.forEach(
                                (uniqueTag, i) => {
                                    if (uniqueTag !== uid) {
                                        newUniqueTags.push(uniqueTag);
                                    }
                                }
                            );
                            this.uniqueTagsIds = newUniqueTags;
                        }
                    }
                );
                this.initCommonHandleTableDatas = newTags;
                // refresh
                this.filterLabelsTableDatas(newTags);
            },
            // 批量删除
            // 删除
            getRemoveTagReasons(listType = `removeTagReasons`, debug = false){
                let url = `/tm/getRemoveTagReason`;
                this.$http
                .get(url)
                .then(res => res.data)
                .then((json)=>{
                    if (!json.body) {
                        console.log(`删除 json =`, JSON.stringify(json, null, 4));
                    } else {
                        let {
                            status,
                            msg,
                            body: {
                                result: listDatas,
                            },
                        } = json;
                        listDatas = listDatas.map(
                            (obj, i) => {
                                let {
                                    desc: title,
                                    type: value,
                                } = obj;
                                value = value.toString();
                                return {
                                    title,
                                    value,
                                };
                            }
                        );
                        if(status != this.$api.SUCCESS){
                            this.$hMessage.error(msg);
                            return;
                        } else {
                            this[listType] = listDatas;
                        }
                    }
                }).catch(err => console.error(`删除 error`, err));
            },
            onRemoveTagReasonChangeInput(type = `removeTagReasonOther`){
                let value = this[type];
                this[type]= value.trim();
                if (value.trim() === "") {
                    this.isRemoveTagReasonValid = true;
                    this.removeTagReasonTooltips = "请输入删除的其他原因!";
                } else {
                    this.isRemoveTagReasonValid = false;
                    this.removeTagReasonTooltips = "请选择删除原因!";
                }
            },
            onRemoveTagSelectChange(type = `removeTagReason`) {
                let value = this[type];
                // let value = this.commonHandle[type];
                // console.log(`removeTagReason value =`, value, typeof(value));
                let removeTagReasonOther = this.removeTagReasonOther;
                if (value !== "") {
                    if (value === "5") {
                        // 其他 === 5.toString()
                        this.isRemoveTagReasonOther = true;
                        if (removeTagReasonOther === "") {
                            this.isRemoveTagReasonValid = true;
                            this.removeTagReasonTooltips = "请输入删除的其他原因!";
                        } else {
                            this.isRemoveTagReasonValid = false;
                        }
                    } else {
                        this.isRemoveTagReasonValid = false;
                        this.isRemoveTagReasonOther = false;
                    }
                } else {
                    this.isRemoveTagReasonValid = true;
                    this.removeTagReasonTooltips = "请选择删除原因!";
                    this.isRemoveTagReasonOther = false;
                }
                // this.$hMessage.info(value);
            },
            reSureDeleteCancel() {
                this.deleteModal.showModal = false;
            },
            reSureDeleteOK() {
                let obj = this.deleteModal.obj;
                this.deleteTag(obj);
                // this.$refs.shieldTagReasonSelect.focus();
                // this.$refs.removeTagReasonSelect.focus();
            },
            // 删除
            // fixed router url query bug
            sessionRouterQuery(id = ``, dataType = ``) {
                let router_query = JSON.parse(window.sessionStorage.getItem(`all-in-one_route_query_handle`));
                let {
                    type,
                    desc,
                    // uid,
                    // url: path,
                    url,
                } = router_query;
                let new_router_query = {
                    type: dataType,
                    desc,
                    uid: id,
                    url,
                    // url: operateUrl,
                };
                window.sessionStorage.setItem(`all-in-one_route_query_handle`, JSON.stringify(new_router_query));
            },
            sessionFilterObj(id = ``, dataType = ``) {
                let pageFlipObj = JSON.parse(window.sessionStorage.getItem("all-in-one_flipObj_handle"));
                // this.pageFlipObj = pageFlipObj || {};
                this.pageFlipObj.newsId = id;
                // this.pageFlipObj.newsListType = dataType;;
                // pageFlipObj
                let new_pageFlipObj = Object.assign({}, this.pageFlipObj);
                window.sessionStorage.setItem(`all-in-one_flipObj_handle`, JSON.stringify(new_pageFlipObj));
            },
            reSureCancel() {
                this.modalResure.showModal = false;
            },
            // 屏蔽
            getShieldReasons(listType = `shieldTagReasons`, debug = false){
                let url = `/tm/getShieldReason`;
                this.$http
                .get(url)
                .then(res => res.data)
                .then((json)=>{
                    if (!json.body) {
                        console.log(`屏蔽 json =`, JSON.stringify(json, null, 4));
                    } else {
                        let {
                            status,
                            msg,
                            body: {
                                result: listDatas,
                            },
                        } = json;
                        listDatas = listDatas.map(
                            (obj, i) => {
                                let {
                                    desc: title,
                                    type: value,
                                } = obj;
                                value = value.toString();
                                return {
                                    title,
                                    value,
                                };
                            }
                        );
                        if(status != this.$api.SUCCESS){
                            this.$hMessage.error(msg);
                            return;
                        } else {
                            this[listType] = listDatas;
                        }
                    }
                }).catch(err => console.error(`屏蔽 error`, err));
            },
            onShieldSelectChange(type = `shieldTagReason`) {
                let value = this[type];
                // let value = this.commonHandle[type];
                if (value !== "") {
                    // this.disabledResureButton = false;
                    this.isShieldValid = false;
                } else {
                    // this.disabledResureButton = true;
                    this.isShieldValid = true;
                }
                // this.$hMessage.info(value);
            },
            // 屏蔽
            showDeleteBidModal (obj = {}, index = 0) {
                // console.log(`bid delete obj =`, JSON.stringify(obj, null, 4));
                console.log(`bid delete index =`, index);
                let {
                    tagName,
                    tagCategory,
                    tagId,
                    obj: bidObj
                } = obj;
                this.deleteBidLabelName = tagName;
                this.deleteBidModal.showModal = true;
                setTimeout(() => {
                    this.deleteBidModal.obj = {
                        id: tagId,
                        index,
                        bidObj,
                        // obj: bidObj,
                    };
                }, 0);
                // console.log(`bid delete bidObj=`, JSON.stringify(bidObj, null, 4));
            },
            reSureDeleteBid() {
                let {
                    id,
                    index,
                    bidObj,
                } = this.deleteBidModal.obj;
                // console.log(`bid delete index =`, index);
                // console.log(`bid delete id =`, id);
                // console.log(`bid delete bidObj=`, JSON.stringify(bidObj, null, 4));
                this.deleteBidTag(index);
                // removeReasonType: "1"
                // this.removeBidTag(index);
            },
            deleteBidTag(index) {
                // bidHandleTableDatas
                this.bidHandleTableDatas.splice(index, 1);
                // removeReasonType: "1"
                let bidTag = this.initBidTags[index];
                // console.log(`initBidTags`, JSON.stringify(bidTag, null, 4));
                let removeBidTagReason = this.removeBidTagReason || 1;
                bidTag.removeReasonType = removeBidTagReason;
                this.commonHandle.removeTags.push(bidTag);
                setTimeout(() => {
                    this.initBidTags.splice(index, 1);
                    this.deleteBidModal.showModal = false;
                    let bidTags = this.initBidTags;
                    this.filterBidLabelsTableDatas(bidTags);
                }, 0);
            },
            // no need
            removeBidTag(uid) {
                let tags = this.initCommonHandleTableDatas;
                // console.log(`init tags =`, JSON.stringify(tags, null, 4));
                // uniqueTagsIds
                // console.log(`delete uid =`, uid);
                let newTags = [];
                tags.forEach(
                    (obj, i) => {
                        let {
                            bqdm: id,
                        } = obj;
                        // console.log(`delete obj =`, obj);
                        if (id !== uid) {
                            newTags.push(obj);
                        } else {
                            let removeTag = obj;
                            removeTag.removeReasonType = this.removeTagReason;
                            this.commonHandle.removeTags.push(removeTag);
                            // console.log(`removeTag =`, JSON.stringify(removeTag));
                            let uniqueTags = this.uniqueTagsIds;
                            // console.log(`old this.uniqueTagsIds =`, uniqueTags);
                            let newUniqueTags = [];
                            uniqueTags.forEach(
                                (uniqueTag, i) => {
                                    if (uniqueTag !== uid) {
                                        newUniqueTags.push(uniqueTag);
                                    }
                                }
                            );
                            this.uniqueTagsIds = newUniqueTags;
                            // console.log(`new this.uniqueTagsIds =`, this.uniqueTagsIds);
                        }
                    }
                );
                // console.log(`new tags =`, JSON.stringify(newTags, null, 4));
                this.initCommonHandleTableDatas = newTags;
                // refresh
                this.filterLabelsTableDatas(newTags);
            },
            filterBidLabelsTableDatas (bidTags = []) {
                // shaped bidTags
                if (Array.isArray(bidTags) && bidTags.length) {
                    let bidTagsNames = [];
                    let bidHandleTableDatas = [];
                    bidTags.forEach((obj, index) => {
                        let {
                            bqmc: tagName,
                            id: tagId,
                            filterTypeDesc: tagCategory,
                            filterType,
                            bqqz: bidLabelWeight,
                        } = obj;
                        if (!bidLabelWeight) {
                            bidLabelWeight = "";
                        } else {
                            bidLabelWeight = parseFloat(bidLabelWeight).toFixed(3);
                        }
                        if (!tagCategory) {
                            tagCategory = "";
                        }
                        if (!tagName) {
                            tagName = "";
                        }
                        let newBidTag = {
                            index,
                            tagIndex: index,
                            tagId,
                            tagName,
                            tagCategory,// filterTypeDesc
                            tagValue: "",
                            tagOptions: [],
                            obj,
                            filterType,
                            bidLabelWeight,
                        };
                        // async get bids
                        bidTagsNames.push({
                            tagName,
                            filterType,
                        });
                        bidHandleTableDatas.push(newBidTag);
                    });
                    this.bidTagsNames = bidTagsNames;
                    this.bidHandleTableDatas = bidHandleTableDatas;
                    this.isBidTagsEmpty = false;
                    let that = this;
                    setTimeout(() => {
                        if (bidTagsNames.length) {
                            bidTagsNames.forEach(
                                (name, i) => {
                                    // tagOptions
                                    that.getBidsByClickSelect(name, i);
                                }
                            );
                        }
                    }, 0);
                } else {
                    this.bidHandleTableDatas = [];
                    this.bidTagsNames = [];
                    this.isBidTagsEmpty = true;
                }
            },
            // bid
            getBidsByClickSelect (bid_name = {}, index = 0) {
                // console.log(`bid_name =`, bid_name, index);
                // let url = `/tm/getBids?bqmc=${bid_name}`;
                let {
                    tagName,
                    filterType,
                } = bid_name;
                let url = `/tm/getBids?bqmc=${tagName}&filterType=${filterType}`;
                let that = this;
                this.$http
                .get(url)
                .then(res => res.data)
                .then((json)=>{
                     let {
                        status,
                        msg,
                        body,
                    } = json;
                    if(status != this.$api.SUCCESS){
                        // console.log(`获取 bids =`, JSON.stringify(json, null, 4));
                        this.$hMessage.error(msg);
                        return;
                    } else {
                        let {
                            result,
                        } = body;
                        let bids = result || [];
                        if (bids.length) {
                            // this.$hMessage.success(`获取 bids 成功!`);
                            // console.log(`result bids =`, JSON.stringify(bids, null, 4));
                            that.bidHandleTableDatas[index].tagOptions = bids;
                        } else {
                            // this.$hMessage.error(msg);
                        }
                    }
                }).catch(err => console.error(`获取 bids error`, err));
            },
            onBidSelectChange(e, index) {
                // console.log(`bid select index =`, index);
                // console.log(`bid select =`, e);
                // console.log(`bid select =`, e.target);
                // console.log(`bid select =`, e.target.value);
                let bid = e.target.value;
                this.initBidTags[index].bid = bid;
                // console.log(`new this.initBidTags`, JSON.stringify(this.initBidTags, null, 4));
            },
            // shortcut keys
            keyboardShortcutKeys() {
                let that = this;
                let body = document.querySelector(`body`);
                let bindFlag = body.dataset.bindFlag;
                if (bindFlag === "true") {
                    // console.log(`only need binding once!`);
                } else {
                    body.dataset.bindFlag = "true";
                    // bind once
                    body.addEventListener("keyup", function(e) {
                        let key = e.which || e.keyCode;
                        if(e.which === 17) {
                            // init
                            this.isCtrlPressed = false;
                        }
                    });
                    body.addEventListener("keydown", function(e) {
                        let key = e.which || e.keyCode;
                        if(e.which === 17) {
                            this.isCtrlPressed = true;
                        }
                        let isCtrl = this.isCtrlPressed;
                        if(e.which === 83 && isCtrl) {
                            if (that.onClickButton) {
                                that.onClickButton(`save`);
                            }
                        }
                        if(e.which === 68 && isCtrl) {
                            if (that.clickGetNewsInfos) {
                                if (!that.isFirstNews) {
                                    that.clickGetNewsInfos(`prev`);
                                } else {
                                    // btn bug
                                    console.log(`prev btn bug!`);
                                }
                            }
                        }
                        if(e.which === 70 && isCtrl) {
                            if (that.clickGetNewsInfos) {
                                if (!that.isLastNews) {
                                    that.clickGetNewsInfos(`next`);
                                } else {
                                    // btn bug
                                    console.log(`next btn bug!`);
                                }
                            }
                        }
                        // if(e.which === 88 && isCtrl) {
                        //     if (that.clickShowResureModal) {
                        //         that.clickShowResureModal(`passed`);
                        //     }
                        // }
                    });
                }
            },
            clickGetNewsInfos (type = ``) {
                // console.log(`button type =`, type);
                // console.log(`pageFlipObj =`, JSON.stringify(this.pageFlipObj, null, 4));
                let {
                    dataStatus,
                    // dataType,
                    newsListType,
                    gkbz,
                    handleUser,
                    xwbt,
                    mtcc,
                    newsId,
                    fbsj,
                    publishTime,
                    publishTimeEnd,
                    // 搜索条件 new
                    keyword,
                    tag,
                    newsType,
                    current,
                    size,
                    dataType,
                } = this.pageFlipObj;
                let options = {
                    dataStatus,
                    // dataType,
                    newsListType,
                    gkbz,
                    handleUser,
                    mtcc,
                    xwbt,
                    newsId,
                    fbsj,
                    publishTime,
                    publishTimeEnd,
                    // 搜索条件 new
                    keyword,
                    tag,
                    newsType,
                    current,
                    size,
                    dataType,
                };
                // operType: "1",// 0 上一页； 1 下一页
                let operType = "1";
                if (type === "prev") {
                    operType = "0";
                }
                options.operType = operType;
                // console.log(`new options =`, JSON.stringify(options, null, 4));
                if (Object.values(options).length) {
                    this.getNewsInfos(options, type);
                }
            },
            getNewsInfos(options = {}, type = ``) {
                let url = `/tm/getAdjacentNewsInfo`;
                // let url = `/tm/getAdjacentNewsLogInfo`;
                this.$http
                .post(url, options)
                .then(res => res.data)
                .then((json)=>{
                     let {
                        status,
                        msg,
                        body,// null
                    } = json;
                    // console.log(`0 上一页； 1 下一页 json =`, JSON.stringify(json, null, 4));
                    if(status != this.$api.SUCCESS){
                        this.$hMessage.error(msg);
                    } else {
                        // this.$hMessage.success(`上一页/下一页: ${msg}`);
                        let that = this;
                        if (body === null) {
                            if (type === "prev") {
                                this.isFirstNews = true;
                                // console.log(`prev null`);
                                this.$hMessage.info(`上一条不存在!`);
                            } else {
                                this.isLastNews= true;
                                // console.log(`next null`);
                                this.$hMessage.info(`下一条不存在!`);
                            }
                        } else {
                            if (type === "next") {
                                this.isFirstNews = false;
                            } else {
                                this.isLastNews= false;
                            }
                            // update infos
                            // console.log(`body`, JSON.stringify(body, null, 4));
                            let {
                                newsId,
                                publishTime,
                                dataType,
                                current: new_current,
                            } = body;
                            // let {
                            //     current,
                            // } = this.pagination;
                            // if (current !== new_current) {
                            //     this.pagination.current = new_current;
                            //     // console.log(`current`, current);
                            //     // console.log(`new current`, new_current);
                            // }
                            // this.flipPageCurrent = new_current;
                            this.pageFlipObj.current = new_current;
                            this.pageFlipObj.newsId = newsId;
                            this.pageFlipObj.fbsj = publishTime;
                            this.pageFlipObj.newsListType = dataType;
                            // ???
                            // this.pageFlipObj.dataType = dataType;
                            // router url query
                            // dataType = ``
                            this.sessionRouterQuery(newsId, dataType);
                            this.sessionFilterObj(newsId, dataType);
                            this.getHandleInfos(newsId);
                        }
                    }
                }).catch(err => console.error(`获取 0 上一页； 1 下一页  error`, err));
            },
            // 上一条/下一条
            clickGetNewsLink(data_ref = `newsLink`) {
                let that = this;
                let newsLink = document.querySelector(`[data-uid="${data_ref}"]`);
                // let newsLink = document.querySelector(`[data-uid="newsLink"]`);
                if (newsLink) {
                    let result = that.commonHandle.newsLink || ``;
                    let input = newsLink.lastElementChild;
                    input.addEventListener(`click`, (e) => {
                        try {
                            if (result) {
                                input.select();
                                document.execCommand("copy");
                                that.$hMessage.success(`资讯链接地址, 复制成功!`);
                            } else {
                                that.$hMessage.info(`资讯链接地址, 无法复制!`);
                            }
                        } catch (err) {
                            console.log(`click copy error =`, err);
                            that.$hMessage.error(`你的浏览器太古老了，暂时不支持点击复制的功能!`);
                        }
                    });
                }
            },
            clickGetNewsId() {
                let that = this;
                let newsID = document.querySelector(`[data-uid="newsId"]`);
                if (newsID) {
                    let result = that.commonHandle.newsId || ``;
                    let input = newsID.lastElementChild;
                    // input.style = `width: 100%; min-width: 217px; color: #000; cursor: pointer !important;`;
                    input.addEventListener(`click`, (e) => {
                        try {
                            if (result) {
                                input.select();
                                document.execCommand("copy");
                                that.$hMessage.success(`资讯 ID, 复制成功!`);
                            } else {
                                that.$hMessage.info(`资讯 ID 为空, 无法复制!`);
                            }
                        } catch (err) {
                            console.log(`click copy error =`, err);
                            that.$hMessage.error(`你的浏览器太古老了，暂时不支持点击复制的功能!`);
                        }
                    });
                } else {
                    //
                }
            },
            //pagination
            getNewTableDatas (pagination = {}) {
                let {
                    id,
                    value,
                    tagRelation,
                } = this.commonFiltersPagination;
                let {
                    current,
                    size,
                } = pagination;
                let options = {
                    id,
                    value,
                    current,
                    size,
                    tagRelation,
                };
                this.getSearchLabels(options);
            },
            onPageChange (current = 1) {
                this.pagination.current = current;
                // console.log(`current =`, current);
                let {
                    size,
                } = this.pagination;
                this.getNewTableDatas({
                    current,
                    size,
                });
            },
            onPageSizeChange (size = 10) {
                this.pagination.size = size;
                let {
                    current,
                } = this.pagination;
                this.getNewTableDatas({
                    current,
                    size,
                });
            },
            // pagination
            asyncAddHotWord() {
                let url = `/tm/tag/addWord`;
                let word = this.labelHotWord || "";
                let newsId = this.pageFlipObj.newsId || ``;
                this.$http
                .post(url, {
                    word,
                    newsId,
                })
                .then(res => res.data)
                .then((json)=>{
                     let {
                        status,
                        msg,
                        // body,
                    } = json;
                    if(status != this.$api.SUCCESS){
                        this.modalHotWord.showModal = false;
                        this.$hMessage.error(msg);
                        return;
                    } else {
                        // 添加热词
                        this.modalHotWord.showModal = false;
                        this.$hMessage.success(`添加热词成功!`);
                    }
                }).catch(err => console.error(`添加热词  error`, err));;
            },
            // 歧义词
            asyncAddAmbiguousWord() {
                let url = `/tm/tag/addDiffMeaningsWord`;
                let word = this.labelAmbiguousWord || "";
                let newsId = this.pageFlipObj.newsId || ``;
                this.$http
                .post(url, {
                    diffMeaningsWord: word,
                    newsId,
                })
                .then(res => res.data)
                .then((json)=>{
                     let {
                        status,
                        msg,
                        // body,
                    } = json;
                    if(status != this.$api.SUCCESS){
                        this.modalAmbiguousWord.showModal = false;
                        this.$hMessage.error(msg);
                        return;
                    } else {
                        // 添加歧义词
                        this.modalAmbiguousWord.showModal = false;
                        this.$hMessage.success(`添加歧义词成功!`);
                    }
                }).catch(err => console.error(`添加歧义词  error`, err));;
            },
            clickShowAdd() {
                this.clickAutoClose();
                let that = this;
                // this.modalNew.showModal = true;
                that.commonHandleModalTableData = [];
                that.searchValue = that.labelHotWord;
                // that.searchValue = value;
                that.labelAddType = `文本标签`;
                // update value with auto click
                if (this.isFirstLoad) {
                    // only once
                    this.getLabelCategories(``, ``);
                    this.isFirstLoad = false;
                }
                // that.getLabelCategories(``, ``);
                that.onClickSearch();
                setTimeout(() => {
                    // show modal with delay
                    that.modalNew.showModal = true;
                }, 0);
            },
            clickShowHotWord() {
                this.clickAutoClose();
                let that = this;
                setTimeout(() => {
                    this.modalHotWord.showModal = true;
                }, 0);
            },
            // 歧义词
            clickShowAmbiguousWord() {
                this.clickAutoClose();
                let that = this;
                setTimeout(() => {
                    this.modalAmbiguousWord.showModal = true;
                }, 0);
            },
            clickAutoClose() {
                let menus = document.querySelector(`[data-uid="menus"]`);
                menus.style.display = "none";
            },
            // 鼠标滑词
            mouseSlipGetWords() {
                const getSelectionText = () => {
                    let selectedTextWithTrim = ``;
                    if (window.getSelection){
                        // all modern browsers and IE9+
                        selectedTextWithTrim = window.getSelection().toString().trim();
                        // console.log(`you selected text with trim() =`, selectedTextWithTrim);
                    } else {
                        console.error(`鼠标滑词 selectedText is empty!`);
                    }
                    return selectedTextWithTrim;
                };
                let textarea = document.querySelector(`#audit-common-handle-text`);
                let that = this;
                textarea.addEventListener("mousedown", function(e) {
                    if (e.button === 0) {
                        // console.log("Left mouse button pressed!");
                        that.clickAutoClose();
                    } else if (e.button === 1) {
                        // console.log("Middle mouse button pressed!");
                        that.clickAutoClose();
                    } else if (e.button === 2) {
                        // console.log("Right mouse button pressed!");
                    }
                }, false);
                if (document.addEventListener) {
                    // IE >= 9; other browsers
                    textarea.addEventListener('contextmenu', function(e) {
                        let value = getSelectionText() || "";
                        if (value) {
                            that.isEmptySearch = false;
                        } else {
                            that.isEmptySearch = true;
                        }
                        // console.log(`this.isEmptySearch 1=`, this.isEmptySearch);
                        let menus = document.querySelector(`[data-uid="menus"]`);
                        let position = getPosition(e);
                        positionMenu(e, menus);
                        if (value) {
                            that.pagination.current = 1;
                            that.$hMessage.success(`滑动选取的单词: ${value}`);
                            menus.style.display = "block";
                            that.labelHotWord = value.trim();
                            that.labelAmbiguousWord = value.trim();
                            // data-uid="menus"
                        } else {
                            console.log(`selected text is empty!`);
                            // that.$hMessage.error(`滑动选取的单词不可为空`);
                            that.$hMessage.info(`滑动选取的单词不可为空`);
                            that.clickAutoClose();
                        }
                        // if (value) {
                        //     that.$hMessage.success(`滑动选取的单词: ${value}`);
                        //     // that.isNewAddLabel = true;
                        //     // that.tableLoading = true;
                        //     that.commonHandleModalTableData = [];
                        //     that.searchValue = value;
                        //     that.labelAddType = `文本标签`;
                        //     // update value with auto click
                        //     that.getLabelCategories(``, ``);
                        //     that.onClickSearch();
                        //     setTimeout(() => {
                        //         // show modal with delay
                        //         that.modalNew.showModal = true;
                        //     }, 0);
                        // } else {
                        //     console.log(`selected text is empty!`);
                        //     // that.$hMessage.error(`滑动选取的单词不可为空`);
                        //     this.$hMessage.info(`滑动选取的单词不可为空`);
                        // }
                        e.preventDefault();
                    }, false);
                } else {
                    // IE < 9
                    document.attachEvent('oncontextmenu', function() {
                        // alert("You've tried to open context menu");
                        window.event.returnValue = false;
                    });
                }
            },
            // 鼠标滑词
            showDeleteModal(obj = {}) {
                this.deleteModal.showModal = true;
                this.deleteModal.obj = obj;
                // console.log(`ref =`, this.$refs.removeTagReasonSelect);
                this.removeTagReason = "";
                this.removeTagReasonOther = "";
                this.isRemoveTagReasonValid = true;
                this.removeTagReasonTooltips = "请输入删除的其他原因!";
                setTimeout(() => {
                    this.$refs.removeTagReasonSelect.focus();
                }, 500);
            },
            reSureDelete () {
                // this.deleteTag({
                //     uid,
                //     index,
                // });
                let obj = this.deleteModal.obj;
                this.deleteTag(obj);
            },
            returnParentPage () {
                // re-direct
                let path = `/audit/news/sensitive/operate-handle`;
                this.$store.commit("DEL_TAB", path);
                this.$router.push(`/audit/news/sensitive`);
            },
            getvaluelabel (currentValue) {
                // 箱包
                console.log(`typeof(currentValue) =`, typeof(currentValue));
                if(typeof(currentValue) === `string`){
                    // string
                    console.log(`返回值 = String`, value);
                    // this.labelCategoryText = value;
                    // this.modalNewAdd.isNewAdd = true;
                }else{
                    // object
                    console.log(`返回值 = Object`, JSON.stringify(currentValue, null, 4));
                    let {
                        label,// label !== title
                        value,
                    } = currentValue;
                    this.labelCategoryText = label;
                    // this.labelCategorySelect = value;
                    if (value) {
                        this.modalNewAdd.isNewAdd = false;
                    } else {
                        this.modalNewAdd.isNewAdd = true;
                    }
                    // this.labelCategorySelect = value;
                }
                // if(typeof(currentValue) == 'string'){
                //     alert('未配置label-in-value时,onchange事件中返回值只包含value值为：'+currentValue);
                // }else{
                //     alert('配置label-in-value时,onchange事件中返回值：label值为：'+currentValue.label+'  value值为:'+currentValue.value);
                // }
            },
            getquery (query) {
                // this.$hMessage.info("搜索词变为："+query);
                // console.log("搜索词 =", query);
                // this.modalNewAdd.isNewAdd = true;
            },
            hsetQuery (name, text) {
                this.$refs[name].setQuery(text);
                // hsetQuery(`labelCategorySelect`, `通过方法设置的检索词`)
            },
            onInputChange (type = ``) {
                let value = this[type];
                // this.searchValue = value.trim();
                this[type] = value.trim();
                // this.$hMessage.info(`${type} = ${value}`);
                // console.log(`searchValue =`, value);
                // this.labelCategoryText = value;
                if (value) {
                    if (type === "searchValue") {
                        this.isEmptySearch = false;
                    } else {
                        // this.isEmptySearch = true;
                    }
                } else {
                    if (type === "searchValue") {
                        this.isEmptySearch = true;
                    } else {
                        // this.isEmptySearch = false;
                    }
                }
            },
            onChangeInputEnter (type = ``) {
                let value = this[type];
                // this.searchValue = value.trim();
                 this[type] = value.trim();
                // this.$hMessage.info(`${type} = ${value}`);
                // console.log(`searchValue =`, value);
                // this.labelCategoryText = value;
                if (value) {
                    if (type === "searchValue") {
                        this.isEmptySearch = false;
                        // enter
                        this.onClickSearch();
                    } else {
                        // this.isEmptySearch = true;
                    }
                } else {
                    if (type === "searchValue") {
                        this.isEmptySearch = true;
                    } else {
                        // this.isEmptySearch = false;
                    }
                }
                // search
            },
            shitClearableClick(type = ``) {
                // searchValue
                // http://192.168.58.189:8080/hui/#/components/input
                // shiy api
                // this.$hMessage.info("icon点击事件");
                this[type] = ``;
                this.$refs[type].focus();
                // disabled
                // this.isEmptySearch = true;
                if (type === "searchValue") {
                    this.isEmptySearch = true;
                }
            },
            // filter methods
            onChangeDatePicker (value) {
                this.commonHandle.publishDate = value;
            },
            onChangeInput (type = ``) {
                let value = this.commonHandle[type];
                this.commonHandle[type] = value.trim();
                // this.$hMessage.info(`${type} = ${value}`);
                if (type === `newsTitle`) {
                    // console.log(`this.commonHandle[type]  =`, this.commonHandle[type]);
                    if (!value) {
                        this.$refs[type].focus();
                        this.isEmptyNewsTitle = true;
                        this.$hMessage.info(`资讯标题不可以为空!`);
                    } else {
                        this.isEmptyNewsTitle = false;
                    }
                }
            },
            onChangeSelect (type = ``) {
                let value = this.commonHandle[type];
                // this.$hMessage.info(value);
            },
            onRemoveSelectChange (type = ``) {
                let value = this[type];
                // this.$hMessage.info(value);
                // console.log(`remove reason`);
            },
            selectSetQuery (value = ``) {
                this.$refs[`selectLabel`].setQuery(value);
                // this.searchValue = JSON.stringify(this.commonHandleSearchLabels[0]);
            },
            // selectSetQuery (name, text) {
            //     this.$refs[name].setQuery(text);
            // },
            // save
            onClickButton (type = ``) {
                // close modal first
                this.modalResure.showModal = false;
                let {
                    newsId,
                    newsTitle: xwbt,
                    mediaSource: mtcc,
                    newsLink: ljdz,
                    newsAuthor: zxzz,
                    newsBrief: zxzy,
                    newsEmotion: qgzfm,
                    // priority: yxj,
                    // columnCategory: lmfl,
                    // publishDate: publishTime,
                    // processingStatus: dataStatus,
                    // processingPersonnel: handleUser,
                    removeTags,
                }= this.commonHandle;
                let tags = this.commonHandleTableDatas.map(
                    (obj, i) => {
                        let {
                            tag,
                        } = obj;
                        return tag;
                    }
                );
                let personTag = this.initBidTags;
                // console.log(`save tags =`, JSON.stringify(tags, null, 4));
                let shieldReasonType = this.shieldTagReason;
                let options = {
                    newsId,
                    xwbt,
                    mtcc,
                    ljdz,
                    zxzz,
                    zxzy,
                    qgzfm,
                    tags,
                    // yxj,
                    // publishTime,
                    // dataStatus,
                    // handleUser,
                    // lmfl,
                    // current,
                    // size,
                    personTag,
                    removeTags,
                    shieldReasonType,
                };
                // console.log(`save options =`, JSON.stringify(options, null, 4));
                let url = ``;
                let path = ``;
                let dataType = this.pageFlipObj.newsListType;
                // console.log(`dataType =`, dataType, typeof(dataType));
                switch (type) {
                    case "save":
                        url = `/tm/modifyById`;// 保存
                        this.handleUpdateType = type;
                        this.handleUpdateModalMessage = "保存成功!";
                        break;
                    case "open":
                        if (dataType === 0 || dataType === 1) {
                            url = `/tm/prePublicByNewsId`;// 公开
                        } else if (dataType === 2) {
                            url = `/tm/tagCountPublicByNewsId`;// 公开
                        } else if (dataType === 3) {
                            url = `/tm/bidTagPublicByNewsId`;// 公开
                        } else if (dataType === 4) {
                            url = `/tm/notWhiteListPublicByNewsId`;// 公开
                        }
                        // url = `/tm/tagCountPublicByNewsId`;// 公开
                        // url = `/tm/bidTagPublicByNewsId`;// 公开
                        // url = `/tm/notWhiteListPublicByNewsId`;// 公开
                        path = `/audit/news/sensitive/operate-handle`;
                        break;
                    case "close":
                        url = `/tm/preShieldByNewsId`;// 屏蔽
                        path = `/audit/news/sensitive/operate-handle`;
                        break;
                    case "forever_shield":
                        url = `/tm/specialProcessedByNewsId`;// 永久屏蔽
                        path = `/audit/news/sensitive/operate-handle`;
                        break;
                    case "passed":
                        url = `/tm/processedByNewsId`;// 处理通过
                        path = `/audit/news/sensitive/operate-handle`;
                        break;
                    default:
                        break;
                }
                if (!xwbt) {
                    this.$hMessage.info(`资讯标题不可以为空!`);
                }
                // else if (tags.length === 0 && personTag.length === 0 && type === "open") {
                //     this.$hMessage.info(`标签列表不可以为空!`);
                // }
                else {
                    this.$http
                    .post(url, options)
                    .then(res => res.data)
                    .then((json)=>{
                        console.log(`save json =\n`, JSON.stringify(json, null, 4));
                        let {
                            status,
                            msg,
                            body,
                        } = json;
                        if(status != this.$api.SUCCESS){
                            this.$hMessage.error(msg);
                            // let that = this;
                            // setTimeout(() => {
                            //     that.returnParentPage();
                            // }, 500);
                            return;
                        } else {
                            // this.$hMessage.success(msg);
                            // let message = this.saveMessage;
                            // let message = "保存成功";
                            // if (dataType === 1) {
                            //     // sensitive
                            //     // message = `公开申请已提交，待审核!`;
                            //     // 后端处理 敏感资讯主管审核开关 ？？？
                            //     this.$hMessage.success(msg);
                            // } else {
                            //     let message = this.handleUpdateModalMessage;
                            //     this.$hMessage.success(message);
                            // }
                            let message = this.handleUpdateModalMessage;
                            if (dataType === 1) {
                                message = body.result;
                            }
                            this.$hMessage.success(message);
                            let that = this;
                            setTimeout(() => {
                                if (type !== "save") {
                                    if (!this.isHashRouterNewsId) {
                                        that.clickGetNewsInfos(`next`);
                                    } else {
                                        // no next click
                                    }
                                } else {
                                    // refresh bug
                                    this.autoHashSearch();
                                }
                            }, 0);
                            // if (type === "passed") {
                            //     // console.log(`auto click next!`);
                            //     setTimeout(() => {
                            //         that.clickGetNewsInfos(`next`);
                            //     }, 0);
                            // }
                            // if (path) {
                            //     let path = `/audit/news/sensitive/operate-handle`;
                            //     this.$store.commit("DEL_TAB", path);
                            //     this.returnParentPage();
                            // }
                            // setTimeout(() => {
                            //     if (path) {
                            //         this.$store.commit("DEL_TAB", path);
                            //     }
                            // }, 0);
                        }
                    }).catch(err => console.error(`save error`, err));
                }
            },
            deleteTag(obj = {}) {
                let {
                    uid,
                    index,
                } = obj;
                // console.log(`label obj =`, JSON.stringify(obj, null, 4));
                let labels = this.commonHandleTableDatas;
                // console.log(`labels =`, JSON.stringify(labels, null, 4));
                // http delete
                this.remove(index);
                this.removeInitTag(uid);
            },
            remove (index) {
                this.commonHandleTableDatas.splice(index, 1);
                setTimeout(() => {
                    this.deleteModal.showModal = false;
                    this.$hMessage.success(`删除标签成功!`);
                }, 0);
                setTimeout(() => {
                    let labels = this.commonHandleTableDatas || [];
                    // if (labels.length === 0) {
                    //     setTimeout(() => {
                    //         this.$hMessage.info(`标签列表不可以为空!`);
                    //     }, 1000);
                    // }
                    // console.log(`new labels =`, JSON.stringify(labels, null, 4));
                }, 0);
            },
            removeInitTag(uid) {
                let tags = this.initCommonHandleTableDatas;
                let newTags = [];
                tags.forEach(
                    (obj, i) => {
                        let {
                            bqdm: id,
                        } = obj;
                        if (id !== uid) {
                            newTags.push(obj);
                        } else {
                            let removeTag = obj;
                            removeTag.removeReasonType = this.removeTagReason;
                            // 其他原因
                            removeTag.removeReason = this.removeTagReasonOther;
                            this.commonHandle.removeTags.push(removeTag);
                            // console.log(`removeTag =`, JSON.stringify(removeTag));
                            let uniqueTags = this.uniqueTagsIds;
                            // console.log(`old this.uniqueTagsIds =`, uniqueTags);
                            let newUniqueTags = [];
                            uniqueTags.forEach(
                                (uniqueTag, i) => {
                                    if (uniqueTag !== uid) {
                                        newUniqueTags.push(uniqueTag);
                                    }
                                }
                            );
                            this.uniqueTagsIds = newUniqueTags;
                            // console.log(`new this.uniqueTagsIds =`, this.uniqueTagsIds);
                        }
                    }
                );
                // console.log(`new tags =`, JSON.stringify(newTags, null, 4));
                this.initCommonHandleTableDatas = newTags;
                // refresh
                this.filterLabelsTableDatas(newTags);
            },
            asyncOK () {
                setTimeout(() => {
                    this.modalNew.showModal = false;
                }, 0);
            },
            createNewLabel(options = {}) {
                let url = `/tm/tag/audit/save`;
                this.$http
                .post(url, options)
                // .post(url, {
                //     options,
                //     // data: options,
                //     // data: JSON.stringify(options),
                // })
                .then(res => res.data)
                .then((json)=>{
                    let {
                        status,
                        msg,
                        body,
                    } = json;
                    // console.log(`新增标签 json =`, JSON.stringify(json, null, 4));
                    if(status != this.$api.SUCCESS){
                        this.modalNewAdd.modalLoading = false;
                        this.modalNewAdd.showModal = false;
                        this.$hMessage.error(msg);
                        return;
                    } else {
                        this.$hMessage.success(`新增标签提交成功, 待审核!`);
                        // this.$hMessage.success(`新增标签成功!`);
                        this.modalNewAdd.modalLoading = false;
                        this.modalNewAdd.showModal = false;
                        let that = this;
                        setTimeout(() => {
                            // auto close
                            that.modalNew.showModal = false;
                        }, 0);
                    }
                }).catch(err => console.error(`新增标签  error`, err));
            },
            getAllTagCategoryIds(ids = ``) {
                let result = ``;
                // 101103105 => 101,101103,101103105
                let len = ids.length / 3;
                for(let i = 0; i < len; i++) {
                    let y = ids.slice(0, 3*i + 3);
                    if(i < len - 1) {
                        result += `${y},`;
                    } else {
                        result += `${y}`;
                    }
                };
                // console.log(`shit ids result =`, result);
                return result;
            },
            asyncNewAdd () {
                // console.log(`api isn't ready!`);
                let that = this;
                let {
                    newsLink,
                    newsId,
                } = this.commonHandle;
                let labelCategoryId = this.labelCategoryId;
                // console.log(`labelCategoryId =`, labelCategoryId);
                let searchValue = this.searchValue;
                let url = `/tm/getTagCategory?categoryId=101`;
                if (labelCategoryId) {
                    url = `/tm/getTagCategory?categoryId=${labelCategoryId}`;
                }
                if (labelCategoryId === "101") {
                    this.$hMessage.info(`标签分类不可以为根节点，请选重新选择!`);
                    this.modalNewAdd.modalLoading = false;
                    this.modalNewAdd.showModal = false;
                } else {
                    let newLabelCategoryId = this.getAllTagCategoryIds(labelCategoryId);
                    this.$http
                    .get(url)
                    .then(res => res.data)
                    .then((json)=>{
                        let {
                            status,
                            msg,
                            body,
                        } = json;
                        if (status === 1) {
                            let labelNames = body.result;
                            // this.labelAddType = labelNames;
                            let options = {
                                "flag": "",
                                "fullCategoryId": newLabelCategoryId,
                                // 101103105 => 101,101103,101103105
                                // "fullCategoryId": "101",
                                "fullCategoryName": labelNames || "文本标签",
                                // "fullCategoryName": "文本标签,行业,家电",
                                "tagName": searchValue,
                                "zxId": newsId,
                                "zxUrl": newsLink,
                            };
                            that.createNewLabel(options);
                        } else {
                            that.modalNewAdd.showModal = false;
                            that.modalNewAdd.modalLoading = false;
                            that.$hMessage.info(`为查找到该标签的标签分类信息!`);
                            // that.$hMessage.error(msg);
                            return "";
                        }
                    })
                    .catch(err => console.log(`标签分类信息查询 error`, err));
                }
                // setTimeout(() => {
                //     this.modalNewAdd.showModal = false;
                //     // setTimeout(() => {
                //     //     this.$hMessage.error(`后端 API bug!`);
                //     // }, 500);
                // }, 1000);
            },
            asyncAdd () {
                // 箱包
                let tag = {};
                let add_tag = this.labelCategorySelect;
                // labelCategoryText
                if (add_tag.includes("{")) {
                    if (add_tag) {
                        tag = JSON.parse(add_tag);
                    }
                    console.log(`add tag =`, JSON.stringify(tag, null, 4));
                    tag.bqqz = 1;
                    this.initCommonHandleTableDatas.push(tag);
                    setTimeout(() => {
                        let list = this.initCommonHandleTableDatas;
                        // console.log(`tags list =`, JSON.stringify(list, null, 4));
                        this.filterLabelsTableDatas(list);
                        this.$hMessage.success(`添加标签成功!`);
                        setTimeout(() => {
                            this.modalAdd.showModal = false;
                            this.modalNew.showModal = false;
                        }, 500);
                    }, 1000);
                } else {
                    setTimeout(() => {
                        this.$hMessage.error(`添加标签失败!`);
                        setTimeout(() => {
                            this.modalAdd.showModal = false;
                        }, 500);
                        setTimeout(() => {
                            this.$hMessage.info(`请重新选择标签!`);
                        }, 500);
                    }, 1000);
                }
            },
            asyncAddTag () {
                // 箱包
                let tag = {};
                let add_tag = this.labelCategorySelect;
                // labelCategoryText
                if (add_tag.includes("{")) {
                    if (add_tag) {
                        tag = JSON.parse(add_tag);
                    }
                    // console.log(`add tag obj`, JSON.stringify(tag, null, 4));
                    let {
                        bqdm: tag_uid,
                        bqmc: labelName,
                        bqlb: tagCategories,
                        // bqqz: labelWeight,
                    } = tag;
                    let uniqueTagsIds = this.uniqueTagsIds || [];
                    if (uniqueTagsIds.includes(tag_uid)) {
                        this.$hMessage.info(`不可以添加重复的标签!`);
                        setTimeout(() => {
                            this.modalAdd.showModal = false;
                        }, 100);
                        // }, 500);
                    } else {
                        uniqueTagsIds.push(tag_uid);
                        this.uniqueTagsIds = uniqueTagsIds;
                        console.log(`add tag =`, JSON.stringify(tag, null, 4));
                        tag.bqqz = 1;
                        this.initCommonHandleTableDatas.push(tag);
                        // ??? delay
                        setTimeout(() => {
                            let list = this.initCommonHandleTableDatas;
                            // console.log(`tags list =`, JSON.stringify(list, null, 4));
                            this.filterLabelsTableDatas(list);
                            this.$hMessage.success(`添加标签成功!`);
                            setTimeout(() => {
                                this.modalAdd.showModal = false;
                                this.modalAdd.loading = false;
                                this.modalNew.showModal = false;
                            }, 100);
                            // }, 500);
                        }, 0);
                        // }, 1000);
                    }
                } else {
                    setTimeout(() => {
                        this.$hMessage.error(`添加标签失败!`);
                        setTimeout(() => {
                            this.modalAdd.showModal = false;
                        }, 500);
                        // setTimeout(() => {
                        //     this.$hMessage.info(`请重新选择标签!`);
                        // }, 500);
                    }, 1000);
                }
            },
            reSureOK () {
                let type = this.handleUpdateType;
                console.log(`type =`, type);
                this.onClickButton(type);
            },
            clickShowModal() {
                if (this.isFirstLoad) {
                    // only once
                    this.getLabelCategories(``, ``);
                    this.isFirstLoad = false;
                }
                // this.getLabelCategories(``, ``);
                // show text
                setTimeout(() => {
                    this.modalNew.showModal = true;
                    // let textArea = this.commonHandle.textArea;
                    // let text = document.querySelector(`#audit-common-handle-modal-text`);
                    // text.innerHTML = "";
                    // text.insertAdjacentHTML(`beforeend`, textArea);
                }, 0);
            },
            clickShowAddModal() {
                this.modalAdd.showModal = true;
            },
            clickShowNewAddModal() {
                this.modalNewAdd.showModal = true;
            },
            clickShowResureModal(type = ``) {
                // init
                this.shieldTagReason = "";
                if (type === "close" || type === "forever_shield") {
                    this.isShieldType = true;
                    let shieldTagReason = this.shieldTagReason;
                    if (shieldTagReason === "") {
                        this.isShieldValid = true;
                    } else {
                        this.isShieldValid = false;
                    }
                } else {
                    this.isShieldType = false;
                    this.isShieldValid = false;
                }
                // console.log(`button type =`, type);
                this.modalResure.showModal = true;
                this.handleUpdateType = type;
                let title = ``;
                let message = ``;
                let dataType = this.pageFlipObj.newsListType;
                switch (type) {
                    case "save":
                        title  = `保存`;
                        message = `保存成功!`;
                        break;
                    case "open":
                        title  = `公开`;
                        message = `公开成功!`;
                        if (dataType === 1) {
                            // sensitive
                            message = `公开申请已提交，待审核!`;
                        }
                        break;
                    case "close":
                        title  = `屏蔽`;
                        message = `屏蔽成功!`;
                        break;
                    case "forever_shield":
                        title  = `永久屏蔽`;
                        message = `永久屏蔽成功!`;
                        break;
                    case "passed":
                        title  = `处理通过`;
                        message = `处理通过成功!`;
                        break;
                    default:
                        break;
                }
                // console.log(`type =`, type);
                // console.log(`title =`, title);
                this.handleUpdateModalMessage = message;
                this.handleUpdateModalTitle = title;
                if (type === "close" || type === "forever_shield") {
                    setTimeout(() => {
                        // shield
                        this.$refs.shieldTagReasonSelect.focus();
                    }, 1000);
                }
            },
            onSelectTreeChange (value) {
                // console.log(`value`, value);
                let obj = value[0] || {};
                // console.log(`obj`, JSON.stringify(obj, null, 4));
                // console.log(`obj`, obj);
                // console.log(`obj`, obj.id);
                // console.log(`value`, value);
                let {
                    id,
                    title,
                } = obj;
                // 人物 101107 && 2019.02.21
                if (id === "101107") {
                    // this.autoMaxModalWidth = 1000;
                    this.autoSpanTreeSize = 8;
                    this.autoSpanButtonSize = 2;
                    this.isShowPersonTagRelationInfo = true;
                } else {
                    // this.autoMaxModalWidth = 800;
                    this.autoSpanTreeSize = 10;
                    this.autoSpanButtonSize = 3;
                    this.isShowPersonTagRelationInfo = false;
                }
                if (id) {
                    this.labelCategoryId = id;
                    this.labelAddType = title || "文本标签";
                } else {
                    this.labelCategoryId = "101";
                    this.labelAddType = "文本标签";
                }
            },
            onClickSearch() {
                // init
                this.pagination.current = 1;
                this.modalLabelCheck.modalLoading = true;
                let searchValue = this.searchValue;
                let labelCategoryId = this.labelCategoryId || `101`;
                let personTagRelationInfo = this.personTagRelationInfo;
                // // 人物 101107 && 2019.02.21
                // if (labelCategoryId === "101107") {
                //     this.isShowPersonTagRelationInfo = true;
                // } else {
                //     this.isShowPersonTagRelationInfo = false;
                // }
                let options = {
                    tagRelation: personTagRelationInfo,
                    id: labelCategoryId,
                    value: searchValue,
                    size: 10,
                    current: 1,
                };
                // update state
                this.commonFiltersPagination = {...options};
                this.getSearchLabels(options);
            },
            onSearchValueChange(obj = ``) {
                let {
                    value,
                    // title,
                    label,
                    // tag_obj,
                    // disabled,
                } = obj
                // console.log(`search obj =`, obj);
                // console.log(`search disabled =`, disabled);
                // this.searchValue = value.trim();
                // this.searchBackupValue = value.trim();
                // let isExist = false;
                // if (value.includes("{")) {
                //     isExist = true;
                // }
                // if (isExist) {
                //     this.modalNewAdd.isNewAdd = false;
                // } else {
                //     this.modalNewAdd.isNewAdd  = true;
                // }
                // if (disabled === false) {
                //     this.modalNewAdd.isNewAdd = false;
                // } else {
                //     this.modalNewAdd.isNewAdd  = true;
                // }
                // if (label) {
                //     this.modalNewAdd.isNewAdd = false;
                // } else {
                //     this.modalNewAdd.isNewAdd  = true;
                // }
                this.modalNewAdd.isNewAdd = false;
            },
            onSearchValueEnter(value = ``) {
                console.log(`enter value =`, value);
            },
            // onSearchValueChange(value = ``) {
            //     console.log(`searchValue =`, value);
            //     this.searchValue = value.trim();
            //     this.searchBackupValue = value.trim();
            //     if (value) {
            //         this.isEmptySearch = false;
            //     }
            // },
            onSearchValueQueryChange(value = ``) {
                // console.log(`searchValueQuery =`, value);
                this.searchValue = value.trim();
                // this.searchBackupValue= value.trim();
                if (!value.includes(`{`)) {
                    this.modalNewAdd.isNewAdd  = true;
                }
                if (value) {
                    this.isEmptySearch = false;
                } else {
                    this.isEmptySearch = true;
                }
            },
            // onRemoteSearchValueChange(value =``) {
            //     console.log(`searchValue =`, value);
            //     this.searchValue = value.trim();
            // },
            // remoteMethod1 (query) {
            //     if (query !== '') {
            //         this.loading1 = true;
            //         setTimeout(() => {
            //             this.loading1 = false;
            //             const list = this.list.map(item => {
            //                 return {
            //                     value: item,
            //                     label: item
            //                 };
            //             });
            //             this.options1 = list.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1);
            //         }, 200);
            //     } else {
            //         this.options1 = [];
            //     }
            // },
            onClickAdd() {
                // this.getSearchLabels();
            },
            // 栏目分类
            getColumnCategoryByKeyWord(lb = 7, keyWord = ``, listType =``, debug = false){
                if (debug) {
                    console.log(`listType =`, listType);
                }
                // let url = `/tm/classification?lb=${lb}`;
                // if (keyWord) {
                //     url = `/tm/classification?lb=${lb}&keyWord=${keyWord}`;
                // }
                let url = `/tm/classification?lb=${lb}&keyWord=${keyWord}`;
                this.$http
                .get(url)
                .then(res => res.data)
                .then((json)=>{
                    if (!json.body) {
                        console.log(`栏目分类 json =`, JSON.stringify(json, null, 4));
                    } else {
                        let {
                            status,
                            msg,
                            body: {
                                classification: listDatas,
                            },
                        } = json;
                        listDatas = listDatas.map(
                            (obj, i) => {
                                let {
                                    clms: title,
                                    dm: value,
                                    //lb: 7
                                } = obj;
                                return {
                                    title,
                                    value,
                                };
                            }
                        );
                        if(status != this.$api.SUCCESS){
                            this.$hMessage.error(msg);
                            return;
                        } else {
                            this[listType] = listDatas;
                        }
                    }
                }).catch(err => console.error(`栏目分类  error`, err));
            },
            // 标签分类
            getLabelCategories (level = 8, rootId = `101`) {
            // getLabelCategories (level = 0, rootId = ``) {
                // let url = `/tm/queryTagCategory`;
                let url = `/tm/queryTagCategory?categoryLevel=${level}&parentCategoryId=${rootId}`;
                this.$http
                .get(url)
                .then(res => res.data)
                .then((json)=>{
                    // console.log(`标签分类 json =`, JSON.stringify(json, null, 4));
                    let {
                        status,
                        msg,
                        body,
                    } = json;
                    if (!json.body) {
                        console.log(`标签分类 json =`, JSON.stringify(json, null, 4));
                    } else {
                        let labelCategories = [];
                        let {
                            children,
                        } = body;
                        // filter
                        // "id": "101108", "title": "产品"
                        let new_children = [];
                        if (children.length) {
                            children.forEach(
                                (obj, i) => {
                                    let {
                                        id,
                                    } = obj;
                                    if (id !== "101108") {
                                        new_children.push(obj);
                                    }
                                }
                            );
                        }
                        let new_body = {
                            expand: true,
                            // children: [],
                            children: new_children,
                            id: "101",
                            title: "文本标签",
                        };
                        labelCategories.push(new_body);
                        // labelCategories.push(body);
                        if(status != this.$api.SUCCESS){
                            this.$hMessage.error(msg);
                            return;
                        } else {
                            this.labelCategories = labelCategories;
                            // this.labelCategoryModal = listDatas;
                        }
                    }
                }).catch(err => console.error(`标签分类  error`, err));
            },
            // 标签查询
            getSearchLabels (options = {}) {
                let {
                    id: tagId,
                    value: tagValue,
                    size: pageSize,
                    current: pageNum,
                    tagRelation,
                } = options;
                if (!tagId) {
                    tagId = `101`;
                }
                if (!tagValue) {
                    tagValue = `箱包`;
                }
                if (!tagRelation) {
                    tagRelation = ``;
                }
                let url = `/tm/queryTagsByTagValueLike`;
                if (tagId) {
                    // url += `?categoryId=${tagId}&tagValue=${tagValue}&pageSize=${pageSize}&pageNum=${pageNum}`;
                    url += `?categoryId=${tagId}&tagValue=${tagValue}&pageSize=${pageSize}&pageNum=${pageNum}&tagRelation=${tagRelation}`;
                }
                this.tableLoading = true;
                this.sNewAddLabel = false;
                this.$http
                .get(url)
                .then(res => res.data)
                .then((json)=>{
                    let {
                        status,
                        msg,
                        body,
                    } = json;
                    if(status != this.$api.SUCCESS){
                        this.pagination.total = 0;
                        this.pagination.current = 1;
                        this.sNewAddLabel = true;
                        this.tableLoading = false;
                        this.modalLabelCheck.modalLoading = false;
                        // server bug
                        this.labelCategorySelects =  [];
                        this.commonHandleModalTableDatas = [];
                        // console.log(`标签查询 json =`, JSON.stringify(json, null, 4));
                        this.$hMessage.error(msg);
                        return;
                    } else {
                        this.modalLabelCheck.modalLoading = false;
                        let {
                            total_num: total,
                            tag_objects: listDatas,
                            flag: aliasFlag,
                        } = body;
                        // 0 = 展示
                        if (aliasFlag === 0) {
                            this.commonHandleModalTableCols = this.commonHandleModalTableColsWithAlias;
                        }
                        this.pagination.total = total || 0;
                        let commonHandleModalTableDatas = [];
                        if (listDatas.length) {
                            this.$hMessage.success(`查询标签成功!`);
                            listDatas = listDatas.map(
                                (obj, i) => {
                                    let {
                                        tag_value: title,
                                        // tag_value: value,
                                        // tag_id: value,
                                        // tag_value: bqmc,
                                        tag_categorys: bqlb,
                                        category_id: dlid,
                                        tag_id: bqdm,
                                        other_obj: {
                                            business_id: bid,
                                        },
                                        relationInfo: alias,
                                    } = obj;
                                    // add label
                                    let tag_obj = {
                                        zxid: this.commonHandle.newsId,
                                        bqmc: title,
                                        bqdm,
                                        bqlb,
                                        dlid,
                                        bqywdm: bid ? bid : null,
                                        alias,
                                    };
                                    commonHandleModalTableDatas.push(tag_obj);
                                    return {
                                        uid: bqdm,
                                        title,
                                        label: title,
                                        // value: bqdm,
                                        // tag_obj: {
                                        //     zxid: this.commonHandle.newsId,
                                        //     bqmc: title,
                                        //     bqdm,
                                        //     bqlb,
                                        //     dlid,
                                        //     bqywdm: bid ? bid : null,
                                        // },
                                        value: JSON.stringify(tag_obj),// String || Number && no support Object
                                        // disabled: false,
                                    };
                                }
                            );
                            this.labelCategorySelects = listDatas;
                            this.commonHandleModalTableDatas = commonHandleModalTableDatas;
                            // console.log(`SearchLabels[0] =`, JSON.stringify(listDatas[0], null, 4));
                            this.isNewAddLabel = false;
                            this.modalNewAdd.isNewAdd = false;
                            // setTimeout(() => {
                            //     this.$refs["labelCategorySelect"].focus();
                            // }, 500);
                        }else {
                            // console.log(`no data!`);
                            this.$hMessage.info(`未查询到标签!`);
                            this.modalNewAdd.isNewAdd = true;
                            this.isNewAddLabel = true;
                        }
                        this.tableLoading = false;
                        this.isEmptySearch = false;
                        // this.labelCategoryModal = JSON.stringify(listDatas[0]);
                        // this.commonHandleSearchLabels = listDatas;
                        // 箱包
                        // console.log(`SearchLabels =`, JSON.stringify(listDatas, null, 4));
                        // setTimeout(() => {
                        //     console.log(`searchBackupValue =`, this.searchBackupValue);
                        //     this.searchValue = this.searchBackupValue;
                        // }, 0);
                        // setTimeout(() => {
                        //     this.searchValue = JSON.stringify(listDatas[0]);
                        //     // this.searchValue = JSON.stringify(this.commonHandleSearchLabels[0]);
                        // }, 1000);
                    }
                }).catch(err => console.error(`标签查询  error`, err));
            },
            filterLabelsTableDatas (listDatas = []) {
                if (Array.isArray(listDatas) && listDatas.length) {
                    listDatas = listDatas.map(
                        (obj, i) => {
                            let {
                                zxid: newsId,
                                bqmc: labelName,
                                bqdm: labelCode,
                                bqlb: tagCategories,// array[1]
                                // id: tag_id,
                                relationInfo: labelAlias,
                                // bqqz: labelWeight,
                                showBqqz: labelWeight,
                                synonym: synonyms,
                            } = obj;
                            // console.log(`obj =`, JSON.stringify(obj, null, 4));
                            if (!synonyms || !synonyms.length) {
                                synonyms = "";
                            } else {
                                synonyms = synonyms.join();
                                // synonyms = synonyms.join(`,`);
                            }
                            // if (!labelWeight) {
                            //     labelWeight = "";
                            // } else {
                            //     // labelWeight = parseFloat(labelWeight).toFixed(3);
                            // }
                            let tagCategory = " ";
                            if (tagCategories) {
                                // tagCategory = tagCategories[1];
                                // if (tagCategories[1] === "机构") {
                                //     tagCategory = tagCategories[2] || "";
                                // }
                                tagCategory = tagCategories.slice(1).toString();
                            }
                            return {
                                index: i + 1,
                                newsId,
                                labelName,
                                labelCode,
                                tagCategory,
                                tag: obj,
                                tag_id: labelCode,
                                labelAlias,
                                labelWeight,
                                synonyms,
                            };
                        }
                    );
                } else {
                    listDatas = [];
                }
                this.commonHandleTableDatas = listDatas;
            },
            // 获取一般资讯: 处理详情
            getHandleInfos(uniqueNewsId = ``) {
                let router_query = JSON.parse(window.sessionStorage.getItem(`all-in-one_route_query_handle`));
                let {
                    type,
                    desc,
                    uid,
                    url: path,
                } = router_query;
                // console.log(`news list type =`, type, typeof(type));
                // let {
                //     type,
                //     desc,
                //     uid,
                //     url: path,
                // } = this.$route.query;
                let url = `${path}?newsId=${uid}`;
                if (uniqueNewsId) {
                    url = `${path}?newsId=${uniqueNewsId}`;
                }
                // this.tableLoading = true;
                this.$http
                .get(url)
                .then(res => res.data)
                .then((json)=>{
                     let {
                        status,
                        msg,
                        body,
                    } = json;
                    if(status != this.$api.SUCCESS){
                        // console.log(`一般资讯: 处理详情 json =`, JSON.stringify(json, null, 4));
                        this.$hMessage.error(msg);
                        let that = this;
                        setTimeout(() => {
                            that.returnParentPage();
                        }, 500);
                        return;
                    } else {
                        let {
                            showXwbt: newsHighLightTitle,
                            xwbt: newsTitle,
                            ljdz: newsLink,
                            zxzy: newsBrief,
                            dataStatusDesc: newsStatus,
                            dataStatus,
                            // zxly: newsSource,
                            fbsj: publishDate,
                            xxfbsj: newsPublishTime,
                            // lmfl: columnCategory,
                            // yxj: priority,
                            mtcc: mediaSource,
                            zxzz: newsAuthor,
                            newsId,
                            zxnr: textArea,
                            tags: listDatas,
                            qgzfm: newsEmotion,
                            qgzfmSet: newsEmotions,
                            gkbz: openFlag,
                            proInfo: newsLogs,
                            sensitives: sensitiveWords,
                            personTag: bidTags,
                            removeTags,
                            machineShieldDesc: machineShield,// 机器屏蔽原因
                        } = body;
                        if (machineShield === "") {
                            this.isShowMachineShield = false;
                        } else {
                            this.isShowMachineShield = true;
                        }
                        // this.isShowMachineShield = true;
                        this.newsHighLightTitleBackup = newsTitle;
                        if (newsHighLightTitle.includes(`span`)) {
                            this.newsHighLightTitle = newsHighLightTitle;
                            this.showHighLightTitle = true;
                            let that = this;
                            setTimeout(() => {
                                // console.log(`newsHighLightTitle =`, newsHighLightTitle);
                                // let highLightTitle = this.$refs[highlight-title"];
                                let highLightTitle = document.querySelector(`[data-dom="highlight-title"]`);
                                highLightTitle.innerHTML = ``;
                                highLightTitle.insertAdjacentHTML(`beforeend`, newsHighLightTitle);
                                let wrapper = document.querySelector(`[data-dom="highlight-title-wrapper"]`);
                                if (wrapper) {
                                    let flag = wrapper.dataset.bindOnce || false;
                                    if (!flag) {
                                        wrapper.dataset.bindOnce = true;
                                        wrapper.addEventListener(`click`, () => {
                                            that.showHighLightTitle = false;
                                        });
                                    }
                                }
                            }, 0);
                        } else {
                            this.newsHighLightTitle = ``;
                            this.showHighLightTitle = false;
                        }
                        if(!removeTags) {
                            removeTags = [];
                        }
                        if (!bidTags.length) {
                            bidTags = [];
                        }
                        this.initBidTags = bidTags || [];
                        // shaped bidTags
                        if (Array.isArray(bidTags) && bidTags.length) {
                            let bidTagsNames = [];
                            let bidHandleTableDatas = [];
                            bidTags.forEach((obj, index) => {
                                let {
                                    bqmc: tagName,
                                    id: tagId,
                                    filterTypeDesc: tagCategory,
                                    filterType,
                                    // bqqz: bidLabelWeight,
                                    showBqqz: bidLabelWeight,
                                } = obj;
                                // if (!bidLabelWeight) {
                                //     bidLabelWeight = "";
                                // } else {
                                //     // bidLabelWeight = parseFloat(bidLabelWeight).toFixed(3);
                                // }
                                if (!tagCategory) {
                                    tagCategory = "";
                                }
                                if (!tagName) {
                                    tagName = "";
                                }
                                let newBidTag = {
                                    index,
                                    tagIndex: index,
                                    // tagIndex: tagId,
                                    tagId,
                                    tagName,
                                    tagCategory,// filterTypeDesc
                                    tagValue: "",
                                    tagOptions: [],
                                    obj,
                                    filterType,
                                    bidLabelWeight,
                                };
                                // async get bids
                                bidTagsNames.push({
                                    tagName,
                                    filterType,
                                });
                                bidHandleTableDatas.push(newBidTag);
                            });
                            this.bidTagsNames = bidTagsNames;
                            this.bidHandleTableDatas = bidHandleTableDatas;
                            this.isBidTagsEmpty = false;
                            let that = this;
                            setTimeout(() => {
                                if (bidTagsNames.length) {
                                    bidTagsNames.forEach(
                                        (name, i) => {
                                            // tagOptions
                                            that.getBidsByClickSelect(name, i);
                                        }
                                    );
                                }
                            }, 0);
                        } else {
                            this.bidHandleTableDatas = [];
                            this.bidTagsNames = [];
                            this.isBidTagsEmpty = true;
                        }
                        if(dataStatus === 0) {
                            this.isNewsHandleFinsihed = true;
                        }
                        if(dataStatus === 1) {
                            this.isNewsHandleFinsihed = false;
                        }
                        if (!sensitiveWords) {
                            sensitiveWords = "";
                        }else {
                            sensitiveWords = sensitiveWords.toString();
                        }
                        // 敏感词 & newsListType / dataType ???
                        if (type === 1) {
                            // newsListType === "1"
                            this.isShowSensitiveWords = true;
                        } else {
                            this.isShowSensitiveWords = false;
                        }
                        let publicFlag = ``;
                        if (openFlag === 0) {
                            // 1 === open
                            openFlag = true;
                            publicFlag = "屏蔽";
                        } else if (openFlag === 1){
                            // 0 === close
                            openFlag = false;
                            publicFlag = "公开";
                        }
                        if (newsEmotions) {
                            let emotions = [];
                            newsEmotions.forEach(
                                (obj, i) => {
                                    let {
                                        qgzfm: value,
                                        qgzfmDesc: title,
                                    } = obj;
                                    emotions.push({
                                        value: value.toString(),
                                        title,
                                    });
                                }
                            );
                            this.newsEmotions = emotions;
                        }
                        let newsHandleLogs = ``;
                        if (newsLogs.length) {
                            this.isEmptyCommonLogs = false;
                            newsLogs.forEach(
                                (str, i) => {
                                    if (i % 2 === 0) {
                                        // h-tooltip
                                        newsHandleLogs += `
                                            <span
                                                data-title="${str}"
                                                class="audit-common-handle-logs-row-color-odd">
                                                ${str}
                                            </span><br/>
                                        `;
                                    } else {
                                        newsHandleLogs += `
                                            <span
                                                data-title="${str}"
                                                class="audit-common-handle-logs-row-color-event">
                                                ${str}
                                            </span><br/>
                                        `;
                                    }
                                }
                            );
                        } else {
                            this.isEmptyCommonLogs = true;
                        }
                        setTimeout(() => {
                            let flag = this.isEmptyCommonLogs;
                            if (!flag) {
                                let logs = document.querySelector(`#audit-common-handle-logs`);
                                logs.innerHTML = "";
                                logs.insertAdjacentHTML(`beforeend`, newsHandleLogs);
                            }
                        }, 0);
                        let newText = "";
                        if (textArea) {
                            let textArr = textArea.split(`\\n`);
                            let noImgArr = [];
                            textArr.forEach(
                                (item, i) => {
                                    if (!item.includes("hsjyimg")) {
                                        noImgArr.push(item);
                                    } else {
                                        // replaceAll
                                        let newItem = item.replace(/hsjyimg/ig, ``);
                                        // let newItem = item.replace(`hsjyimg`, ``);
                                        noImgArr.push(newItem);
                                    }
                                }
                            );
                            noImgArr.forEach(
                                (item, i) => {
                                    if (i % 4 === 0) {
                                        i === 0 ? item = `${item}<br />` : item = `${item}<br /><hr style="margin: 10px;"/>`;
                                    } else {
                                        item = `${item}<br />`;
                                    }
                                    newText += item;
                                }
                            );
                        }
                        setTimeout(() => {
                            let text = document.querySelector(`#audit-common-handle-text`);
                            text.innerHTML = "";
                            text.insertAdjacentHTML(`beforeend`, newText);
                        }, 0);
                        this.textAreaDisabled = true;
                        this.commonHandle = {
                            textArea,
                            textAreaModal: textArea,
                            newsId,
                            newsTitle,
                            newsLink,
                            newsBrief,
                            newsStatus,
                            // newsSource,
                            // publishDate: TODAY,
                            publishDate,
                            newsPublishTime,
                            // columnCategory,
                            // priority,
                            mediaSource,
                            newsAuthor,
                            newsEmotion: newsEmotion ? newsEmotion.toString() : "",// select number bug!
                            openFlag,
                            newsHandleLogs,
                            sensitiveWords,
                            publicFlag,
                            removeTags,
                            machineShield,
                        };
                        this.initCommonHandleTableDatas = listDatas;
                        let uniqueTagsIds = [];
                        if (Array.isArray(listDatas) && listDatas.length) {
                            listDatas = listDatas.map(
                                (obj, i) => {
                                    let {
                                        zxid: newsId,
                                        bqmc: labelName,
                                        bqdm: labelCode,
                                        bqlb: tagCategories,// array[1]
                                        // id: tag_id,
                                        relationInfo: labelAlias,
                                        // bqqz: labelWeight,
                                        showBqqz: labelWeight,
                                        synonym: synonyms,
                                    } = obj;
                                    if (!synonyms || !synonyms.length) {
                                        synonyms = "";
                                    } else {
                                        synonyms = synonyms.join();
                                        // synonyms = synonyms.join(`,`);
                                    }
                                    // if (!labelWeight) {
                                    //     labelWeight = "";
                                    // } else {
                                    //     // labelWeight = parseFloat(labelWeight).toFixed(3);
                                    // }
                                    // if(labelWeight === 0) {
                                    //     labelWeight = labelWeight + `.0`;
                                    // } else {
                                    //     if (!labelWeight) {
                                    //         labelWeight = "";
                                    //     }
                                    // }
                                    let tagCategory = " ";
                                    if (tagCategories) {
                                        // tagCategory = tagCategories[1];
                                        // if (tagCategories[1] === "机构") {
                                        //     tagCategory = tagCategories[2] || "";
                                        // }
                                        tagCategory = tagCategories.slice(1).toString();
                                    }
                                    if (labelCode) {
                                        uniqueTagsIds.push(labelCode);
                                    }
                                    return {
                                        index: i + 1,
                                        newsId,
                                        labelName,
                                        labelCode,
                                        tagCategory,
                                        tag: obj,
                                        tag_id: labelCode,
                                        labelAlias,
                                        labelWeight,
                                        synonyms,
                                    };
                                }
                            );
                        } else {
                            listDatas = [];
                        }
                        this.commonHandleTableDatas = listDatas;
                        this.uniqueTagsIds = uniqueTagsIds;
                    }
                    this.clickGetNewsId();
                    this.clickGetNewsLink();
                    // auto bind
                    // this.keyboardShortcutKeys();
                    // this.tableLoading = false;
                }).catch(err => console.error(`获取一般资讯: 处理详情  error`, err));
            },
            init() {
                let pageFlipObj = JSON.parse(window.sessionStorage.getItem("all-in-one_flipObj_handle"));
                this.pageFlipObj = pageFlipObj || {};
                // init
                this.getShieldReasons();
                this.getRemoveTagReasons();
                // this.getColumnCategoryByKeyWord(7, ``, `columnCategories`);
                // this.getHandleInfos();
                this.autoHashSearch();
                // this.getLabelCategories();
                // this.getLabelCategories(``, ``);
                // let that = this;
                // setTimeout(() => {
                //     that.clickGetNewsId();
                // }, 1000);
            },
            showRedColor() {
                let input = document.querySelector(`[placeholder="处理状态"]`);
                input.setAttribute("data-color", "red");
                // input.style.color = "#f0f";
                input.style.color = "#f5222d";
            },
            returnParentPage () {
                // let path = `/audit/news/all-in-one/operate-handle`;
                // this.$store.commit("DEL_TAB", path);
                // re-direct
                this.$router.push(`/audit/news/all-in-one`);
            },
            autoSkip(type = `alink-uid`) {
                let that = this;
                // this.$refs[type]
                // this.$refs["alink-uid"]
                let alink = document.querySelector(`[data-alink="router"]`);
                if (alink) {
                    let flag = alink.dataset.isBind || false;
                    if (!flag) {
                        alink.dataset.isBind = true;
                        alink.addEventListener(`click`, () => {
                            let uid = alink.dataset.uid;
                            console.log(`uid =`, uid);
                            // this.$router.push(`/audit/news/all-in-one`);
                            that.$router.push(`/audit/news/all-in-one#${uid}`);
                        });
                    }
                }
            },
            getSkipUID() {
                let uid = window.parent.location.hash.replace(`#`, ``) || ``;
                return uid;
            },
            autoHashSearch() {
                let uid = this.getSkipUID();
                if (uid) {
                    this.isHashRouterNewsId = true;
                    setTimeout(() => {
                        this.$router.push(`/audit/news/all-in-one/operate-handle`);
                    }, 500);
                } else {
                    this.isHashRouterNewsId = false;
                }
                this.getHandleInfos();
            },
        },
        mounted() {
            this.init();
            setTimeout(() => {
                this.showRedColor();
                this.mouseSlipGetWords();
                // skip
                // this.autoSkip();
            }, 0);
        },
        activated: function(){
            // keep-alive 组件激活时调用。
            this.autoHashSearch();
        },
    }
</script>

<style lang="scss" scoped>
    /* scss variables */
    $default-color: #000;
    // mixin
    @mixin common-lable($color) {
        color: $color;
        display: inline-block;
        width: 55px;
        text-align: center;
    }
    .audit-common-lable{
        @include common-lable($default-color);
        &::after{
            display: inline-block;
            content: ":";
        }
    }
    .audit-common-lable-placeholder{
        @include common-lable($default-color);
    }
    .audit-common-padding{
        display: block;
        padding-bottom: 5px;
        border: 0;
    }
    .audit-common-content{
        margin-top: 10px;
    }
    .audit-common-link,
    .audit-common-link:hover{
        color: #298DFF !important;
        text-decoration: none;
        cursor: pointer;
    }
    /* new */
    .common-handle-padding{
        margin-bottom: 5px;
    }
    .common-handle-link,
    .common-handle-link:hover{
        color: #298DFF !important;
        text-decoration: none;
        cursor: pointer;
    }
    .common-handle-required{
        position: relative;
    }
    .common-handle-required::before {
        position: absolute;
        content: "*";
        display: inline-block;
        margin-right: 2px;
        line-height: 0;
        font-family: SimSun;
        font-size: 12px;
        color: #F5222D;
        top: 50%;
        left: -5px;
    }
    .vertical-center-modal{
        display: flex;
        align-items: center;
        /* height: 70%;
        width: 80%; */
        /* min-height: 500px;
        min-width: 600px; */
        /* margin: 10px auto;
        top: 50px; */
    }
    .audit-common-lable-super-long{
        display: inline-block;
        width: 78px;
        transform: translateX(-22px);
    }
</style>

<style lang="scss">
    /* global css & overwrite h_ui css */
    .common-handle-status > input.h-input-disabled,
    .common-handle-status > textarea.h-input-disabled{
        color: #f5222d;
        /* color: #f00 !important; */
    }
    .audit-common-handle-logs-row-color-odd{
        color: #999;
    }
    .audit-common-handle-logs-row-color-event{
        color: #505c6b;
    }
    #audit-common-handle-logs,
    #audit-common-handle-text,
    #audit-common-handle-modal-text {
        border: 1px solid #dfe4e9;
        background-color: #F7F7F7;
        opacity: 1;
        color: #333;
        font-size: 14px;
        overflow: auto !important;
        padding: 10px;
        border-radius: 4px;
        -webkit-user-select: text !important;
        -moz-user-select: text !important;
        -ms-user-select: text !important;
        user-select: text !important;
    }
    #audit-common-handle-logs{
        min-height: 100px;
        max-height: 300px;
    }
    #audit-common-handle-text,
    #audit-common-handle-modal-text {
        min-height: 200px;
        max-height: 300px;
    }
    #audit-common-handle-modal-text {
        min-height: 300px;
        max-height: 500px;
    }
    .audit-label-highlight-color{
        background-color: #ff0;
        /* color: #f0f; */
        padding: 0 3px;
        font-weight: bold;
        font-size: 13px;
    }
    .audit-sensitives-highlight-color{
        color: #f00;
        /* background-color: #ff0; */
        padding: 0 3px;
        font-weight: bold;
        font-size: 13px;
    }
</style>

<style lang="scss" scoped>
    .hidden-menus{
        display: none;
        position: absolute;
        background: #fff;
        color: #fff;
        width: 102px;
        height: 110px;
        /* height: 78px; */
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 5px;
    }
    .hidden-menus-space{
        display: block;
        height: 2px;
        width: 100%;
    }
    .hidden-menus-btn {
        width: 100%;
        color: #fff;
        background-color: #298DFF;
        margin: 1px auto;
        border: 1px solid #298DFF;
        border-radius: 3px;
        cursor: pointer;
        user-select: none;
        /* padding: 6px 15px; */
        font-size: 12px;
        display: inline-block;
        margin-bottom: 0;
        font-weight: normal;
        text-align: center;
        vertical-align: middle;
    }
    .audit-common-row-padding{
        margin-bottom: 5px;
    }
</style>

<style lang="scss">
    .h-table-body > table {
        -webkit-user-select: text;
        -moz-user-select: text;
        -ms-user-select: text;
        user-select: text;
    }
</style>


<style lang="scss" scoped>
    .overflowAutoHidden {
        background: #0f0;
    }
    .select-overflow-ellipsis {
        overflow: hidden;
        word-wrap: break-word;
        text-overflow: ellipsis;
    }
    [data-class="select-overflow-ellipsis"] {
        max-width: 185px;
        width: 185px;
        overflow: hidden;
        word-wrap: break-word;
        text-overflow: ellipsis;
    }
    [data-none="no-data-p"] {
        width: 100%;
    }
    [data-none="no-data-span"] {
        display: inline-block;
        width: 50%;
        /* color: red; */
        /* margin: auto; */
        margin-left: 50%;
        /* transform: translateX(-50%); */
    }
    .bid-table-content{
        max-height: 250px;
        overflow-y: auto;
    }
    .audit-common-bid-table-delete{
        color: #298DFF;
    }
</style>

<style lang="scss">
    /* global css & overwrite h_ui css */
    .common-handle-status > input.h-input-disabled{
        color: #f5222d;
        /* color: #f00 !important; */
    }
    .audit-common-handle-logs-row-color-odd{
        color: #999;
    }
    .audit-common-handle-logs-row-color-event{
        color: #505c6b;
    }
    #audit-common-handle-logs,
    #audit-common-handle-text,
    #audit-common-handle-modal-text {
        border: 1px solid #dfe4e9;
        background-color: #F7F7F7;
        opacity: 1;
        color: #333;
        font-size: 14px;
        overflow: auto !important;
        padding: 10px;
        border-radius: 4px;
        -webkit-user-select: text !important;
        -moz-user-select: text !important;
        -ms-user-select: text !important;
        user-select: text !important;
    }
    #audit-common-handle-logs{
        min-height: 100px;
        max-height: 300px;
    }
    #audit-common-handle-text,
    #audit-common-handle-modal-text {
        min-height: 200px;
        max-height: 300px;
    }
    #audit-common-handle-modal-text {
        min-height: 300px;
        max-height: 500px;
    }
    .audit-label-highlight-color{
        background-color: #ff0;
        /* color: #f0f; */
        padding: 0 3px;
        font-weight: bold;
        font-size: 13px;
    }
    .bid-table-header{
        border: 1px solid #dfe4e9;
        background-color: #F7F7F7;
        opacity: 1;
        color: #999;
        overflow: auto !important;
        padding: 10px;
        /* border-radius: 4px; */
        text-align: center;
        margin-top: 10px;
        border-bottom: 0;
    }
    .bid-table-header > .audit-bid-lable:nth-of-type(1){
        border-right: 1px solid #dfe4e9;
        padding-right: 10px;
    }
    .bid-table-header > .audit-bid-lable:nth-of-type(2){
        border-right: 1px solid #dfe4e9;
    }
    .bid-table-content{
        /* border: 1px solid #dfe4e9; */
        /* background-color: #F7F7F7; */
        opacity: 1;
        color: #999;
        overflow: auto !important;
        padding: 0;
        /* border-radius: 4px; */
        margin-top: 0;
        border-bottom: 0;
        border-top: 1px solid #dfe4e9;
    }
    .bid-table-content > .bid-table-row {
        /* border: 1px solid #dfe4e9 !important; */
        /* margin: 0; */
        margin: 2px 0px;
        text-align: center;
        /* vertical-align: middle; */
        /* width: 120%; */
        height: 32px;
        text-align: center;
        vertical-align: middle;
        border-right: 1px solid #dfe4e9 !important;
    }
    .bid-table-content > div > div {
        border-bottom: 1px solid #dfe4e9 !important;
        border-right: 1px solid #dfe4e9 !important;
        border-left: 1px solid #dfe4e9 !important;
        /* border: 1px solid #dfe4e9 !important; */
        display: block;
        height: 100%;
        min-height: 50px;
        padding: 10px 0;
        margin: 0;
    }
    /* .shit-h_ui-table-cell > .h-table-cell {
        color: #f0f;
        background: transparent;
      overflow-y: auto !important;
    }
    .h-table-cell {
      overflow-y: auto !important;
    } */
    .audit-common-bid-lable {
        color: #000;
        display: inline-block;
        width: 100%;
        text-align: center;
    }
</style>


<style lang="scss">
    [data-alink="router"]{
        color: #298DFF !important;
        /* text-decoration: none; */
        cursor: pointer;
    }
</style>


<style lang="scss">
    .mini-cell-width > div.h-table-cell{
        padding-left: 5px !important;
        padding-right: 5px !important;
    }
    .news-highlight-title-wrapper {
        display: inline-block;
        width: 80%;
        position: relative;
        vertical-align: middle;
        height: 32px;
    }
    .news-highlight-title{
        display: inline-block;
        width: 100%;
        /* width: 80%; */
        /* width: calc(100% - 100px); */
        height: 32px;
        padding: 4px 12px;
        font-size: 12px;
        border: 1px solid #D7DDE4;
        border-radius: 4px;
        color: #495060;
        background-color: #fff;
        background-image: none;
        position: relative;
        cursor: text;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        -webkit-transition: border 0.2s ease-in-out, background 0.2s ease-in-out, -webkit-box-shadow 0.2s ease-in-out;
        transition: border 0.2s ease-in-out, background 0.2s ease-in-out, -webkit-box-shadow 0.2s ease-in-out;
        transition: border 0.2s ease-in-out, background 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
        transition: border 0.2s ease-in-out, background 0.2s ease-in-out, box-shadow 0.2s ease-in-out, -webkit-box-shadow 0.2s ease-in-out;
    }
    .news-highlight-title-left {
        text-align: left;
    }
    .news-highlight-title-disabled{
        background-color: #F7F7F7;
        opacity: 1;
        cursor: not-allowed;
        color: #999;
    }
</style>
