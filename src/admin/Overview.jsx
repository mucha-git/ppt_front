import React from 'react';
import { Link } from 'react-router-dom';

function Overview({ match }) {
    const { path } = match;

    return (
        <div>
            <h1>Administrator</h1>
            <p>Ta sekcja jest dostępna wyłącznie dla adnimistratorów</p>
            <p><Link to={`${path}/users`}>Zarządzaj użytkownikami</Link></p>
        </div>
    );
}

export { Overview };