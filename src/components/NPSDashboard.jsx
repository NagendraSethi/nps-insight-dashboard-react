
import React from 'react';
import PageFilter from './PageFilter';
import MetricCard from './MetricCard';
import RegionBreakdown from './RegionBreakdown';
import PieChart from './PieChart';
import BarChart from './BarChart';
import DataTable from './DataTable';
import StackedBarChart from './StackedBarChart';
import { npsData } from '../data/npsData';

const NPSDashboard = () => {
  // Transform data for pie charts
  const categoryData = [
    { name: 'Promoters', value: npsData.scoresByCategory.promoters },
    { name: 'Passives', value: npsData.scoresByCategory.passives },
    { name: 'Detractors', value: npsData.scoresByCategory.detractors },
  ];
  
  const categoryColors = ['#4caf50', '#ffc107', '#f44336'];

  const stakeholderTypeData = [
    { name: 'End Client', value: npsData.stakeholdersByCustomerType.endClient },
    { name: 'Senior Stakeholder', value: npsData.stakeholdersByCustomerType.seniorStakeholder },
    { name: 'Manager', value: npsData.stakeholdersByCustomerType.manager },
    { name: 'Other', value: npsData.stakeholdersByCustomerType.other },
  ];
  
  const stakeholderTypeColors = ['#1e40af', '#0ea5e9', '#0f766e', '#0891b2'];
  
  const confidentialityData = [
    { name: 'Non-Anonymous', value: npsData.confidentialityData.nonAnonymous },
    { name: 'Anonymous', value: npsData.confidentialityData.anonymous },
  ];
  
  const confidentialityColors = ['#172554', '#94a3b8'];

  // Transform data for bar chart
  const teamBarData = npsData.stakeholdersTeamsData.map(item => ({
    name: item.teams.toString() === '4+ Teams' ? item.teams : `${item.teams} Team${item.teams > 1 ? 's' : ''}`,
    value: item.count
  }));

  // Prepare data for response rate table
  const responseRateColumns = [
    { header: 'GEO Zone', key: 'geoZone' },
    { header: 'Towers', key: 'tower' },
    { header: '# Expected Responses', key: 'expectedResponses' },
    { header: '# Responses Received', key: 'responsesReceived' },
    { header: 'Response Rate', key: 'responseRate', format: (value) => `${value}%` },
    { header: '', key: 'chart' }
  ];
  
  // Prepare data for tables with progress bars
  const towerColumns = [
    { header: 'GEO Zone', key: 'geoZone' },
    { header: 'Towers', key: 'tower' },
    { header: 'NPS by Tower', key: 'npsScore', format: (value) => value.toFixed(1) },
    { header: '', key: 'progress' }
  ];
  
  const towerTableData = npsData.towerData.map(item => {
    const total = item.promoters + item.passives + item.detractors;
    return {
      ...item,
      segments: [
        { percentage: (item.promoters / total) * 100, class: 'promoter' },
        { percentage: (item.passives / total) * 100, class: 'passive' },
        { percentage: (item.detractors / total) * 100, class: 'detractor' }
      ]
    };
  });

  const customTagColumns = [
    { header: 'GEO Zone', key: 'geoZone' },
    { header: 'Towers', key: 'tower' },
    { header: 'Custom Tags', key: 'customTag' },
    { header: 'NPS by Custom Tag', key: 'npsScore', format: (value) => value.toFixed(1) },
    { header: '', key: 'progress' }
  ];
  
  const customTagTableData = npsData.customTagData.map(item => {
    const total = item.promoters + item.passives + item.detractors;
    return {
      ...item,
      segments: [
        { percentage: (item.promoters / total) * 100, class: 'promoter' },
        { percentage: (item.passives / total) * 100, class: 'passive' },
        { percentage: (item.detractors / total) * 100, class: 'detractor' }
      ]
    };
  });

  const declinedRateColumns = [
    { header: 'GEO Zone', key: 'geoZone' },
    { header: 'Towers', key: 'tower' },
    { header: '# Response Received', key: 'responsesReceived' },
    { header: '# Response Declined', key: 'responsesDeclined' },
    { header: '%', key: 'rate', format: (value) => `${value.toFixed(1)}%` }
  ];
  
  // Extract only needed data for regional breakdowns
  const expectedByRegion = {
    NA: npsData.regionData.NA.expected,
    EMEA: npsData.regionData.EMEA.expected,
    APAC: npsData.regionData.APAC.expected,
    LATAM: npsData.regionData.LATAM.expected
  };
  
  const receivedByRegion = {
    NA: npsData.regionData.NA.received,
    EMEA: npsData.regionData.EMEA.received,
    APAC: npsData.regionData.APAC.received,
    LATAM: npsData.regionData.LATAM.received
  };
  
  const npsScoreByRegion = {
    NA: npsData.regionData.NA.npsScore,
    EMEA: npsData.regionData.EMEA.npsScore,
    APAC: npsData.regionData.APAC.npsScore,
    LATAM: npsData.regionData.LATAM.npsScore
  };

  return (
    <div className="container mx-auto p-4 mb-10">
      <PageFilter />
      
      <div className="dashboard-grid">
        <div>
          <MetricCard 
            title="Expected Responses" 
            value={npsData.expectedResponses.toLocaleString()} 
          />
          <div className="mt-2">
            <RegionBreakdown 
              data={expectedByRegion} 
              title="All" 
              total={npsData.expectedResponses} 
            />
          </div>
        </div>
        
        <div>
          <MetricCard 
            title="Responses Received" 
            value={npsData.responsesReceived.toLocaleString()} 
            subtitle={`(${npsData.responseRate}%)`}
          />
          <div className="mt-2">
            <RegionBreakdown 
              data={receivedByRegion} 
              title="All" 
              total={npsData.responsesReceived} 
            />
          </div>
        </div>
        
        <div>
          <MetricCard 
            title="NPS Score" 
            value={npsData.npsScore.toFixed(1)} 
          />
          <div className="mt-2">
            <RegionBreakdown 
              data={npsScoreByRegion} 
              title="All" 
              total={100} 
            />
          </div>
        </div>
      </div>
      
      <div className="dashboard-grid-full mt-8">
        <PieChart 
          data={categoryData} 
          title="Responses by Category" 
          infoText="Breakdown of responses by promoters, passives, and detractors"
          colors={categoryColors}
        />
        
        <DataTable 
          title="Respondents by Tower" 
          columns={towerColumns} 
          data={towerTableData}
          showProgressBar={true}
        />
        
        <DataTable 
          title="Response Rate by Tower" 
          columns={responseRateColumns} 
          data={npsData.responseRateByTower}
        />
      </div>
      
      <div className="dashboard-grid-full mt-8">
        <PieChart 
          data={stakeholderTypeData} 
          title="Stakeholders by Customer Type" 
          infoText="Distribution of stakeholders by their customer type"
          colors={stakeholderTypeColors}
        />
        
        <DataTable 
          title="Respondents by Custom Tag" 
          columns={customTagColumns} 
          data={customTagTableData}
          showProgressBar={true}
        />
        
        <DataTable 
          title="Declined Rate by Tower" 
          columns={declinedRateColumns} 
          data={npsData.declinedRateByTower}
        />
      </div>
      
      <div className="dashboard-grid-full mt-8">
        <PieChart 
          data={confidentialityData} 
          title="Responses by Confidentiality" 
          infoText="Breakdown of responses by confidentiality setting"
          colors={confidentialityColors}
        />
        
        <BarChart 
          data={teamBarData} 
          title="Stakeholders mapped to #Teams" 
          infoText="Number of stakeholders mapped to different numbers of teams"
        />
        
        <StackedBarChart 
          data={npsData.departmentData} 
          title="Responses by Department" 
        />
      </div>
    </div>
  );
};

export default NPSDashboard;
