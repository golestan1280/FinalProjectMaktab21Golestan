import React, { Component } from 'react';

class Waiting extends Component {



    render() {


        return (
            <header className="App-header">
                <div>
                    <div class="spinner-grow text-danger"></div>
                    <div class="spinner-grow text-danger"></div>
                    <div class="spinner-grow text-danger"></div>
                </div>
            </header>

        )
    }
}

export { Waiting }