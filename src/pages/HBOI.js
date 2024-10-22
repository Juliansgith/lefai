// pages/HBOI.js
import React, { useState, useEffect } from 'react';
import { parseJsonData, getDetailsForSelection } from '../helpers/jsonHelper';
import {
  Box,
  Button,
  Typography,
  Paper,
  Grid,
  Container,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import MarkdownContent from '../components/MarkdownContent';

const HBOIComponent = () => {
  const [jsonData, setJsonData] = useState({});
  const [parsedData, setParsedData] = useState({});
  const [selectedArchitecture, setSelectedArchitecture] = useState('');
  const [selectedActivity, setSelectedActivity] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/hboi-nl.json`)
      .then((response) => response.json())
      .then((data) => {
        setJsonData(data);
        setParsedData(parseJsonData(data));
      })
      .catch((error) => console.error('Error fetching JSON data:', error));
  }, []);

  const handleArchitectureClick = (architecture) => {
    setSelectedArchitecture(architecture);
    setSelectedActivity('');
  };

  const handleActivityClick = (activity) => {
    setSelectedActivity(activity);
  };

  return (
    <Container sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2}>
          {/* Architectuurlagen Section */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Architectuurlagen
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {Object.keys(parsedData).map((architecture) => (
                <Button
                  key={architecture}
                  variant={selectedArchitecture === architecture ? 'contained' : 'outlined'}
                  onClick={() => handleArchitectureClick(architecture)}
                  fullWidth
                >
                  {architecture}
                </Button>
              ))}
            </Box>
          </Grid>

          {/* Activiteiten Section */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Activiteiten
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {selectedArchitecture &&
                parsedData[selectedArchitecture].map((activity) => (
                  <Button
                    key={activity}
                    variant={selectedActivity === activity ? 'contained' : 'outlined'}
                    onClick={() => handleActivityClick(activity)}
                    fullWidth
                  >
                    {activity}
                  </Button>
                ))}
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Display Content Based on Selection */}
      {selectedArchitecture && selectedActivity && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            {`${selectedArchitecture} - ${selectedActivity}`}
          </Typography>
          <Grid container spacing={2}>
            {Object.entries(
              getDetailsForSelection(jsonData, selectedArchitecture, selectedActivity)
            ).map(([level, { title }]) => (
              <Grid item xs={12} sm={6} key={level}>
                <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
                  <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    {`Niveau ${level}`}
                  </Typography>
                  <MarkdownContent content={title} />
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Container>
  );
};

export default HBOIComponent;
