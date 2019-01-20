import React, { Component } from 'react';
import './index.css'
import { connect } from 'react-redux';
import { dictionaryAction } from './../../store/actions'
import TopNav from './../Header'
import { withRouter } from 'react-router-dom';
import { Container, Accordion, Icon, Segment, Table, Button, Message, Loader, Dimmer } from 'semantic-ui-react'

class DictionaryList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeIndex: 0,
            artificialLoader: false
        }
    }

    handleClick = (newIndex) => {
        newIndex === this.state.activeIndex ? this.setState({ activeIndex: null }) : this.setState({ activeIndex: newIndex })
    }

    deleteDictionary = (index) => {
        this.setState({ artificialLoader: true })
        setTimeout(() => {
            let dictionaries = this.props.dictionaries
            dictionaries.splice(index, 1)
            this.props.deleteDictionary(dictionaries)
            this.setState({ artificialLoader: false })
        }, 500)
    }

    deleteDictionaryRow = (dicIndex, rowIndex) => {
        let dictionaries = this.props.dictionaries
        dictionaries[dicIndex].splice(rowIndex, 1)
        this.props.deleteDictionary(dictionaries)
        this.setState({ artificialLoader: false })
    }

    componentDidMount() {
        this.props.getDictionaries()
    }

    render() {
        const { activeIndex } = this.state
        return (
            <div>
                <TopNav {...this.props} />
                <Container className="fade-in">
                    {
                        !this.props.getDictionariesError && this.props.dictionaries && this.props.dictionaries.map((dic, i) => {
                            return (
                                <Segment clearing color='blue' style={{ margin: '10px 0 10px 0' }}>
                                    <Accordion fluid>
                                        <Accordion.Title active={activeIndex === i} index={0} onClick={() => this.handleClick(i)}><Icon name='dropdown' /></Accordion.Title>
                                        <Accordion.Content active={activeIndex === i}>
                                            <Table>
                                                <Table.Header>
                                                    <Table.Row>
                                                        <Table.HeaderCell>Domain</Table.HeaderCell>
                                                        <Table.HeaderCell>Range</Table.HeaderCell>
                                                        <Table.HeaderCell>
                                                            <Button onClick={() => this.deleteDictionary(i)} icon color='red'>
                                                                <Icon name={this.state.artificialLoader ? 'stop' : 'remove circle'} />
                                                            </Button>
                                                        </Table.HeaderCell>
                                                    </Table.Row>
                                                </Table.Header>
                                                <Table.Body>
                                                    {
                                                        dic && dic.length && dic.map((row, index) => {
                                                            return (
                                                                <Table.Row>
                                                                    <Table.Cell>{row.domain}</Table.Cell>
                                                                    <Table.Cell>{row.range}</Table.Cell>
                                                                    <Table.Cell collapsing>
                                                                        <Button onClick={() => this.deleteDictionaryRow(i, index)} size='tiny' circular basic icon>
                                                                            <Icon name={this.state.artificialLoader ? 'stop' : 'delete'} />
                                                                        </Button>
                                                                    </Table.Cell>
                                                                </Table.Row>
                                                            )
                                                        })
                                                    }
                                                    <Table.Row>
                                                        <Table.Cell colSpan='3'>
                                                            <Button onClick={() => this.props.history.push(`/edit/${i}`)} fluid size='tiny' basic color='orange'>
                                                                Edit
                                                            </Button>
                                                        </Table.Cell>
                                                    </Table.Row>
                                                </Table.Body>
                                            </Table>
                                        </Accordion.Content>
                                    </Accordion>
                                </Segment>
                            )
                        })
                    }

                    {
                        this.props.getDictionariesError ?
                            <Message negative>
                                <Message.Header>{this.props.getDictionariesError}!</Message.Header>
                            </Message>
                            : ''
                    }
                </Container>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { dictionaryReducer: { dictionaries, getDictionariesLoader, getDictionariesError } } = state;
    return {
        dictionaries, getDictionariesLoader, getDictionariesError
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        getDictionaries: () => dispatch(dictionaryAction.getDictionaries()),
        deleteDictionary: (payload) => dispatch(dictionaryAction.deleteDictionary(payload))
    };
};

export default connect(
    mapStateToProps, mapDispatchToProps
)(withRouter(DictionaryList));