import { FC } from "react";
import {
    Box,
    Divider,
    HStack,
    Link,
    StackDivider,
    useColorModeValue,
    VStack,
} from "@chakra-ui/react";
import { footerHeight } from "./constants";
import { FaHeart } from "react-icons/fa";
import { Icon } from "@chakra-ui/icons";

type Props = {};

export const Footer: FC<Props> = () => {
    const bgColor = useColorModeValue("gray.100", "gray.900");
    return (
        <>
            <Divider />
            <Box w="100%" bgColor={bgColor} color="gray.500" fontSize={15}>
                <VStack h={footerHeight} spacing={0} justify="center">
                    <Box>
                        Made with <Icon as={FaHeart} color="red.500" /> by Mike
                        Pham.
                    </Box>
                    <HStack divider={<StackDivider />}>
                        <Link
                            href="https://github.com/mike-fam/tutor-timetable-v2/issues/new?assignees=&labels=&template=bug_report.md&title="
                            isExternal
                        >
                            Bug report
                        </Link>
                        <Link
                            href="https://github.com/mike-fam/tutor-timetable-v2/issues/new?assignees=&labels=&template=feature_request.md&title="
                            isExternal
                        >
                            Feature request
                        </Link>
                    </HStack>
                </VStack>
            </Box>
            <Divider w="100%" />
        </>
    );
};
