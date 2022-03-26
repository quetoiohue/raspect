<template>
  <el-container direction="vertical" :class="$style.container">
    <portal to="right-toolbar">
      <nuxt-link to="/">
        <el-button class="back-btn" type="primary" icon="el-icon-back" round>Back to Project list</el-button>
      </nuxt-link>
    </portal>
    <el-container direction="vertical">
      <div :class="$style.title">Elevator 002</div>
      <filter-bar :filter="filter" @set-filter="setFilter" />
    </el-container>
    <el-row :gutter="20" :class="$style.contentContainer">
      <el-col :span="6">
        <el-card>
          <div :class="$style.panzoom">
            <p :class="$style.subtitle">Overview</p>
            <div :class="$style.image">
              <img ref="panzoomImage" src="~/static/elevator-detail.svg" />
              <div :class="$style.controls">
                <div :class="$style.zoomIn" @click="zoomIn">+</div>
                <div :class="$style.zoomOut" @click="zoomOut">-</div>
              </div>
              <el-tooltip placement="top" :visible-arrow="false" popper-class="info-tooltip">
                <div slot="content" class="content">
                  Elevator Motor <br />
                  Health Status: Moderate <br />
                  since 13:24 16/06/2021
                </div>
                <span :class="$style.infoIcon">
                  <icons name="ic-info" />
                </span>
              </el-tooltip>
            </div>
          </div>
          <el-divider></el-divider>
          <div :class="$style.elevatorForm">
            <el-form label-position="top" label-width="100px">
              <el-form-item>
                <editable v-model="elevatorForm.name" trigger-event="dbclick" :class="$style.subtitle" />
              </el-form-item>
              <div :class="$style.groupItem">
                <el-form-item label="Location">
                  <editable v-model="elevatorForm.location" trigger-event="dbclick" />
                </el-form-item>
                <el-form-item label="Floor Served">
                  <editable v-model="elevatorForm.floor" trigger-event="dbclick" />
                </el-form-item>
              </div>

              <el-form-item label="Elevator Model">
                <editable v-model="elevatorForm.modal" trigger-event="dbclick" />
              </el-form-item>
              <el-form-item label="Installation Date">
                <editable v-model="elevatorForm.installation_date" trigger-event="dbclick" />
              </el-form-item>
              <el-form-item label="Last Inspection Date">
                <editable v-model="elevatorForm.inspection_date" trigger-event="dbclick" />
              </el-form-item>

              <div :class="$style.bottomBtns">
                <el-button v-if="isChangedData" :class="$style.saveBtn" type="danger" @click="saveElevatorForm">
                  Save
                </el-button>
              </div>
            </el-form>
          </div>
        </el-card>
      </el-col>
      <el-col :span="18">
        <el-card :class="$style.statusContainer">
          <div :class="$style.statusContent">
            <div :class="$style.motorStatus">
              <p :class="$style.subtitle">Elevator Motor Status</p>
              <div :class="$style.machineItem" />
              <span :class="$style.infoIcon">
                <icons name="ic-douple-info" />
              </span>
            </div>
            <div :class="$style.componentStatus">
              <div :class="$style.componentHeader">
                <p :class="$style.subtitle">Component Status</p>
                <small :class="$style.editTime">7/06/2021 17:30</small>
              </div>

              <div :class="$style.statusContainer">
                <div :class="$style.statusBox" :style="{ borderColor: STATUSES[currentStatus].color }">
                  <div :class="$style.statusInfo">
                    <strong :style="{ borderColor: STATUSES[currentStatus].color }">Bearing 1 </strong>
                    <span>
                      <strong>Moderate </strong>
                      <small> Schedule bearing replacement</small>
                    </span>
                  </div>
                  <status-bar :current-status="currentStatus" />
                </div>
                <div :class="$style.statusBox">
                  <div :class="$style.statusInfo">
                    <strong>Bearing 1 </strong>
                    <span>
                      <strong>Normal </strong>
                      <small> since 12:24 16/06/2016</small>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </el-container>
</template>
<script>
import { getCurrentInstance, onMounted, reactive, ref, toRefs, watch } from '@vue/composition-api'
import Panzoom from '@panzoom/panzoom'
import isEqual from 'lodash/isEqual'
import cloneDeep from 'lodash/cloneDeep'

import filterBar from '~/components/elevator/filter-bar.vue'
import statusBar from '~/components/elevator/status-bar.vue'
import { STATUS_INDEXS, STATUSES } from '~/constants'

export default {
  components: { filterBar, statusBar },
  layout: 'base',
  setup() {
    const vm = getCurrentInstance().proxy
    const panzoom = ref(null)
    const elevatorForm = reactive({
      name: 'Elevator 002',
      location: 'Zone 2',
      floor: '100F - 120F',
      modal: 'Schindler 3000',
      installation_date: '12 Jun 2020',
      inspection_date: '12 Jun 2021',
    })
    const data = reactive({
      currentStatus: STATUS_INDEXS.MINOR,
      filter: {
        zone: '',
        status: '',
      },
      originalElevatorForm: null,
      isChangedData: false,
    })

    const setFilter = (key, value) => {
      data.filter[key] = value
    }

    const zoomIn = () => panzoom.value.zoomIn()
    const zoomOut = () => panzoom.value.zoomOut()

    const saveElevatorForm = () => {
      console.log('🚀 ~ file: _elevatorId.vue ~ line 107 ~ saveElevatorForm ~ saveElevatorForm', data, elevatorForm)
    }

    watch(
      () => isEqual(data.originalElevatorForm, elevatorForm),
      (val) => {
        data.isChangedData = !val
      },
      { deep: true }
    )

    onMounted(() => {
      if (vm.$refs.panzoomImage) {
        panzoom.value = Panzoom(vm.$refs.panzoomImage, {
          maxScale: 2,
          minScale: 0.75,
          step: 0.25,
          origin: '50% 0%',
        })
        data.originalElevatorForm = cloneDeep(elevatorForm)
      }
    })

    return {
      ...toRefs(data),
      STATUSES,
      elevatorForm,
      setFilter,
      Panzoom,
      zoomIn,
      zoomOut,
      saveElevatorForm,
    }
  },
}
</script>
<style lang="scss" module>
.container {
  .title {
    font-weight: $font-weight-primary;
    font-size: $font-size-extra-large;
    line-height: 27px;
    margin-bottom: 12px;
    color: $color-text;
  }

  .subtitle {
    font-weight: bold;
    margin-bottom: 16px;

    input {
      font-weight: bold !important;
      font-size: $font-size-medium !important;
    }
    &:global(.el-input) {
      margin-bottom: 0;
    }
  }

  .contentContainer {
    .panzoom {
      .image {
        overflow: hidden;
        position: relative;
        .controls {
          height: 88px;
          width: 40px;
          display: flex;
          flex-direction: column;
          background: $color-white;
          border: 0.5px solid #bbbbbb;
          border-radius: 10px;
          position: absolute;
          right: 0;
          bottom: 0;
          overflow: hidden;
          > div {
            flex: 1;
            color: $color-black;
            text-align: center;
            font-size: 24px;
            line-height: 44px;
            cursor: pointer;
            transition: 0.3s background;
            &:hover {
              background: $background-hover;
            }
          }
        }
        img {
          width: 100%;
        }
        .infoIcon {
          position: absolute;
          top: 25%;
          left: 60%;
          cursor: pointer;
        }
      }
    }

    .elevatorForm {
      .groupItem {
        display: flex;
        column-gap: 30px;
      }
      :global {
        .el-form-item {
          &__label {
            font-size: 10px;
          }
          .el-input {
            &__inner {
              font-weight: $font-weight-primary;
              font-size: 11px;
              &[contenteditable='false'] {
                padding: 0;
              }
            }
          }
        }
      }
    }

    .statusContainer {
      min-height: 540px;
      .statusContent {
        display: flex;
        .motorStatus {
          position: relative;
          .machineItem {
            width: 560px;
            height: 448px;
            background: url('~/static/motor-machine.svg') center no-repeat;
            filter: opacity(80%);
          }
          .infoIcon {
            position: absolute;
            top: 50%;
            left: 50%;
            cursor: pointer;
          }
        }
        .componentStatus {
          flex: 1;
          padding-left: 48px;
          border-left: 1px solid #d8d8d8;

          .componentHeader {
            display: flex;
            justify-content: space-between;
          }

          .statusBox {
            padding: 20px;
            border: 1px solid transparent;
            border-radius: 10px;

            .statusInfo {
              display: flex;
              align-items: center;
              margin-bottom: 30px;
              > strong {
                padding: 8px 30px 8px 0;
                border-right: 2px solid #9f9f9f;
                margin-right: 14px;
              }
              > span {
                strong {
                  display: block;
                }
              }
            }
          }
        }
      }
    }
  }
}
:global {
  .info-tooltip {
    .content {
      font-size: 10px;
      line-height: 14px;
      padding: 3px 18px;
      text-align: center;
    }
  }
}
</style>
