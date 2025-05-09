
import React from 'react';
import PropTypes from 'prop-types';
import { AsyncPaginate } from 'react-select-async-paginate';
import { userTags } from '../data/userTags';
import { surveyTags } from '../data/surveyTags';

const SelectAsyncPaginate = (props) => {
  const loadOptions = async (searchQuery, loadedOptions, { page }) => {
    const response = props.tagType === 'userTags' 
      ? userTags.user_tags.filter(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) 
      : surveyTags.survey_tags.filter(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return {
      options: response.map(tag => ({ value: tag, label: tag })),
      hasMore: response.length >= 1,
      additional: {
        page: searchQuery ? 2 : page + 1,
      },
    };
  };

  const onChange = (option) => {
    if (typeof props.onChange === 'function') {
      props.onChange(option);
    }
  };

  return (
    <div style={{ width: props.width || '75%', textAlign: 'center' }}>
      <AsyncPaginate
        value={props.defaultOptions}
        isMulti
        loadOptions={loadOptions}
        getOptionValue={(option) => option.value}
        getOptionLabel={(option) => option.label}
        onChange={onChange}
        defaultValue={props.defaultValue}
        isSearchable={props.isSearchable || false}
        isDisabled={props.isDisabled}
        placeholder={props.placeholder || 'Select Group'}
        additional={{
          page: 1,
        }}
      />
    </div>
  );
};

SelectAsyncPaginate.propTypes = {
  onChange: PropTypes.func,
  tagType: PropTypes.string,
  width: PropTypes.string,
  defaultOptions: PropTypes.array,
  defaultValue: PropTypes.array,
  isSearchable: PropTypes.bool,
  isDisabled: PropTypes.bool,
  placeholder: PropTypes.string
};

export default SelectAsyncPaginate;
