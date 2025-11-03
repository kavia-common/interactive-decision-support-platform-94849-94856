import React, { useState } from 'react';
import PromptInput from '../components/PromptInput';
import ResponseViewer from '../components/ResponseViewer';
import { apiFetch } from '../services/api';

/**
 * PUBLIC_INTERFACE
 * Home page for prompt submission and displaying results. Guarded by ProtectedRoute.
 */
const Home = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submitPrompt = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt.');
      return;
    }
    setLoading(true);
    setError('');
    setResponse('');
    try {
      // Expected backend: POST /agent/prompt { prompt }
      const data = await apiFetch('/agent/prompt', {
        method: 'POST',
        body: JSON.stringify({ prompt }),
      });
      const text = typeof data === 'string'
        ? data
        : data?.response || data?.result || JSON.stringify(data, null, 2);
      setResponse(text);
    } catch (err) {
      setError(err?.message || 'Failed to submit prompt.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="MainContent">
      <div className="Section" style={{ padding: 0, marginBottom: 14 }}>
        <h1 className="PageTitle">Decision Support</h1>
        <p className="PageSubtitle">Ask questions or request actions. Your request is processed by the DSP backend.</p>
      </div>

      <PromptInput
        value={prompt}
        onChange={setPrompt}
        onSubmit={submitPrompt}
        loading={loading}
        disabled={false}
      />

      <div style={{ height: 12 }} />

      <ResponseViewer title="Backend Response" response={response} error={error} />
    </div>
  );
};

export default Home;
