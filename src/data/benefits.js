import { 
  HeartOutlined, 
  TeamOutlined, 
  TrophyOutlined 
} from '@ant-design/icons';

import hydrateImg from '../assets/hydrate.png';
import foodImg from '../assets/food.png';
import stressImg from '../assets/stress.png';

const benefits = [
  {
    title: "Track Nutrition",
    icon: HeartOutlined, // Just the component reference
    description: "Monitor your calorie intake and make healthier food choices",
    image: foodImg,
    iconSize: 24
  },
  {
    title: "Stay Hydrated",
    icon: TrophyOutlined,
    description: "Set daily water intake goals and track your progress",
    image: hydrateImg,
    iconSize: 24
  },
  {
    title: "Manage Stress",
    icon: TeamOutlined,
    description: "Access university-approved mental health resources",
    image: stressImg,
    iconSize: 24
  }
];

export default benefits;