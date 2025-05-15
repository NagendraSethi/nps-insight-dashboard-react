
import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { AsyncPaginate } from 'react-select-async-paginate'
import { AuthContext } from '../context/authProvider'
import axios from 'axios'
import { toast } from '@/hooks/use-toast'

const SelectAsyncPaginate = (props) => {
  const [authCreds] = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(false)

  const endpoint = authCreds.restEndpoint

  const loadOptions = async (searchQuery, loadedOptions, { page }) => {
    setIsLoading(true)
    
    try {
      let post_headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        khuser: `${localStorage.getItem('user')}`,
      }
      
      const response = await axios
        .get(
          `${endpoint}/${props.endpointUrl}?page_number=${page}&page_size=10&filters=[]&sort=[]&search_term=${searchQuery}`,
          {
            headers: post_headers,
          }
        )
        .then((res) => {
          return res?.data?.data;
        });

      setIsLoading(false)
      
      return {
        options: response || [],
        hasMore: response && response.length >= 1,
        additional: {
          page: searchQuery ? 2 : page + 1,
        },
      }
    } catch (error) {
      setIsLoading(false)
      console.error('Error loading options:', error)
      toast({
        title: 'Error',
        description: 'Failed to load options. Please try again.',
        variant: 'destructive',
      })
      
      return {
        options: [],
        hasMore: false,
        additional: { page }
      }
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
        isLoading={isLoading}
        additional={{
          page: 1,
        }}
      />
    </div>
  )
}

SelectAsyncPaginate.propTypes = {
  onChange: PropTypes.func,
  endpointUrl: PropTypes.string,
  width: PropTypes.string,
  defaultOptions: PropTypes.array,
  defaultValue: PropTypes.array,
  isSearchable: PropTypes.bool,
  isDisabled: PropTypes.bool,
  placeholder: PropTypes.string
}

export default SelectAsyncPaginate
