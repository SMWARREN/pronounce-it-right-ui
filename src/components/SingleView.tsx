import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  HStack,
  Box,
  Avatar,
  Spacer,
  Container,
  Center,
  VStack,
} from "@chakra-ui/react";

import SpeechToText from "../hooks/SpeechToText";
import useFetch from "../hooks/useFetch";
import { SearchUser } from "../state/types/SearchUser";
import { UpdateInputControl } from "../hooks/useInputControl";
import { useEffect, useState } from "react";
import { BASE_URL } from "../state/shared/constants";
import Recorder from "../hooks/Recorder";
import { PlayAudio } from "../hooks/PlayAudio";

export function SingleView({ empId }: { empId: number }) {
  const {
    state: { data, error },
    fetchData,
  } = useFetch<SearchUser>(`${BASE_URL}/employee-info/${empId}`);
  const [val, setVal] = useState("");
  const [isPronunciation, setIsPronunciation] = useState(false);
  const body = isPronunciation
    ? JSON.stringify({ ...data, pronunciation: val })
    : JSON.stringify({ ...data, namePhoneme: val });

  const updateHook = useFetch<SearchUser>(`${BASE_URL}/employee-info/`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: body,
  });
  const updateData = async (_val: string, pronunciation: boolean) => {
    setVal(_val);
    if (pronunciation) {
      setIsPronunciation(true);
    } else {
      setIsPronunciation(false);
    }
    updateHook.fetchData(true);
  };

  useEffect(() => {
    if (updateHook.state.data) {
      fetchData(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateHook.state.data]);

  useEffect(() => {
    fetchData(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) return <p>There is an error.</p>;
  if (!data) return <p>Loading...</p>;
  return (
    <>
      <HStack>
        <Box>
          <Avatar
            size="2xl"
            name={data.empName}
            src="https://bit.ly/broken-link"
          />
        </Box>
        <Spacer></Spacer>
        <TableContainer>
          <Table variant="simple">
            <TableCaption fontSize="2xl" placement={"top"}>
              {data.empName}
            </TableCaption>
            <Thead>
              <Tr>
                <Th>Title</Th>
                <Th>Legal Name</Th>
                <Th>Phoneme</Th>
                <Th>Pronounation</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>{data.title}</Td>
                <Td>{data.legalName}</Td>
                <Td>
                  <UpdateInputControl
                    isPronunciation={false}
                    props={data}
                    updateData={updateData}
                  />
                </Td>
                <Td>
                  <UpdateInputControl
                    isPronunciation={true}
                    props={data}
                    updateData={updateData}
                  />
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>

        <Spacer></Spacer>
      </HStack>
      <Box>
        <Container maxW="4xl" padding={10}>
          <HStack></HStack>
          <HStack>
            <Box>
              <VStack>
                <Box>Play Phenome:</Box>
                <Box>
                  <PlayAudio text={data.namePhoneme} />
                </Box>
              </VStack>
              <Box h={10}></Box>
            </Box>
            <Spacer></Spacer>

            <Box>
              <VStack>
                <Box>Play Pronounciation</Box>
                <Box>
                  <PlayAudio text={data.pronunciation} />
                </Box>
              </VStack>
              <Box>
                <SpeechToText />
              </Box>
            </Box>
          </HStack>
          <Box>
            <p>
              <Recorder updateData={updateData} />
            </p>
          </Box>
        </Container>
      </Box>
    </>
  );
}
