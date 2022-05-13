import { Box, Input, Container, Button, HStack } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { Layout } from "./Layout";
import Component from "./components/Component";

export const App = () => {
  const [emp, setEmp] = useState("");
  const [search, canSearch] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <Layout>
      <Container maxW="4xl" padding={10}>
        <HStack w="full" align="center">
          <Box w="full">
            <Input
              ref={inputRef}
              placeholder="Search By Name"
              onChange={(e) => {
                setEmp(e.target.value);
                canSearch(false);
              }}
            />
          </Box>

          <Box>
            <HStack w="full" align="center">
              <Button disabled={emp === ""} onClick={() => canSearch(true)}>
                Search Employee
              </Button>
              <Button
                colorScheme="red"
                disabled={emp === ""}
                onClick={() => {
                  setEmp("");
                  canSearch(false);
                  if (inputRef && inputRef.current) {
                    inputRef.current.value = "";
                  }
                }}
              >
                Clear
              </Button>
            </HStack>
          </Box>
        </HStack>
      </Container>
      {search ? <Component search={emp} /> : <></>}
    </Layout>
  );
};
