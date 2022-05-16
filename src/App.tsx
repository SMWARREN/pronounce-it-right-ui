import { Box, Input, Container, Button, HStack } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { Layout } from "./components/Layout";
import Component from "./components/Component";
import "./styles.css";

export const App = () => {
  const [emp, setEmp] = useState("");
  const [search, canSearch] = useState(false);
  const [currentUser, setCurrentUser] = useState(-1);
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
                setCurrentUser(-1);
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
                  setCurrentUser(-1);
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
      <Component
        show={search}
        search={emp}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />
    </Layout>
  );
};
