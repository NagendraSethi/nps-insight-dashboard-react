
import React, { useState, useEffect } from 'react'
import PageFilter from './PageFilter'
import MetricCard from './MetricCard'
import PieChart from './PieChart'
import BarChart from './BarChart'
import DataTable from './DataTable'
import StackedBarChart from './StackedBarChart'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartLine } from '@fortawesome/free-solid-svg-icons'
import LoadingStatus from '../Helper/LoadingStatus'
import { npsData } from '../data/npsData'
import { surveyTags } from '../data/surveyTags'
import { userTags } from '../data/userTags'
import { toast } from 'sonner'

const NPSDashboard = () => {
  const [loadingStatus, setLoadingStatus] = useState({
    status: false,
    message: 'Loading...',
  })
  const [surveyData, setSurveyData] = useState({})
  const [filterParams, setFilterParams] = useState({})

  // Initialize survey data when component loads
  useEffect(() => {
    try {
      console.log("Loading NPS data:", npsData);
      if (npsData && npsData.data) {
        setSurveyData(npsData.data);
        console.log("NPS data loaded successfully", npsData.data);
        toast.success("NPS data loaded successfully");
      } else {
        console.error("NPS data is empty or has an invalid structure");
        toast.error("Error loading NPS data: Data is empty or invalid");
        setSurveyData({}); // Set to empty object to prevent errors
      }
    } catch (error) {
      console.error("Error loading NPS data:", error);
      toast.error(`Error loading NPS data: ${error.message}`);
      setSurveyData({});
    }
  }, []);

  // Instead of fetching unique tags from the survey data, we can now use the imported tag files
  const uniqueSurveyTags = surveyTags.survey_tags || []
  const uniqueUserTags = userTags.user_tags || []

  // Filter data based on selected tags if needed
  const filterSurveyData = () => {
    // Use surveyData from state instead of directly using npsData.data
    if (!surveyData || Object.keys(surveyData).length === 0) {
      console.log('Survey data is empty, nothing to filter');
      return {};
    }
    
    if (!filterParams.survey_tags?.length && !filterParams.user_tags?.length) {
      return surveyData;
    }

    return Object.entries(surveyData).reduce((filtered, [key, survey]) => {
      const matchesSurveyTags = !filterParams.survey_tags?.length || 
        filterParams.survey_tags.some(tag => survey.surveyTags?.includes(tag));
      
      const matchesUserTags = !filterParams.user_tags?.length || 
        filterParams.user_tags.some(tag => survey.userTags?.includes(tag));
      
      if (matchesSurveyTags && matchesUserTags) {
        filtered[key] = survey;
      }
      
      return filtered;
    }, {});
  };

  // Get filtered data
  const filteredData = filterSurveyData();
  
  // Check if we have data to display
  const hasData = filteredData && Object.keys(filteredData).length > 0;

  // Safely calculate metrics with null checks
  const totalRecipients = hasData ? 
    Object.values(filteredData).reduce(
      (acc, survey) => acc + (survey.totalRecipients || 0),
      0
    ) : 0;
  
  const totalResponses = hasData ? 
    Object.values(filteredData).reduce(
      (acc, survey) => acc + (survey.totalResponses || 0),
      0
    ) : 0;
  
  const avgNpsScore = hasData ? (
    Object.values(filteredData).reduce(
      (acc, survey) => acc + (survey.npsScore || 0),
      0
    ) / Object.keys(filteredData).length
  ).toFixed(1) : "0.0";

  const categoryData = [
    {
      name: 'Promoters',
      value: hasData ? Object.values(filteredData).reduce(
        (acc, survey) => acc + (survey.promotersCount || 0),
        0
      ) : 0,
    },
    {
      name: 'Passives',
      value: hasData ? Object.values(filteredData).reduce(
        (acc, survey) => acc + (survey.passivesCount || 0),
        0
      ) : 0,
    },
    {
      name: 'Detractors',
      value: hasData ? Object.values(filteredData).reduce(
        (acc, survey) => acc + (survey.detractorsCount || 0),
        0
      ) : 0,
    },
  ]

  // Safely build stakeholder type data
  const stakeholderTypeMap = {}

  if (hasData) {
    Object.values(filteredData).forEach((survey) => {
      if (Array.isArray(survey.userTags)) {
        survey.userTags.forEach((tag) => {
          if (tag) {
            stakeholderTypeMap[tag] = (stakeholderTypeMap[tag] || 0) + 1
          }
        })
      }
    })
  }

  // Safely build survey type data
  const surveyTypeMap = {}

  if (hasData) {
    Object.values(filteredData).forEach((survey) => {
      if (Array.isArray(survey.surveyTags)) {
        survey.surveyTags.forEach((tag) => {
          if (tag) {
            surveyTypeMap[tag] = (surveyTypeMap[tag] || 0) + 1
          }
        })
      }
    })
  }

  const stakeholderTypeData = Object.entries(
    stakeholderTypeMap
  ).map(([name, value]) => ({ name, value }))

  const surveyTypeData = Object.entries(surveyTypeMap).map(([name, value]) => ({
    name,
    value,
  }))

  const responseRateColumns = [
    { header: 'Survey Name', key: 'surveyName' },
    { header: 'Total Recipients', key: 'totalRecipients' },
    { header: 'Total Responses', key: 'totalResponses' },
    { header: 'NPS Score', key: 'npsScore' },
  ]

  return (
    <>
      {loadingStatus.status ? (
        <LoadingStatus status_message={loadingStatus.message} />
      ) : (
        <>
          <div className="container-fluid py-4">
            <div className="mb-4 pt-3">
              <h1 className="d-flex align-items-center fs-3 fw-bold text-dark">
                <FontAwesomeIcon icon={faChartLine} className="me-2" />
                NPS Analytics Dashboard
              </h1>
            </div>

            <PageFilter
              setFilterParams={setFilterParams}
            />

            <div className="mb-4">
              <div className="row g-4 mb-4">
                <div className="col-12 col-lg-4">
                  <MetricCard
                    title="Total Recipients"
                    value={totalRecipients}
                    color="#1e3a8a"
                  />
                </div>
                <div className="col-12 col-lg-4">
                  <MetricCard
                    title="Total Responses"
                    value={totalResponses}
                    color="#0f766e"
                  />
                </div>
                <div className="col-12 col-lg-4">
                  <MetricCard
                    title="Average NPS Score"
                    value={avgNpsScore}
                    color="#7e22ce"
                  />
                </div>
              </div>
            </div>

            {/* Charts */}
            <div className="mb-4">
              <div className="row g-4 mb-4">
                <div className="col-12 col-lg-4">
                  <PieChart
                    data={categoryData}
                    title="Responses by Category"
                    colors={['#4caf50', '#ffc107', '#f44336']}
                  />
                </div>
                <div className="col-12 col-lg-4">
                  <PieChart
                    data={stakeholderTypeData}
                    title="Responses by User Tags"
                    colors={['#1e40af', '#0ea5e9', '#0f766e', '#0891b2']}
                  />
                </div>
                <div className="col-12 col-lg-4">
                  <PieChart
                    data={surveyTypeData}
                    title="Responses by Survey Tags"
                    colors={['#172554', '#94a3b8']}
                  />
                </div>
              </div>

              <div className="row g-4 mb-4">
                <div className="col-12 col-lg-6">
                  <BarChart
                    data={hasData ? Object.values(filteredData).map((survey) => ({
                      name: survey.surveyName || "Unknown",
                      value: survey.totalResponses || 0,
                    })) : []}
                    title="Survey Response Distribution"
                    infoText="Total responses for each survey"
                  />
                </div>
                <div className="col-12 col-lg-6">
                  <StackedBarChart
                    data={hasData ? Object.values(filteredData).map((survey) => ({
                      department: survey.surveyName || "Unknown",
                      promoters: survey.promotersCount || 0,
                      passives: survey.passivesCount || 0,
                      detractors: survey.detractorsCount || 0,
                      total: survey.totalRecipients || 1, // Avoid division by zero
                    })) : []}
                    title="NPS Score by Survey"
                  />
                </div>
              </div>
            </div>

            <DataTable
              title="Survey Overview"
              columns={responseRateColumns}
              data={hasData ? Object.values(filteredData) : []}
            />
          </div>
        </>
      )}
    </>
  )
}

export default NPSDashboard
