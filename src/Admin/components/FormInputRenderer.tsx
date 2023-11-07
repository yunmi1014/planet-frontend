import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import styled from '@emotion/styled';
import { Box, Flex, Input, Textarea, VStack, Switch, FormControl, FormLabel } from '@chakra-ui/react';
import { Controller, useFormContext } from 'react-hook-form';
import Calendar from './Calendar/Calendar';
import { useRouter } from 'next/router';
import SelectBox from './SelectBox/SelectBox';
import ImageUploader from './ImageUploader';
import { Editor } from '@toast-ui/react-editor';
import dynamic from 'next/dynamic';
import FileUploader from './FileUploader';
import { SelectOption } from '../../types/SelectOption';

const ToastEditor = dynamic(() => import('../../../src/components/ToastEditor/ToastEditor'), { ssr: false });

export type FormInputType = 'text' | 'number' | 'calendar' | 'box' | 'selectBox' | 'toggle' | 'editor' | 'file' | 'imageUploader' | 'textarea';

interface Props {
	type: FormInputType;
	flex: number;
	height: string;
	collectionName: string;
	name: string;
	dataUrl?: string[];
	editorRef?: React.MutableRefObject<Editor | null>;
	selectOptions?: SelectOption[];
	required?: boolean;
	readonly?: boolean;
}

const FormInputRenderer = (props: Props) => {
	const { query } = useRouter();
	const id = query.id;
	const { register, getValues, watch, setValue, control } = useFormContext();
	const fileUploadPath = `${props.collectionName}/${props.name}`;

	const translateName = (key) => {
		switch (key) {
			case 'name':
				return '이름';
			case 'phone':
				return '휴대폰 번호';
			case 'email':
				return '이메일';
			case 'password':
				return '비밀번호';
			case 'requestPlace':
				return '의뢰장소';
			case 'dueDate':
				return '입주예정일';
			case 'spaceSize':
				return '공간크기';
			case 'orderNumber':
				return '오더번호';
			case 'constructionSchedule':
				return '공사일정';
			case 'constructionStartDate':
				return '공사시작일';
			case 'constructionEndDate':
				return '공사마감일';
			case 'manager':
				return '매니저';
			case 'address':
				return '상세주소';
			case 'before':
				return '시공사진 Before';
			case 'after':
				return '시공사진 After';
			case 'proposal':
				return '제안서';
			case 'meetingContents':
				return '미팅 내용';
			case 'contract':
				return '계약서';
			case 'checkList':
				return '체크리스트';
			case 'provider':
				return '가입방식';

			// 포트폴리오
			case 'title':
				return '제목';
			case 'description':
				return '설명';
			case 'buildingName':
				return '건물명';
			case 'constructionDuration':
				return '시공기간';
			case 'planningPeriod':
				return '기획기간';
			case 'constructionScope':
				return '시공범위';
			case 'spaceSize':
				return '공간크기';
			case 'pricePerSquareMeter':
				return '평당가격';
			case 'spaceSizeType':
				return '평형';
			case 'portfolioImages':
				return '포트폴리오';
			case 'portfolioThumbnail':
				return '썸네일';
			// 리뷰
			case 'title':
				return '제목';
			case 'type':
				return '공간 타입';
			case 'totalDaysSpent':
				return '시공 소요일';
			case 'thumbnails':
				return '썸네일';
			case 'isShow':
				return '후기 노출 하기';
			case 'order':
				return '후기 노출 순서';
			case 'content':
				return '후기 내용';
			case 'thumbnail':
				return '썸네일';
			case 'createdAt':
				return '생성일';
			default:
				return key;
		}
	};

	if (props.type === 'text') {
		return (
			<VStack gap="10px" alignItems="flex-start" flex={props.flex}>
				<Title>{translateName(props.name)}</Title>
				<Input {...register(`${props.name}`, { required: props.required })} height={props.height} readOnly={props.readonly} />
			</VStack>
		);
	}

	if (props.type === 'calendar') {
		return (
			<VStack gap="10px" alignItems="flex-start" flex={props.flex}>
				<Box whiteSpace="nowrap" fontWeight={'bold'}>
					{translateName(props.name)}
				</Box>
				<Box w="full" height={props.height}>
					<Calendar name={props.name} register={register} date={watch(props.name)} readonly={props.readonly} />
				</Box>
			</VStack>
		);
	}

	if (props.type === 'box') {
		return (
			<VStack gap="10px" alignItems="flex-start" flex={props.flex}>
				<Title>{translateName(props.name)}</Title>
				<Flex flex={props.flex} w="100%" border="1px solid #ddd" borderRadius={8} height={props.height} alignItems="center" padding="0 16px" {...register(props.name, { required: props.required })}>
					{watch(props.name)}
				</Flex>
			</VStack>
		);
	}

	if (props.type === 'selectBox') {
		const selectedValue = watch(props.name); // 선택된 셀렉트옵션의 value값
		// const selectedOption = find(props.selectOptions, x => x.label === selectedValue); // 선택된 셀렉트옵션

		return (
			<VStack gap="10px" alignItems="flex-start" flex={props.flex} w="full">
				<Title>{translateName(props.name)}</Title>
				<Box w="full">
					<SelectBox control={control} name={props.name} options={props.selectOptions!} defaultValue={selectedValue} readonly={props.readonly} />
				</Box>
			</VStack>
		);
	}

	if (props.type === 'toggle') {
		const isChecked = watch('isShow');
		return (
			<VStack gap="10px" alignItems="flex-start" flex={props.flex}>
				<Title>{translateName(props.name)}</Title>
				<FormControl display="flex" gap="10px" flex={props.flex}>
					<Switch id={props.name} {...register(props.name, { required: props.required })} size="lg" readOnly={props.readonly} />
					<FormLabel htmlFor={props.name} mb="0" whiteSpace={'nowrap'} fontSize="18px">
						{isChecked ? '활성화' : '비활성화'}
					</FormLabel>
				</FormControl>
			</VStack>
		);
	}

	if (props.type === 'textarea') {
		return (
			<VStack gap="10px" alignItems="flex-start" flex={props.flex}>
				<Box whiteSpace="nowrap">{translateName(props.name)}</Box>
				<Textarea {...register(props.name, { required: props.required })} resize="none" overflowY="scroll" height={props.height} minH={'10px'} readOnly={props.readonly}></Textarea>
			</VStack>
		);
	}

	if (props.type === 'editor') {
		return (
			<VStack gap="10px" alignItems="flex-start" flex={props.flex}>
				<Title>{translateName(props.name)}</Title>
				<ToastEditor editorRef={props.editorRef!} initialValue={watch('content')} uploadFilePath={fileUploadPath} />
			</VStack>
		);
	}

	if (props.type === 'file') {
		return (
			<VStack gap="10px" alignItems="flex-start" flex={props.flex}>
				<Title>{translateName(props.name)}</Title>
				{/* <Input type="file" {...register(`${props.name}`, {required: props.required})} w="min-content" h="100%" padding="10px" /> */}
				<FileUploader collectionName={props.collectionName} name={props.name} watch={watch} setValue={setValue} uploadPath={fileUploadPath} />
			</VStack>
		);
	}

	if (props.type === 'imageUploader') {
		return (
			<Flex width="100%" gap="10px" flex={props.flex} h="fit-content" alignItems="flex-start" direction="column">
				<Box whiteSpace="nowrap">{translateName(props.name)}</Box>
				<ImageUploader name={props.name} watch={watch} setValue={setValue} uploadPath={fileUploadPath} />
			</Flex>
		);
	}

	if (props.type === 'number') {
		return (
			<VStack gap="10px" flex={props.flex} h="fit-content" alignItems="flex-start">
				<Title>{translateName(props.name)}</Title>
				<Input type="number" {...register(`${props.name}`, { required: props.required })} w="100%" h="100%" padding="10px" readOnly={props.readonly} />
			</VStack>
		);
	}

	return null;
};

export default FormInputRenderer;

const Title = styled.div`
	white-space: nowrap;
	font-weight: 700;
`;
