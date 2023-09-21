import { HStack, Spinner, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Box } from 'victory';
import Timer from './Timer';
import BreastRowTabPanel from './tabPanels/BreastRowTabPanel';
import MissingDataMessage from './MissingDataMessage';

export default function ProgressTabFormatter({ rows, setRows, selectedChildOption, tabIndex, submittingTimerValues, TabPanel }) {
    const [leftTeetTimerValue, setLeftTeetTimerValue] = useState(0);
    const [rightTeetTimerValue, setRightTeetTimerValue] = useState(0);

    return (
        <VStack
            alignItems="start"
        >
            {!rows ?
                <Box
                    alignItems="center"
                    justifyContent="center"
                    h="100%"
                    w="100%"
                    display="flex"
                >
                    <Spinner size="xl" />
                </Box>
                :
                <>
                    {submittingTimerValues !== undefined &&
                        <HStack
                            alignItems="start"
                            justifyContent="space-evenly"
                            w="100vw"
                        >
                            <Timer title="L" setValue={setLeftTeetTimerValue} pauseTimer={submittingTimerValues} tabIndex={tabIndex} />
                            <Timer title="R" setValue={setRightTeetTimerValue} pauseTimer={submittingTimerValues} tabIndex={tabIndex} />
                        </HStack>
                    }
                    <VStack
                        overflowY="auto"
                        h="60vh"
                        w="100vw"
                        alignItems="start"
                    >
                        {(rows && rows.length) ? rows.map((breastRow, index) => {
                            return (
                                <TabPanel
                                    leftBreastTime={leftTeetTimerValue}
                                    rightBreastTime={rightTeetTimerValue}
                                    alias={breastRow.alias}
                                    index={index}
                                    timeStamp={breastRow.alias}
                                    data={rows}
                                    setData={setRows}
                                    selectedChildOption={selectedChildOption}
                                />
                            );
                        })
                            :
                            <MissingDataMessage />
                        }
                    </VStack>
                </>
            }
        </VStack>);
}
