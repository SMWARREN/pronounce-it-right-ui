import React, { ReactNode } from "react";
import {
  ChakraProvider,
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  extendTheme,
  Text,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

const Links = ["About"];
// 2. Call `extendTheme` and pass your custom values
const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("brand.200", "brand.700"),
    }}
    href={"#"}
  >
    {children}
  </Link>
);
const theme = extendTheme({
  fonts: {
    heading: "Open Sans, sans-serif",
    body: "Raleway, sans-serif",
  },
  colors: {
    brand: {
      100: "#bb0826",
      // ...
      900: "#bb0826",
    },
  },
});
type Props = {
  children?: React.ReactChild | React.ReactChild[];
};
export const Layout = ({ children }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <ChakraProvider theme={theme}>
      <Box bg={useColorModeValue("brand.100", "brand.900")} px={4}>
        <Flex h={12} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"xs"}
            colorScheme={"white"}
            icon={
              isOpen ? (
                <CloseIcon color={"white"} />
              ) : (
                <HamburgerIcon color={"white"} />
              )
            }
            aria-label={"Open Menu"}
            variant={"ghost"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={6} alignItems={"center"}>
            <Box>
              <Text color="white" fontSize="2xl">
                Pronounce It
              </Text>
            </Box>
            <HStack
              as={"nav"}
              spacing={3}
              color={"white"}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar
                  size={"sm"}
                  src={"https://source.unsplash.com/random"}
                />
              </MenuButton>
              <MenuList>
                <MenuItem>Link 1</MenuItem>
                <MenuItem>Link 2</MenuItem>
                <MenuDivider />
                <MenuItem>Link 3</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={2} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={2}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
      {children}
    </ChakraProvider>
  );
};
