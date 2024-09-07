import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, Label } from 'recharts';

const GitHubRepoViewsCounter = () => {
  const [repos, setRepos] = useState([]);
  const [totalViews, setTotalViews] = useState(0);
  const [totalUniqueViews, setTotalUniqueViews] = useState(0);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    fetch('repoData.json')
      .then(response => response.json())
      .then(data => {
        setRepos(data);
        setTotalViews(data.reduce((sum, repo) => sum + repo.views, 0));
        setTotalUniqueViews(data.reduce((sum, repo) => sum + repo.unique, 0));
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // ... rest of the component code ...

  return (
    <div className="p-8 bg-black text-white font-mono">
      {/* ... rest of the JSX ... */}
    </div>
  );
};

export default GitHubRepoViewsCounter;
