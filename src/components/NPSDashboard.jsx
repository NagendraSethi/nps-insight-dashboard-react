
import React, { useState } from 'react'
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

const NPSDashboard = () => {
  const [loadingStatus, setLoadingStatus] = useState({
    status: false,
    message: 'Loading...',
  })
  const [surveyData, setSurveyData] = useState(npsData.data || {})
  const [filterParams, setFilterParams] = useState({})

  // Instead of fetching unique tags from the survey data, we can now use the imported tag files
  const uniqueSurveyTags = surveyTags.survey_tags
  const uniqueUserTags = userTags.user_tags

  // Filter data based on selected tags if needed
  const filterSurveyData = () => {
    if (!filterParams.survey_tags?.length && !filterParams.user_tags?.length) {
      return npsData.data;
    }

    return Object.entries(npsData.data).reduce((filtered, [key, survey]) => {
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

  const totalRecipients = Object.values(filteredData).reduce(
    (acc, survey) => acc + survey.totalRecipients,
    0
  )
  const totalResponses = Object.values(filteredData).reduce(
    (acc, survey) => acc + survey.totalResponses,
    0
  )
  const avgNpsScore = Object.keys(filteredData).length ? (
    Object.values(filteredData).reduce(
      (acc, survey) => acc + survey.npsScore,
      0
    ) / Object.keys(filteredData).length
  ).toFixed(1) : "0.0";

  const categoryData = [
    {
      name: 'Promoters',
      value: Object.values(filteredData).reduce(
        (acc, survey) => acc + survey.promotersCount,
        0
      ),
    },
    {
      name: 'Passives',
      value: Object.values(filteredData).reduce(
        (acc, survey) => acc + survey.passivesCount,
        0
      ),
    },
    {
      name: 'Detractors',
      value: Object.values(filteredData).reduce(
        (acc, survey) => acc + survey.detractorsCount,
        0
      ),
    },
  ]

  const stakeholderTypeMap = {}

  Object.values(filteredData).forEach((survey) => {
    if (Array.isArray(survey.userTags)) {
      survey.userTags.forEach((tag) => {
        if (tag) {
          stakeholderTypeMap[tag] = (stakeholderTypeMap[tag] || 0) + 1
        }
      })
    }
  })

  const surveyTypeMap = {}

  Object.values(filteredData).forEach((survey) => {
    if (Array.isArray(survey.surveyTags)) {
      survey.surveyTags.forEach((tag) => {
        if (tag) {
          surveyTypeMap[tag] = (surveyTypeMap[tag] || 0) + 1
        }
      })
    }
  })

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
                    data={Object.values(filteredData).map((survey) => ({
                      name: survey.surveyName,
                      value: survey.totalResponses,
                    }))}
                    title="Survey Response Distribution"
                    infoText="Total responses for each survey"
                  />
                </div>
                <div className="col-12 col-lg-6">
                  <StackedBarChart
                    data={Object.values(filteredData).map((survey) => ({
                      department: survey.surveyName,
                      promoters: survey.promotersCount,
                      passives: survey.passivesCount,
                      detractors: survey.detractorsCount,
                      total: survey.totalRecipients,
                    }))}
                    title="NPS Score by Survey"
                  />
                </div>
              </div>
            </div>

            <DataTable
              title="Survey Overview"
              columns={responseRateColumns}
              data={Object.values(filteredData)}
            />
          </div>
        </>
      )}
    </>
  )
}

export default NPSDashboard
