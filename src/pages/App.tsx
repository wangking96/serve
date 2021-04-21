import { defineComponent } from "vue";
import "./App.scss";
import Header from '../components/Header/Header'

const App = defineComponent({
  setup() {
    return () => (
      <>
        <Header></Header>
        <router-view></router-view>
      </>
    );
  },
});

export default App;
