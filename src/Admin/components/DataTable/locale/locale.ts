export const getLocaleText = (params) => {
	switch (params.key) {
		case 'thousandSeparator':
			return '.';
		case 'decimalSeparator':
			return ',';
		case 'contains':
			return '포함';
		case 'notContains':
			return '미포함';
		case 'equals':
			return '같음';
		case 'notEqual':
			return '같지않음';
		case 'startsWith':
			return '~로시작하는';
		case 'endsWith':
			return '~로끝나는';
		case 'blank':
			return '값이 비어있는';
		case 'notBlank':
			return '값이 비어있지 않은';
		case 'filterOoo':
			return '필터링 할 값을 입력하세요.';
		default:
			if (params.defaultValue) {
				// the &lrm; marker should not be made uppercase
				const val = params.defaultValue.split('&lrm;');
				const newVal = val[0].toUpperCase();
				if (val.length > 1) {
					return `${newVal}&lrm;`;
				}
				return newVal;
			}
			return '';
	}
};
