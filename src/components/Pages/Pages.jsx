import React from 'react';
import { Tabs } from 'antd';

//import './Pages.css';

function Pages({ tabs, onChangeTab }) {
  const { TabPane } = Tabs;
  return (
    <div>
      <Tabs defaultActiveKey="Search" onChange={(tab) => onChangeTab(tab)}>
        {tabs.map((tab) => (
          <TabPane tab={tab} key={tab} />
        ))}
      </Tabs>
    </div>
  );
}

export default Pages;
