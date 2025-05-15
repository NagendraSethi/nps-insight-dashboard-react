import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faFilter, faTimes } from '@fortawesome/free-solid-svg-icons'
import { faFilter, faTimes } from '@fortawesome/free-solid-svg-icons'
import SelectAsyncPaginate from '../../../Utilities/selectPaginate'
// import Select from 'react-select'
const PageFilter = ({ surveyTags, userTags, setFilterParams }) => {
  const [selectedSurveyTags, setSelectedSurveyTags] = useState(
    JSON.parse(localStorage.getItem('selectedSurveyTags')) || []
  )
  const [selectedUserTags, setSelectedUserTags] = useState(
    JSON.parse(localStorage.getItem('selectedUserTags')) || []
  )

  useEffect(() => {
    localStorage.setItem(
      'selectedSurveyTags',
      JSON.stringify(selectedSurveyTags)
    )
    localStorage.setItem('selectedUserTags', JSON.stringify(selectedUserTags))
  }, [selectedSurveyTags, selectedUserTags])

  const surveyOptions = surveyTags.map((tag) => ({ label: tag, value: tag }))
  const userOptions = userTags.map((tag) => ({ label: tag, value: tag }))

  const handleReset = () => {
    if (selectedSurveyTags?.length > 0 || selectedUserTags?.length > 0) {
      setSelectedSurveyTags([])
      setSelectedUserTags([])
      setFilterParams({})
    }
  }

  const applyFilters = () => {
    if (selectedSurveyTags?.length > 0 || selectedUserTags?.length > 0) {
      const filterParams = {
        survey_tags: selectedSurveyTags.map((tag) => tag.value),
        user_tags: selectedUserTags.map((tag) => tag.value),
      }
      setFilterParams(filterParams)
    }
  }
  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <div className="d-flex flex-wrap align-items-center justify-content-between">
          <div className="d-flex flex-column flex-md-row gap-3 mb-3">
            <div className="d-flex align-items-center gap-2">
              <FontAwesomeIcon icon={faFilter} className="text-secondary" />
              {/* <div className="fw-medium text-dark">Page Filters</div> */}
            </div>
            <SelectAsyncPaginate
              width="100%"
              isSearchable={true}
              placeholder={'Select Survey Tags'}
              loadOptions={surveyOptions}
              onChange={setSelectedSurveyTags}
              defaultValue={selectedSurveyTags}
              endpointUrl="api/survey/get_survey_tags"
            />
            <SelectAsyncPaginate
              width="100%"
              isSearchable={true}
              placeholder={'Select User Tags'}
              loadOptions={userOptions}
              onChange={setSelectedUserTags}
              defaultValue={selectedUserTags}
              endpointUrl="api/survey/get_user_tags"
            />
            <div
              className="apply-filter d-flex align-items-center text-primary cursor-pointer"
              role="button"
              tabIndex="0"
              onClick={applyFilters}
              style={{ width: '250px' }}
            >
              <span className="small">Apply Filters</span>
            </div>
            {(selectedSurveyTags?.length > 0 ||
              selectedUserTags?.length > 0) && (
              <div
                className="reset-filter d-flex align-items-center text-danger cursor-pointer"
                role="button"
                tabIndex="0"
                onClick={handleReset}
              >
                <FontAwesomeIcon icon={faTimes} size="sm" className="me-1" />
                <span className="small">Reset Filters</span>
              </div>
            )}
          </div>
        </div>

        {/* <div className="mt-2 d-flex flex-wrap gap-2">
          {[...selectedSurveyTags, ...selectedUserTags].map((tag) => (
            <FilterPill
              key={tag.value}
              label={tag.label}
              onRemove={handleRemoveTag}
            />
          ))}
        </div> */}
      </div>
    </div>
  )
}

export default PageFilter
