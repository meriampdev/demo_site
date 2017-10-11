import React, { Component } from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import {geolocated} from 'react-geolocated'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { photo_url } from '../utils/googlePhoto'
import {
  Search
} from '../redux/action/user'

class Places extends Component {
  constructor(props) {
    super(props)

    this.requested = false
    this.location = ''
  }

  componentWillReceiveProps(nextProps) {
    const { isGeolocationAvailable, isGeolocationEnabled, coords } = nextProps
    if (!isGeolocationAvailable) {
      console.log('Browser does not support Geolocation')
    }

    if (!isGeolocationEnabled) {
      console.log('Geolocation is not enabled')
    }

    if (isGeolocationAvailable && isGeolocationEnabled && coords && !this.requested) {
      // this.setState({ location: `${coords.latitude},${coords.longitude}` })
      const { Search } = this.props 
      Search('ramen', `${coords.latitude},${coords.longitude}`)
      this.location = `${coords.latitude},${coords.longitude}`
      this.requested = true
    }
  }

  priceFormatter(cell, row){
    return '<i class="glyphicon glyphicon-usd"></i> ' + cell;
  }

  photoUrl(cell, row) {
    let img = null
    if (cell && cell.length > 0) {
      let pd = cell[0]
      img = photo_url(pd.photo_reference, 100, 100)
    }

    return `<img style='max-width: 100px; max-height: 100px' src=${ img ? img : "https://source.unsplash.com/collection/190727/600x400" } role="presentation"/>`
  }

  SearchGoogle(text) {
    const { Search } = this.props 
    if (text) {
      Search(text, this.location)
    }
  }

  render() {
    const { search_results } = this.props
    return(
      <BootstrapTable
        data={search_results}
        striped={true}
        hover={true}
        search={ true }
        options={{onSearchChange: this.SearchGoogle.bind(this) }}
        // handleSearch={this.SearchGoogle}
      >
          <TableHeaderColumn dataField="photos" isKey={true} dataFormat={this.photoUrl.bind(this)}>Photo</TableHeaderColumn>
          <TableHeaderColumn dataField="name" dataSort={true}>Store</TableHeaderColumn>
          <TableHeaderColumn dataField="vicinity">Vicinity</TableHeaderColumn>
      </BootstrapTable>
    )
  }
}

const mapStateToProps = state => ({
  search_results: state.user.search_results
})

const mapDispatchToProps = dispatch => bindActionCreators({
  Search
}, dispatch)

Places = connect(
  mapStateToProps,
  mapDispatchToProps
)(Places)

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(Places)