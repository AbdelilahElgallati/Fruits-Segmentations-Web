// import React from 'react';

// const ClassStats = ({ predictions }) => {
//   if (!predictions || !Array.isArray(predictions)) {
//     return (
//       <div className="stats-card">
//         <h2 className="text-xl font-semibold text-[var(--text-dark)] mb-4">Detected Fruits</h2>
//         <p className="text-[var(--text-muted)]">No fruits detected</p>
//       </div>
//     );
//   }

//   const classCounts = predictions.reduce((acc, pred) => {
//     acc[pred.class] = (acc[pred.class] || 0) + 1;
//     return acc;
//   }, {});

//   return (
//     <div className="stats-card">
//       <h2 className="text-xl font-semibold text-[var(--text-dark)] mb-4">Detected Fruits</h2>
//       {Object.keys(classCounts).length > 0 ? (
//         <ul className="space-y-2">
//           {Object.entries(classCounts).map(([className, count]) => (
//             <li
//               key={className}
//               className="text-[var(--text-dark)] flex justify-between items-center bg-[var(--background-light)] p-2 rounded-lg"
//             >
//               <span className="font-medium">{className}</span>
//               <span className="bg-[var(--primary-orange)] text-white px-3 py-1 rounded-full text-sm">
//                 {count}
//               </span>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p className="text-[var(--text-muted)]">No fruits detected</p>
//       )}
//     </div>
//   );
// };

// export default ClassStats;

import React from 'react';

const ClassStats = ({ predictions }) => {
  if (!predictions || !Array.isArray(predictions)) {
    return (
      <div className="stats-card h-full">
        <h2 className="text-xl font-semibold text-[var(--text-dark)] mb-4">Detected Fruits</h2>
        <div className="flex flex-col items-center justify-center py-8">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[var(--text-muted)] mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-[var(--text-muted)]">No fruits detected</p>
        </div>
      </div>
    );
  }

  const classCounts = predictions.reduce((acc, pred) => {
    acc[pred.class] = (acc[pred.class] || 0) + 1;
    return acc;
  }, {});

  const getFruitIcon = (fruitName) => {
    const icons = {
      apple: '🍎',
      orange: '🍊',
      banana: '🍌',
      grape: '🍇',
      strawberry: '🍓',
      watermelon: '🍉',
      // Add more mappings as needed
    };
    
    const lowerName = fruitName.toLowerCase();
    return icons[lowerName] || '🍏'; // Default to green apple
  };

  return (
    <div className="stats-card h-full">
      <h2 className="text-xl font-semibold text-[var(--text-dark)] mb-4">Fruit Breakdown</h2>
      {Object.keys(classCounts).length > 0 ? (
        <ul className="space-y-3">
          {Object.entries(classCounts).map(([className, count]) => (
            <li
              key={className}
              className="text-[var(--text-dark)] flex justify-between items-center bg-white/80 p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{getFruitIcon(className)}</span>
                <span className="font-medium capitalize">{className}</span>
              </div>
              <span className="fruit-badge">
                {count}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center justify-center py-8">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[var(--text-muted)] mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-[var(--text-muted)]">No fruits detected</p>
        </div>
      )}
    </div>
  );
};

export default ClassStats;