import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { AsyncPaginate } from 'react-select-async-paginate'
import { AuthContext } from '../../context/authProvider'
import axios from 'axios'

const SelectAsyncPaginate = (props) => {
  const [authCreds] = useContext(AuthContext)

  const endpoint = authCreds.restEndpoint

  const loadOptions = async (searchQuery, loadedOptions, { page }) => {
    let post_headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      khuser: `${localStorage.getItem('user')}`,
    }
    console.log(props)
    const response = await axios
      .get(
        `${endpoint}/${props.endpointUrl}?page_number=${page}&page_size=10&filters=[]&sort=[]&search_term=${searchQuery}`,
        {
          headers: post_headers,
        }
      )
      .then((res) => {
        return res?.data?.data
      })

    return {
      options: response,
      hasMore: response.length >= 1,
      additional: {
        page: searchQuery ? 2 : page + 1,
      },
    }
  }

  const onChange = (option) => {
    if (typeof props.onChange === 'function') {
      props.onChange(option)
    }
  }

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
  )
}

SelectAsyncPaginate.propTypes = {
  onChange: PropTypes.func,
}

export default SelectAsyncPaginate
