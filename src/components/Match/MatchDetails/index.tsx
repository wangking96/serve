import { defineComponent } from 'vue';

import './index.scss';

import Card from "../../Card";
import MatchLive from "../MatchLive";
import TodayMatch from '../../TodayMatch'

const MatchDetails = defineComponent({
    setup() {
        return () => (
            <div class="match-details">
                <div class="match-details-live">
                    <div class="main">
                        <div class="match-details-live-box">
                            <MatchLive />
                        </div>
                        <TodayMatch />
                    </div>
                </div>
                <div class="main">
                    <Card  />
                </div>
            </div>
        );
    }
})

export default MatchDetails