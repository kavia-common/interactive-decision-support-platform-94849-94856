import React from 'react';

/**
 * PUBLIC_INTERFACE
 * ResponseViewer shows a titled response panel with error support.
 * Props:
 * - title?: string
 * - response?: string
 * - error?: string
 */
const ResponseViewer = ({ title = 'Response', response, error }) => {
  return (
    <div className="Card">
      <div className="Section">
        <h3 className="PageTitle" style={{ fontSize: '1.1rem', marginBottom: 8 }}>{title}</h3>
        {error ? (
          <div className="ErrorText">{error}</div>
        ) : response ? (
          <div className="Resp">{response}</div>
        ) : (
          <div className="Status">No response yet.</div>
        )}
      </div>
    </div>
  );
};

export default ResponseViewer;
