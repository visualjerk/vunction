<script>
export default {
  name: 'vn-selectable',
  data() {
    return {
      selectedItem: null
    }
  },
  props: {
    value: {
      type: [Array, Object, String, Number],
      default() {
        return null
      }
    },
    items: {
      type: Array,
      default() {
        return []
      }
    },
  },
  computed: {
    keyedItems() {
      return this.items.map((item, key) => ({
        value: item,
        key
      }))
    }
  },
  methods: {
    select(item) {
      this.selectedItem = item
      this.$emit('input', item.value)
    }
  },
  render() {
    return this.$scopedSlots.default({
      items: this.keyedItems,
      select: this.select
    })
  }
}
</script>