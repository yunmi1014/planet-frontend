import type { NextApiRequest, NextApiResponse } from 'next';
import xlsx from 'xlsx';
import path from 'path';
import fs from 'fs';
import { IAddressOption } from '@/types/address.types';

interface IAddress {
	시도명: string;
	시군구명: string;
	읍면동명: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'GET') return;

	const filePath = path.join(process.cwd(), '/public/assets/KIKcd_B.20230703.xlsx');
	const workbook = xlsx.readFile(filePath);
	const sheetName = workbook.SheetNames[0];
	const worksheet = workbook.Sheets[sheetName];

	const jsonData: IAddress[] = xlsx.utils.sheet_to_json(worksheet);

	const data = jsonData.reduce((addressOptions, cur) => {
		// 시도명, 시군구명, 읍면동명 3가지 모두 존재해야 함.
		if (!cur.시도명 || !cur.시군구명 || !cur.읍면동명) {
			return addressOptions;
		}

		const sidoIndex = addressOptions.findIndex((addressOption) => addressOption.label === cur.시도명);

		// 시도가 처음으로 나타나는 케이스 (ex. 서울특별시의 첫 번째 데이터, 부산광역시의 첫 번째 데이터)
		if (sidoIndex === -1) {
			addressOptions.push({
				label: cur.시도명,
				value: cur.시도명,
				sigunguList: [
					{
						label: cur.시군구명,
						value: cur.시군구명,
						eupMyeonDongList: [{ label: cur.읍면동명, value: cur.읍면동명 }],
					},
				],
			});
			return addressOptions;
		}

		const sigunguIndex = addressOptions[sidoIndex].sigunguList.findIndex((sigunguItem) => sigunguItem.label === cur.시군구명);

		// 시군구가 일치하지 않는 경우에는 시군구에 추가
		if (sigunguIndex === -1) {
			addressOptions[sidoIndex].sigunguList.push({
				label: cur.시군구명,
				value: cur.시군구명,
				eupMyeonDongList: [{ label: cur.읍면동명, value: cur.읍면동명 }],
			});
			return addressOptions;
		}

		// 시군구가 일치하는 경우에는 읍면동에 추가
		const isExistEupMyeonDong = addressOptions[sidoIndex].sigunguList[sigunguIndex].eupMyeonDongList.find((eupMyeonDongItem) => eupMyeonDongItem.label === cur.읍면동명);

		// 단, 중복 추가 X
		if (!isExistEupMyeonDong) {
			addressOptions[sidoIndex].sigunguList[sigunguIndex].eupMyeonDongList.push({
				label: cur.읍면동명,
				value: cur.읍면동명,
			});
		}

		return addressOptions;
	}, [] as IAddressOption[]);

	fs.writeFileSync(path.join(process.cwd(), '/public/assets/address.json'), JSON.stringify(data, null, 2));

	res.status(200).send('Successfully Initialized');
}
