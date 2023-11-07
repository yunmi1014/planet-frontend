import { styled } from 'styled-components';
import Preview from './Preview';

interface Props {
	title: string;
	gradient: string;
	gradientReverse: boolean;
	previews: {
		icon: string;
		title: string;
		description: string;
		mobileDescription: string;
	}[];
	isMobile: boolean;
}

const Preview2 = (props: Props) => {
	const { isMobile } = props;
	return (
		<PreviewWrapper>
			<Preview isMobile={isMobile} title={props.title} previews={props.previews} gradient={props.gradient} gradientReverse={props.gradientReverse} />
		</PreviewWrapper>
	);
};

export default Preview2;

Preview2.defaultProps = {
	title: '<span>ATH NOTE</span>는 4가지 Level의<br/>지지선과 저항선을 제공합니다',
	gradient: '/images/preview2Gradient.png',
	gradientReverse: true,
	previews: [
		{
			icon: '/images/icons/preview7.png',
			title: 'Level 1~2',
			description: '보통 Level 1~2사이에서 추세 반전이<br/> 나오는 것이 가장 좋습니다. 해당 구간에서<br/> 지지 혹은 저항이 나오는 경우가 최적의<br/> 상황이므로 해당 구간에서 분할 매매를<br/> 하는 것을 가이드 해드립니다.',
			mobileDescription: '보통 Level 1~2사이에서 추세 반전이<br/> 나오는 것이 가장 좋습니다. 해당 구간에서<br/> 지지 혹은 저항이 나오는 경우가 최적의<br/> 상황이므로 해당 구간에서 분할 매매를<br/> 하는 것을 가이드 해드립니다.',
		},
		{
			icon: '/images/icons/preview8.png',
			title: 'Level 3+',
			description: 'Level 3 구간을 강하게 돌파한다는 것은<br/> 시장이 과도한 방향으로 흘러가고 있다는 것을<br/> 의미하기 때문에, 이를 인지하고 시장의 변동성이<br/> 잦아들기 시작할 때 매매를 다시 시작하는 것을<br/> 가이드 해드리고 있습니다.',
			mobileDescription: 'Level 3 구간을 강하게 돌파한다는 것은<br/>시장이 과도한 방향으로 흘러가고 있다는 것을<br/>의미하기 때문에, 이를 인지하고<br/>시장의 변동성이 잦아들기 시작할 때<br/>매매를 다시 시작하는 것을 가이드<br/>해드리고 있습니다.',
		},
		{
			icon: '/images/icons/preview9.png',
			title: '개인 성향에 따른 옵션',
			description: 'ATH NOTE는 개인 트레이딩 성향에 따라<br/> 스캘핑, 단타, 기본, 스윙총 4가지 옵션을<br/> 제공하고 있습니다. 본인이 원하는 방식으로<br/> 옵션을 설정하여 매매하여 수익률을<br/> 보다 극대화 할 수 있습니다.',
			mobileDescription: 'ATH NOTE는 개인 트레이딩 성향에 따라<br/>스캘핑, 단타, 기본, 스윙총 4가지 옵션을<br/>제공하고 있습니다. 본인이 원하는 방식으로<br/>옵션을 설정하여 매매하여 수익률을<br/>보다 극대화 할 수 있습니다.',
		},
	],
};

const PreviewWrapper = styled.div`
	width: 100%;
	.previewItem-container {
		// height: 320px;
	}
`;
