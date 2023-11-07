import { useState, useEffect } from 'react';
import { useBreakpointValue } from '@chakra-ui/react';

const useResponsiveBreakpoint = (initialIsMobile = true) => {
	const [isMobileState, setIsMobileState] = useState(initialIsMobile);

	const breakpointValue = useBreakpointValue({ base: true, sm: true, md: true, lg: false, xl: false });

	useEffect(() => {
		// breakpointValue가 정의된 후에 상태 업데이트
		if (breakpointValue !== undefined) {
			setIsMobileState(breakpointValue);
		}
	}, [breakpointValue]);

	return { isPc: !isMobileState, isMobile: isMobileState };
};

export default useResponsiveBreakpoint;
