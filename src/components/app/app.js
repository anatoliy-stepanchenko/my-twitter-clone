import React, {Component} from "react";
import AppHeader from '../app-header'
import SearchPanel from '../search-panel'
import PostStatusFilter from '../post-status-filter'
import PostList from '../post-list'
import PostAddForm from '../post-add-form'
import './app.css'
export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [
                {label: 'Going to learn React', important: true, id:'qwer'},
                {label: 'This is so good', important: false, id:'tyui'},
                {label: 'I need a break...', important: false, id:'opas'},
                {label: 'I will be lucky ', important: false, id:'opa'},
            ]
        };
        this.deletItem = this.deletItem.bind(this)
    }

    deletItem(id) {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);
            const before = data.splice(0, index);
            const after = data.splice(index + 1);
            const newArr = [...before, ...after];
            return {
                data: newArr
            }
        })
    }
 
    render() {
        return (
            <div className='app'>
                <AppHeader/>
                <div className='search-panel d-flex'>
                    <SearchPanel/>
                    <PostStatusFilter/>
                </div>
                <PostList posts={this.state.data} onDelete={this.deletItem}/>
                <PostAddForm/>
            </div>
        )
    }    
}

