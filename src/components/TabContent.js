import React, { useState } from 'react';
import { Box, Button, Typography, Paper, Grid } from '@mui/material';

const TabContent = ({ data }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedActivity, setSelectedActivity] = useState('');

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedActivity(''); // Reset the activity selection when a new category is chosen
  };

  const handleActivitySelect = (activity) => {
    setSelectedActivity(activity);
  };

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Grid container spacing={2}>
        {/* Architectuurlagen */}
        <Grid item xs={6}>
          <Typography variant="h6" gutterBottom>Architectuurlagen</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {Object.keys(data).map((category, index) => (
              <Button
                key={index}
                variant={selectedCategory === category ? 'contained' : 'outlined'}
                onClick={() => handleCategorySelect(category)}
                fullWidth
              >
                {category}
              </Button>
            ))}
          </Box>
        </Grid>

        {/* Activiteiten */}
        <Grid item xs={6}>
          <Typography variant="h6" gutterBottom>Activiteiten</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {['Analyseren', 'Adviseren', 'Ontwerpen', 'Realiseren', 'Manage & Control'].map(
              (activity, index) => (
                <Button
                  key={index}
                  variant={selectedActivity === activity ? 'contained' : 'outlined'}
                  onClick={() => handleActivitySelect(activity)}
                  fullWidth
                >
                  {activity}
                </Button>
              )
            )}
          </Box>
        </Grid>
      </Grid>

      {/* Display Content Below */}
      <Box sx={{ mt: 4 }}>
        {selectedCategory && selectedActivity && (
          <Box>
            <Typography variant="h6">
              {selectedCategory} - {selectedActivity}
            </Typography>
            {/* Here, display the content based on the selectedCategory and selectedActivity */}
            {data[selectedCategory][selectedActivity] && (
              <Typography>{data[selectedCategory][selectedActivity].title}</Typography>
            )}
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default TabContent;
