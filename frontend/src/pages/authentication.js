import React, { useState } from "react";
import {
  Box,
  Text,
  Container,
  TabList,
  Tabs,
  Tab,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";
import "../App.css";
import Login from "../components/authentication/login";
import Register from "../components/authentication/register";

const AuthPage = () => {
  const [index, setIndex] = useState(0); // to control which tab is selected
  function handleTabsChange(index) {
    setIndex(index);
  }
  return (
    <div className="App" style={{ padding: "10px" }}>
      <Container w="100%">
        <Box
          bg="white"
          border="2px"
          borderRadius="md"
          mt="10%"
          w="100%"
          minW="52"
        >
          <Text
            display="flex"
            p="3"
            minW="100%"
            fontSize="2xl"
            justifyContent="center"
            alignItems="center"
          >
           Post-Media
          </Text>
        </Box>

        <Box
          bg="white"
          display="flex"
          w="100%"
          mt="7"
          borderRadius="md"
          justifyContent="space-between"
          p="2"
        >
          <Tabs
            index={index}
            onChange={handleTabsChange}
            variant="soft-rounded"
            w="100%"
          >
            <TabList w="100%">
              <Tab width="50%" color="black">
                Login
              </Tab>
              <Tab width="50%" color="black">
                Register
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Login />
              </TabPanel>
              <TabPanel>
                <Register setIndex={setIndex} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </div>
  );
};

export default AuthPage;