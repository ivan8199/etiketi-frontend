import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import React from 'react';
import { TextCardWrapper } from './TextCardWrapper';

const DashboardTabs = props => {
  return (
    <Box width={'50%'} border={'1px solid #E2E8F0'} mt={4} borderRadius={'lg'}>
      <Tabs isFitted>
        <TabList>
          <Tab>Text</Tab>
          <Tab isDisabled>Images</Tab>
          <Tab isDisabled>Barcodes</Tab>
        </TabList>

        <TabPanels>
          <TabPanel p={0}>
            <TextCardWrapper
              textboxArray={props.textboxArray}
              onTextChange={props.onTextChange}
              textValue={props.textValue}
            />
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default DashboardTabs;
