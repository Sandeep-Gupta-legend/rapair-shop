const LoadingSkeleton = ({ type = 'card' }) => {
  if (type === 'card') {
    return (
      <div className="card p-6 animate-pulse">
        <div className="skeleton h-48 rounded-lg mb-4"></div>
        <div className="skeleton h-6 w-3/4 rounded mb-2"></div>
        <div className="skeleton h-4 w-full rounded mb-2"></div>
        <div className="skeleton h-4 w-2/3 rounded"></div>
      </div>
    );
  }

  if (type === 'table') {
    return (
      <div className="animate-pulse">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex space-x-4 py-4 border-b">
            <div className="skeleton h-16 w-16 rounded"></div>
            <div className="flex-1 space-y-2">
              <div className="skeleton h-4 w-3/4 rounded"></div>
              <div className="skeleton h-4 w-1/2 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return null;
};

export default LoadingSkeleton;
