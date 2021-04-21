# 组件
import { defineComponent } from "vue";

import { useRouter } from "vue-router";

import "./Header.scss";

const App = defineComponent({
  setup() {
    return () => <div>header</div>;
  },
});

export default App;