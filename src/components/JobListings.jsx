import Joblisting from './Joblisting';
import { useEffect, useState } from 'react';
import Spinner from './Spinner';

const jobListings = ({ isHome = false }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(`/api/jobs?${isHome ? 'limit=3&page-1' : ''}`);
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  });
  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          {isHome ? 'Browse Jobs' : 'recent jobs'}
        </h2>
        {loading ? (
          <Spinner />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {jobs.map((job) => {
              return <Joblisting key={job.id} job={job} />;
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default jobListings;
