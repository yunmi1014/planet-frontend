import React from 'react';
import { HStack, IconButton } from '@chakra-ui/react';
import { ICellRendererParams } from 'ag-grid-community';
import { RiDeleteBin7Line, RiEdit2Line } from 'react-icons/ri';
import useDelete from '../../../hooks/useDelete';
import { useRouter } from 'next/router';
import { UserModel } from '../../../../models/UserModel';
import FirebaseUtil from '../../../utils/FirebaseUtil';
import { useQuery } from '@tanstack/react-query';

interface Props extends ICellRendererParams {
	collectionName: any;
	router: string;
	refetch?: any;
}

const RowMenuCellRenderer = (props: Props) => {
	const router = useRouter();
	const id = props.data.id;
	const data = new UserModel(props.node.data);
	const { handleDelete, isDeleting } = useDelete();
	// 여러행 중 하나의 행에 대한 데이터를 삭제하고나서 데이터를 다시 갱신하게 하기 위한 refetch를 사용하기 위해서 선언하였다.
	const { refetch } = useQuery([props.collectionName], () => FirebaseUtil.getDocumentsFromCollection(props.collectionName), { enabled: false });

	const handleClickModifyButton = (event) => {
		router.push(`${router.pathname}/modify?id=${id}`);
	};

	const handleClickDeleteButton = async (event) => {
		await handleDelete({ id: data.id, collectionName: props.collectionName });
		await refetch();
	};

	return (
		<HStack>
			<IconButton icon={<RiEdit2Line size="18px" />} aria-label="수정버튼" variant={'ghost'} size="sm" onClick={handleClickModifyButton} />
			<IconButton icon={<RiDeleteBin7Line size="18px" />} aria-label="삭제버튼" variant={'ghost'} size="sm" onClick={handleClickDeleteButton} isLoading={isDeleting} />
		</HStack>
	);
};

export default RowMenuCellRenderer;
