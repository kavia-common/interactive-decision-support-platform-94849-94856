import React from 'react';

/**
 * PUBLIC_INTERFACE
 * PromptInput renders a textarea and submit button.
 * Props:
 * - value: string
 * - onChange: function
 * - onSubmit: function
 * - loading: boolean
 * - disabled: boolean
 */
const PromptInput = ({ value, onChange, onSubmit, loading, disabled }) => {
  return (
    <div className="Card Section">
      <div className="Form">
        <div>
          <label className="Label" htmlFor="prompt">Your prompt</label>
          <textarea
            id="prompt"
            className="Textarea"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Ask anything about your data or request a decision support action..."
            disabled={disabled || loading}
          />
          <div className="HelperText">Enter a natural language prompt. We'll send it to the DSP backend.</div>
        </div>
        <div className="Row">
          <button
            className="Button ButtonPrimary"
            onClick={onSubmit}
            disabled={disabled || loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromptInput;
