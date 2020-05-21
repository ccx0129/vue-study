<script>
import { check } from "../utils/auth";
export default {
  name: "Authorized",
  functional: true,
  props: {
    authority: {
      type: Array,
      required: true
    }
  },
  render(h, context) {
    const { props, scopedSlots } = context;
    //校验通过返回子组件(默认插槽)，否则返回null
    return check(props.authority) ? scopedSlots.default() : null;
  }
};
</script>
