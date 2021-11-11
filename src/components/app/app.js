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
                {label: 'Going to learn React', important: true, like: false, id: 1},
                {label: 'This is so good', important: false, like: false, id: 2},
                {label: 'I need a break...', important: false, like: false, id: 3},
            ],
            term: '',
            filter: 'all'
        };
        this.deletItem = this.deletItem.bind(this)
        this.addItem = this.addItem.bind(this)
        this.onToggleImportant = this.onToggleImportant.bind(this)
        this.onToggleLiked = this.onToggleLiked.bind(this)
        this.onUpdateSearch = this.onUpdateSearch.bind(this)
        this.onFilterSelect = this.onFilterSelect.bind(this)
        this.maxId = 4
    }

    deletItem(id) {
        this.setState(({data}) => {
            return {data: data.filter((elem) => elem.id !== id)};
        })
    }

    addItem(body) {
        const newItem = {
            label: body,
            important: false,
            id: this.maxId++
        }
        this.setState(({data}) => {
            if (newItem.label != 0) {
                const newArr = [...data, newItem];
                return{
                 data: newArr
                }
            } 
        })
    }

    onToggleProperty(arr, id, propName) {
        const ind = arr.findIndex((elem) => elem.id === id);
        const oldItem = arr[ind];
        const newItem = {...oldItem, [propName]: !oldItem[propName]};
        const before = arr.slice(0, ind);
        const after = arr.slice(ind + 1);
        const newArray = [...before, newItem, ...after];
        return newArray;
      }
    
      onToggleImportant = (id) => {
        this.setState(({data}) => {
          return {
            data: this.onToggleProperty(data, id, 'important')
          }
        })
      }
    
      onToggleLiked = (id) => {
        this.setState(({data}) => {
          return {
            data: this.onToggleProperty(data, id, 'like')
          }
        })
      }

    // onToggleImportant(id) {
    //     this.setState(({data}) => {
    //         const index = data.findIndex(elem => elem.id === id);
    //         const old = data[index];
    //         const newItem = {...old, important: !old.important}

    //         const before = data.slice(0, index);
    //         const after = data.slice(index + 1);
    //         const newArr = [...before, newItem, ...after];

    //         return{
    //             data: newArr
    //         }
    //     })
    // }

    // onToggleLiked(id) {
    //     this.setState(({data}) => {
    //         const index = data.findIndex(elem => elem.id === id);
    //         const old = data[index];
    //         const newItem = {...old, like: !old.like}

    //         const before = data.slice(0, index);
    //         const after = data.slice(index + 1);
    //         const newArr = [...before, newItem, ...after];

    //         return{
    //             data: newArr
    //         }
    //     })
    // }

    searchPost(items, term) {
        if (term.length === 0) {
            return items
        }
        return items.filter(item => {
            return item.label.indexOf(term) > -1
        })
    }

    onUpdateSearch(term) {
        this.setState({term})
    }

    onFilterSelect(filter) {
        this.setState({filter})
    }

    filterPost(items, filter) {
        if(filter === 'like') {
            return items.filter(item => item.like)
        } else {
            return items
        }
    }
 
    render() {
        const {data, term, filter} = this.state;
        const liked = data.filter(item => item.like).length;
        const allPosts = data.length;
        const visiblePost = this.filterPost(this.searchPost(data, term), filter);

        return (
            <div className='app'>
                <AppHeader
                    liked={liked}
                    allPosts={allPosts}
                />
                <div className='search-panel d-flex'>
                    <SearchPanel
                    onUpdateSearch={this.onUpdateSearch}
                    />
                    <PostStatusFilter
                        filter={filter}
                        onFilterSelect={this.onFilterSelect}
                    />
                </div>
                <PostList 
                posts={visiblePost} 
                onDelete={this.deletItem}
                onToggleImportant={this.onToggleImportant}
                onToggleLiked={this.onToggleLiked}
                />
                <PostAddForm onAdd={this.addItem}/>
            </div>
        )
    }    
}

