import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';

const searchItems = [
  {
    name: 'Yolo Boat',
  },
  {
    name: 'Noah Rinehart',
  },
];

const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : searchItems.filter(lang =>
    lang.name.toLowerCase().slice(0, inputLength) === inputValue
  );
};

const getSuggestionValue = suggestion => suggestion.name;

const renderSuggestion = suggestion => (
  <div>
    {suggestion.name}
  </div>
);

export default class Searchbar extends Component {
  constructor() {
    super();

    this.onChange = this.onChange.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.onSuggetsionsClearRequested = this.onSuggetsionsClearRequested.bind(this);

    this.state = {
      value: '',
      suggestions: [],
    };
  }

  onChange(event, { newValue }) {
    this.setState({
      value: newValue,
    });
  }

  onSuggestionsFetchRequested({ value }) {
    this.setState({
      suggestions: getSuggestions(value),
    });
  }

  onSuggetsionsClearRequested() {
    this.setState({
      suggestions: [],
    });
  }

  render() {
    const { value, suggetsions } = this.state;

    const inputProps = {
      placeholder: 'Type to search for NGOs',
      value,
      onChange: this.onChange,
    };

    return (
      <Autosuggest
        suggetsions={suggetsions}
        onSuggetsionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    )
  }
}

