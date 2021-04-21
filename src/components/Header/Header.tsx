import { defineComponent, reactive, watch } from "vue";
import classname from "classnames";
import { useRouter, useRoute, RouteLocationNormalizedLoaded } from "vue-router";
import { TapListItem } from "./data";
import "./Header.scss";

const App = defineComponent({
  setup() {
    const route = useRoute();
    const data = reactive({
      tapList: [
        {
          id: 1,
          name: "篮球",
          path: "/Basketball",
          isActive: ["/Basketball", "/BasketballDetail"],
        },
        {
          id: 2,
          name: "足球",
          path: "/Football",
          isActive: ["/Football", "/FootballDetail"],
        },
      ],
      route: route,
    });
    const router = useRouter();

    watch(data.route, (newval) => {
      data.route = newval;
    });
    const setActiveIndex = (val: TapListItem) => {
      router.push(val.path);
    };

    return () => (
      <div class="ball-header-box">
        <div class="main">
            <div class="ball-header-box-logo">
                <img src={require("@assets/images/header/header_logo.png")} alt="logo"/>
            </div>
            <div class="ball-header-box-tabs">
                {data.tapList.map((item: TapListItem) => (
                    <div class={classname("ball-header-box-tabs-item", {active: item.isActive.includes(data.route.path),})}
                        key={item.id}
                        onClick={() => setActiveIndex(item)}>
                        {item.name}
                    </div>
                ))}
            </div>
        </div>
      </div>
    );
  },
});

export default App;
