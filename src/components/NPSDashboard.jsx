
import React from 'react';
import PageFilter from './PageFilter';
import MetricCard from './MetricCard';
import RegionBreakdown from './RegionBreakdown';
import PieChart from './PieChart';
import BarChart from './BarChart';
import DataTable from './DataTable';
import StackedBarChart from './StackedBarChart';
import { npsData } from '../data/npsData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';

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
    <div className="container mx-auto px-4 pb-8">
      {/* Dashboard Header */}
      <div className="mb-6 pt-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center">
          <FontAwesomeIcon icon={faChartLine} className="mr-2" />
          NPS Analytics Dashboard
        </h1>
        <p className="text-gray-500 mt-1">Track customer satisfaction and loyalty metrics</p>
      </div>
      
      <PageFilter />
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="md:col-span-1">
          <MetricCard 
            title="Expected Responses" 
            value={npsData.expectedResponses.toLocaleString()} 
            color="#1e3a8a"
          />
          <div className="mt-0">
            <RegionBreakdown 
              data={expectedByRegion} 
              title="By Region" 
              total={npsData.expectedResponses} 
            />
          </div>
        </div>
        
        <div className="md:col-span-1">
          <MetricCard 
            title="Responses Received" 
            value={npsData.responsesReceived.toLocaleString()} 
            subtitle={`(${npsData.responseRate}%)`}
            color="#0f766e"
          />
          <div className="mt-0">
            <RegionBreakdown 
              data={receivedByRegion} 
              title="By Region" 
              total={npsData.responsesReceived} 
            />
          </div>
        </div>
        
        <div className="md:col-span-1">
          <MetricCard 
            title="NPS Score" 
            value={npsData.npsScore.toFixed(1)} 
            color="#7e22ce"
          />
          <div className="mt-0">
            <RegionBreakdown 
              data={npsScoreByRegion} 
              title="By Region" 
              total={100} 
            />
          </div>
        </div>
      </div>
      
      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <PieChart 
          data={categoryData} 
          title="Responses by Category" 
          infoText="Breakdown of responses by promoters, passives, and detractors"
          colors={categoryColors}
        />
        
        <PieChart 
          data={stakeholderTypeData} 
          title="Stakeholders by Customer Type" 
          infoText="Distribution of stakeholders by their customer type"
          colors={stakeholderTypeColors}
        />
        
        <PieChart 
          data={confidentialityData} 
          title="Responses by Confidentiality" 
          infoText="Breakdown of responses by confidentiality setting"
          colors={confidentialityColors}
        />
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <BarChart 
          data={teamBarData} 
          title="Stakeholders mapped to #Teams" 
          infoText="Number of stakeholders mapped to different numbers of teams"
        />
        
        <StackedBarChart 
          data={npsData.departmentData} 
          title="Responses by Department" 
        />

        <DataTable 
          title="Response Rate by Tower" 
          columns={responseRateColumns} 
          data={npsData.responseRateByTower}
        />
      </div>
      
      {/* Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <DataTable 
          title="Respondents by Tower" 
          columns={towerColumns} 
          data={towerTableData}
          showProgressBar={true}
        />

        <DataTable 
          title="Respondents by Custom Tag" 
          columns={customTagColumns} 
          data={customTagTableData}
          showProgressBar={true}
        />
      </div>
      
      <div className="mt-6">
        <DataTable 
          title="Declined Rate by Tower" 
          columns={declinedRateColumns} 
          data={npsData.declinedRateByTower}
        />
      </div>
    </div>
  );
};

export default NPSDashboard;
