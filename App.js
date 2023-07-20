import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import { AdvancedSearch } from '../src/ui/pages/AdvancedSearch';
import { TestPage } from '../src/ui/pages/TestPage';

export default function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to='/Advanced'>Advanced Search </Link>
          </li>
        </ul>
        <hr />
        <ul>
          <li>
            <Link to='/TestPageNewStying'>Test Page New Styling </Link>
          </li>
        </ul>
        <Routes>
          <Route path='/Advanced' element={<AdvancedSearch />}></Route>
          <Route path='/TestPageNewStying' element={<TestPage />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

// You can think of these components as "pages"
// in your app.
