<template>
  <el-container direction="vertical" :class="$style.container">
    <portal to="right-toolbar">
      <div :class="$style.headerTitle">International Commerce Centre</div>
    </portal>
    <el-container direction="vertical">
      <div :class="$style.title">Report</div>
      <el-container direction="vertical" :class="$style.container">
        <filter-bar
          :filter="filter"
          :show-button="!!checkItems.length"
          @set-filter="setFilter"
          @download="downloadItems"
          @delete="deleteItems"
        />
        <table :class="$style.table">
          <div :class="$style.tableHeader">
            <div :class="$style.tableRow">
              <div :class="$style.tableCell">
                <el-checkbox v-model="checkAll" @change="handleCheckAllChange" />
              </div>
              <div :class="$style.tableCell">Date of Issue</div>
              <div :class="$style.tableCell">Report Name</div>
              <div :class="$style.tableCell">File Format</div>
              <div :class="$style.tableCell">Status</div>
            </div>
          </div>
          <div ref="tableBody" :class="$style.tableBody">
            <el-checkbox-group v-model="checkItems" @change="handleCheckedItemChange">
              <div v-for="item in filteredItems" :key="item.id" :class="$style.tableRow">
                <div :class="$style.tableCell">
                  <el-checkbox :label="item.id" />
                </div>
                <div :class="$style.tableCell">{{ item.date }}</div>
                <div :class="$style.tableCell">{{ item.name }}</div>
                <div :class="$style.tableCell">{{ item.ext }}</div>
                <div :class="$style.tableCell">
                  <a
                    :class="$style.downloadBtn"
                    href="../static/pdf-test.pdf"
                    :data-report-id="item.id"
                    target="_blank"
                    download
                    >Download</a
                  >
                </div>
              </div>
            </el-checkbox-group>
          </div>
        </table>
      </el-container>
    </el-container>
  </el-container>
</template>
<script>
import { computed, getCurrentInstance, reactive, toRefs } from '@vue/composition-api'
import filterBar from '~/components/reports/filter-bar.vue'

const items = Array.from({ length: 20 }, (_, index) => ({
  id: index,
  checked: false,
  date: '1 Jun 2021',
  name: 'Monthly Elevator Bearing Condition Report, June 202' + index,
  ext: 'PDF',
  link: '../static/pdf-test.pdf',
}))

export default {
  components: {
    filterBar,
  },
  layout: 'base',
  setup() {
    const vm = getCurrentInstance().proxy
    const data = reactive({
      filter: {
        date: '',
        searchName: '',
      },
      checkAll: false,
      checkItems: [],
      items,
    })

    const filteredItems = computed(() =>
      data.items.filter((item) =>
        item.name.toString().toLowerCase().includes(data.filter.searchName.toString().toLowerCase())
      )
    )

    const handleCheckAllChange = (val) => {
      data.checkItems = val ? items.map((i) => i.id) : []
    }

    const handleCheckedItemChange = (value) => {
      const checkedCount = value.length
      data.checkAll = checkedCount === data.checkItems.length
    }

    const downloadItems = () => {
      if (vm.$refs.tableBody) {
        const $items = vm.$refs.tableBody.querySelectorAll('a[data-report-id]')
        $items.forEach(($item) => {
          const reportId = +$item.dataset.reportId
          if (data.checkItems.includes(reportId)) {
            $item.click()
          }
        })
      }
    }

    const deleteItems = () => {
      data.items = data.items.filter((item) => !data.checkItems.includes(item.id))
    }

    const setFilter = (key, value) => {
      data.filter[key] = value
    }

    return {
      ...toRefs(data),
      handleCheckAllChange,
      handleCheckedItemChange,
      downloadItems,
      deleteItems,
      setFilter,
      filteredItems,
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
  .table {
    &Row {
      display: grid;
      grid-template-columns: 100px auto 350px 250px 150px;
      border-radius: 10px;
      margin-bottom: 20px;
    }
    &Header {
      .tableRow {
        padding: 17px 30px;
        background: #d7d7d7;
        .tableCell {
          font-weight: $font-weight-primary;
        }
      }
    }
    &Body {
      .tableRow {
        padding: 22px 30px;
        background: #ffffff;
        .tableCell {
          font-weight: 400;
        }
      }
    }
    &Cell {
      display: flex;
      align-items: center;
      font-size: $font-size-small;
      color: $color-text;
      padding-right: 15px;
      .downloadBtn {
        color: $color-text-danger;
        text-decoration: underline;
        font-weight: bold;
      }
      :global {
        .el-checkbox__label {
          display: none;
        }
      }
    }
  }
}
.headerTitle {
  font-weight: $font-weight-primary;
  font-size: 20px;
  line-height: 27px;
  color: $color-text;
}
</style>
