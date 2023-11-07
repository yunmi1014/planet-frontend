import { Accordion, Flex } from '@chakra-ui/react';
import FAQItem from './FAQItem';

interface Props {
	isMobile: boolean;
	items: {
		title: string;
		content: string;
		postscript: string;
		mobileTitle: string;
		mobileContent: string;
		mobilePostscript: string;
	}[];
}

const MyAccordion = (props: Props) => {
	const { isMobile } = props;
	return (
		<Accordion allowMultiple width="100%" display="flex" flexDirection="column" gap={isMobile ? '16px' : '24px'}>
			{props.items &&
				props.items.map((item, index) => {
					return <FAQItem isMobile={isMobile} key={index} title={item.title} content={item.content} mobileTitle={item.mobileTitle} mobileContent={item.mobileContent} postscript={item.postscript} mobilePostscript={item.mobilePostscript} />;
				})}
		</Accordion>
	);
};

export default MyAccordion;

MyAccordion.defaultProps = {
	items: [
		{
			title: '지표를 받아보고 싶은데 어떻게 해야하나요?',
			content: '[문의하기] 버튼을 클릭해 ATH 텔레그램 방으로 문의주시면 지표 사용 방법을 안내드립니다.',
			mobileTitle: '지표를 받아보고 싶은데<br/> 어떻게 해야하나요?',
			mobileContent: '[문의하기] 버튼을 클릭해 ATH 텔레그<br/>램 방으로 문의주시면 지표 사용 방법을<br/>안내드립니다.',
		},
		{
			title: '지표를 어디에 추가해서 볼 수 있나요?',
			content: 'ATH 지표는 차트 분석 사이트인 Trading View에 지표를 추가하여 사용하는 방식입니다.<br/>Trading View에서 제공하는 모든 차트에 적용하여 사용하실 수 있습니다.',
			mobileTitle: '지표를 어디에 추가해서<br/> 볼 수 있나요?',
			mobileContent: 'ATH 지표는 차트 분석 사이트인<br/> Trading View에 지표를 추가하여 사용<br/>하는 방식입니다. Trading View에서<br/> 제공하는 모든 차트에 적용하여<br/> 사용하실 수 있습니다.',
		},
		{
			title: '지표매매 초보자인데 사용이 가능할까요?',
			content: 'ATH 지표는 기존 트레이더 뿐만 아니라 초보자들도 이용하기 쉬운 접근성 높은 지표입니다. <Br/>고객센터로 문의주시면 포지션별로 적절히 조합하여 사용하실 수 있는 지표들을 추천해드리고 있습니다.',
			postscript: '*고객센터 운영시간 : 365일 24시간 연중무휴로 운영됩니다.',
			mobileTitle: '지표매매 초보자인데<br/> 사용이 가능할까요?',
			mobileContent: 'ATH 지표는 기존 트레이더 뿐만 아니라<br/>초보자들도 이용하기 쉬운 접근성 높은<br/>지표입니다.<Br/>고객센터로 문의주시면 포지션별로 적절<br/>히 조합하여 사용하실 수 있는 지표들을<br/> 추천해드리고 있습니다.',
			mobilePostscript: '*고객센터 운영시간 : 365일 24시간<br/> 연중무휴로 운영됩니다.',
		},
	],
};
