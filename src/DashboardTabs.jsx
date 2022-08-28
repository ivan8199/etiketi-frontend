import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import React from 'react';
import TextCard from './TextCard';
import { TextCardWrapper } from './TextCardWrapper';

const DashboardTabs = props => {
  return (
    <Box width={'50%'} border={'1px solid #E2E8F0'}>
      <Tabs isFitted>
        <TabList>
          <Tab>Text</Tab>
          <Tab>Images</Tab>
          <Tab>Barcodes</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
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
