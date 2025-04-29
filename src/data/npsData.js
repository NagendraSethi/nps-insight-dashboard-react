
export const npsData = {
  expectedResponses: 3996,
  responsesReceived: 2046,
  responseRate: 51.2,
  npsScore: 38.8,
  
  scoresByCategory: {
    promoters: 1343,
    passives: 1238,
    detractors: 253
  },
  
  towerData: [
    { geoZone: 'NA', tower: 'CHI', npsScore: 34.9, promoters: 123, passives: 41, detractors: 21 },
    { geoZone: 'NA', tower: 'LYC', npsScore: 52.1, promoters: 164, passives: 57, detractors: 10 },
    { geoZone: 'NA', tower: 'PTP', npsScore: 42.8, promoters: 79, passives: 20, detractors: 13 },
    { geoZone: 'EMEA', tower: 'EMED', npsScore: 34.9, promoters: 60, passives: 23, detractors: 14 },
    { geoZone: 'LATAM', tower: 'Sales Trader COB NA', npsScore: 45.2, promoters: 31, passives: 12, detractors: 4 },
    { geoZone: 'APAC', tower: 'LIVE NA', npsScore: 1.4, promoters: 9, passives: 7, detractors: 8 },
    { geoZone: 'NA', tower: 'DTR', npsScore: 13.6, promoters: 16, passives: 8, detractors: 11 },
    { geoZone: 'NA', tower: 'ECM', npsScore: 39.1, promoters: 22, passives: 8, detractors: 4 },
    { geoZone: 'APAC', tower: 'CRE', npsScore: 16.8, promoters: 15, passives: 7, detractors: 10 }
  ],
  
  responseRateByTower: [
    { geoZone: 'NA', tower: 'CHI', expectedResponses: 271, responsesReceived: 139, responseRate: 51.3 },
    { geoZone: 'EMEA', tower: 'EMED', expectedResponses: 368, responsesReceived: 147, responseRate: 39.9 },
    { geoZone: 'LATAM', tower: 'Sales Trader COB NA', expectedResponses: 178, responsesReceived: 105, responseRate: 59.0 },
    { geoZone: 'APAC', tower: 'LIVE NA', expectedResponses: 210, responsesReceived: 137, responseRate: 65.2 },
    { geoZone: 'NA', tower: 'SCM', expectedResponses: 72, responsesReceived: 46, responseRate: 63.9 },
    { geoZone: 'NA', tower: 'PTP', expectedResponses: 305, responsesReceived: 142, responseRate: 46.6 },
    { geoZone: 'EMEA', tower: 'EMED', expectedResponses: 386, responsesReceived: 127, responseRate: 32.9 }
  ],
  
  stakeholdersByCustomerType: {
    endClient: 453,
    manager: 123,
    seniorStakeholder: 1061,
    other: 1363
  },
  
  customTagData: [
    { geoZone: 'NA', tower: 'CHI', customTag: 'High Value', npsScore: 36.8, promoters: 123, passives: 41, detractors: 21 },
    { geoZone: 'NA', tower: 'LYC', customTag: 'Client', npsScore: 57.1, promoters: 167, passives: 32, detractors: 8 },
    { geoZone: 'NA', tower: 'PTP', customTag: 'Corporate', npsScore: 42.6, promoters: 78, passives: 21, detractors: 12 },
    { geoZone: 'EMEA', tower: 'EMED', customTag: 'Retail', npsScore: 35.2, promoters: 62, passives: 21, detractors: 15 },
    { geoZone: 'LATAM', tower: 'Sales Trader COB NA', customTag: 'SMB', npsScore: 61.7, promoters: 34, passives: 9, detractors: 2 },
    { geoZone: 'APAC', tower: 'DTR', customTag: 'Enterprise', npsScore: 18.7, promoters: 14, passives: 6, detractors: 9 },
    { geoZone: 'NA', tower: 'ECM', customTag: 'Financial', npsScore: 38.4, promoters: 21, passives: 8, detractors: 5 }
  ],
  
  declinedRateByTower: [
    { geoZone: 'NA', tower: 'CHI', responsesReceived: 78, responsesDeclined: 7, rate: 9.0 },
    { geoZone: 'EMEA', tower: 'EMED', responsesReceived: 127, responsesDeclined: 9, rate: 7.1 },
    { geoZone: 'NA', tower: 'PTP', responsesReceived: 142, responsesDeclined: 7, rate: 4.9 },
    { geoZone: 'EMEA', tower: 'EMED', responsesReceived: 139, responsesDeclined: 5, rate: 3.6 },
    { geoZone: 'LATAM', tower: 'Sales Trader COB NA', responsesReceived: 105, responsesDeclined: 1, rate: 1.0 },
    { geoZone: 'APAC', tower: 'LIVE NA', responsesReceived: 137, responsesDeclined: 3, rate: 2.2 },
    { geoZone: 'NA', tower: 'SCM', responsesReceived: 46, responsesDeclined: 0, rate: 0.0 },
    { geoZone: 'APAC', tower: 'CRE', responsesReceived: 18, responsesDeclined: 0, rate: 0.0 }
  ],
  
  confidentialityData: {
    anonymous: 906,
    nonAnonymous: 1540
  },
  
  stakeholdersTeamsData: [
    { teams: 1, count: 949 },
    { teams: 2, count: 502 },
    { teams: 3, count: 150 },
    { teams: '4+ Teams', count: 51 }
  ],
  
  departmentData: [
    { department: 'AMO Operations', promoters: 31, passives: 11, detractors: 4 },
    { department: 'Sales - Corporate', promoters: 103, passives: 37, detractors: 14 },
    { department: 'CIB - Global', promoters: 76, passives: 34, detractors: 11 },
    { department: 'Western Europe Operations', promoters: 87, passives: 42, detractors: 17 },
    { department: 'Sales - Banking', promoters: 63, passives: 25, detractors: 7 },
    { department: 'Asset Management', promoters: 41, passives: 18, detractors: 6 },
    { department: 'Procurement - North America', promoters: 37, passives: 19, detractors: 9 },
    { department: 'Finance - US Operations', promoters: 31, passives: 14, detractors: 8 },
    { department: 'EMEA', promoters: 29, passives: 12, detractors: 7 },
    { department: 'ICG', promoters: 32, passives: 18, detractors: 10 },
    { department: 'Australia', promoters: 27, passives: 14, detractors: 5 },
    { department: 'CIB - US', promoters: 21, passives: 11, detractors: 7 },
    { department: 'NA Data - Logistics', promoters: 17, passives: 9, detractors: 4 }
  ],

  // Data by region
  regionData: {
    NA: {
      expected: 1297,
      received: 714,
      npsScore: 43.2
    },
    EMEA: {
      expected: 1154,
      received: 590,
      npsScore: 40.5
    },
    APAC: {
      expected: 980,
      received: 512,
      npsScore: 38.7
    },
    LATAM: {
      expected: 565,
      received: 230,
      npsScore: 33.9
    }
  }
};
