    import React, { Component } from 'react';
    import './index.css'
import { connect } from 'react-redux';
import { dictionaryAction } from './../../store/actions'
import { withRouter } from 'react-router-dom';
import { Header, Grid, Button } from 'semantic-ui-react'

class TopNav extends Component {
    render() {
        return (
            <Header as='h1' block className="swing-in-top-fwd">
                <Grid>
                    <Grid.Column floated='left' width={8}>
                        Manage Dictionaries
                    </Grid.Column>
                    <Grid.Column floated='right' width={4}>
                        {
                            this.props.match.path !== '/' ?
                                <Button
                                    content=''
                                    icon='list ul'
                                    label={{ as: 'a', basic: true, pointing: 'right', content: 'Dictionary List .....' }}
                                    labelPosition='left'
                                    onClick={() => this.props.history.push('/')}
                                />
                                :
                                <Button
                                    content=''
                                    icon='book'
                                    label={{ as: 'a', basic: true, pointing: 'right', content: 'Create Dictionary' }}
                                    labelPosition='left'
                                    onClick={() => this.props.history.push('/create-dictionary')}
                                />
                        }
                    </Grid.Column>
                </Grid>
            </Header>
        );
    }
}

export default TopNav;