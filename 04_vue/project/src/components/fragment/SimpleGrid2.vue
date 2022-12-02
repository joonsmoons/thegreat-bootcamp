<template>
  <div>
    <table class="table table-striped table-bordered">
      <thead>
        <tr>
          <th><input type="checkbox" @change="checkAll" /></th>
          <th :key="th.key" v-for="th in headers">{{ th.title }}</th>
        </tr>
      </thead>
      <tbody>
        <tr :key="item.id" v-for="item in items">
          <td>
            <input
              type="checkbox"
              @change="checkItem"
              :value="item[checkedKey]"
              v-model="checkedItems"
            />
          </td>
          <td :key="th.key" v-for="th in headers">
            {{ item[th.key] }}
          </td>
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
    checkedKey: {
      type: String,
      default: 'id'
    }
  },
  data() {
    return {
      sampleData: '',
      checkedItems: []
    }
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {
    checkItem() {
      this.$emit('select-checkbox', this.checkedItems)
    }
  }
}
</script>
