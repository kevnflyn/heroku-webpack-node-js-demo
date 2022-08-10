import Timeline from '../../antd/Timeline'
import withInfiniteFeed from '../../data/withInfiniteFeed'
import RegulationTimelineFeedItem from './RegulationTimelineFeedItem'

const RegulationTimelineFeed = withInfiniteFeed(Timeline, RegulationTimelineFeedItem)

export default RegulationTimelineFeed
