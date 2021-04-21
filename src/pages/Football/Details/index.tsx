import { defineComponent, provide } from 'vue';
import './index.scss';
import MatchDetails from '../../../components/Match/MatchDetails';

const FootballDetails = defineComponent({
    setup() {
        provide('sportId', 1);
        return () => (
            <div class="football-details">
                <MatchDetails />
            </div>
        );
    }
})

export default FootballDetails