import React from 'react';
import {Card, CardBody, CardText} from 'reactstrap';
import "./AppComponent.css";


export const WordsTableComponent = (props) => {
    return(
        <table className="table">
            <thead>
                <tr className="text-center">
                    <th scope="col">Word</th>
                    <th scope="col">Check</th>
                </tr>
            </thead>
            <tbody>
                 {props.words.map(word => {
			                                 return (<tr key={word.id+"words"}>
                                                        <td>
                                                            <div className="text-center">
                                                                <br />{word.name}
                                                                <br />[{word.pronunciation}]
                                                                <br />Category: [{word.category.map(category => (category.name+" "))}]
                                                                <br />{word.translation}
                                                            </div>
                                                        </td>
                                                        <td className="align-middle text-center">
                                                            <label class="m-checkbox-container">
                                                                <input type="checkbox" />
                                                                <span class="m-checkbox"></span>
                                                            </label>
                                                        </td>
                                                     </tr>);
		                                  })}
            </tbody>
        </table>
    );
};