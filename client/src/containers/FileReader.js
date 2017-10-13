import React, { Component } from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ReactFileReader from 'react-file-reader'
import Filter from '../components/Filter'
import {
  Search
} from '../redux/action/user'

class Places extends Component {
  constructor(props) {
    super(props)

    this.requested = false
    this.location = ''
    this.state = {
      columns: [],
      tableData: []
    }
  }

  componentWillReceiveProps(nextProps) {
    
  }

  handleFiles(files) {
    console.log('files', files)
    const self = this
    let reader = new FileReader();
    reader.onload = function(e) {
      // Use reader.result
      let csv = reader.result;
      let lines = csv.split("\n");
      let result = [];
      let headers=lines[0].split(",");
      headers.splice(0, 0, 'id')
      for(let i=1;i<lines.length;i++) {
        let obj = {};
        let currentline=lines[i].split(",");
        obj.id = i
        for(let j=1;j<=headers.length;j++) {
          obj[headers[j]] = currentline[j - 1];
        }
        result.push(obj);
      }  
        //return result; //JavaScript object
        // result= JSON.stringify(result); //JSON
      // console.log(result);
      self.setState({ tableData: result, columns: headers })
    }
    reader.readAsText(files[0]);
  }

  render() {
    const { search_results } = this.props
    const { columns, tableData } = this.state
    return(
      <div>
        <ReactFileReader handleFiles={this.handleFiles.bind(this)}>
          <button className='btn'>Upload CSV</button>
        </ReactFileReader>
        {
          columns.length > 0 && tableData.length > 0 ?
            <div>
              <Filter />
              <div id="page-content">
                <BootstrapTable
                  data={tableData}
                  striped={true}
                  hover={true}
                  search={ true }
                  // options={{onSearchChange: this.SearchGoogle.bind(this) }}
                  // handleSearch={this.SearchGoogle}
                >
                  {
                    columns.map((col)=>{
                      return <TableHeaderColumn isKey={col === 'id'} key={col} dataField={col} dataSort={true}>{col}</TableHeaderColumn>
                    })
                  }
                </BootstrapTable>
              </div>
            </div>
          : null
        }
      </div>
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

export default Places