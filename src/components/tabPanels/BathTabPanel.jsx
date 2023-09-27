import { HStack, useColorModeValue } from '@chakra-ui/react';

import { screenBackground } from '../../defaultStyle';
import BathRow from '../componentRows/BathRow';

export default function BathTabPanel({ bathData, bathDataIsLoading, tabIndex }) {
    const _screenBackground = useColorModeValue(screenBackground.light, screenBackground.dark);

    return (
        <HStack flexWrap={"wrap"} marginTop="20" spacing="12" bg={_screenBackground}>
            {bathData && bathData.length > 0 && bathData.map((bath, index) => {
                return (
                    <BathRow
                        key={bath.id}
                        bath={bath}
                        bathDataIsLoading={bathDataIsLoading}
                        tabIndex={tabIndex}
                        ml={index === 0 && "13"}
                    />
                );
            })}
        </HStack>
    );
}