import Timeline from '../../antd/Timeline'
import withInfiniteFeed from '../../data/withInfiniteFeed'
import NewsFeedTimelineItem from './NewsFeedTimelineItem'

const NewsFeedTimeline = withInfiniteFeed(Timeline, NewsFeedTimelineItem)

export default NewsFeedTimeline
