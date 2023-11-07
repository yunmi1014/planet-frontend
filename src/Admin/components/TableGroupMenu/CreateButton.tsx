import { useQueryParam } from 'use-query-params';
import Button from '../Button/Button';
import { useRouter } from 'next/router';

const CreateButton = () => {
	const router = useRouter();
	const handleAddClick = () => {
		router.push(`${router.pathname}/create`);
	};

	return (
		<Button height={42} colorScheme={'blue'} onClick={handleAddClick}>
			생성하기
		</Button>
	);
};

export default CreateButton;
