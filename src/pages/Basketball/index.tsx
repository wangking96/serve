import { defineComponent } from "vue";
import Swiper from '../../components/Swiper';
import MatchList from '../../components/Match/MatchList';
import "./index.scss";

const Basketball = defineComponent({
    setup() {
        return () => (
            <div class="ball-basketball">
                <div class="ball-basketball-swiper">
                    <div class="main">
                        <Swiper ballType={2} />
                    </div>
                </div>
                
                <div class="main">
                    <MatchList ballType={2} />
                </div>
            </div>
        );
    },
});
export default Basketball;