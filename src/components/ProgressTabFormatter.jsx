import { Box, HStack, Spinner, VStack } from '@chakra-ui/react';

import Timer from './Timer';
import MissingDataMessage from './MissingDataMessage';

export default function ProgressTabFormatter({ rows, setRows, selectedChildOption, selectedDateOption, tabIndex, submittingTimerValues, setLeftTeetTimerValue, setRightTeetTimerValue, TabPanel, h = "60vh" }) {
    return (
        <VStack
            alignItems="start"
            h="100%"
            w="100%"
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
                            justifyContent="space-between"
                            w="90vw"
                        >
                            <Timer title="L" setValue={setLeftTeetTimerValue} pauseTimer={submittingTimerValues} tabIndex={tabIndex} />
                            <Timer title="R" setValue={setRightTeetTimerValue} pauseTimer={submittingTimerValues} tabIndex={tabIndex} />
                        </HStack>
                    }
                    <VStack
                        overflowY="auto"
                        h={h}
                        w="100vw"
                        alignItems="start"
                    >
                        {(rows && rows.length) ? rows.map((row, index) => {
                            return (
                                <TabPanel
                                    leftBreastTime={row.leftBreastTime}
                                    rightBreastTime={row.rightBreastTime}
                                    alias={row.alias}
                                    index={index}
                                    timeStamp={row.timeStamp}
                                    data={rows}
                                    setData={setRows}
                                    selectedChildOption={selectedChildOption}
                                    selectedDateOption={selectedDateOption}
                                    fluidOunces={row.fluidOunces}
                                />
                            );
                        })
                            :
                            <MissingDataMessage message="No entries, add one!" />
                        }
                    </VStack>
                </>
            }
        </VStack>
    );
}
