const { PythonShell } = require('python-shell');
const path = require('path');

const getPrediction = (req, res) => {
  const { month, weekday } = req.body;
  console.log('Received request:', req.body);

  let options = {
    mode: 'text',  // Change to 'text' to handle plain text output
    pythonOptions: ['-u'],
    scriptPath: path.join(__dirname, '../scripts'),
    args: [JSON.stringify({ month, weekday })],
    stderrParser: line => console.error(line)  // Capture stderr separately
  };

  PythonShell.run('predict.py', options, function (err, results) {
    if (err) {
      console.error('Error in Python script:', err);
      return res.status(500).json({ error: err.message });
    }
    console.log('Python script results:', results);
    if (results && results.length > 0) {
      try {
        const parsedResult = JSON.parse(results[0]);
        res.json(parsedResult);  // Ensure the response is a valid JSON object
      } catch (parseError) {
        console.error('Error parsing Python script output:', parseError);
        res.status(500).json({ error: 'Error parsing prediction result' });
      }
    } else {
      res.status(500).json({ error: 'No prediction result received' });
    }
  });
};

module.exports = { getPrediction };
