
import React, { useState, useEffect } from 'react';
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
  const [filters, setFilters] = useState({
    geo: "All Geos",
    time: "Last 12 Months",
    tower: "All Towers"
  });
  
  const [filteredData, setFilteredData] = useState({
    expectedResponses: npsData.expectedResponses,
    responsesReceived: npsData.responsesReceived,
    responseRate: npsData.responseRate,
    npsScore: npsData.npsScore,
    scoresByCategory: npsData.scoresByCategory,
    towerData: npsData.towerData,
    responseRateByTower: npsData.responseRateByTower,
    stakeholdersByCustomerType: npsData.stakeholdersByCustomerType,
    customTagData: npsData.customTagData,
    declinedRateByTower: npsData.declinedRateByTower,
    confidentialityData: npsData.confidentialityData,
    stakeholdersTeamsData: npsData.stakeholdersTeamsData,
    departmentData: npsData.departmentData,
    regionData: npsData.regionData
  });
  
  // Function to apply filters to data
  const applyFilters = () => {
    let filteredTowerData = [...npsData.towerData];
    let filteredResponseRateByTower = [...npsData.responseRateByTower];
    let filteredCustomTagData = [...npsData.customTagData];
    let filteredDeclinedRateByTower = [...npsData.declinedRateByTower];
    
    // Filter by GEO
    if (filters.geo !== "All Geos") {
      filteredTowerData = filteredTowerData.filter(item => item.geoZone === filters.geo);
      filteredResponseRateByTower = filteredResponseRateByTower.filter(item => item.geoZone === filters.geo);
      filteredCustomTagData = filteredCustomTagData.filter(item => item.geoZone === filters.geo);
      filteredDeclinedRateByTower = filteredDeclinedRateByTower.filter(item => item.geoZone === filters.geo);
    }
    
    // Filter by Tower
    if (filters.tower !== "All Towers") {
      filteredTowerData = filteredTowerData.filter(item => item.tower === filters.tower);
      filteredResponseRateByTower = filteredResponseRateByTower.filter(item => item.tower === filters.tower);
      filteredCustomTagData = filteredCustomTagData.filter(item => item.tower === filters.tower);
      filteredDeclinedRateByTower = filteredDeclinedRateByTower.filter(item => item.tower === filters.tower);
    }
    
    // Calculate new totals based on filtered data
    const expectedResponses = filteredResponseRateByTower.reduce((total, item) => total + item.expectedResponses, 0) || npsData.expectedResponses;
    const responsesReceived = filteredResponseRateByTower.reduce((total, item) => total + item.responsesReceived, 0) || npsData.responsesReceived;
    const responseRate = (responsesReceived / expectedResponses * 100).toFixed(1) || npsData.responseRate;
    
    // Calculate new NPS Score based on filtered tower data
    let totalPromoters = 0;
    let totalPassives = 0;
    let totalDetractors = 0;
    
    filteredTowerData.forEach(item => {
      totalPromoters += item.promoters || 0;
      totalPassives += item.passives || 0;
      totalDetractors += item.detractors || 0;
    });
    
    const totalResponses = totalPromoters + totalPassives + totalDetractors;
    let npsScore = npsData.npsScore; // Default value
    
    if (totalResponses > 0) {
      const promoterPercentage = (totalPromoters / totalResponses) * 100;
      const detractorPercentage = (totalDetractors / totalResponses) * 100;
      npsScore = (promoterPercentage - detractorPercentage).toFixed(1);
    }
    
    // Calculate region data based on filters
    const regionData = { ...npsData.regionData };
    
    if (filters.geo !== "All Geos") {
      // If a specific region is selected, zero out the others
      Object.keys(regionData).forEach(region => {
        if (region !== filters.geo) {
          regionData[region] = { expected: 0, received: 0, npsScore: 0 };
        }
      });
    }
    
    // Update filtered data
    setFilteredData({
      expectedResponses,
      responsesReceived,
      responseRate,
      npsScore,
      scoresByCategory: {
        promoters: totalPromoters || npsData.scoresByCategory.promoters,
        passives: totalPassives || npsData.scoresByCategory.passives,
        detractors: totalDetractors || npsData.scoresByCategory.detractors
      },
      towerData: filteredTowerData,
      responseRateByTower: filteredResponseRateByTower,
      stakeholdersByCustomerType: npsData.stakeholdersByCustomerType, // Keep original for now
      customTagData: filteredCustomTagData,
      declinedRateByTower: filteredDeclinedRateByTower,
      confidentialityData: npsData.confidentialityData, // Keep original for now
      stakeholdersTeamsData: npsData.stakeholdersTeamsData, // Keep original for now
      departmentData: npsData.departmentData, // Keep original for now
      regionData
    });
  };
  
  // Apply filters whenever they change
  useEffect(() => {
    applyFilters();
  }, [filters]);
  
  // Handle filter changes from the PageFilter component
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };
  
  // Transform data for pie charts based on filtered data
  const categoryData = [
    { name: 'Promoters', value: filteredData.scoresByCategory.promoters },
    { name: 'Passives', value: filteredData.scoresByCategory.passives },
    { name: 'Detractors', value: filteredData.scoresByCategory.detractors },
  ];
  
  const categoryColors = ['#4caf50', '#ffc107', '#f44336'];

  const stakeholderTypeData = [
    { name: 'End Client', value: filteredData.stakeholdersByCustomerType.endClient },
    { name: 'Senior Stakeholder', value: filteredData.stakeholdersByCustomerType.seniorStakeholder },
    { name: 'Manager', value: filteredData.stakeholdersByCustomerType.manager },
    { name: 'Other', value: filteredData.stakeholdersByCustomerType.other },
  ];
  
  const stakeholderTypeColors = ['#1e40af', '#0ea5e9', '#0f766e', '#0891b2'];
  
  const confidentialityData = [
    { name: 'Non-Anonymous', value: filteredData.confidentialityData.nonAnonymous },
    { name: 'Anonymous', value: filteredData.confidentialityData.anonymous },
  ];
  
  const confidentialityColors = ['#172554', '#94a3b8'];

  // Transform data for bar chart
  const teamBarData = filteredData.stakeholdersTeamsData.map(item => ({
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
  
  const towerTableData = filteredData.towerData.map(item => {
    const total = item.promoters + item.passives + item.detractors;
    return {
      ...item,
      segments: [
        { percentage: (item.promoters / total) * 100, class: 'bg-success' },
        { percentage: (item.passives / total) * 100, class: 'bg-warning' },
        { percentage: (item.detractors / total) * 100, class: 'bg-danger' }
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
  
  const customTagTableData = filteredData.customTagData.map(item => {
    const total = item.promoters + item.passives + item.detractors;
    return {
      ...item,
      segments: [
        { percentage: (item.promoters / total) * 100, class: 'bg-success' },
        { percentage: (item.passives / total) * 100, class: 'bg-warning' },
        { percentage: (item.detractors / total) * 100, class: 'bg-danger' }
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
    NA: filteredData.regionData.NA.expected,
    EMEA: filteredData.regionData.EMEA.expected,
    APAC: filteredData.regionData.APAC.expected,
    LATAM: filteredData.regionData.LATAM.expected
  };
  
  const receivedByRegion = {
    NA: filteredData.regionData.NA.received,
    EMEA: filteredData.regionData.EMEA.received,
    APAC: filteredData.regionData.APAC.received,
    LATAM: filteredData.regionData.LATAM.received
  };
  
  const npsScoreByRegion = {
    NA: filteredData.regionData.NA.npsScore,
    EMEA: filteredData.regionData.EMEA.npsScore,
    APAC: filteredData.regionData.APAC.npsScore,
    LATAM: filteredData.regionData.LATAM.npsScore
  };

  return (
    <div className="container-fluid py-4">
      {/* Dashboard Header */}
      <div className="mb-4 pt-3">
        <h1 className="d-flex align-items-center fs-3 fw-bold text-dark">
          <FontAwesomeIcon icon={faChartLine} className="me-2" />
          NPS Analytics Dashboard
        </h1>
        <p className="text-secondary mt-1">Track customer satisfaction and loyalty metrics</p>
      </div>
      
      <PageFilter onFilterChange={handleFilterChange} />
      
      {/* Key Metrics Section */}
      <div className="mb-4">
        <div className="row g-4 mb-4">
          {/* First Key Metric Card */}
          <div className="col-12 col-lg-4">
            <div className="d-flex flex-column h-100">
              <MetricCard 
                title="Expected Responses" 
                value={filteredData.expectedResponses.toLocaleString()} 
                color="#1e3a8a"
              />
              <div className="mt-3">
                <RegionBreakdown 
                  data={expectedByRegion} 
                  title="By Region" 
                  total={filteredData.expectedResponses} 
                />
              </div>
            </div>
          </div>
          
          {/* Second Key Metric Card */}
          <div className="col-12 col-lg-4">
            <div className="d-flex flex-column h-100">
              <MetricCard 
                title="Responses Received" 
                value={filteredData.responsesReceived.toLocaleString()} 
                subtitle={`(${filteredData.responseRate}%)`}
                color="#0f766e"
              />
              <div className="mt-3">
                <RegionBreakdown 
                  data={receivedByRegion} 
                  title="By Region" 
                  total={filteredData.responsesReceived} 
                />
              </div>
            </div>
          </div>
          
          {/* Third Key Metric Card */}
          <div className="col-12 col-lg-4">
            <div className="d-flex flex-column h-100">
              <MetricCard 
                title="NPS Score" 
                value={filteredData.npsScore} 
                color="#7e22ce"
              />
              <div className="mt-3">
                <RegionBreakdown 
                  data={npsScoreByRegion} 
                  title="By Region" 
                  total={100} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Charts Section */}
      <div className="mb-4">
        {/* Chart Row 1 - Related Charts Side by Side */}
        <div className="row g-4 mb-4">
          <div className="col-12 col-lg-4">
            <PieChart 
              data={categoryData} 
              title="Responses by Category" 
              infoText="Breakdown of responses by promoters, passives, and detractors"
              colors={categoryColors}
            />
          </div>
          
          <div className="col-12 col-lg-4">
            <PieChart 
              data={stakeholderTypeData} 
              title="Stakeholders by Customer Type" 
              infoText="Distribution of stakeholders by their customer type"
              colors={stakeholderTypeColors}
            />
          </div>
          
          <div className="col-12 col-lg-4">
            <PieChart 
              data={confidentialityData} 
              title="Responses by Confidentiality" 
              infoText="Breakdown of responses by confidentiality setting"
              colors={confidentialityColors}
            />
          </div>
        </div>
        
        {/* Chart Row 2 - Bar Charts and Related Data */}
        <div className="row g-4 mb-4">
          <div className="col-12 col-lg-4">
            <BarChart 
              data={teamBarData} 
              title="Stakeholders mapped to #Teams" 
              infoText="Number of stakeholders mapped to different numbers of teams"
            />
          </div>
          
          <div className="col-12 col-lg-4">
            <StackedBarChart 
              data={filteredData.departmentData} 
              title="Responses by Department" 
            />
          </div>

          <div className="col-12 col-lg-4">
            <DataTable 
              title="Response Rate by Tower" 
              columns={responseRateColumns} 
              data={filteredData.responseRateByTower}
            />
          </div>
        </div>
      </div>
      
      {/* Tables Section */}
      <div className="mb-4">
        <div className="row g-4 mb-4">
          <div className="col-12 col-lg-6">
            <DataTable 
              title="Respondents by Tower" 
              columns={towerColumns} 
              data={towerTableData}
              showProgressBar={true}
            />
          </div>

          <div className="col-12 col-lg-6">
            <DataTable 
              title="Respondents by Custom Tag" 
              columns={customTagColumns} 
              data={customTagTableData}
              showProgressBar={true}
            />
          </div>
        </div>
        
        <div className="row">
          <div className="col-12">
            <DataTable 
              title="Declined Rate by Tower" 
              columns={declinedRateColumns} 
              data={filteredData.declinedRateByTower}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NPSDashboard;
