import React from 'react';
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
                                                                <br />Category: [{word.category_set.map(category => (category.name+" "))}]
                                                                <br />{word.translation}
                                                            </div>
                                                        </td>
                                                        <td className="align-middle">
                                                            <label className="m-checkbox-container d-flex justify-content-center">
                                                                <input name={word.id} onChange={props.handleCheck} type="checkbox" />
																<span className="m-checkbox"></span>
                                                            </label>
                                                        </td>
                                                     </tr>);
		                                  })}
            </tbody>
        </table>
    );
};