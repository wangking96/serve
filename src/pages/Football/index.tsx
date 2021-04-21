import { defineComponent } from "vue";
import "./index.scss";
import Swiper from '../../components/Swiper';
import MatchList from '../../components/Match/MatchList';

const Football = defineComponent({
    setup() {
        return () => (
            <div class="ball-football">
                <div class="ball-football-swiper">
                    <div class="main">
                        <Swiper ballType={1} />
                    </div>
                </div>
                
                <div class="main">
                    <MatchList ballType={1} />
                </div>
            </div>
        );
    },
});

export default Football;