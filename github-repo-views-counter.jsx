import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, Label } from 'recharts';

const GitHubRepoViewsCounter = () => {
  const [repos, setRepos] = useState([]);
  const [totalViews, setTotalViews] = useState(0);
  const [totalUniqueViews, setTotalUniqueViews] = useState(0);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = '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';
      const username = 'HNVS-GANESH-PICHIKA';
      const apiUrl = `https://api.github.com/users/${username}/repos`;

      try {
        const response = await fetch(apiUrl, {
          headers: {
            'Authorization': `token ${token}`
          }
        });
        const repos = await response.json();

        const viewsPromises = repos.map(repo => 
          fetch(`https://api.github.com/repos/${username}/${repo.name}/traffic/views`, {
            headers: {
              'Authorization': `token ${token}`
            }
          }).then(res => res.json())
        );

        const viewsData = await Promise.all(viewsPromises);

        const repoData = repos.map((repo, index) => ({
          name: repo.name,
          lastUpdated: new Date(repo.updated_at).toLocaleDateString(),
          unique: viewsData[index].uniques,
          views: viewsData[index].count
        }));

        setRepos(repoData);
        setTotalViews(repoData.reduce((sum, repo) => sum + repo.views, 0));
        setTotalUniqueViews(repoData.reduce((sum, repo) => sum + repo.unique, 0));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // ... rest of the component code ...

  return (
    <div className="p-8 bg-black text-white font-mono">
      {/* ... rest of the JSX ... */}
    </div>
  );
};

export default GitHubRepoViewsCounter;
