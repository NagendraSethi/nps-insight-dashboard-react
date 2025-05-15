
import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter, faTimes } from '@fortawesome/free-solid-svg-icons'
import { Select } from '@/components/ui/select'
import { toast } from '@/hooks/use-toast'
import { userTags } from '../data/userTags'
import { surveyTags } from '../data/surveyTags'

const PageFilter = ({ setFilterParams }) => {
  const [selectedSurveyTags, setSelectedSurveyTags] = useState(
    JSON.parse(localStorage.getItem('selectedSurveyTags')) || []
  )
  const [selectedUserTags, setSelectedUserTags] = useState(
    JSON.parse(localStorage.getItem('selectedUserTags')) || []
  )

  useEffect(() => {
    try {
      localStorage.setItem(
        'selectedSurveyTags',
        JSON.stringify(selectedSurveyTags)
      )
      localStorage.setItem('selectedUserTags', JSON.stringify(selectedUserTags))
    } catch (error) {
      console.error('Error saving to localStorage:', error)
    }
  }, [selectedSurveyTags, selectedUserTags])

  // Create options from the imported tags data
  const surveyOptions = surveyTags.survey_tags.map((tag) => ({ label: tag, value: tag }))
  const userOptions = userTags.user_tags.map((tag) => ({ label: tag, value: tag }))

  const handleReset = () => {
    if (selectedSurveyTags?.length > 0 || selectedUserTags?.length > 0) {
      setSelectedSurveyTags([])
      setSelectedUserTags([])
      setFilterParams({})
      toast({
        title: 'Filters Reset',
        description: 'All filters have been cleared.',
      })
    }
  }

  const applyFilters = () => {
    if (selectedSurveyTags?.length > 0 || selectedUserTags?.length > 0) {
      const filterParams = {
        survey_tags: selectedSurveyTags.map((tag) => tag.value),
        user_tags: selectedUserTags.map((tag) => tag.value),
      }
      setFilterParams(filterParams)
      toast({
        title: 'Filters Applied',
        description: 'Your filters have been applied to the data.',
      })
    } else {
      toast({
        title: 'No Filters Selected',
        description: 'Please select at least one filter to apply.',
        variant: 'default',
      })
    }
  }
  
  const handleSurveyTagChange = (selectedOptions) => {
    setSelectedSurveyTags(selectedOptions || []);
  };

  const handleUserTagChange = (selectedOptions) => {
    setSelectedUserTags(selectedOptions || []);
  };
  
  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <div className="d-flex flex-wrap align-items-center justify-content-between">
          <div className="d-flex flex-column flex-md-row gap-3 mb-3">
            <div className="d-flex align-items-center gap-2">
              <FontAwesomeIcon icon={faFilter} className="text-secondary" />
            </div>
            <div style={{ width: '100%', maxWidth: '300px' }}>
              <Select
                options={surveyOptions}
                isMulti
                placeholder="Select Survey Tags"
                onChange={handleSurveyTagChange}
                value={selectedSurveyTags}
                className="basic-multi-select"
                classNamePrefix="select"
              />
            </div>
            <div style={{ width: '100%', maxWidth: '300px' }}>
              <Select
                options={userOptions}
                isMulti
                placeholder="Select User Tags"
                onChange={handleUserTagChange}
                value={selectedUserTags}
                className="basic-multi-select"
                classNamePrefix="select"
              />
            </div>
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
      </div>
    </div>
  )
}

export default PageFilter
