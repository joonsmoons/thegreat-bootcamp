<template>
  <div>
    <table class="table table-bordered table-striped">
      <thead>
        <tr>
          <th v-if="selectType === 'checkbox'">
            <input
              type="checkbox"
              class="form-check-input"
              @change="checkAll($event)"
            />
          </th>
          <th v-else-if="selectType === 'radio'"></th>

          <th :key="th.key" v-for="th in headers">
            {{ th.title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr :key="i" v-for="(item, i) in items">
          <th v-if="selectType === 'checkbox'">
            <input
              type="checkbox"
              class="form-check-input"
              :value="item[checkedKey]"
              v-model="checkedItems"
              @change="doChecked"
            />
          </th>
          <th v-else-if="selectType === 'radio'">
            <input
              type="radio"
              class="form-check-input"
              :value="item[checkedKey]"
              v-model="checkedItem"
              @change="doChecked"
              name="radioItem"
            />
          </th>
          <td :key="th.key" v-for="th in headers">{{ item[th.key] }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    items: {
      type: Array,
      default: function () {
        return []
      }
    },
    headers: {
      type: Array,
      default: function () {
        return []
      }
    },
    selectType: {
      type: String,
      default: ''
    },
    checkedKey: {
      type: String,
      default: ''
    },
    checkedEventName: {
      type: String,
      default: 'change-item'
    }
  },
  data() {
    return {
      sampleData: '',
      checkedItems: [],
      checkedItem: ''
    }
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {
    checkAll(event) {
      if (event.target.checked) {
        this.items.forEach((item) =>
          this.checkedItems.push(item[this.checkedKey])
        )
      } else {
        this.checkedItems = []
      }
    },
    doChecked() {
      if (this.selectType === 'checkbox') {
        console.log(`child checkbox checked: ${this.checkedItems}`)
        this.$emit(this.checkedEventName, this.checkedItems)
      }
      if (this.selectType === 'radio') {
        console.log(`child radio checked: ${this.checkedItem}`)
        this.$emit(this.checkedEventName, this.checkedItem)
      }
    }
  }
}
</script>
