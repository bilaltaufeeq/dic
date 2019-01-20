import React, { Component } from 'react';
import './index.css'
import { connect } from 'react-redux';
import { dictionaryAction } from './../../store/actions'
import { withRouter } from 'react-router-dom';
import { Container, Input, Grid, Divider, Button, Icon, Segment, Header, Message } from 'semantic-ui-react'
import TopNav from './../Header'

class CreateDictionary extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dictionary: [{ domain: '', range: '' }],
            artificialLoader: false,
            isEmptyField: true,
            errorIndex: null,
            errorMsg: null,
            errorType: null
        }
    }

    addRowInDictionary = () => {
        let dictionary = this.state.dictionary
        if (dictionary) {
            dictionary.push({ domain: '', range: '' })
        } else {
            dictionary = [{ domain: '', range: '' }]
        }
        this.setState({ dictionary, isEmptyField: true })
    }

    removeRowInDictionary = (index) => {
        let dictionary = this.state.dictionary
        if (dictionary.length === 1) return;
        dictionary.splice(index, 1)
        this.setState({ dictionary })
    }

    handleDomainInput = (e, i) => {
        let dictionary = this.state.dictionary
        this.setState({ isEmptyField: false })
        dictionary[i].domain = e.target.value
        this.setState({
            dictionary,
            errorIndex: null,
            errorMsg: null,
            errorType: null
        })
        this.handleEmptyField()
    }

    handleRangeInput = (e, i) => {
        let dictionary = this.state.dictionary
        this.setState({ isEmptyField: false })
        dictionary[i].range = e.target.value
        this.setState({
            dictionary,
            errorIndex: null,
            errorMsg: null,
            errorType: null
        })
        this.handleEmptyField()
    }

    handleEmptyField = () => {
        this.state.dictionary && this.state.dictionary.map((data, index) => {
            if (data.domain === '' || data.range === '') {
                this.setState({ isEmptyField: true })
            }
        })
    }

    createNewDictionary = () => {
        var isConsistence = true
        this.state.dictionary.forEach((dicItem, index) => {
            if (dicItem.range === dicItem.domain) {
                isConsistence = false
                this.setState({
                    errorIndex: index,
                    errorMsg: `${dicItem.range}! range and domain are same at row ${index + 1}`,
                    errorType: 3
                })
            }
            for (var i = index + 1; i < this.state.dictionary.length; i++) {
                let c = this.state.dictionary[i]
                if (dicItem.domain === c.domain) {
                    isConsistence = false
                    this.setState({
                        errorIndex: index,
                        errorMsg: `${dicItem.domain}! domain are same at row ${index + 1} and ${i + 1}`,
                        errorType: 1
                    })
                }
                if (dicItem.range === c.range) {
                    isConsistence = false
                    this.setState({
                        errorIndex: index,
                        errorMsg: `${dicItem.range}! range are same at row ${index + 1} and ${i + 1}`,
                        errorType: 2
                    })
                }
                if (dicItem.domain === c.range) {
                    isConsistence = false
                    this.setState({
                        errorIndex: index,
                        errorMsg: `${dicItem.domain}! domain and range are same at row ${index + 1} and ${i + 1}`,
                        errorType: 1
                    })
                }
                if (dicItem.range === c.domain) {
                    isConsistence = false
                    this.setState({
                        errorIndex: index,
                        errorMsg: `${dicItem.range}! domain and range are same at row ${index + 1} and ${i + 1}`,
                        errorType: 2
                    })
                }
            }
        })

        if (isConsistence) {
            this.setState({ artificialLoader: true })
            setTimeout(() => {
                this.props.createDictionary(this.state.dictionary)
            }, 1000)
        }
    }

    componentWillUpdate(nextProps) {
        if (this.props.createDictionaryLoader && !nextProps.createDictionaryLoader && !nextProps.createDictionaryError) {
            this.props.history.push('/')
        }
    }

    render() {
        return (
            <div>
                <TopNav {...this.props} />
                <Container className="fade-in">
                    <Segment>
                        <Header as='h3' textAlign='left'>
                            Create Dictionary
                        </Header>
                    </Segment>
                    {
                        this.state.errorMsg ? <Message color='red'>{this.state.errorMsg}</Message> : ''
                    }
                    <Segment clearing color='blue'>
                        {
                            this.state.dictionary && this.state.dictionary.map((row, index) => {
                                return (
                                    <div style={{ margin: '10px 0 10px 0' }} className="row" key={index}>
                                        <div className='col-md-1'></div>
                                        <div className='col-md-5'>
                                            <Input error={this.state.errorIndex === index && (this.state.errorType === 1 || this.state.errorType === 3)} focus fluid placeholder='Write Domain here' value={this.state.dictionary[index].domain} onChange={(event) => this.handleDomainInput(event, index)} />
                                        </div>
                                        <div className='col-md-5'>
                                            <Input error={this.state.errorIndex === index && (this.state.errorType === 2 || this.state.errorType === 3)} focus fluid placeholder='Write Range here' value={this.state.dictionary[index].range} onChange={(event) => this.handleRangeInput(event, index)} />
                                        </div>
                                        <div className='col-md-1'>
                                            <Button circular basic icon onClick={() => this.removeRowInDictionary(index)}>
                                                <Icon name='delete' />
                                            </Button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        <br />
                        <div className="row" style={{ margin: '0' }} >
                            <div className="col-md-1"></div>
                            <div className="col-md-10">
                                <Button loading={this.state.artificialLoader} disabled={this.state.isEmptyField} onClick={this.createNewDictionary} basic fluid color='blue'>
                                    Create
                                </Button>
                            </div>
                            <div className="col-md-1" title='add a new row'>
                                <Button icon onClick={this.addRowInDictionary}>
                                    <Icon name='add square' />
                                </Button>
                            </div>
                        </div>
                    </Segment>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { dictionaryReducer: { createdDictionary, createDictionaryLoader, createDictionaryError }
    } = state;
    return {
        createdDictionary, createDictionaryLoader, createDictionaryError
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        createDictionary: (dictionary) => dispatch(dictionaryAction.createDictionary(dictionary)),
    };
};

export default connect(
    mapStateToProps, mapDispatchToProps
)(withRouter(CreateDictionary));