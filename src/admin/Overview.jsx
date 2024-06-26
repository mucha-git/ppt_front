import React from 'react';
import { Link } from 'react-router-dom';

function Overview({ match }) {
    const { path } = match;

    return (
        <div className="pad-4 titleText">
            <h1>Administrator</h1>
            <p>Ta sekcja jest dostępna wyłącznie dla adnimistratorów</p>
            <p><Link to={`${path}/users`}>Zarządzaj użytkownikami</Link></p>
        </div>
    );
}

export { Overview };